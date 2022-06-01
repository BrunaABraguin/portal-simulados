import { Alternativa } from './alternativa';
export interface Questao {
  id: string;
  disciplina: string;
  assunto: string;
  enunciado: string;
  alternativas: Alternativa[];
  comentarios: string;
  respondida: boolean;
}
