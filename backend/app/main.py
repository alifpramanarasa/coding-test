from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import sales, ai, general
from app.schemas.responses import SuccessResponse
import uvicorn

def create_app() -> FastAPI:
    app = FastAPI(
        title="Sales & AI API",
        version="1.0.0",
        description=(
            "A FastAPI backend providing sales data from dummyData and AI integration "
            "with multiple providers (DeepSeek or OpenAI)."
        )
    )

    allowed_origins = settings.ALLOWED_ORIGINS.split(",")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/", response_model=SuccessResponse[dict])
    def root():
        """
        Returns a welcome message for the API.
        """
        return SuccessResponse(
            message="Welcome to the Sales API",
            data={"version": settings.VERSION}
        )

    app.include_router(general.router)
    app.include_router(sales.router)
    app.include_router(ai.router)

    return app

app = create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
