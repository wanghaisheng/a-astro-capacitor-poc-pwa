import React, { useRef, useState } from "react";
import MusicLyricsPlayer from './MusicLyricsPlayer.jsx';

const tracks = [
  {
    title: '宁静夜晚',
    audio: 'bg.mp3',
    lrc: `[00:00.00] 宁静夜晚\n[00:10.00] 星光洒满天\n[00:20.00] 温柔的风轻轻吹过`,
  },
  {
    title: '晨曦微光',
    audio: 'bg.mp3',
    lrc: `[00:00.00] 晨曦微光\n[00:10.00] 新的一天开始\n[00:20.00] 阳光洒进梦乡`,
  },
];

export default function MusicLyricsReact() {
  const [selected, setSelected] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  function handleSelect(idx) {
    setSelected(idx);
    setCurrentTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }

  function handlePlay() {
    setIsPlaying(true);
    audioRef.current && audioRef.current.play();
  }
  function handlePause() {
    setIsPlaying(false);
    audioRef.current && audioRef.current.pause();
  }

  function handleTimeUpdate(e) {
    setCurrentTime(e.target.currentTime);
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h3 className="text-lg font-semibold mb-2">助眠音乐与歌曲</h3>
      <ul className="flex flex-col gap-2 mb-4">
        {tracks.map((track, idx) => (
          <li key={track.title}>
            <button
              className={`btn btn-outline w-full justify-between ${selected === idx ? 'btn-active' : ''}`}
              onClick={() => handleSelect(idx)}
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
        <MusicLyricsPlayer lrc={tracks[selected].lrc} currentTime={currentTime} isPlaying={isPlaying} />
      </div>
    </div>
  );
}
