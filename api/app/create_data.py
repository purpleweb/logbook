from sqlalchemy.orm import Session
from .database import engine, SessionLocal
from .models import Base, Garage, Operation, Intervention
import datetime
import os
import datetime

DB_FILE = 'app/app.db'

def reset():
    if os.path.isfile(DB_FILE):
        print("remove db")
        os.remove(DB_FILE)

    engine.echo = True
    session = SessionLocal()
    Base.metadata.create_all(engine)

    garage1 = Garage(name="Speedy le Chesnay", phone="01 39 56 56 45")
    garage2 = Garage(name="Speedy Versailles Chantier", phone="01 39 49 06 88")
    garage3 = Garage(name="MCS Automobiles", phone="01 39 50 52 32")
    garage4 = Garage(name="Carrosserie du Haut Buc", phone="01 39 56 89 37")

    rc = Operation(title="Révision")
    ct = Operation(title="RC")
    pneusAV = Operation(title="pneus AV")
    vidange = Operation(title="Vidange")
    freins = Operation(title="Plaquettes AV")

    intervention1 = Intervention()
    intervention1.date = datetime.date(2021, 1, 10)
    intervention1.km = 110000
    intervention1.cost = 500
    intervention1.garage = garage2
    intervention1.operations = [rc]

    intervention2 = Intervention()
    intervention2.date = datetime.date(2022, 11, 16)
    intervention2.km = 122000
    intervention2.cost = 320.50
    intervention2.description = "passage au garage"
    intervention2.garage = garage1
    intervention2.operations = [vidange, freins]

    session.add_all([rc, ct, pneusAV, vidange, freins])
    session.add_all([garage1, garage2, garage3, garage4])

    session.add(intervention1)
    session.add(intervention2)
    session.commit()