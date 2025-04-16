from pydantic import BaseModel
from enum import Enum

class AIProvider(str, Enum):
    DEEPSEEK = "deepseek"
    OPENAI = "openai"

class AIRequest(BaseModel):
    question: str
    provider: str