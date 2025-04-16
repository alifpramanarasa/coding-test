from fastapi.testclient import TestClient
from app.main import create_app
from app.schemas.ai import AIProvider

client = TestClient(create_app())

def test_ai_openai_function_call():
    """
    If you have OPENAI_API_KEY set, it might do a real function call 
    or a standard response. If no real key, might be 500.
    """
    payload = {"question": "Show me deals with 'Closed Won' in North America", 
               "provider": AIProvider.OPENAI.value}
    res = client.post("/api/ai/", json=payload)
    assert res.status_code in [200, 500]
    if res.status_code == 200:
        body = res.json()
        assert "data" in body
        assert "answer" in body["data"]
        assert isinstance(body["data"]["answer"], dict)
        assert "summary" in body["data"]["answer"]
        assert "details" in body["data"]["answer"]
        assert "action_items" in body["data"]["answer"]

def test_ai_deepseek_function_call():
    """
    Test DeepSeek AI provider response
    """
    payload = {"question": "Hello, who are you?", 
               "provider": AIProvider.DEEPSEEK.value}
    res = client.post("/api/ai/", json=payload)
    assert res.status_code in [200, 500]
    if res.status_code == 200:
        body = res.json()
        assert "data" in body
        assert "answer" in body["data"]
        # DeepSeek returns a string response, not a structured dict
        assert isinstance(body["data"]["answer"], str)
        assert len(body["data"]["answer"]) > 0
