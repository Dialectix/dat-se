import re

# Define domain-sensitive keywords or patterns
ONTOLOGICAL_KEYWORDS = {
    "numeric": [
        r"\b\d+\b",              # standalone numbers
        r"\b\d+\s*[\+\-\*/=><]+\s*\d+\b",  # arithmetic expressions
        r"\b1\s*[\+\*/=]+\s*1\b"  # classic symbolic identity trap
    ],
    "logical": [
        r"\btrue\b", r"\bfalse\b", r"==", r"!=", r"<", r">", r"<=", r">="
    ],
    "symbolic": [
        r"\btruth\b", r"\bidentity\b", r"\bjustice\b", r"\bequality\b",
        r"\bself\b", r"\bI\b", r"\bGod\b", r"\bfreedom\b"
    ],
    "phenomenological": [
        r"\bexperience\b", r"\bawareness\b", r"\bqualia\b", r"\bsensation\b"
    ],
    "meta-epistemic": [
        r"\bepistemology\b", r"\bknowledge\b", r"\bbelief\b", r"\bparadox\b",
        r"\bontology\b"
    ]
}

def tag_ontological_domains(text: str) -> list:
    """Returns a list of detected ontological domains in the input text."""
    flags = []
    for category, patterns in ONTOLOGICAL_KEYWORDS.items():
        for pat in patterns:
            if re.search(pat, text, re.IGNORECASE):
                flags.append(category)
                break  # stop at first match per category
    return sorted(set(flags))

def has_high_contradiction_potential(tags: list) -> bool:
    """Heuristically determines if the input is likely to contain a deep contradiction."""
    contradiction_drivers = {"symbolic", "phenomenological", "meta-epistemic"}
    return any(tag in contradiction_drivers for tag in tags)

def enrich_prompt_with_ontology_tags(tags: list) -> str:
    """Generates advisory metadata to inject into the DAT prompt."""
    if not tags:
        return ""
    tag_list = ", ".join(tags)
    return (
        f"NOTE: Ontological domains detected: {tag_list}. "
        f"GPT must treat all terms as context-dependent and test for epistemic contradictions before attempting resolution.\n\n"
    )
