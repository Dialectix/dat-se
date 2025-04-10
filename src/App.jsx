import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('Thinking...');

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Return a mock response from the DAT engine
      setResponse(
        `🧠 DAT™ Response:\n\nThank you for your question.\n\n"${query}" has been processed using Dialectical Analysis Theory.\n\nPlease integrate epistemic clarity in future iterations.`
      );
    } catch (err) {
      console.error(err);
      setResponse('Something went wrong. Please try again.');
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
