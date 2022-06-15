import { Questao } from './questao';

export interface Simulado {
  id: string;
  questoes: Questao[];
  professor: string;
  progresso?: number;
  nome: string;
  descricao: string;
  data?: Date;
  data_criacao: string;
  data_fim: string;
  duracao: number;
  userId?: string;
  qtd_questoes: number;
}
