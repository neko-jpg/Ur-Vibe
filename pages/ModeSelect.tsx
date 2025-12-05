import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { GameMode } from '../types';
import { Users, Ghost, Sparkles } from 'lucide-react';

interface ModeSelectProps {
  setMode: (mode: GameMode) => void;
}

export const ModeSelect: React.FC<ModeSelectProps> = ({ setMode }) => {
  const navigate = useNavigate();

  const handleSelect = (mode: GameMode) => {
    setMode(mode);
    if (mode === GameMode.MAJORITY) navigate('/game/majority');
    if (mode === GameMode.ANONYMOUS) navigate('/game/anonymous');
    if (mode === GameMode.AI_CUSTOM) navigate('/game/ai-setup');
  };

  return (
    <div className="flex flex-col flex-1 justify-center gap-6">
      <h2 className="text-2xl font-bold text-center mb-4">Select Mode</h2>

      <button onClick={() => handleSelect(GameMode.MAJORITY)} className="group">
        <Card className="flex items-center gap-4 transition-all duration-300 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="bg-neon-cyan/20 p-4 rounded-full text-neon-cyan group-hover:scale-110 transition-transform">
            <Users size={32} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold">Majority Bet</h3>
            <p className="text-sm text-gray-400">多数派を予想してコインを増やせ</p>
          </div>
        </Card>
      </button>

      <button onClick={() => handleSelect(GameMode.ANONYMOUS)} className="group">
        <Card className="flex items-center gap-4 transition-all duration-300 hover:border-neon-pink hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]">
          <div className="bg-neon-pink/20 p-4 rounded-full text-neon-pink group-hover:scale-110 transition-transform">
            <Ghost size={32} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold">Anonymous</h3>
            <p className="text-sm text-gray-400">匿名回答、書いたのは誰だ？</p>
          </div>
        </Card>
      </button>

      <button onClick={() => handleSelect(GameMode.AI_CUSTOM)} className="group">
        <Card className="flex items-center gap-4 transition-all duration-300 hover:border-neon-purple hover:shadow-[0_0_15px_rgba(188,19,254,0.3)]">
          <div className="bg-neon-purple/20 p-4 rounded-full text-neon-purple group-hover:scale-110 transition-transform">
            <Sparkles size={32} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold">AI Generator</h3>
            <p className="text-sm text-gray-400">その場のノリで問題を生成</p>
          </div>
        </Card>
      </button>
    </div>
  );
};