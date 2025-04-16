from app.schemas.ai import AIProvider
from app.ai_client.openai_client import call_openai_function_call
from app.ai_client.deepseek_client import call_deepseek
from app.config import settings

def call_llm(provider: AIProvider, question: str) -> str:
    """
    approach for each provider.
    """
    if provider == AIProvider.DEEPSEEK:
        return call_deepseek(settings.DEEPSEEK_API_KEY, settings.DEEPSEEK_BASE_URL, question)
    elif provider == AIProvider.OPENAI:
        return call_openai_function_call(settings.OPENAI_API_KEY, question)
    else:
        return "Unsupported provider."
