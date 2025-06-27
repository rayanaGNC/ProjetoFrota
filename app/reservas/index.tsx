import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { listarReservas } from '@/services/reservas';
import { Reserva } from '@/types/reserva';
const router = useRouter();


export default function ReservasIndex() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const router = useRouter();
  <Button title="Voltar" onPress={() => router.back()} />;

  useEffect(() => {
    listarReservas().then(setReservas);
  }, []);

  const handleNovaReserva = () => {
    router.push('/reservas/nova');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Reservas</Text>
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nomeFuncionario} - {item.modeloCarro}</Text>
            <Text>{item.data} às {item.hora}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.novaReservaButton} onPress={handleNovaReserva}>
  <Text style={styles.novaReservaText}>NOVA RESERVA</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#2D3E45', 
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#90AF91', 
    borderRadius: 8,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CED8CD', 
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#A0B8A1', 
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#90AF91', 
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  novaReservaButton: {
    backgroundColor: '#90AF91', 
    paddingVertical: 14,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  novaReservaText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

