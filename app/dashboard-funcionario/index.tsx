import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const tabs = [
  { label: 'Reservas', path: '/reservas' as const },
  { label: 'Nova Reserva', path: '/reservas/nova' as const },
];

export default function DashboardFuncionario() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Alert.alert('Logout', 'Você saiu do sistema.');
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Área do Funcionário</Text>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.path}
            style={[
              styles.tabItem,
              pathname === tab.path && styles.activeTab,
            ]}
            onPress={() => router.push(tab.path)}
          >
            <Text
              style={[
                styles.tabText,
                pathname === tab.path && styles.activeText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#2D3E45',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#CED8CD',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    width: '100%',
  },
  tabItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#53746A',
  },
  tabText: {
    fontSize: 16,
    color: '#CED8CD',
  },
  activeTab: {
    backgroundColor: '#90AF91',
  },
  activeText: {
    color: '#2D3E45',
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 40,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    backgroundColor: '#CED8CD',
  },
  logoutText: {
    color: '#2D3E45',
    fontWeight: 'bold',
  },
});