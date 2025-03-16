import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.database import BaseDbModel

from app.db.database import engine

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db_engine():
    BaseDbModel.metadata.create_all(bind=engine)
    yield TestingSessionLocal
    BaseDbModel.metadata.drop_all(bind=engine)
