import { Alternativa } from "./alternativa";

export interface Questao {
  id: number;
  enunciado: string;
  alternativas: Alternativa[];
  resposta: number;
}
