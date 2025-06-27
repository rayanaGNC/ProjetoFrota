import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Veiculo } from '@/types/veiculo';
import { listarVeiculos, atualizarVeiculo } from '@/services/veiculos';

export default function EditarVeiculo() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    listarVeiculos().then((lista) => {
      const alvo = lista.find((v) => v.id === id);
      if (alvo) {
        setVeiculo(alvo);
        setModelo(alvo.modelo);
        setPlaca(alvo.placa);
        setAtivo(alvo.ativo);
      }
    });
  }, [id]);

  const handleSalvar = async () => {
    if (!veiculo) return;

    try {
      await atualizarVeiculo(veiculo.id, { modelo, placa, ativo });
      Alert.alert('Sucesso', 'Veículo atualizado com sucesso!');
      router.replace('/veiculos');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar veículo');
    }
  };

  if (!veiculo) {
    return <Text style={styles.loading}>Carregando veículo...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Veículo</Text>

      <TextInput
        placeholder="Modelo"
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        placeholder="Placa"
        style={styles.input}
        value={placa}
        onChangeText={setPlaca}
      />
      <TouchableOpacity
        style={styles.toggleAtivo}
        onPress={() => setAtivo(!ativo)}
      >
        <Text style={styles.toggleText}>
          {ativo ? 'Status: Ativo' : 'Status: Inativo'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.botaoTexto}>Salvar</Text>
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
  toggleAtivo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  toggleText: {
    color: '#F0F5F1',
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#648B7C',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoTexto: {
    color: '#F0F5F1',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loading: {
    textAlign: 'center',
    color: '#CBD5C0',
    marginTop: 40,
  },
});