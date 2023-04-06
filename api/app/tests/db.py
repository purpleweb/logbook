from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..models import Base
from ..data import create_data
import os

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
    DB_FILE = './app/tests/tests.db'
    if os.path.isfile(DB_FILE):
        os.remove(DB_FILE)
    Base.metadata.create_all(engine)
    session = TestingSession()

    create_data(session=session)
