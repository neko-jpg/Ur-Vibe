import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Users, Ghost, Sparkles } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 justify-center gap-8">
      <div className="text-center space-y-4 animate-fade-in-up">
        <h1 className="text-5xl font-display font-black leading-tight">
          <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">KNOW</span><br/>
          <span className="text-neon-cyan drop-shadow-[0_0_10px_#00ffff]">YOUR</span><br/>
          <span className="text-neon-pink drop-shadow-[0_0_10px_#ff00ff]">FRIENDS</span>
        </h1>
        <p className="text-gray-400 font-medium">
          友達の「意外な一面」をベットする<br/>
          匿名価値観バトル
        </p>
      </div>

      <div className="space-y-4">
        <Button onClick={() => navigate('/lobby')} fullWidth className="h-16 text-lg">
          START GAME
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center gap-2 text-center">
          <Users className="text-neon-cyan" size={24} />
          <span className="text-xs text-gray-300">多数派予想</span>
        </div>
        <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center gap-2 text-center">
          <Ghost className="text-neon-pink" size={24} />
          <span className="text-xs text-gray-300">匿名暴露</span>
        </div>
      </div>
    </div>
  );
};