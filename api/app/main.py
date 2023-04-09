from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import engine, SessionLocal
from .schemas import GarageCreate, GarageModel, InterventionModel, InterventionCreate, OperationCreate
from . import crud

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine.echo = True

@app.get("/garages/", response_model=list[GarageModel])
def read_garages(db: Session = Depends(get_db)):
    return crud.get_garages(db)

@app.get("/garages/{garage_id}", response_model=GarageModel)
def read_garage(garage_id: int, db: Session = Depends(get_db)):
    garage = crud.get_garage(garage_id=garage_id, db=db)
    if (garage is None):
        raise HTTPException(404, f"Garage not found")
    return garage

@app.post("/garages/", status_code=status.HTTP_201_CREATED)
def create_garage(garage: GarageCreate, db: Session = Depends(get_db)):
    return crud.create_garage(garage=garage, db=db)

@app.delete("/garages/{garage_name}", status_code=status.HTTP_200_OK)
def delete_garage(garage_name: str, db: Session = Depends(get_db)):
    garage = crud.get_garage_by_name(name=garage_name, db=db)
    if (garage is None):
        raise HTTPException(404, f"Garage not found")
    return crud.delete_garage(garage_name=garage_name, db=db)

@app.get("/interventions/", response_model=list[InterventionModel])
def read_interventions(db: Session = Depends(get_db)):
    return crud.get_interventions(db)

@app.post("/interventions/", status_code=status.HTTP_201_CREATED)
def create_intervention(intervention: InterventionCreate, db: Session = Depends(get_db)):
    return crud.create_intervention(intervention=intervention, db=db)

@app.delete("/interventions/{intervention_id}", status_code=status.HTTP_200_OK)
def delete_intervention(intervention_id: int, db: Session = Depends(get_db)):
    intervention = crud.get_intervention(intervention_id=intervention_id, db=db)
    if (intervention is None):
        raise HTTPException(404, f"Intervention not found")
    return crud.delete_intervention(intervention_id=intervention_id, db=db)