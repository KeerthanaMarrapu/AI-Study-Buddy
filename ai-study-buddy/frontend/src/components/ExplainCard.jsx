import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000/api/openai/explain";

export default function ExplainCard() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleGenerate() {
    if (!topic.trim()) {
      setError("Please enter a topic to generate an explanation.");
      setExplanation("");
      return;
    }

    setIsLoading(true);
    setError(null);
    setExplanation("");

    try {
      const res = await axios.post(BACKEND_URL, { topic: topic.trim() });
      setExplanation(
        res.data.result || "No explanation content received from the server."
      );
    } catch (err) {
      console.error(err);
      setError("Failed to connect to backend or API failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}
    >
      <h2>Generate Explanation</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic"
      />
      <button onClick={handleGenerate} disabled={isLoading || !topic.trim()}>
        {isLoading ? "Generating..." : "Generate"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {explanation && <pre>{explanation}</pre>}
    </div>
  );
}
