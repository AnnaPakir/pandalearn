
import { WordPair, BattleQuestion, Hero } from './types';

export const DEFAULT_WHEEL_WORDS = [
  "你好 (Nǐ hǎo)",
  "谢谢 (Xièxiè)",
  "猫 (Māo)",
  "狗 (Gǒu)",
  "熊猫 (Xióngmāo)",
  "苹果 (Píngguǒ)",
  "好 (Hǎo)",
  "我爱你 (Wǒ ài nǐ)"
];

export const DEFAULT_MATCH_PAIRS: WordPair[] = [
  { id: '1', chinese: '妈妈', translation: 'Mama' },
  { id: '2', chinese: '老师', translation: 'Teacher' },
  { id: '3', chinese: '中国', translation: 'China' },
  { id: '4', chinese: '山', translation: 'Mountain' },
  { id: '5', chinese: '火', translation: 'Fire' },
  { id: '6', chinese: '水', translation: 'Water' }
];

export const DEFAULT_BATTLE_QUESTIONS: BattleQuestion[] = [
  { id: '1', question: '太阳 (Tàiyáng)', correctAnswer: 'Sun', wrongAnswer: 'Moon' },
  { id: '2', question: '月亮 (Yuèliàng)', correctAnswer: 'Moon', wrongAnswer: 'Sun' },
  { id: '3', question: '大 (Dà)', correctAnswer: 'Big', wrongAnswer: 'Small' },
  { id: '4', question: '小 (Xiǎo)', correctAnswer: 'Small', wrongAnswer: 'Big' },
  { id: '5', question: '书 (Shū)', correctAnswer: 'Book', wrongAnswer: 'Pen' }
];

export const HEROES: Hero[] = [
  { id: 'h1', name: 'Fire Dragon', emoji: '🐲', color: 'from-red-400 to-orange-500' },
  { id: 'h2', name: 'Magic Panda', emoji: '🐼', color: 'from-gray-400 to-gray-600' },
  { id: 'h3', name: 'Samurai Jack', emoji: '🥷', color: 'from-slate-700 to-slate-900' },
  { id: 'h4', name: 'Golden Phoenix', emoji: '🐦‍🔥', color: 'from-yellow-400 to-orange-400' },
  { id: 'h5', name: 'Ice Tiger', emoji: '🐯', color: 'from-blue-300 to-indigo-500' },
  { id: 'h6', name: 'Iron Robot', emoji: '🤖', color: 'from-cyan-400 to-blue-500' },
  { id: 'h7', name: 'Space Pony', emoji: '🦄', color: 'from-pink-300 to-purple-500' },
  { id: 'h8', name: 'Ninja Cat', emoji: '🐱', color: 'from-orange-300 to-yellow-500' }
];
