import { Questao } from "./questao";

export interface Simulado {
  id: string;
  perguntas: Questao[];
  professor: string;
  nome: string;
  descricao: string;
  data_criacao: string;
  data_fim: string;
  duracao: number;
  perguntas_count: number;
}
