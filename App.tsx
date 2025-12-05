import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Lobby } from './pages/Lobby';
import { ModeSelect } from './pages/ModeSelect';
import { MajorityGame } from './pages/MajorityGame';
import { AnonymousGame } from './pages/AnonymousGame';
import { AISetup } from './pages/AISetup';
import { Player, GameMode } from './types';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [mode, setMode] = useState<GameMode | null>(null);
  const [aiTopic, setAiTopic] = useState<string>('');

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/lobby" element={
            <Lobby setPlayers={setPlayers} />
          } />
          
          <Route path="/mode-select" element={
            players.length > 0 ? <ModeSelect setMode={setMode} /> : <Navigate to="/lobby" />
          } />
          
          <Route path="/game/majority" element={
            players.length > 0 ? <MajorityGame players={players} topic={aiTopic} /> : <Navigate to="/lobby" />
          } />

          <Route path="/game/anonymous" element={
            players.length > 0 ? <AnonymousGame players={players} /> : <Navigate to="/lobby" />
          } />

          <Route path="/game/ai-setup" element={
            players.length > 0 ? <AISetup setTopic={setAiTopic} /> : <Navigate to="/lobby" />
          } />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;