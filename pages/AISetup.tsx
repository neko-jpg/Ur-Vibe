import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Sparkles } from 'lucide-react';

interface AISetupProps {
  setTopic: (topic: string) => void;
}

export const AISetup: React.FC<AISetupProps> = ({ setTopic }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleGenerate = () => {
    if (!input.trim()) return;
    setTopic(input.trim());
    // Direct to majority game for now as the default AI mode
    navigate('/game/majority');
  };

  const suggestions = ['Surviving on a Desert Island', 'Cheating', 'Social Media', 'Part-time Jobs'];

  return (
    <div className="flex flex-col flex-1 gap-6 justify-center">
      <div className="text-center">
        <div className="inline-block p-4 rounded-full bg-neon-purple/20 text-neon-purple mb-4">
          <Sparkles size={40} />
        </div>
        <h2 className="text-2xl font-bold">AI Generator</h2>
        <p className="text-gray-400 text-sm mt-2">
          キーワードを入力すると、<br/>
          あなた達だけのクイズが生成されます。
        </p>
      </div>

      <Card>
        <label className="block text-sm font-bold text-gray-300 mb-2">Topic / Keyword</label>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 恋愛, サークル, バイト..."
          className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neon-purple focus:shadow-[0_0_10px_rgba(188,19,254,0.5)] outline-none transition-all"
        />
        
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button 
              key={s}
              onClick={() => setInput(s)}
              className="text-xs bg-white/5 px-3 py-1 rounded-full hover:bg-white/10"
            >
              {s}
            </button>
          ))}
        </div>
      </Card>

      <Button onClick={handleGenerate} variant="primary" disabled={!input.trim()}>
        GENERATE QUIZ
      </Button>
      
      <Button onClick={() => navigate('/mode-select')} variant="ghost">
        CANCEL
      </Button>
    </div>
  );
};