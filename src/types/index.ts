export type AnimationType =
  | 'fade'
  | 'slide-left'
  | 'slide-right'
  | 'rotate'
  | 'flip-3d'
  | 'blur-zoom'
  | 'polaroid'
  | 'floating';

export type LayoutSpan = 'normal' | 'wide' | 'tall' | 'featured' | 'full';

export interface Memory {
  _id?: string;
  id: number;
  filename?: string;
  url?: string;
  image: string;
  mediaType?: 'photo' | 'video';
  videoUrl?: string;
  layoutSpan?: LayoutSpan;
  title: string;
  caption: string; // Heartfelt personal message
  description?: string; // Short memory description
  date?: string;
  location?: string;
  animation: AnimationType;
  storySnippet?: string;
  category?: 'core' | 'video' | 'candid' | 'special' | 'all';
  highlight?: boolean;
  displayOrder?: number;
  isPortrait?: boolean;
  aspectRatio?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface StoryTimelineItem {
  id: number;
  step: string;
  title: string;
  date: string;
  description: string;
  icon?: string;
}

export interface LoveReason {
  id: number;
  title: string;
  emoji: string;
  message: string;
  originalQuote?: string;
  colorAccent?: string;
}

export interface SecretLetter {
  teaser: string;
  heading: string;
  paragraphs: string[];
  signOff: string;
  signature: string;
}

export interface BirthdayLetterData {
  heading: string;
  paragraphs: string[];
  closing: string[];
}

export interface OctoberData {
  heading: string;
  quote: string;
  subQuote: string;
  month: string;
  dayNumber: number;
  formattedDate: string;
  specialDate?: string;
  note: string;
}

export interface QuizOption {
  text: string;
  isCorrect?: boolean;
  reaction: string;
}

export interface QuizQuestion {
  id: number;
  badge?: string;
  question: string;
  subtitle?: string;
  options: QuizOption[];
  revealedAnswer: string;
  sweetNote: string;
}
