from typing import Any
from sqlalchemy.orm import Session
from models import *
from schemas import *

def get_garages(db: Session):
    return db.query(Garage).all()

def get_garage(garage_id: int, db: Session):
    return db.query(Garage).filter(Garage.id == garage_id).first()

def get_garage_by_name(garage_name: str, db: Session):
    return db.query(Garage).filter(Garage.name == garage_name).first()

def create_garage(garage: GarageModel, db: Session) -> Any:
    db_garage = Garage()
    db_garage.name = garage.name
    db_garage.phone = garage.phone
    db.add(db_garage)
    db.commit()
    db.refresh(db_garage)
    return db_garage
    
def delete_garage(garage_name: str, db: Session):
    garage = db.query(Garage).filter(Garage.name == garage_name).first()
    db.delete(garage)
    db.commit()
    return garage

def get_interventions(db: Session):
    return db.query(Intervention).order_by(Intervention.date.asc()).all()