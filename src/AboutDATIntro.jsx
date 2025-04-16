import React from 'react';

function AboutDAT({ onNext }) {
  return (
    <div className="h-screen bg-gray-950 text-white px-4 flex flex-col justify-center items-center">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          Dialectical Analysis Theory
          <span className="align-super text-[10px] ml-1 opacity-70">™</span> (DAT)
        </h1>

        <div className="text-base md:text-lg text-gray-300 space-y-5 leading-relaxed text-justify">
          <p><strong>DAT is a method for confronting contradiction — not erasing it.</strong> It guides any question, whether simple or layered, through four stages of structured reasoning. In doing so, it reveals assumptions, contextual shifts, and the deeper structure of meaning behind the surface.</p>

          <p>Language often claims certainty where there is none. Ideas can become rehearsed, rhetorical, or reduced by habit. Contradictions are ignored or absorbed into systems that prefer coherence over truth.</p>

          <p><strong>DAT doesn't bypass complexity — it clarifies simplicity.</strong> It applies equally to “1 + 1” and to philosophical paradoxes, always asking: <em>what does this really mean, and under what conditions?</em></p>

          <p>It disciplines language, slows assumption, and restores something rare in modern discourse: <strong>intellectual honesty</strong>.</p>

          <p>Large Language Models (LLMs) are generative and fast — but prone to drift, hallucination, and heuristic flattening. <strong>DAT retools the LLM as a dialectical reasoning partner.</strong> It prevents premature closure, holds space for ambiguity, and ensures every step is justified, structured, and traceable.</p>

          <p>DAT formalises what philosophers, analysts, and problem-solvers do instinctively — but makes it transparent and replicable. In theory, it could be done manually. In practice, the DAT engine enables it to happen in seconds — without sacrificing rigour.</p>

          <p>DAT is for anyone ready to think beyond surface answers. Anyone who values clarity over convenience. Anyone willing to engage contradiction — not as failure, but as the start of understanding.</p>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={onNext}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded text-lg"
          >
            Next
          </button>
          <button
            onClick={onNext}
            className="text-sm text-gray-400 hover:text-white underline pt-2"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutDAT;
