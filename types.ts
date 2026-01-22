
export interface WordPair {
  id: string;
  chinese: string;
  translation: string;
}

export interface BattleQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  wrongAnswer: string;
}

export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  WHEEL = 'WHEEL',
  MATCHING = 'MATCHING',
  BATTLE = 'BATTLE',
  TEACHER = 'TEACHER'
}

export interface Hero {
  id: string;
  name: string;
  emoji: string;
  color: string;
}
