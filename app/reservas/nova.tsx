import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { criarReserva } from '@/services/reservas';
import { listarFuncionarios } from '@/services/funcionarios';
import { listarVeiculos } from '@/services/veiculos';

export default function NovaReserva() {
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [veiculos, setVeiculos] = useState<any[]>([]);
  const [funcionarioId, setFuncionarioId] = useState('');
  const [veiculoId, setVeiculoId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const router = useRouter();

  useEffect(() => {
    listarFuncionarios().then(setFuncionarios);
    listarVeiculos().then((v) => setVeiculos(v.filter(v => v.ativo)));
  }, []);

  const handleSalvar = async () => {
    if (!funcionarioId || !veiculoId || !data || !hora || !objetivo) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const funcionario = funcionarios.find(f => f.id === funcionarioId);
    const veiculo = veiculos.find(v => v.id === veiculoId);

    await criarReserva({
      funcionarioId,
      nomeFuncionario: funcionario.nomeCompleto,
      data,
      hora,
      objetivo,
      veiculoId,
      modeloCarro: veiculo.modelo,
      placaCarro: veiculo.placa,
    });

    Alert.alert('Sucesso', 'Reserva cadastrada');
    router.replace('/reservas');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Reserva</Text>

      <Text style={styles.label}>Funcionário:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={funcionarioId}
          onValueChange={setFuncionarioId}
          style={styles.picker}
          dropdownIconColor="#F0F5F1"
        >
          <Picker.Item label="Selecione" value="" />
          {funcionarios.map(f => (
            <Picker.Item key={f.id} label={f.nomeCompleto} value={f.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Veículo:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={veiculoId}
          onValueChange={setVeiculoId}
          style={styles.picker}
          dropdownIconColor="#F0F5F1"
        >
          <Picker.Item label="Selecione" value="" />
          {veiculos.map(v => (
            <Picker.Item key={v.id} label={`${v.modelo} (${v.placa})`} value={v.id} />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Data"
        value={data}
        onChangeText={setData}
        style={styles.input}
        placeholderTextColor="#000"
      />
      <TextInput
        placeholder="Hora"
        value={hora}
        onChangeText={setHora}
        style={styles.input}
        placeholderTextColor="#000"
      />
      <TextInput
        placeholder="Objetivo da Reserva"
        value={objetivo}
        onChangeText={setObjetivo}
        style={styles.input}
        placeholderTextColor="#000"
      />

      <TouchableOpacity style={styles.botaoConfirmar} onPress={handleSalvar}>
  <Text style={styles.textoBotao}>CONFIRMAR</Text>
</TouchableOpacity>

    </View>
  );
}

// 👉 Faz o botão de voltar aparecer automaticamente no topo
export const options = {
  title: 'Nova Reserva',
  headerShown: true,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C3E45',
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CBD5C0',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#A9C6B1',
    fontSize: 16,
    marginBottom: 6,
    marginTop: 12,
  },
  pickerWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
  },
  picker: {
    height: 48,
    color: '#1D2B32',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: '#1D2B32',
  },
  botao: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoConfirmar: {
  backgroundColor: '#96B897', 
  paddingVertical: 14,
  borderRadius: 8,
  marginTop: 16,
  alignItems: 'center',
},

textoBotao: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
});