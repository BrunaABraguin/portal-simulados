export interface Questao {
  id: string;
  materia: string;
  assunto: string;
  enunciado: string;
  alternativas: string[];
  comentarios: string[];
  correta: number;
}
