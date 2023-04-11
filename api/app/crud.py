from typing import Any
from sqlalchemy.orm import Session
from .models import *
from .schemas import *

class NotFoundError(Exception):
    ...

def get_garages(db: Session) -> list[Garage]:
    return db.query(Garage).all()

def get_garage(garage_id: int, db: Session) -> Garage:
    return db.query(Garage).filter(Garage.id == garage_id).first()

def get_garage_by_name(name: str, db: Session) -> Garage:
    return db.query(Garage).filter(Garage.name == name).first()

def get_operation_by_name(name: str, db: Session) -> Operation:
    return db.query(Operation).filter(Operation.title == name).first()

def create_garage(garage: GarageModel, db: Session) -> Garage:
    db_garage = Garage()
    db_garage.name = garage.name
    db_garage.phone = garage.phone
    db.add(db_garage)
    db.commit()
    db.refresh(db_garage)
    return db_garage
    
def delete_garage(garage_name: str, db: Session) -> None:
    garage = db.query(Garage).filter(Garage.name == garage_name).first()
    db.delete(garage)
    db.commit()

def create_operation(operation: OperationModel, db: Session) -> Operation:
    o = Operation(title=operation.title)
    db.add(o)
    db.commit()
    db.refresh(o)
    return o
    
def upsert_intervention(intervention: InterventionUpsert, db: Session) -> Intervention:
    garage = get_garage_by_name(name=intervention.garage, db=db)
    if (garage is None):
        garage = create_garage(GarageCreate(name=intervention.garage), db=db)
    operationList = intervention.operations.split(',')
    opeList = []
    for operation in operationList:
        ope = get_operation_by_name(name=operation.strip(), db=db)
        if (ope is None):
            ope = create_operation(operation=OperationCreate(title=operation.strip()), db=db)
        opeList.append(ope)
    if (intervention.id is not None):
        model = get_intervention(intervention_id=intervention.id, db=db)
        if(model is None):
            raise NotFoundError
    else:
        model = Intervention()
    model.date = intervention.date
    model.km = intervention.km
    model.cost = intervention.cost
    model.operations = opeList
    model.garage = garage
    db.add(model)
    db.commit()
    db.refresh(model)
    return model

def get_interventions(db: Session) -> list[Intervention]:
    return db.query(Intervention).order_by(Intervention.date.asc()).all()

def delete_intervention(intervention_id: int, db: Session) -> None:
    intervention = db.query(Intervention).filter(Intervention.id == intervention_id).first()
    db.delete(intervention)
    db.commit()

def get_intervention(intervention_id: int, db: Session) -> Intervention:
    intervention = db.query(Intervention).filter(Intervention.id == intervention_id).first()
    if (intervention is None):
        raise NotFoundError
    return intervention
