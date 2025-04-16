from openai import AzureOpenAI
import os

# Initialize Azure OpenAI client with environment variables
client = AzureOpenAI(
    api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
    api_version=os.environ.get("AZURE_OPENAI_API_VERSION"),
    azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT")
)

def ask_gpt(prompt):
    """
    Submits a prompt to Azure OpenAI and returns the assistant's reply.
    Includes fallback and error handling.
    """
    try:
        response = client.chat.completions.create(
            model=os.environ.get("AZURE_OPENAI_DEPLOYMENT"),
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a dialectical reasoning engine. Respond only in the following format:\n\n"
                        "### Step 1: Ontological and Epistemic Disambiguation\n...\n\n"
                        "### Step 2: Dialectical Tension (Thesis, Antithesis, Synthesis)\n...\n\n"
                        "### Step 3: Contextual Evaluation\n...\n\n"
                        "### Step 4: Structured Resolution\n...\n\n"
                        "### Reformulated Question\n..."
                    )
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        # Extract and return the assistant's message
        message = response.choices[0].message.content
        if isinstance(message, str) and message.strip():
            return message.strip()
        else:
            return "ERROR: GPT response was empty or malformed."

    except Exception as e:
        return f"ERROR: {str(e)}"
