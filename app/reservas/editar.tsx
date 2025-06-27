import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { listarReservas, atualizarReserva } from '@/services/reservas';
import { Reserva } from '@/types/reserva';

const router = useRouter();

<Button title="Voltar" onPress={() => router.back()} />;

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

    await atualizarReserva(reserva.id, {
      data,
      hora,
      alteracoes: reserva.alteracoes + 1,
    });

    Alert.alert('Sucesso', 'Reserva atualizada');
    router.replace('/reservas');
  };

  const handleCancelar = async () => {
    if (!reserva) return;

    Alert.alert('Confirmação', 'Deseja realmente cancelar esta reserva?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          await atualizarReserva(reserva.id, { status: 'cancelada' });
          Alert.alert('Sucesso', 'Reserva cancelada com sucesso');
          router.replace('/reservas');
        },
      },
    ]);
  };

  if (!reserva) return <Text>Carregando...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Reserva</Text>
      <TextInput placeholder="Data" value={data} onChangeText={setData} style={styles.input} />
      <TextInput placeholder="Hora" value={hora} onChangeText={setHora} style={styles.input} />
      <Button title="Salvar Alterações" onPress={handleSalvar} />
      <View style={{ marginTop: 10 }}>
        <Button title="Cancelar Reserva" color="red" onPress={handleCancelar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 20, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 },
});
