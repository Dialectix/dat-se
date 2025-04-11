import { useState } from 'react';
import { LandingText } from "./LandingText";

function App() {
  const [stage, setStage] = useState('intro');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Password protection state
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // ✅ Early gate to prevent access
  if (!authenticated) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-950 text-white px-4">
        <h2 className="text-lg mb-4">Enter Access Password</h2>
        <input
          type="password"
          className="p-2 rounded text-black mb-4 w-64 text-center"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded"
          onClick={() => {
            if (password === "dialectix2024") {
              setAuthenticated(true);
            } else {
              alert("Incorrect password.");
            }
          }}
        >
          Unlock
        </button>
      </div>
    );
  }

  // ✅ Main landing page
  if (stage === 'intro') {
    return (
      <div className="h-screen bg-white flex flex-col relative">
        <div className="flex-grow flex justify-center items-center px-4">
          <LandingText onEngage={() => setStage('input')} />
        </div>
      </div>
    );
  }

  // ✅ DAT input + response page
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('Thinking...');

    try {
      const res = await fetch('https://dat-flask-app-f0f8ekh5gthzfefj.australiaeast-01.azurewebsites.net/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: query })
      });

      const data = await res.json();

      if (res.ok && data.response) {
        setResponse(`🧠 ${data.response}`);
      } else if (data.error) {
        setResponse(`⚠️ ${data.error}`);
      } else {
        setResponse('Unexpected response. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setResponse('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-900 p-6 rounded-xl shadow-md w-[500px]">
        <h1 className="text-xl font-bold text-center mb-2">
          Dialectical Analysis Theory (DAT)
        </h1>
        <p className="text-center text-sm text-gray-400 mb-1">
          Intellectual honesty | Epistemic clarity
        </p>
        <p className="text-center text-xs text-gray-500 mb-4">
          Developed by Dialectix Pty Ltd — submit your question below.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <textarea
            placeholder="Type your question here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[9rem] resize-none p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className={`py-2 rounded-md font-semibold transition text-white ${
              loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Submit Question'}
          </button>
        </form>

        {response && (
          <div className="mt-4 p-3 bg-gray-800 rounded-md text-gray-300 text-sm whitespace-pre-line">
            {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
