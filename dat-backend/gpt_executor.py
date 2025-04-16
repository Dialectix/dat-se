from openai import AzureOpenAI
import os
from fastapi import FastAPI, Request
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Create AzureOpenAI client using environment variables
client = AzureOpenAI(
    api_key=os.environ["AZURE_OPENAI_API_KEY"],
    api_version=os.environ["AZURE_OPENAI_API_VERSION"],
    azure_endpoint=os.environ["AZURE_OPENAI_ENDPOINT"]
)

@app.get("/")
def read_root():
    return {"message": "DAT is live and ready."}

@app.post("/ask")
async def ask_gpt(request: Request):
    body = await request.json()
    user_input = body.get("question")

    if not user_input:
        return {"error": "No question provided."}

    try:
        response = client.chat.completions.create(
            model=os.environ["AZURE_OPENAI_DEPLOYMENT"],
            messages=[{"role": "user", "content": user_input}]
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        return {"error": str(e)}

# Local run (for development only)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
