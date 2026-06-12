from fastapi import FastAPI
from app.api.llm import router as llm_router
from app.api.document import router as document_router

from app.api.health import router as health_router

from app.core.logging import setup_logging


setup_logging()

app = FastAPI(
    title="Multi-Agent AI Document System",
    version="1.0.0"
)

app.include_router(health_router)
app.include_router(llm_router)
app.include_router(document_router)


@app.get("/")
async def root():
    return {
        "message": "Multi-Agent AI Document System API"
    }