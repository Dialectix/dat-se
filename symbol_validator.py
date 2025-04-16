import re

def validate_input(user_input: str) -> bool:
    """
    Detects symbolic or contextual ambiguity in user input.
    Triggers DAT Step 1.3 if likely contradiction is detected.
    """

    # Normalize
    text = user_input.strip().lower()

    # If the input is too short or trivially arithmetic, flag it
    if re.match(r"^1\s*\+\s*1$", text):
        return True  # e.g., could be binary or decimal — ambiguous

    # Look for binary or dual-natured concepts (suggesting implicit contradiction)
    contradiction_terms = [
        r"\b1\s*\+\s*1\b",
        r"\bbinary\b", r"\bdecimal\b",
        r"\bparadox\b", r"\bcontradiction\b",
        r"\bsymbolic\b", r"\bliteral\b",
        r"\btruth\b.*\bcontext\b", r"\breal\b.*\bideal\b",
        r"\bsame\b.*\bdifferent\b", r"\bmerge\b.*\bremain\b"
    ]

    pattern = re.compile("|".join(contradiction_terms))
    return bool(pattern.search(text))
