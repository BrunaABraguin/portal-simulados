import { Question } from './question';

export interface Exam {
  id: number;
  name: string;
  description: string;
  end: string;
  active: boolean;
  questions: Question[];
  duration: number;
  questions_count: number;
}
