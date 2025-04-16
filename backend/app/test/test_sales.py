from fastapi.testclient import TestClient
from app.main import create_app

client = TestClient(create_app())

def test_get_sales_reps():
    response = client.get("/api/sales/")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert isinstance(data["data"], list)
    assert len(data["data"]) > 0
    # Check structure of first sales rep
    first_rep = data["data"][0]
    assert "id" in first_rep
    assert "name" in first_rep
    assert "clients" in first_rep
    assert "deals" in first_rep
    assert isinstance(first_rep["clients"], list)
    assert isinstance(first_rep["deals"], list)

def test_get_sales_rep_by_id():
    response = client.get("/api/sales/1")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert isinstance(data["data"], dict)
    assert "id" in data["data"]
    assert "name" in data["data"]
    assert "clients" in data["data"]
    assert "deals" in data["data"]

