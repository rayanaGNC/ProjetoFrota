import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { listarReservas } from '@/services/reservas';
import { Reserva } from '@/types/reserva';

export default function ListaReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const router = useRouter();

useEffect(() => {
  listarReservas()
    .then(res => {
      const ativas = res.filter(r => r.status !== 'cancelada'); // <-- ignora canceladas
      setReservas(ativas);
    })
    .catch(() => Alert.alert('Erro', 'Erro ao carregar reservas'));
}, []);

  const handleNovaReserva = () => {
    router.push('/reservas/nova');
  };

  const handleEditar = (id: string) => {
    router.push(`/reservas/editar?id=${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas</Text>

      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.texto}>
              {item.nomeFuncionario} — {item.modeloCarro} ({item.placaCarro}){'\n'}
              {item.data} às {item.hora}
            </Text>
            <View style={styles.botoes}>
              <TouchableOpacity
                style={styles.editar}
                onPress={() => handleEditar(item.id)}
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.novoButton} onPress={handleNovaReserva}>
        <Text style={styles.novoButtonText}>Nova Reserva</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C3E45',
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#CBD5C0',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#A0C3A8',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  texto: {
    color: '#1D2B32',
    fontSize: 16,
    marginBottom: 6,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editar: {
    backgroundColor: '#648B7C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textoBotao: {
    color: '#F0F5F1',
    fontWeight: 'bold',
  },
  novoButton: {
    backgroundColor: '#648B7C',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  novoButtonText: {
    color: '#F0F5F1',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
