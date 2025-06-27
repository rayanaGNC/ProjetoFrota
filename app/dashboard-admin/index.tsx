import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { logout } from '@/services/auth';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/auth/login');
    } catch (error) {
      Alert.alert('Erro ao sair', 'Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do Administrador</Text>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/funcionarios')}
        >
          <Text style={styles.buttonText}>FUNCIONÁRIOS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/veiculos')}
        >
          <Text style={styles.buttonText}>VEÍCULOS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/reservas')}
        >
          <Text style={styles.buttonText}>RESERVAS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>SAIR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E45',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CBD5C0',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttons: {
    backgroundColor: '#648B7C',
    paddingVertical: 24,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    gap: 12,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#F0F5F1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#D9534F',
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '60%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});