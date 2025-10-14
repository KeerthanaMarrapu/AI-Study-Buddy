import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000/api/openai/summarize";

export default function SummarizeCard() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGenerate() {
    if (!text.trim()) {
      setError("Please enter text to summarize.");
      setSummary("");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary("");

    try {
      const res = await axios.post(BACKEND_URL, { text: text.trim() });
      setSummary(res.data.result || "No summary returned from server.");
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to generate summary. Backend might be down.");
      setSummary("");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl max-w-2xl mx-auto my-8 border border-gray-100">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-2">
        Summarize Text
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Enter text to summarize..."
          className="flex-grow p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
          disabled={isLoading}
        />
        <button
          onClick={handleGenerate}
          disabled={isLoading || !text.trim()}
          className={`px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-md transform active:scale-95 ${
            isLoading || !text.trim()
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg"
          }`}
        >
          {isLoading ? "Generating..." : "Generate Summary"}
        </button>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {summary && (
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-inner max-h-96 overflow-y-auto whitespace-pre-wrap">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Result:</h3>
          <pre className="text-gray-700 font-sans leading-relaxed text-left">
            {summary}
          </pre>
        </div>
      )}
    </div>
  );
}
