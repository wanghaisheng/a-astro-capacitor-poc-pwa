import React from "react";

/**
 * Simple lyrics display component that highlights the current line based on currentTime.
 * Props:
 *   lrc: string (LRC formatted lyrics)
 *   currentTime: number (current playback time in seconds)
 *   isPlaying: boolean
 */
export default function MusicLyricsPlayer({ lrc, currentTime = 0, isPlaying = false }) {
  // Parse LRC into array of { time, text }
  const lines = lrc
    ? lrc.split("\n").map((line) => {
        const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\]\s*(.*)/);
        if (!match) return null;
        const min = parseInt(match[1], 10);
        const sec = parseFloat(match[2]);
        return { time: min * 60 + sec, text: match[3] };
      }).filter(Boolean)
    : [];

  // Find the current line index
  let currentIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (currentTime >= lines[i].time) {
      currentIdx = i;
    } else {
      break;
    }
  }

  return (
    <div className="lyrics-container" style={{ minHeight: 120 }}>
      {lines.length === 0 ? (
        <div className="text-gray-400">No lyrics available</div>
      ) : (
        <ul className="lyrics-list">
          {lines.map((line, idx) => (
            <li
              key={idx}
              className={
                "lyrics-line" +
                (idx === currentIdx ? " text-blue-600 font-bold" : " text-gray-700")
              }
              style={{ transition: "color 0.2s" }}
            >
              {line.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}