import re

# Domain-tagged keyword sets
CONTRADICTION_DOMAINS = {
    "epistemic": [
        "knowledge", "belief", "truth", "truth-value", "proof", "justification",
        "inductive", "deductive", "abductive", "a priori", "a posteriori",
        "top-down", "bottom-up", "consequential", "conceptual",
        "uncertainty", "incomplete knowledge", "limit of knowledge", "ignorance"
    ],
    "phenomenological": [
        "experience", "consciousness", "awareness", "perception",
        "qualia", "sensation", "subjectivity"
    ],
    "ontological": [
        "being", "existence", "reality", "identity", "object",
        "essence", "presence", "entity",
        "unknown", "unknowable", "incomplete knowledge", "limit of reality"
    ],
    "symbolic": [
        "language", "sign", "representation", "symbol", "paradox",
        "logic", "meaning", "notation", "syntax", "semantics"
    ]
}

def classify_contradictions(text: str) -> list:
    """
    Returns a sorted list of detected contradiction domains present in the input text.
    Domains: epistemic, phenomenological, ontological, symbolic
    """
    flags = set()
    lowered = text.lower()

    for domain, keywords in CONTRADICTION_DOMAINS.items():
        for keyword in keywords:
            pattern = r'\b' + re.escape(keyword.lower()) + r'\b'
            if re.search(pattern, lowered):
                flags.add(domain)
                break  # Stop checking once one match is found per domain

    return sorted(flags)

def contradiction_advisory_note(domains: list) -> str:
    """
    Returns a formatted prompt advisory if contradiction domains are detected.
    """
    if not domains:
        return ""
    joined = ", ".join(domains)
    return (
        f"NOTE: This argument may contain contradiction(s) across the following domain(s): {joined}. "
        f"Each must be addressed dialectically and handled without premature synthesis.\n\n"
    )
