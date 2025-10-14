import React, { useState } from "react";
import axios from "axios";
import ExplainCard from "./components/ExplainCard";
import QuizCard from "./components/QuizCard";
import SummarizeCard from "./components/SummarizeCard";

export default function App({backendurl}) {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError("");
    setReply("");

    try {
      const res = await axios.post(`${backendurl}/chat`, {
        message,
      });
      setReply(res.data.reply);
    } catch (error) {
      console.error("Error sending message:", error);
      setReply("Error: Could not get a reply from the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          {" "}
          AI Study Buddy{" "}
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about your topic..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg transition"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}{" "}
        {reply && (
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg text-gray-800 mb-6">
            <strong>AI Reply:</strong> {reply}
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-1">
          <ExplainCard />
          <QuizCard />
          <SummarizeCard />
        </div>
      </div>
    </div>
  );
}
