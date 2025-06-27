import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

interface FuncionarioData {
  nomeCompleto: string;
  telefone: string;
  cnh: string;
  role: 'admin' | 'funcionario';
}

export async function registerFuncionario(
  email: string,
  password: string,
  dados: FuncionarioData
): Promise<{ success: boolean }> {
  try {
    // Cria usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Cria documento no Firestore com o UID
    await setDoc(doc(db, 'funcionarios', uid), {
      login: email,
      nomeCompleto: dados.nomeCompleto,
      telefone: dados.telefone,
      cnh: dados.cnh,
      role: dados.role,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Erro ao cadastrar funcionário:', error);
    throw new Error(error.message || 'Erro ao cadastrar funcionário.');
  }
}
