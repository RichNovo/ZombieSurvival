from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.db.database import engine
import uvicorn
from app.api.survivors import router as survivors_router
from app.api.inventory import router as inventory_router
from app.db.database import BaseDbModel

BaseDbModel.metadata.create_all(bind=engine)

app = FastAPI()

# Allow requests from the Vite development server
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specific origins allowed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(survivors_router, prefix="/survivors")
app.include_router(inventory_router, prefix="/inventory")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
