from sqlalchemy.orm import Session
from database import Base, engine
from models import Garage, Operation, Intervention
import datetime

engine.echo = True
session = Session(engine)

if True:
    Base.metadata.create_all(engine)
    garage = Garage(name="Speedy le Chesnay", phone="01 39 56 56 45")

    vidange = Operation()
    vidange.title = "Vidange"
    freins = Operation()
    freins.title = "Plaquettes AV"

    intervention = Intervention()
    intervention.date = datetime.datetime.now()
    intervention.description = "passage au garage"
    intervention.garage = garage
    intervention.operations = [vidange, freins]

    session.add(garage)
    session.add(vidange)
    session.add(freins)
    session.add(intervention)

    session.commit()

