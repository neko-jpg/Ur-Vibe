import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { generateAnonymousQuestion } from '../services/geminiService';
import { Loader2, EyeOff, Check } from 'lucide-react';

interface AnonymousGameProps {
  players: Player[];
}

export const AnonymousGame: React.FC<AnonymousGameProps> = ({ players }) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'LOADING' | 'INPUT' | 'REVEAL'>('LOADING');
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({}); // PlayerID -> Answer
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [input, setInput] = useState('');
  
  // For Reveal Phase
  const [revealedIdx, setRevealedIdx] = useState(0);
  const [showAuthor, setShowAuthor] = useState(false);

  const currentPlayer = players[currentPlayerIdx];

  useEffect(() => {
    const loadQ = async () => {
      const q = await generateAnonymousQuestion("Secret / Dark Side");
      setQuestion(q.text);
      setPhase('INPUT');
    };
    loadQ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    if (!input.trim()) return;
    setAnswers(prev => ({ ...prev, [currentPlayer.id]: input }));
    setInput('');
    
    if (currentPlayerIdx < players.length - 1) {
      setCurrentPlayerIdx(prev => prev + 1);
    } else {
      setPhase('REVEAL');
    }
  };

  if (phase === 'LOADING') return <div className="flex flex-1 items-center justify-center"><Loader2 className="animate-spin text-neon-pink" size={40}/></div>;

  if (phase === 'INPUT') {
    return (
      <div className="flex flex-col flex-1 gap-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{currentPlayer.avatar}</span>
          <div className="flex-1">
            <p className="text-xs text-neon-pink font-bold">ANONYMOUS TURN</p>
            <p className="font-bold">{currentPlayer.name}</p>
          </div>
        </div>

        <div className="py-4">
          <h2 className="text-xl font-bold leading-relaxed">{question}</h2>
        </div>

        <div className="flex-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your honest answer..."
            className="w-full h-40 bg-black/30 border border-white/20 rounded-xl p-4 text-white focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,0,255,0.3)] outline-none resize-none"
          />
          <p className="text-xs text-gray-500 mt-2 text-center">
            <EyeOff size={12} className="inline mr-1"/>
             Answer honestly. It will be shown anonymously later.
          </p>
        </div>

        <Button onClick={handleSubmit} disabled={!input.trim()}>
          SUBMIT SECRET
        </Button>
      </div>
    );
  }

  if (phase === 'REVEAL') {
    const answerEntries = Object.entries(answers);
    const currentEntry = answerEntries[revealedIdx];
    // currentEntry[0] is ID, currentEntry[1] is Answer
    const author = players.find(p => p.id === currentEntry[0]);

    const next = () => {
        setShowAuthor(false);
        if (revealedIdx < answerEntries.length - 1) {
            setRevealedIdx(prev => prev + 1);
        } else {
            navigate('/mode-select');
        }
    };

    return (
      <div className="flex flex-col flex-1 gap-8 justify-center items-center">
         <h2 className="text-xl font-bold text-center text-gray-400">{question}</h2>

         <Card className="w-full min-h-[200px] flex items-center justify-center relative overflow-hidden group">
            <p className="text-2xl font-display font-bold text-center p-4">
                "{currentEntry[1]}"
            </p>
            
            {showAuthor && (
                <div className="absolute inset-0 bg-neon-dark/95 flex flex-col items-center justify-center animate-fade-in">
                    <span className="text-6xl mb-4 animate-bounce">{author?.avatar}</span>
                    <span className="text-xl font-bold text-neon-cyan">{author?.name}</span>
                </div>
            )}
         </Card>

         <div className="text-center space-y-2">
             <p className="text-neon-pink font-bold animate-pulse">WHO WROTE THIS?</p>
             <p className="text-xs text-gray-500">Discuss before revealing!</p>
         </div>

         <div className="w-full space-y-4 mt-auto">
             {!showAuthor ? (
                 <Button onClick={() => setShowAuthor(true)} variant="secondary" fullWidth>
                     REVEAL AUTHOR
                 </Button>
             ) : (
                 <Button onClick={next} fullWidth>
                     {revealedIdx < answerEntries.length - 1 ? 'NEXT ANSWER' : 'FINISH GAME'}
                 </Button>
             )}
         </div>
      </div>
    );
  }

  return null;
};