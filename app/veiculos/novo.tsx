import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { adicionarVeiculo } from '@/services/veiculos';

const router = useRouter();

<Button title="Voltar" onPress={() => router.back()} />;

export default function NovoVeiculo() {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const router = useRouter();

  const handleSalvar = async () => {
    if (!placa || !modelo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    await adicionarVeiculo({
      placa,
      modelo,
      ativo: true,
    });
    Alert.alert('Sucesso', 'Veículo cadastrado');
    router.replace('/veiculos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Veículo</Text>
      <TextInput placeholder="Placa" value={placa} onChangeText={setPlaca} style={styles.input} />
      <TextInput placeholder="Modelo" value={modelo} onChangeText={setModelo} style={styles.input} />
      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#2C3E45',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CBD5C0',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#CED8CD',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#1D2B32',
    marginBottom: 14,
  },
  botao: {
    backgroundColor: '#648B7C',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  botaoTexto: {
    color: '#F0F5F1',
    fontSize: 16,
    fontWeight: 'bold',
  },
});