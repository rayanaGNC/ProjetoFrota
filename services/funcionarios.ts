import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Funcionario } from "@/types/funcionario";

const ref = collection(db, "funcionarios");

export async function adicionarFuncionario(func: Omit<Funcionario, "id">) {
  return await addDoc(ref, func);
}

export async function listarFuncionarios(): Promise<Funcionario[]> {
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Funcionario));
}

