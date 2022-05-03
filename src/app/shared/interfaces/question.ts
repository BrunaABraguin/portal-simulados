import { Alternative } from "./alternative";

export interface Question {
  id: number;
  statement: string;
  alternatives: Alternative[];
  answer: number;
}
