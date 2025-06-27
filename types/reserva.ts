export interface Reserva {
  id: string;
  funcionarioId: string;
  nomeFuncionario: string;
  data: string;
  hora: string;
  objetivo: string;
  veiculoId: string;
  modeloCarro: string;
  placaCarro: string;
  status: "ativa" | "cancelada";
  alteracoes: number;
}
