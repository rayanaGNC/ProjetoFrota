// app/veiculos/index.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { listarVeiculos } from '@/services/veiculos';
import { Veiculo } from '@/types/veiculo';

export default function VeiculosIndex() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const router = useRouter();

  useEffect(() => {
    listarVeiculos()
      .then(setVeiculos)
      .catch(() => Alert.alert('Erro', 'Erro ao carregar veículos'));
  }, []);

  const handleEditar = (id: string) => {
    router.push({ pathname: '/veiculos/editar', params: { id } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Veículos</Text>

      <FlatList
        data={veiculos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTexto}>{item.modelo}</Text>
            <Text style={styles.itemSubtexto}>Placa: {item.placa}</Text>
            <Text style={styles.itemSubtexto}>
              Status: {item.ativo ? 'Ativo' : 'Inativo'}
            </Text>

            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() => handleEditar(item.id)}
            >
              <Text style={styles.textoEditar}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push('/veiculos/novo')}
      >
        <Text style={styles.botaoTexto}>Novo Veículo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E45',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CBD5C0',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#648B7C',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  itemTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemSubtexto: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  botaoEditar: {
    backgroundColor: '#426B5D',
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoEditar: {
    color: '#F0F5F1',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#648B7C',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});