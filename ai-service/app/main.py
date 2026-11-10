from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import ai

load_dotenv()

app = FastAPI(title="FitNutro AI Service")

# Only the Express backend should call this service.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai.router)


@app.get("/health")
def health():
    return {"status": "ok"}
