from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dat_engine import run_dat_pipeline

app = FastAPI()

# Allow frontend access (local + deployed static app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://agreeable-field-063a7a703.6.azurestaticapps.net",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple GET to check backend is running
@app.get("/")
async def root():
    return {"message": "DAT engine API is running."}

# Define expected request schema
class AnalyzeRequest(BaseModel):
    text: str

# Main POST endpoint for user analysis
@app.post("/analyze")
async def analyze_question(request: AnalyzeRequest):
    user_input = request.text.strip()

    if not user_input:
        return {"error": "Please enter a question."}

    try:
        result = run_dat_pipeline(user_input)

        # ✅ Safely return the formatted response for frontend
        if isinstance(result, dict) and "response" in result:
            return {"response": result["response"]}
        else:
            return {"error": "Unexpected response format from analysis engine."}

    except Exception as e:
        return {"error": f"Internal server error: {str(e)}"}
