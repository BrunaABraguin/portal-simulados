import { Questao } from "./questao";

export interface Simulado {
  id: number;
  nome: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  data_criacao: string;
  data_atualizacao: string;
  ativo: boolean;
  simulado_questoes: Questao[];
  tempo_limite: number;
  simulado_questoes_count: number;
}
