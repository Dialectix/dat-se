import LayoutWrapper from "./LayoutWrapper";
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

function renderDialectical(text) {
  if (!text) return null;
  const thesis = text.split("Antithesis:")[0]?.replace("Thesis:", "").replace("Dialectical Tension (Thesis, Antithesis, Synthesis)", "").trim();
  const antithesis = text.split("Antithesis:")[1]?.split("Synthesis:")[0]?.trim();
  const synthesis = text.split("Synthesis:")[1]?.trim();

  return (
    <div>
      <p><strong>Thesis:</strong> {thesis}</p>
      <p><strong>Antithesis:</strong> {antithesis}</p>
      <p><strong>Synthesis:</strong> {synthesis}</p>
    </div>
  );
}

function Section({ title, text, highlight, subtle }) {
  return (
    <div>
      <h3 className={`font-bold mb-1 ${highlight ? 'text-green-400' : 'text-indigo-400'}`}>{title}</h3>
      <p className={`${subtle ? 'text-sm text-gray-400' : ''}`}>{text}</p>
    </div>
  );
}

function App() {
  const [stage, setStage] = useState('about');
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(900);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);
  const TM = <span className="align-super text-[10px] ml-0.5 opacity-70">™</span>;


  const DAT_ENGINE_VERSION = "DAT Engine v3.6";
  const UI_BUILD_VERSION = "UI Build v1.3 (20250416)";
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
      const handleActivity = () => resetTimer();
      ['mousemove', 'keydown', 'click'].forEach(e => window.addEventListener(e, handleActivity));
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
        ['mousemove', 'keydown', 'click'].forEach(e => window.removeEventListener(e, handleActivity));
        clearInterval(timeoutRef.current);
      };
    }
  }, [authenticated]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-950 text-white px-4">
        <Logo className="w-36 md:w-44 h-auto mb-8" />
  
        <div className="bg-gray-900 px-8 py-10 rounded-2xl shadow-2xl flex flex-col items-center gap-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
            Dialectical Analysis Theory<span className="align-super text-[10px] ml-0.5 opacity-70">™</span> (DAT)
          </h1>
  
          <p className="text-sm md:text-base text-center text-gray-400 leading-snug max-w-xs">
            Designed to challenge your thinking by guiding you to ask the right questions.
          </p>
  
          <div className="text-center">
            <h2 className="text-md font-semibold text-gray-200 mb-2">Enter Access Password</h2>
            <div className="relative">
              <input
                type="password"
                className="w-[300px] px-4 py-3 pr-10 rounded-lg bg-white text-gray-800 text-sm border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔑
              </div>
            </div>
          </div>
  
          <button
            className="w-[300px] bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-lg text-base font-semibold transition duration-300 shadow-md"
            onClick={() => {
              if (password === "dialectix66") {
                sessionStorage.clear();
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
        <>
          <div className="fixed top-2 left-4 text-xs text-yellow-400 z-50 bg-gray-900 px-3 py-1 rounded shadow">
            {UPDATE_NOTICE}
          </div>
          <div className="fixed top-2 right-4 text-xs text-gray-400 z-50">
            {DAT_VERSION}
          </div>
          <div className="min-h-screen bg-gray-950 text-white px-6 py-12 overflow-y-auto">
            <div className="mt-20 mb-4">
              <Logo />
            </div>
            <div className="max-w-3xl mx-auto space-y-5 text-left text-gray-300 leading-snug text-base md:text-lg">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-400 drop-shadow-sm">
                Dialectical Analysis Theory{TM} (DAT)
              </h1>
              <div className="bg-gray-800 border border-indigo-400 p-6 rounded-xl shadow-md text-gray-100 italic text-center">
                DAT is not fast. It is precise. It is not generative. It is analytical.  
                <br />It is for anyone willing to confront contradiction — not as failure, but as the beginning of understanding.
              </div>
              <p>Dialectical Analysis Theory{TM} is not an instrument for generating answers — it is a structure for exposing them. It interrogates contradictions, not by erasing them, but renders them explicit, testable, and epistemically justified.</p>
              <p>DAT processes any question — from basic arithmetic to philosophical paradox — through four enforced stages: contradiction validation, synthesis testing, structural transformation, and theoretical resolution. At each step, DAT demands precision: ontological clarity, epistemic categorisation, and full structural containment.</p>
              <p>Where other systems summarise or infer, DAT refuses to compress. No step is skipped. No assumption goes unexamined. No contradiction is allowed to resolve prematurely.</p>
              <p>Language often masks contradiction. DAT disciplines the argument, slows down thought, dissects claims, and evaluates the line of enquiry across domains — mathematical, empirical, symbolic, phenomenological.</p>
              <p>In an age of cognitive clutter and heuristic shortcuts, DAT is not a generative agent — it is a reasoning engine. It retools LLMs to think dialectically, ensuring outputs are traceable, structured, and defensible.</p>
              <p>Whether the question is about causality, consciousness, ethics, or the limits of logic itself, DAT does not aim to decide what is true. It determines whether an argument holds — and under what conditions it must change.</p>
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
        </>
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
      <LayoutWrapper>
        <div className="min-h-screen bg-gray-950 text-white py-12 relative">
          <div className="fixed top-2 left-4 text-xs text-yellow-400 z-50 bg-gray-900 px-3 py-1 rounded shadow">
            {UPDATE_NOTICE}
          </div>
          <div className="fixed top-2 right-4 text-xs text-gray-400 z-50">
            {DAT_VERSION}
          </div>
  
          <div className="bg-gray-900 p-6 rounded-xl shadow-md">
            <div className="flex flex-col items-center mb-6">
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
                  setResponse({ ...cleanResponse, domains: data.domains || [] });
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
              <div className="mt-3">
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
              <div className="text-red-400 font-semibold mt-4">⚠️ {response.error}</div>
            ) : (
              response && (
                <div className="mt-6 space-y-4">
                  <Section title="Step 0 - Input Reflection" text={cleanSummary(response.step0_reflection, 'Step 0 - Input Reflection')} />
                  <Section title="Step 1 - Ontological and Epistemic Disambiguation" text={cleanSummary(response.step1_summary, 'Ontological and Epistemic Disambiguation')} />
                  <Section title="Step 2 - Dialectical Tension" text={renderDialectical(response.step2_summary)} />
                  <Section title="Step 3 - Contextual Evaluation" text={cleanSummary(response.step3_summary, 'Contextual Evaluation')} />
                  <Section title="Step 4 - Theoretical Resolution" text={cleanSummary(response.step4_summary, 'Structured Resolution')} />
                  <Section title="Reformulated Question" text={response.final_output} highlight />
                  {response.example_output && (
                    <Section title="Illustrative Example" text={response.example_output} subtle />
                  )}
                </div>
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
      </LayoutWrapper>
    );
  }
  

  return null;
}

export default App;
