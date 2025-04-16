from datetime import datetime
from gpt_executor import ask_gpt
import re

def run_dat_pipeline(user_input):
    prompt = f"""
You are a dialectical reasoning engine.

Process the following input using a four-step dialectical method. You MUST include all four steps clearly labeled using the exact headers below. Do not merge or omit any section.

Input:
"{user_input}"

Respond using this format:

### Step 1: Ontological and Epistemic Disambiguation
...

### Step 2: Dialectical Tension (Thesis, Antithesis, Synthesis)
...

### Step 3: Contextual Evaluation
...

### Step 4: Structured Resolution
(This MUST be a distinct and standalone paragraph that clearly completes the dialectic.)

### Reformulated Question
...
"""

    response = ask_gpt(prompt)

    # Default placeholders
    steps = {
        "step1_summary": "Step 1 missing.",
        "step2_summary": "Step 2 missing.",
        "step3_summary": "Step 3 missing.",
        "step4_summary": "Step 4 missing.",
        "final_output": "Reformulated Question — Reformulated question not clearly returned.",
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    }

    # Try structured match
    matches = re.split(r"###\s*(Step 1|Step 2|Step 3|Step 4|Reformulated Question):?", response)
    label_map = {
        "Step 1": "step1_summary",
        "Step 2": "step2_summary",
        "Step 3": "step3_summary",
        "Step 4": "step4_summary",
        "Reformulated Question": "final_output"
    }

    for i in range(1, len(matches), 2):
        label = matches[i].strip()
        text = matches[i+1].strip()
        key = label_map.get(label)
        if key and text:
            steps[key] = text

    # Fallback: search for 'Structured Resolution' if Step 4 label missing
    if steps["step4_summary"].startswith("Step 4 missing."):
        structured = re.search(r'(Structured Resolution[\s\S]+?)(?=###|\Z)', response, re.IGNORECASE)
        if structured:
            steps["step4_summary"] = "(Extracted from unlabelled 'Structured Resolution')\n" + structured.group(1).strip()

    # Fallback: extract final question if not parsed
    if "not clearly returned" in steps["final_output"]:
        lines = response.strip().splitlines()
        for line in reversed(lines):
            if "?" in line and len(line.strip().split()) > 4:
                steps["final_output"] = f'Reformulated Question — "{line.strip().strip()}"'
                break

    return steps
