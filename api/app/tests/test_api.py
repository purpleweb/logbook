from sqlalchemy import create_engine, StaticPool, Engine
from sqlalchemy.orm import sessionmaker, Session
from fastapi.testclient import TestClient
from ..models import Base
from ..main import app, get_db
from ..data import create_data
from pytest import fixture

@fixture(scope='session')
def engine():
    yield create_engine('sqlite:///:memory:', echo=False, connect_args={"check_same_thread": False}, poolclass=StaticPool)

@fixture(scope='session')
def session(engine: Engine):
    TestingSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(engine)
    yield TestingSession()

@fixture(scope='function')
def client(session: Session):
    def override_get_db():
        try:
            yield session
        finally:
            session.close()
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)

@fixture(autouse=True)
def reset(engine: Engine, session: Session):
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    create_data(session=session)


def test_get_garages(client: TestClient):
    response = client.get('/garages/')
    assert response.status_code == 200
    assert response.json() == [
        {
            "name": "Speedy le Chesnay",
            "phone": "01 39 56 56 45",
            "id": 1
        },
        {
            "name": "Speedy Versailles Chantier",
            "phone": "01 39 49 06 88",
            "id": 2
        },
        {
            "name": "MCS Automobiles",
            "phone": "01 39 50 52 32",
            "id": 3
        },
        {
            "name": "Carrosserie du Haut Buc",
            "phone": "01 39 56 89 37",
            "id": 4
        }
    ]

def test_get_garage(client: TestClient):
    response = client.get('/garages/1')
    assert response.status_code == 200
    assert response.json().get('id') == 1


def test_delete_intervention(client: TestClient):
    response = client.delete('/interventions/1')
    assert response.status_code == 200

    response = client.get('/interventions/')
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) == 1
    assert isinstance(response.json()[0], dict)
    assert response.json()[0].get('id') == 2


def test_get_interventions(client: TestClient):
    response = client.get('/interventions/')
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 2,
            "date": "2021-01-10",
            "km": 110000,
            "cost": 500,
            "description": None,
            "garage": {
                "name": "Speedy Versailles Chantier",
                "phone": "01 39 49 06 88",
                "id": 2
            },
            "operations": [
                {
                    "id": 1,
                    "title": "Révision"
                }
            ]
        },
        {
            "id": 1,
            "date": "2022-11-16",
            "km": 122000,
            "cost": 320.5,
            "description": "passage au garage",
            "garage": {
                "name": "Speedy le Chesnay",
                "phone": "01 39 56 56 45",
                "id": 1
            },
            "operations": [
                {
                    "id": 4,
                    "title": "Vidange"
                },
                {
                    "id": 5,
                    "title": "Plaquettes AV"
                }
            ]
        }
    ]

def test_get_intervention(client: TestClient):
    response = client.get('/interventions/1')
    assert response.status_code == 200
    assert response.json().get('id') == 1

def test_get_intervention_not_found(client: TestClient):
    response = client.get('/interventions/111')
    assert response.status_code == 404

def test_post_intervention_negative_km_error(client: TestClient):
    response = client.post('/interventions/', json={
        "date": "2022-11-16",
        "km": -122000,
        "cost": 320.5,
        "description": "passage au garage",
        "garage": "Garage de test",
        "operations": "Révision"
    })
    assert response.status_code == 422
    assert response.json().get('detail')[0].get("msg") == "km must be positive"

def test_post_intervention_negative_cost_error(client: TestClient):
    response = client.post('/interventions/', json={
        "date": "2022-11-16",
        "km": 122000,
        "cost": -320.5,
        "description": "passage au garage",
        "garage": "Garage de test",
        "operations": "Révision"
    })
    assert response.status_code == 422
    assert response.json().get('detail')[0].get("msg") == "cost must be positive"

def test_post_intervention_valid(client: TestClient):
    response = client.post('/interventions/', json={
        "date": "2023-04-01",
        "km": 135000,
        "cost": 520,
        "garage": "Garage chez Alfred",
        "operations": "Révision, bougies"
    })
    assert response.status_code == 201
    response = client.get('/interventions/')
    assert response.status_code == 200
    assert any(intervention.get('garage').get('name') == "Garage chez Alfred" for intervention in response.json()), "Created intervention not found"

def test_update_intervention(client: TestClient):
    response = client.post('/interventions/', json={
        "id": 1,
        "date": "2023-04-01",
        "km": 135000,
        "cost": 520,
        "garage": "Garage chez Alfred",
        "operations": "Révision, bougies"
    })
    response = client.get('/interventions/1')
    assert response.status_code == 200
    assert response.json().get('id') == 1
    assert response.json().get('date') == "2023-04-01"
    assert response.json().get('km') == 135000
    assert response.json().get('cost') == 520
    assert response.json().get('garage').get("name") == "Garage chez Alfred"


def test_update_intervention(client: TestClient):
    response = client.post('/interventions/', json={
        "id": 111, # id does not exist
        "date": "2023-04-01",
        "km": 135000,
        "cost": 520,
        "garage": "Garage chez Alfred",
        "operations": "Révision, bougies"
    })
    assert response.status_code == 404