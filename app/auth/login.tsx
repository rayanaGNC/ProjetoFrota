import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);

      // Autentica o usuário
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;

      // Busca o perfil no Firestore
      const docRef = doc(db, 'funcionarios', uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        Alert.alert('Erro', 'Usuário não cadastrado na base de dados');
        return;
      }

      const data = docSnap.data();
      const role = data?.role;

      if (role === 'admin') {
        router.replace('/dashboard-admin');
      } else if (role === 'funcionario') {
        router.replace('/dashboard-funcionario');
      } else {
        Alert.alert('Erro', 'Perfil de usuário inválido');
      }
    } catch (error: any) {
      Alert.alert('Erro ao fazer login', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestor de Frota</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#2D3E45',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#CED8CD',
  },
  input: {
    backgroundColor: '#CED8CD',
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 6,
    fontSize: 14,
    width: '70%',
    alignSelf: 'center',
    borderColor: '#2D3E45',
  },
  button: {
    backgroundColor: '#90AF91',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
