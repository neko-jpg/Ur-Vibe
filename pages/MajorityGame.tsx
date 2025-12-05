import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player, Question } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { generateMajorityQuestion } from '../services/geminiService';
import { Loader2, AlertCircle } from 'lucide-react';

interface MajorityGameProps {
  players: Player[];
  topic?: string; // If provided via AI setup
}

type Phase = 'LOADING' | 'QUESTION' | 'VOTING' | 'BETTING' | 'RESULT';

export const MajorityGame: React.FC<MajorityGameProps> = ({ players, topic }) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('LOADING');
  const [question, setQuestion] = useState<Question | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  
  // Votes: PlayerID -> 'A' | 'B'
  const [votes, setVotes] = useState<Record<string, 'A' | 'B'>>({});
  
  // Bets: PlayerID -> 'A' | 'B' (Guessing which will be majority)
  const [bets, setBets] = useState<Record<string, 'A' | 'B'>>({});

  const currentPlayer = players[currentPlayerIndex];

  useEffect(() => {
    const loadQ = async () => {
      // Default topics if none provided
      const defaultTopics = ['Love', 'Money', 'Friendship', 'SNS', 'University Life'];
      const t = topic || defaultTopics[Math.floor(Math.random() * defaultTopics.length)];
      
      const qData = await generateMajorityQuestion(t);
      setQuestion({
        id: crypto.randomUUID(),
        type: 'BINARY',
        ...qData
      });
      setPhase('QUESTION');
    };
    loadQ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVote = (choice: 'A' | 'B') => {
    setVotes(prev => ({ ...prev, [currentPlayer.id]: choice }));
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
    } else {
      // All voted, move to betting
      setCurrentPlayerIndex(0);
      setPhase('BETTING');
    }
  };

  const handleBet = (choice: 'A' | 'B') => {
    setBets(prev => ({ ...prev, [currentPlayer.id]: choice }));
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
    } else {
      setPhase('RESULT');
    }
  };

  const calculateResults = () => {
    const countA = Object.values(votes).filter(v => v === 'A').length;
    const countB = Object.values(votes).filter(v => v === 'B').length;
    const majority = countA > countB ? 'A' : countB > countA ? 'B' : 'DRAW';

    return { countA, countB, majority };
  };

  if (phase === 'LOADING') {
    return (
      <div className="flex flex-col flex-1 justify-center items-center gap-4">
        <Loader2 className="animate-spin text-neon-pink" size={48} />
        <p className="text-neon-cyan animate-pulse">Generating Question...</p>
      </div>
    );
  }

  if (phase === 'QUESTION') {
    return (
      <div className="flex flex-col flex-1 justify-center gap-6 animate-fade-in">
        <div className="text-center">
          <span className="bg-neon-pink/20 text-neon-pink px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 inline-block">
            ULTIMATE CHOICE
          </span>
          <h2 className="text-2xl font-bold leading-relaxed">{question?.text}</h2>
        </div>

        <div className="space-y-4">
          <Card className="border-neon-cyan/30">
            <p className="text-neon-cyan font-bold text-xl mb-2">A.</p>
            <p>{question?.optionA}</p>
          </Card>
          <div className="text-center text-gray-500 font-bold">OR</div>
          <Card className="border-neon-pink/30">
            <p className="text-neon-pink font-bold text-xl mb-2">B.</p>
            <p>{question?.optionB}</p>
          </Card>
        </div>

        <Button onClick={() => setPhase('VOTING')} className="mt-4">
          START VOTING
        </Button>
      </div>
    );
  }

  // Shared Logic for Voting/Betting screens to hide inputs between players
  const TurnOverlay = ({ action, onReady }: { action: string, onReady: () => void }) => (
    <div className="flex flex-col flex-1 justify-center items-center gap-6 animate-fade-in">
      <div className="text-6xl">{currentPlayer.avatar}</div>
      <h2 className="text-2xl font-bold">{currentPlayer.name}'s Turn</h2>
      <p className="text-gray-400">{action}</p>
      <Button onClick={onReady} variant="secondary">I'm Ready</Button>
      <p className="text-xs text-red-400 mt-4"><AlertCircle size={12} className="inline mr-1"/>Don't show your screen to others!</p>
    </div>
  );

  if (phase === 'VOTING') {
    return (
      <div className="flex flex-col flex-1 gap-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">{currentPlayer.avatar}</div>
          <div>
            <p className="text-xs text-gray-400">Player</p>
            <p className="font-bold">{currentPlayer.name}</p>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-4">{question?.text}</h3>

        <button 
          onClick={() => handleVote('A')}
          className="bg-neon-dark border border-neon-cyan p-6 rounded-xl text-left hover:bg-neon-cyan/20 transition-all active:scale-95"
        >
          <span className="text-neon-cyan font-bold block text-2xl mb-2">A</span>
          {question?.optionA}
        </button>

        <button 
          onClick={() => handleVote('B')}
          className="bg-neon-dark border border-neon-pink p-6 rounded-xl text-left hover:bg-neon-pink/20 transition-all active:scale-95"
        >
          <span className="text-neon-pink font-bold block text-2xl mb-2">B</span>
          {question?.optionB}
        </button>
      </div>
    );
  }

  if (phase === 'BETTING') {
    return (
      <div className="flex flex-col flex-1 gap-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">{currentPlayer.avatar}</div>
          <div>
            <p className="text-xs text-gray-400">Betting Phase</p>
            <p className="font-bold text-xl">どっちが多数派？</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 flex-1 items-center">
           <button 
            onClick={() => handleBet('A')}
            className="h-40 bg-neon-cyan/10 border-2 border-neon-cyan rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-neon-cyan/30 transition-all"
          >
            <span className="text-4xl font-black text-neon-cyan">A</span>
            <span className="text-xs text-cyan-200">Majority is A</span>
          </button>

          <button 
            onClick={() => handleBet('B')}
            className="h-40 bg-neon-pink/10 border-2 border-neon-pink rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-neon-pink/30 transition-all"
          >
            <span className="text-4xl font-black text-neon-pink">B</span>
            <span className="text-xs text-pink-200">Majority is B</span>
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'RESULT') {
    const { countA, countB, majority } = calculateResults();
    
    return (
      <div className="flex flex-col flex-1 gap-6 animate-fade-in">
        <h2 className="text-3xl font-black text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink">
          RESULTS
        </h2>

        <div className="flex gap-4 mb-6">
          <div className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-1000 ${majority === 'A' ? 'bg-neon-cyan text-black border-neon-cyan scale-105 shadow-[0_0_20px_#00ffff]' : 'border-gray-700 opacity-50'}`}>
            <span className="text-4xl font-black">{countA}</span>
            <span className="font-bold">A</span>
          </div>
          <div className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-1000 ${majority === 'B' ? 'bg-neon-pink text-white border-neon-pink scale-105 shadow-[0_0_20px_#ff00ff]' : 'border-gray-700 opacity-50'}`}>
            <span className="text-4xl font-black">{countB}</span>
            <span className="font-bold">B</span>
          </div>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto">
          {players.map(p => {
            const vote = votes[p.id];
            const bet = bets[p.id];
            const wonBet = (majority === 'DRAW') ? false : (bet === majority);
            
            return (
              <div key={p.id} className="bg-white/5 p-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{p.avatar}</span>
                  <span className="font-bold">{p.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-gray-400">Vote: <span className={vote === 'A' ? 'text-neon-cyan' : 'text-neon-pink'}>{vote}</span></div>
                  <div className={`font-bold ${wonBet ? 'text-yellow-400' : 'text-gray-600'}`}>
                    {wonBet ? '+500 WIN' : 'LOSE'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Button onClick={() => navigate('/mode-select')} variant="secondary">
          BACK TO MENU
        </Button>
      </div>
    );
  }

  return null;
};