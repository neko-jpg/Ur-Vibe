import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Player } from '../types';
import { Plus, X } from 'lucide-react';

interface LobbyProps {
  setPlayers: (players: Player[]) => void;
}

const AVATARS = ['👽', '👻', '👾', '🤖', '🐯', '🦄', '💀', '🤡'];

export const Lobby: React.FC<LobbyProps> = ({ setPlayers }) => {
  const navigate = useNavigate();
  const [tempName, setTempName] = useState('');
  const [localPlayers, setLocalPlayers] = useState<Player[]>([]);

  const addPlayer = () => {
    if (!tempName.trim()) return;
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name: tempName.trim(),
      score: 1000, // Starting coins
      avatar: AVATARS[localPlayers.length % AVATARS.length]
    };
    setLocalPlayers([...localPlayers, newPlayer]);
    setTempName('');
  };

  const removePlayer = (id: string) => {
    setLocalPlayers(localPlayers.filter(p => p.id !== id));
  };

  const handleStart = () => {
    if (localPlayers.length < 2) return;
    setPlayers(localPlayers);
    navigate('/mode-select');
  };

  return (
    <div className="flex flex-col flex-1 gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Who's Playing?</h2>
        <p className="text-gray-400 text-sm">最低2人のプレイヤーが必要です</p>
      </div>

      <Card className="flex-1 flex flex-col gap-4 min-h-[300px]">
        <div className="flex gap-2">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
            placeholder="Nickname..."
            className="flex-1 bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-pink transition-colors"
          />
          <button 
            onClick={addPlayer}
            className="bg-neon-surface border border-neon-cyan/50 text-neon-cyan p-3 rounded-lg hover:bg-neon-cyan/20"
          >
            <Plus size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {localPlayers.map((player) => (
            <div key={player.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5 animate-fade-in">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{player.avatar}</span>
                <span className="font-bold">{player.name}</span>
              </div>
              <button onClick={() => removePlayer(player.id)} className="text-gray-500 hover:text-red-500">
                <X size={20} />
              </button>
            </div>
          ))}
          {localPlayers.length === 0 && (
            <div className="text-center text-gray-600 mt-10">
              プレイヤーを追加してください
            </div>
          )}
        </div>
      </Card>

      <Button 
        onClick={handleStart} 
        disabled={localPlayers.length < 2}
        fullWidth
        className="mt-auto"
      >
        NEXT STEP
      </Button>
    </div>
  );
};