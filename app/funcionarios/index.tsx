import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { listarFuncionarios } from '@/services/funcionarios';
import { Funcionario } from '@/types/funcionario';

export default function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const router = useRouter();

  useEffect(() => {
    listarFuncionarios()
      .then(setFuncionarios)
      .catch(() => Alert.alert('Erro', 'Erro ao carregar funcionários'));
  }, []);

  const handleCadastrar = () => {
    router.push('/funcionarios/novo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Funcionários</Text>

      <FlatList
        data={funcionarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.funcionarioCard}>
            <Text style={styles.funcionarioTexto}>
              {item.nomeCompleto}
              {'\n'}
              ({item.email})
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.cadastrarButton} onPress={handleCadastrar}>
        <Text style={styles.cadastrarButtonText}>Cadastrar Novo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E45',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#CBD5C0',
    textAlign: 'center',
    marginBottom: 20,
  },
  funcionarioCard: {
    backgroundColor: '#A0C3A8',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    width: '95%',
    alignSelf: 'center',
  },
  funcionarioTexto: {
    fontSize: 18,
    color: '#1D2B32',
  },
  cadastrarButton: {
    backgroundColor: '#648B7C',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
    width: '90%',
    alignSelf: 'center',
  },
  cadastrarButtonText: {
    color: '#F0F5F1',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
