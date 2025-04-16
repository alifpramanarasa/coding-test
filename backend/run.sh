#!/bin/bash

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Running tests..."
pytest -v

echo "Starting server on http://0.0.0.0:8000"
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload