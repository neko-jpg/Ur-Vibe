export interface Player {
  id: string;
  name: string;
  score: number;
  avatar: string; // Emoji or simple char
}

export enum GameMode {
  MAJORITY = 'MAJORITY',
  ANONYMOUS = 'ANONYMOUS',
  AI_CUSTOM = 'AI_CUSTOM'
}

export interface Question {
  id: string;
  text: string;
  optionA?: string;
  optionB?: string;
  type: 'BINARY' | 'TEXT';
}

export interface GameState {
  players: Player[];
  currentRound: number;
  maxRounds: number;
  mode: GameMode | null;
  history: any[];
}
