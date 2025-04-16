from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from dat_engine import run_dat_pipeline
from ontology_guard import tag_ontological_domains, enrich_prompt_with_ontology_tags
from contradiction_classifier import classify_contradictions, contradiction_advisory_note

app = FastAPI()

# CORS configuration for live site, Azure staging, and local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://agreeable-field-063a7a703.6.azurestaticapps.net",  # Azure static app
        "http://localhost:5173",                                   # Local dev
        "https://www.dialectix.com.au"                             # Production domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "DAT engine API is running."}

class AnalyzeRequest(BaseModel):
    text: str

@app.post("/analyze")
async def analyze_question(request: AnalyzeRequest):
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

        # Run DAT analysis
        result = run_dat_pipeline(user_input)

        if "error" in result:
            return {"error": result["error"]}

        return {
            "response": result,
            "domains": contradiction_domains  # ✅ new key added
        }

    except Exception as e:
        return {"error": f"Internal server error: {str(e)}"}
