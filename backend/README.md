# Sales & AI API Backend

A FastAPI-based backend service that provides sales data and AI integration capabilities. The API supports AI interactions with multiple providers (OpenAI, DeepSeek) and serves sales data from a dummy dataset.

## Features

- RESTful API built with FastAPI
- CORS support for cross-origin requests
- AI integration with multiple providers
- Sales data endpoints
- Environment-based configuration
- Comprehensive test suite

## Tech Stack

- Python 3.x
- FastAPI
- Uvicorn
- Pydantic
- OpenAI API
- pytest (for testing)

## Project Structure

```
backend/
├── app/
│   ├── ai_client/      # AI provider integrations
│   ├── data/           # Data files and models
│   ├── routers/        # API route handlers
│   ├── schemas/        # Pydantic models
│   ├── test/           # Test files
│   ├── config.py       # Configuration settings
│   └── main.py         # Application entry point
├── .env                # Environment variables
├── .env.example        # Example environment variables
├── requirements.txt    # Python dependencies
└── run.sh             # Startup script
```

## Setup

1. Clone the repository
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy `.env.example` to `.env` and configure your environment variables:
   ```bash
   cp .env.example .env
   ```
5. Update the `.env` file with your API keys and configuration

## Running the Application

### Development Mode

```bash
./run.sh
```

Or manually:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Documentation

Once the server is running, you can access the following documentation:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Testing

Run the test suite with:

```bash
pytest
```

## API Endpoints

### General
- `GET /`: Welcome endpoint with API version

### Sales
- Endpoints for sales data retrieval and management

### AI
- Endpoints for AI interactions with multiple providers

## Environment Variables

Required environment variables (see `.env.example`):
- `OPENAI_API_KEY`: Your OpenAI API key
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)
- `VERSION`: API version
