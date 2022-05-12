import { Alternativa } from './alternativa';
export interface Questao {
  id: string;
  materia: string;
  assunto: string;
  enunciado: string;
  alternativas: Alternativa[];
  respondida: boolean;
}
