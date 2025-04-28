import React, { useRef, useState } from "react";

const tracks = [
  {
    title: '宁静夜晚',
    audio: '/music/night.mp3',
    lrc: `[00:00.00] 宁静夜晚\n[00:10.00] 星光洒满天\n[00:20.00] 温柔的风轻轻吹过`,
  },
  {
    title: '晨曦微光',
    audio: '/music/morning.mp3',
    lrc: `[00:00.00] 晨曦微光\n[00:10.00] 新的一天开始\n[00:20.00] 阳光洒进梦乡`,
  },
];

// 简单LRC解析器
function parseLrc(lrc) {
  return lrc.split("\n").map((line) => {
    const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
    if (match) {
      const min = parseInt(match[1], 10);
      const sec = parseFloat(match[2]);
      return {
        time: min * 60 + sec,
        content: match[3],
      };
    }
    return null;
  }).filter(Boolean);
}

export default function MusicLyricsSimple() {
  const [selected, setSelected] = useState(0);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const lyrics = parseLrc(tracks[selected].lrc);

  function handleTimeUpdate(e) {
    setCurrentTime(e.target.currentTime);
  }
  function handlePlay() { setIsPlaying(true); }
  function handlePause() { setIsPlaying(false); }

  // 找到当前歌词行
  const currentIdx = lyrics.findIndex((line, idx) => {
    const nextTime = lyrics[idx + 1] ? lyrics[idx + 1].time : Infinity;
    return currentTime >= line.time && currentTime < nextTime;
  });

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-2">助眠音乐与歌曲</h3>
      <ul className="flex flex-col gap-2 mb-4">
        {tracks.map((track, idx) => (
          <li key={track.title}>
            <button
              className={`btn btn-outline w-full justify-between ${selected === idx ? 'btn-active' : ''}`}
              onClick={() => {
                setSelected(idx);
                setCurrentTime(0);
                setIsPlaying(false);
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  audioRef.current.pause();
                }
              }}
            >
              {track.title}
              <span className="text-xs text-gray-400">点击查看</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <audio
          ref={audioRef}
          src={tracks[selected].audio}
          controls
          className="w-full mb-2"
          onTimeUpdate={handleTimeUpdate}
          onPlay={handlePlay}
          onPause={handlePause}
        />
        <div className="bg-base-200 rounded p-4 h-40 overflow-y-auto lyrics-scroll text-center">
          {lyrics.map((line, idx) => (
            <div
              key={idx}
              className={
                "transition-all duration-200 text-base " +
                (idx === currentIdx
                  ? "text-primary font-bold text-lg"
                  : idx < currentIdx
                  ? "text-gray-400"
                  : "text-gray-600")
              }
              style={{ lineHeight: "2.2" }}
            >
              {line.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
