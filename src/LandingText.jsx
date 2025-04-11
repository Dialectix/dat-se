export const LandingText = (props) => {
  return (
    <div className="w-full h-full relative">
      {/* Centered landing content */}
      <div className="max-w-lg mx-auto h-full flex flex-col justify-center items-center text-center space-y-8 px-4">
        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">
            Dialectical Analysis Theory (DAT)
          </h1>

          <p className="text-gray-400 text-xs">
            Intellectual honesty | Epistemic clarity
          </p>

          <p className="text-sm font-normal italic text-gray-400">
            Where contradiction is structure, and clarity is a process.
          </p>
        </div>

        {/* BODY TEXT */}
        <p className="text-gray-500 text-xs">
          Developed by Dialectix, DAT offers a structured analytical engine
          that identifies, tests, and reformulates complex inputs through a four-step dialectical framework.
        </p>

        <p className="text-gray-500 text-xs">
          Rather than resolving ambiguity through simplification, DAT isolates contradictions
          and reformulates your question, yielding a logically coherent, cross-domain perspective.
        </p>

        {/* CTA BUTTON */}
        <button
          onClick={props.onEngage}
          className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition"
        >
          Engage DAT
        </button>
      </div>

      {/* Scrolling ticker - immediate start, wide spacing, infinite loop */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40px',
        backgroundColor: '#fffae6',
        borderTop: '1px solid #facc15',
        overflow: 'hidden',
        zIndex: 9999,
      }}>
        <div style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: 'tickerLoop 30s linear infinite',
          fontSize: '14px',
          fontStyle: 'italic',
          color: '#b45309',
        }}>
          <span style={{ paddingRight: '200px' }}>
            DAT challenges your thinking by guiding you to ask the right question.
          </span>
          <span style={{ paddingRight: '200px' }}>
            DAT challenges your thinking by guiding you to ask the right question.
          </span>
          <span>
            DAT challenges your thinking by guiding you to ask the right question.
          </span>
        </div>
      </div>
    </div>
  );
};
