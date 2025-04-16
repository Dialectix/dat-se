from secure_dat_engine import run_dat_pipeline

# Sample input to test the full DAT pipeline
sample_input = "Is human behavior primarily determined by biology or environment?"

# Run the engine
result = run_dat_pipeline(sample_input)

# Pretty print the result
from pprint import pprint
pprint(result)
