from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import logging

from dat_engine import run_dat_pipeline
from ontology_guard import tag_ontological_domains, enrich_prompt_with_ontology_tags
from contradiction_classifier import classify_contradictions, contradiction_advisory_note

# Logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI app setup
app = FastAPI()

# CORS settings
origins = [
    "https://agreeable-field-063a7a703.6.azurestaticapps.net",
    "http://localhost:5173",
    "https://www.dialectix.com.au"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root health check
@app.get("/")
async def root():
    return {"message": "DAT engine API is running."}

# Request schema for analysis
class AnalyzeRequest(BaseModel):
    text: str

# Core DAT pipeline route
@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    user_input = request.text.strip()

    if not user_input:
        return {"error": "Please enter a question."}

    try:
        # Ontological tagging
        tags = tag_ontological_domains(user_input)
        if tags:
            user_input = enrich_prompt_with_ontology_tags(tags) + user_input

        # Contradiction classification
        contradiction_domains = classify_contradictions(user_input)
        if contradiction_domains:
            user_input = contradiction_advisory_note(contradiction_domains) + user_input

        # Run DAT engine
        result = run_dat_pipeline(user_input)

        if "error" in result:
            logger.warning(f"DAT error: {result['error']}")
            return {"error": result["error"]}

        return {
            "response": result,
            "domains": contradiction_domains
        }

    except Exception as e:
        logger.error(f"Unhandled server error: {str(e)}")
        return {"error": f"Internal server error: {str(e)}", "timestamp": datetime.utcnow().isoformat()}
