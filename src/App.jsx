import { useState, useEffect, useRef } from 'react';
import { LandingText } from "./LandingText";
import Logo from './components/Logo';

function cleanSummary(text, label) {
  if (!text || typeof text !== 'string') return text;
  const prefix = label.toLowerCase();
  const lower = text.toLowerCase();
  return lower.startsWith(prefix)
    ? text.slice(label.length).trimStart()
    : text;
}

function App() {
  const [stage, setStage] = useState('about');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(900);
  const timeoutRef = useRef(null);
  const DAT_ENGINE_VERSION = "DAT Engine v3.6";
  const UI_BUILD_VERSION = "UI Build v1.2 (20250415)";
  const TM = <span className="align-super text-[10px] ml-0.5 opacity-70">™</span>;
  const DAT_VERSION = `${DAT_ENGINE_VERSION} | ${UI_BUILD_VERSION}`;
  const UPDATE_NOTICE = "⚠️ Updates may occur without notice.";

  const resetTimer = () => setSecondsLeft(900);

  useEffect(() => {
    if (authenticated) {
      sessionStorage.setItem('stage', stage);
    }
  }, [stage, authenticated]);

  useEffect(() => {
    if (authenticated) {
      const activityEvents = ['mousemove', 'keydown', 'click'];
      const handleActivity = () => resetTimer();
      activityEvents.forEach(event => window.addEventListener(event, handleActivity));

      timeoutRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(timeoutRef.current);
            alert("Session expired. Please log in again.");
            window.location.reload();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        activityEvents.forEach(event => window.removeEventListener(event, handleActivity));
        clearInterval(timeoutRef.current);
      };
    }
  }, [authenticated]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (!authenticated) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-950 text-white px-4">
        <Logo spacing="about" />
        <div className="flex flex-col items-center text-white mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-center tracking-wide">
            Dialectical Analysis Theory{TM} (DAT)
          </h1>
          <p className="text-sm md:text-base text-center text-gray-300 mt-2 max-w-xs">
            Designed to challenge your thinking by guiding you to ask the right questions.
          </p>
        </div>
        <h2 className="text-lg mb-2 font-semibold">Enter Access Password</h2>
        <div className="w-full max-w-xs space-y-2">
          <input
            type="password"
            className="p-2 w-full rounded text-black text-center border border-gray-400 shadow"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-semibold shadow transition"
            onClick={() => {
              if (password === "dialectix2025") {
                sessionStorage.clear();
                setResponse(null);
                setAuthenticated(true);
                setTimeout(() => setStage("about"), 0);
              } else {
                alert("Incorrect password.");
              }
            }}
          >
            Unlock
          </button>
        </div>
        
      </div>
    );
  }
  
  if (stage === 'about') {
    return (
      <div className="min-h-screen bg-gray-950 text-white px-6 py-12 overflow-y-auto">
        <div className="fixed top-2 left-4 text-xs text-yellow-400 z-50 bg-gray-900 px-3 py-1 rounded shadow">
          {UPDATE_NOTICE}
        </div>
        <div className="fixed top-2 right-4 text-xs text-gray-400 z-50">
          {DAT_VERSION}
        </div>
        <div className="mt-20 mb-4">
          <Logo className="w-32 h-auto mx-auto mb-8" />
        </div>
        <div className="max-w-3xl mx-auto space-y-5 text-left text-gray-300 leading-snug text-base md:text-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-400 drop-shadow-sm">
            Dialectical Analysis Theory{TM} (DAT)
          </h1>
          <div className="bg-gray-800 border border-indigo-400 p-6 rounded-xl shadow-md text-gray-100 italic text-center">
            DAT is not fast. It is precise. It is not generative. It is analytical.
            <br />It is for anyone willing to confront contradiction — not as failure, but as the beginning of understanding.
          </div>
          <p>Dialectical Analysis Theory{TM} is not an instrument for generating answers — it is a structure for exposing them...</p>
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setStage('intro')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded text-lg font-semibold shadow-md"
            >
              Begin Dialectical Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'intro') {
    return (
      <div className="h-screen bg-gray-950 text-white flex flex-col relative">
        <div className="fixed top-2 left-4 text-xs text-yellow-400 z-50 bg-gray-900 px-3 py-1 rounded shadow">
          {UPDATE_NOTICE}
        </div>
        <div className="fixed top-2 right-4 text-xs text-gray-400 z-50">
          {DAT_VERSION}
        </div>
        <div className="flex-grow flex justify-center items-center px-4">
          <div className="max-w-3xl text-gray-300 text-base md:text-lg leading-relaxed text-center">
            <div className="mt-12 mb-6">
              <Logo className="w-32 h-auto mx-auto mb-6" />
            </div>
            <LandingText onEngage={() => setStage('input')} />
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'input') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white relative">
        <div className="fixed top-2 left-4 text-xs text-yellow-400 z-50 bg-gray-900 px-3 py-1 rounded shadow">
          {UPDATE_NOTICE}
        </div>
        <div className="fixed top-2 right-4 text-xs text-gray-400 z-50">
          {DAT_VERSION}
        </div>
        <div className="bg-gray-900 p-6 rounded-xl shadow-md w-[600px]">
          <div className="flex flex-col items-center mt-16 mb-6">
            <Logo className="w-32 h-auto" />
          </div>
          <h1 className="text-xl font-bold text-center mb-2">Dialectical Analysis Theory{TM} (DAT)</h1>
          <p className="text-center text-sm text-gray-400 mb-1">Intellectual honesty | Epistemic clarity</p>
          <p className="text-center text-xs text-gray-500 mb-4">Submit a question below.</p>
          <form className="flex flex-col gap-4" onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setResponse(null);
            try {
              const res = await fetch('https://dialectix-backend-clean.azurewebsites.net/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: query })
              });
              const data = await res.json();
              if (res.ok && data.response) {
                const cleanResponse = Object.fromEntries(
                  Object.entries(data.response).map(([key, value]) => [
                    key,
                    typeof value === 'string'
                      ? value.replace(/\*\*/g, '').replace(/\*/g, '\n\n')
                      : value
                  ])
                );
                setResponse({
                  ...cleanResponse,
                  domains: data.domains || []
                });
              } else {
                setResponse({ error: data.error || "Unexpected response format from analysis engine." });
              }
            } catch (err) {
              console.error(err);
              setResponse({ error: "Server error. Please try again later." });
            } finally {
              setLoading(false);
            }
          }}>
            <textarea
              placeholder="Type your question here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[9rem] resize-none p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className={`py-2 rounded-md font-semibold transition text-white ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Submit Question'}
            </button>
          </form>

          {response?.domains?.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-400">Dialectical domain(s) detected:</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {response.domains.map((domain, idx) => (
                  <span key={idx} className="bg-indigo-700 text-white text-xs px-2 py-1 rounded-full">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          )}

          {response?.error ? (
            <div className="text-red-400 font-semibold">⚠️ {response.error}</div>
          ) : (
            response && (
              <>
                <h3 className="font-bold text-indigo-400 mb-1">Step 0 - Input Reflection</h3>
                <p>{cleanSummary(response.step0_reflection, 'Step 0 - Input Reflection')}</p>

                <h3 className="font-bold text-indigo-400 mb-1">Step 1 - Ontological and Epistemic Disambiguation</h3>
                <p>{cleanSummary(response.step1_summary, 'Ontological and Epistemic Disambiguation')}</p>

                <h3 className="font-bold text-indigo-400 mb-1">Step 2 - Dialectical Tension</h3>
                <p><strong>Thesis:</strong> {response.step2_summary?.split("Antithesis:")[0]?.replace("Thesis:", "").replace("Dialectical Tension (Thesis, Antithesis, Synthesis)", "").trim()}</p>
                <p><strong>Antithesis:</strong> {response.step2_summary?.split("Antithesis:")[1]?.split("Synthesis:")[0]?.trim()}</p>
                <p><strong>Synthesis:</strong> {response.step2_summary?.split("Synthesis:")[1]?.trim()}</p>

                <h3 className="font-bold text-indigo-400 mb-1">Step 3 - Contextual Evaluation</h3>
                <p>{cleanSummary(response.step3_summary, 'Contextual Evaluation')}</p>

                <h3 className="font-bold text-indigo-400 mb-1">Step 4 - Theoretical Resolution</h3>
                <p>{cleanSummary(response.step4_summary, 'Structured Resolution')}</p>

                <h3 className="font-bold text-green-400 mb-1">Reformulated Question</h3>
                <p>{response.final_output}</p>

                {response.example_output && (
                  <div>
                    <h4 className="font-semibold text-gray-300 mb-1">Illustrative Example</h4>
                    <p>{response.example_output}</p>
                  </div>
                )}
              </>
            )
          )}
        </div>
        <div className="fixed bottom-6 left-6 bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-xs shadow-lg">
          Session expires in: <span className="text-white font-semibold">{formatTime(secondsLeft)}</span>
        </div>
        <a
          href="mailto:DAT@dialectix.com.au?subject=DAT App Feedback"
          className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm px-4 py-2 rounded-full shadow-lg transition"
          title="Send feedback about your experience"
        >
          Feedback
        </a>
      </div>
    );
  }

  return null;
}

export default App;