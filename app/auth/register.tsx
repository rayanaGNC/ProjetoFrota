import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { register } from '@/services/auth';
import { useRouter } from 'expo-router';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState<'admin' | 'funcionario'>('funcionario');
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await register(name, email, senha, role);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
      router.replace('/auth/login');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />

      <Text style={styles.label}>Tipo de usuário:</Text>
      <View style={styles.roleSelector}>
        <TouchableOpacity onPress={() => setRole('admin')} style={[styles.roleButton, role === 'admin' && styles.selectedRole]}>
          <Text style={styles.roleText}>Administrador</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole('funcionario')} style={[styles.roleButton, role === 'funcionario' && styles.selectedRole]}>
          <Text style={styles.roleText}>Funcionário</Text>
        </TouchableOpacity>
      </View>

      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 12 },
  label: { fontWeight: 'bold', marginBottom: 8 },
  roleSelector: { flexDirection: 'row', marginBottom: 16, gap: 10 },
  roleButton: { padding: 10, backgroundColor: '#eee', borderRadius: 8 },
  selectedRole: { backgroundColor: '#cce5ff' },
  roleText: { fontWeight: '600' },
});
