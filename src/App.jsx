function App() {
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
        <form className="flex flex-col gap-4">
          <textarea
            placeholder="Type your question here..."
            className="min-h-[9rem] resize-none p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
          <button
            type="submit"
            className="py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;