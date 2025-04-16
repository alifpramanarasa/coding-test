import openai
from typing import Optional

def call_deepseek(deepseek_api_key: str, deepseek_base_url: str, user_question: str) -> str:
    """
    Simple function to call DeepSeek API with a user question.
    """
    if not deepseek_api_key:
        raise ValueError("DeepSeek API key is missing.")
    if not deepseek_base_url:
        raise ValueError("DeepSeek base URL is missing.")
    if not user_question:
        return "No question provided."
    
    client = openai.OpenAI(
        api_key=deepseek_api_key,
        base_url=deepseek_base_url
    )

    messages = [
        {
            "role": "system", 
            "content": """You are a helpful and friendly AI assistant. 
            If the user asks about sales, revenue, profit, income, earnings, financial data, market analysis, or business-related topics, 
            kindly suggest that they might get better results using OpenAI's model, which has enhanced capabilities for financial data analysis. 
            Be polite and helpful in your response."""
        },
        {"role": "user", "content": user_question}
    ]

    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=messages
    )

    return response.choices[0].message.content.strip()
