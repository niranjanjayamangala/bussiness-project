import { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleInput = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleVoiceSearch = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  // Update search when transcript changes
  if (transcript && transcript !== query) {
    setQuery(transcript);
    onSearch(transcript);
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Search..."
        className="input input-bordered h-8 text-sm"
      />
      <button
        className={`btn btn-secondary ${listening ? "animate-pulse" : ""}`}
        onClick={handleVoiceSearch}
        type="button"
        aria-label="Voice Search"
      >
        🎤
      </button>
    </div>
  );
} 