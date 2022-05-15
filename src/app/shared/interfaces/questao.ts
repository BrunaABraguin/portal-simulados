import { Alternativa } from './alternativa';
export interface Questao {
  id: string;
  disciplina: string;
  assunto: string;
  enunciado: string;
  alternativas: Alternativa[];
  comentario: string;
  respondida: boolean;
}
