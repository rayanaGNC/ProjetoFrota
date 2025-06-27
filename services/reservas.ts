import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Reserva } from "@/types/reserva";

const refReservas = collection(db, "reservas");

export async function criarReserva(reserva: Omit<Reserva, "id" | "alteracoes" | "status">) {
  return await addDoc(refReservas, { ...reserva, status: "ativa", alteracoes: 0 });
}

export async function listarReservas(): Promise<Reserva[]> {
  const snapshot = await getDocs(refReservas);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Reserva));
}

export async function atualizarReserva(id: string, dados: Partial<Reserva>) {
  const docRef = doc(db, "reservas", id);
  await updateDoc(docRef, dados);
}  
