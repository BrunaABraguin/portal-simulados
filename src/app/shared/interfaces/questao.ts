import { Alternativa } from './alternativa';
export interface Questao {
  _id: string;
  disciplina: string;
  assunto: string;
  enunciado: string;
  alternativas: Alternativa[];
  comentarios: string;
  respondida: boolean;
}
