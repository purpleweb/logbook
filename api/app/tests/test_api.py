from sqlalchemy import create_engine, StaticPool
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient
from ..models import Base
from ..main import app, get_db
from ..data import create_data
from pytest import fixture

engine = create_engine('sqlite:///:memory:', echo=True, connect_args={"check_same_thread": False}, poolclass=StaticPool)
TestingSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(engine)
session = TestingSession()

def override_get_db():
    try:
        db = TestingSession()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@fixture(autouse=True)
def reset():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    create_data(session=session)


def test_get_garages():
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


def test_delete_intervention():
    response = client.delete('/interventions/1')
    assert response.status_code == 200

    response = client.get('/interventions/')
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert len(response.json()) == 1
    assert isinstance(response.json()[0], dict)
    assert response.json()[0].get('id') == 2


def test_get_interventions():
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
