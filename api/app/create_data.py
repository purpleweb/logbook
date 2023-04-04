from sqlalchemy.orm import Session
from database import Base, engine
from .models import Garage, Operation, Intervention
import datetime
import os
import datetime

def reset():
    os.remove('app.db')

    engine.echo = True
    session = Session(engine)
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


if True:
    reset()