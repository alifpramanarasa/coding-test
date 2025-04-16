from fastapi import APIRouter, HTTPException, status
from app.schemas.ai import AIRequest, AIProvider
from app.ai_client.llm_dispatcher import call_llm
from app.schemas.responses import ValidationErrorResponse, InternalServerErrorResponse, SuccessResponse

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
    responses={
        400: {"description": "Bad request"},
        500: {"description": "Server error"}
    }
)

@router.post("/")
def ai_endpoint(payload: AIRequest):
    """
    AI endpoint.
    The user provides:
      {
        "question": "...",
        "provider": "openai" (or any other)
      }
    We do one call and return the final answer.
    """
    question = payload.question.strip()
    if not question:
        return ValidationErrorResponse(
            message="Please provide a question.",
            details={"question": ["Question is required"]}
        )

    provider = payload.provider.strip()
    if not provider:
        return ValidationErrorResponse(
            message="Please provide a valid provider.",
            details={"provider": ["Provider is required"]}
        )

    try:
        provider_enum = AIProvider(provider)
    except ValueError:
        return ValidationErrorResponse(
            message="Invalid provider specified.",
            details={"provider": [f"Provider must be one of: {', '.join([p.value for p in AIProvider])}"]}
        )

    try:
        result = call_llm(provider_enum, question)
    except ValueError as ve:
        return ValidationErrorResponse(
            message=str(ve),
            details={"question": [str(ve)]}
        )
    except Exception as e:
        return InternalServerErrorResponse(
            message=str(e),
            details={"question": [str(e)]}
        )

    return SuccessResponse(
        message="AI response",
        data={"answer": result}
    )
