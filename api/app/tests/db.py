from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from ..models import Base, Garage, Operation, Intervention
import os
import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./app/tests/tests.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

TestingSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSession()
        yield db
    finally:
        db.close()


def reset_db():
    os.remove('./app/tests/tests.db')
    Base.metadata.create_all(engine)
    session = TestingSession()

    garage1 = Garage(name="Speedy le Chesnay", phone="01 39 56 56 45")
    garage2 = Garage(name="Speedy Versailles Chantier", phone="01 39 49 06 88")
    garage3 = Garage(name="MCS Automobiles", phone="01 39 50 52 32")
    garage4 = Garage(name="Carrosserie du Haut Buc", phone="01 39 56 89 37")

    rc = Operation(title="Révision")
    ct = Operation(title="RC")
    pneusAV = Operation(title="pneus AV")
    vidange = Operation(title="Vidange")
    freins = Operation(title="Plaquettes AV")


    intervention = Intervention()
    intervention.date = datetime.date(2021, 1, 10)
    intervention.km = 110000
    intervention.cost = 500
    intervention.garage = garage2
    intervention.operations = [rc]

    intervention = Intervention()
    intervention.date = datetime.date(2022, 11, 16)
    intervention.km = 122000
    intervention.cost = 320.50
    intervention.description = "passage au garage"
    intervention.garage = garage1
    intervention.operations = [vidange, freins]

    session.add_all([rc, ct, pneusAV, vidange, freins])
    session.add_all([garage1, garage2, garage3, garage4])
    session.add(intervention)

    session.commit()
