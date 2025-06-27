import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { listarReservas, atualizarReserva } from '@/services/reservas';
import { Reserva } from '@/types/reserva';

export default function EditarReserva() {
  const { id } = useLocalSearchParams();
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const router = useRouter();

  useEffect(() => {
    listarReservas().then((res) => {
      const alvo = res.find((r) => r.id === id);
      if (alvo) {
        setReserva(alvo);
        setData(alvo.data);
        setHora(alvo.hora);
      }
    });
  }, []);

  const handleSalvar = async () => {
    if (!reserva) return;

    if (reserva.alteracoes >= 3) {
      Alert.alert('Erro', 'Número de alterações excedido');
      return;
    }

    try {
      await atualizarReserva(reserva.id, {
        data,
        hora,
        alteracoes: (reserva.alteracoes ?? 0) + 1,
      });

      Alert.alert('Sucesso', 'Reserva atualizada com sucesso');
      router.replace('/reservas');
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar a reserva');
    }
  };

  const handleCancelar = () => {
  if (!reserva) return;


  Alert.alert(
    'Cancelar Reserva',
    'Deseja realmente cancelar esta reserva?',
    [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => {
          // Aqui evitamos usar async direto
          cancelarReserva();
        },
      },
    ]
  );
};

const cancelarReserva = async () => {
  try {
    if (!reserva) return;
    console.log('Cancelando reserva ID:', reserva.id);

    await atualizarReserva(reserva.id, { status: 'cancelada' });

    Alert.alert('Sucesso', 'Reserva cancelada com sucesso');
    router.replace('/reservas');
  } catch (error) {
    console.error('Erro ao cancelar:', error);
    Alert.alert('Erro', 'Erro ao cancelar reserva');
  }
};

  if (!reserva) return <Text style={styles.loading}>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Reserva</Text>

      <TextInput
        placeholder="Data"
        value={data}
        onChangeText={setData}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Hora"
        value={hora}
        onChangeText={setHora}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCancelar} onPress={handleCancelar}>
        <Text style={styles.textoCancelar}>Cancelar Reserva</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E45',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#CBD5C0',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F0F5F1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: '#1D2B32',
  },
  botao: {
    backgroundColor: '#648B7C',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotao: {
    color: '#F0F5F1',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoCancelar: {
    backgroundColor: '#D9534F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textoCancelar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loading: {
    textAlign: 'center',
    color: '#CBD5C0',
    marginTop: 40,
  },
});
