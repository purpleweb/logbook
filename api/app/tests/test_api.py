from fastapi.testclient import TestClient
from ..main import app, get_db
from . import db

db.reset_db()

app.dependency_overrides[get_db] = db.override_get_db

client = TestClient(app)

def test_get_interventions():
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
