import os
import re
from datetime import datetime
from openai import AzureOpenAI

# Initialize Azure OpenAI client using App Service environment variables
client = AzureOpenAI(
    api_key=os.environ.get("AZURE_OPENAI_API_KEY"),
    api_version=os.environ.get("OPENAI_API_VERSION"),
    azure_endpoint=os.environ.get("AZURE_OPENAI_ENDPOINT")
)

# Check for base-10 arithmetic or logical identity triggers
def enforce_step_1_epistemic_check(user_input: str) -> str:
    arithmetic_terms = ["+", "-", "*", "/", "=", "==", "!=", "<", ">"]
    if any(op in user_input for op in arithmetic_terms):
        return (
            "NOTE: The input appears to rely on base-10 arithmetic or logical identity. "
            "Before proceeding, you MUST assess the ontological and epistemic meaning of each element "
            "(e.g., '1', '+', '=', etc.). Do not resolve this as a mathematical fact until contradictions "
            "across symbolic, quantum, phenomenological, and social frameworks have been explored.\n\n"
        )
    return ""

# Custom function to handle the response formatting
def custom_format_response(response: str):
    # Parse response by labeled headers
    matches = re.split(r"###\s*(Step 1|Step 2|Step 3|Step 4|Reformulated Question|Illustrative Example):?", response)
    label_map = {
        "Step 1": "step1_summary",
        "Step 2": "step2_summary",
        "Step 3": "step3_summary",
        "Step 4": "step4_summary",
        "Reformulated Question": "final_output",
        "Illustrative Example": "example_output"
    }

    steps = {key: "" for key in label_map.keys()}
    
    for i in range(1, len(matches), 2):
        label = matches[i].strip()
        text = matches[i + 1].strip()

        # Formatting Step 2 block
        if label == "Step 2":
            text = re.sub(r"\*\*Thesis\*\*[:：]?", "\nThesis:\n", text)
            text = re.sub(r"\*\*Antithesis\*\*[:：]?", "\nAntithesis:\n", text)
            text = re.sub(r"\*\*Synthesis\*\*[:：]?", "\nSynthesis:\n", text)

        key = label_map.get(label)
        if key and text:
            steps[key] = text

    return steps

# Function to interact with Azure OpenAI and process response
def ask_gpt(prompt: str) -> str:
    """
    Submits a prompt to Azure OpenAI and returns the assistant's reply.
    """
    try:
        deployment_name = os.environ.get("AZURE_OPENAI_DEPLOYMENT")

        response = client.chat.completions.create(
            model=deployment_name,
            messages=[
                {"role": "system", "content": "You are a dialectical reasoning engine. Respond only in the following format:\n\n..."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content.strip() if response.choices else "ERROR: No valid response from GPT."

    except Exception as e:
        return f"ERROR: {str(e)}"

# Function to run the full DAT pipeline
def run_dat_pipeline(user_input: str) -> dict:
    disambiguation_note = enforce_step_1_epistemic_check(user_input)

    full_prompt = f"""
    You are a dialectical reasoning engine.
    {disambiguation_note}
    Analyze the following input using the Dialectical Analysis Theory (DAT) 4-step method.
    Input: \"\"\"{user_input}\"\"\"
    Respond using this exact format:
    ### Step 1: Ontological and Epistemic Disambiguation
    ...
    ### Step 2: Dialectical Tension (Thesis, Antithesis, Synthesis)
    ...
    ### Step 3: Contextual Evaluation
    ...
    ### Step 4: Structured Resolution
    ...
    ### Reformulated Question
    ...
    ### Illustrative Example
    """
    raw_response = ask_gpt(full_prompt)

    # Process the response and return structured output
    steps = custom_format_response(raw_response)

    return {
        "steps": steps,
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    }
