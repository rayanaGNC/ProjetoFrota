import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Veiculo } from "@/types/veiculo";

const refVeiculos = collection(db, "veiculos");

export async function adicionarVeiculo(veiculo: Omit<Veiculo, "id">) {
  return await addDoc(refVeiculos, veiculo);
}

export async function listarVeiculos(): Promise<Veiculo[]> {
  const snapshot = await getDocs(refVeiculos);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Veiculo));
}

