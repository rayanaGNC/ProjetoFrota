import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { registerFuncionario } from '@/services/registerFuncionario';

export default function NovoFuncionario() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cnh, setCnh] = useState('');
  const [role, setRole] = useState<'admin' | 'funcionario'>('funcionario');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCadastrar = async () => {
    if (!email || !senha || !nomeCompleto || !telefone || !cnh) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      setLoading(true);
      await registerFuncionario(email, senha, {
        nomeCompleto,
        telefone,
        cnh,
        role,
      });
      Alert.alert('Sucesso', 'Funcionário cadastrado!');
      router.replace('/funcionarios');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Funcionário</Text>

       <TextInput
        placeholder="Nome Completo"
        style={styles.input}
        value={nomeCompleto}
        onChangeText={setNomeCompleto}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Telefone"
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="CNH"
        style={styles.input}
        value={cnh}
        onChangeText={setCnh}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {/* Simples seletor de tipo de usuário (substitua por Picker se quiser) */}
      <View style={styles.roleContainer}>
        <Button
          title="Funcionário"
          color={role === 'funcionario' ? '#007bff' : '#ccc'}
          onPress={() => setRole('funcionario')}
        />
        <Button
          title="Administrador"
          color={role === 'admin' ? '#007bff' : '#ccc'}
          onPress={() => setRole('admin')}
        />
      </View>

      <View style={styles.buttonWrapper}>
  {loading ? (
    <ActivityIndicator size="small" color="#007bff" />
  ) : (
    <TouchableOpacity style={styles.customButton} onPress={handleCadastrar}>
      <Text style={styles.customButtonText}>Cadastrar</Text>
    </TouchableOpacity>
  )}
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#2D3E45',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#CED8CD',
  },
  input: {
    backgroundColor: '#CED8CD',
    color: '#2D3E45',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 12,
    width: '80%',
    fontSize: 14,
    alignSelf: 'center',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: '80%',
  },
  buttonWrapper: {
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
  },
  customButton: {
  backgroundColor: '#648B7C', // Altere a cor aqui
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: 'center',
  width: '100%',
},
customButtonText: {
  color: '#F0F5F1',
  fontWeight: 'bold',
  fontSize: 16,
},
});
