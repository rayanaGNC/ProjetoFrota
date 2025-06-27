// Arquivo: app/_layout.tsx
import { Slot, usePathname, useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import TabBarFuncionario from '@/components/TabBarFuncionario';
import TabBarAdmin from '@/components/TabBarAdmin';

export default function Layout() {
  const pathname = usePathname();
  const router = useRouter();

  const isInitialScreen =
  pathname === '/' ||
  pathname === '/index' ||
  pathname === '/login' ||
  pathname === '/dashboard-funcionario' ||
  pathname === '/dashboard-admin';


  const renderTabBar = () => {
    if (pathname.startsWith('/dashboard-admin')) {
      return <TabBarAdmin />;
    } else if (pathname.startsWith('/dashboard-funcionario')) {
      return <TabBarFuncionario />;
    }
    return null;
  };

  const renderBackButton = () => {
    if (!isInitialScreen) {
      return (
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>{'< Voltar'}</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

   return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {!isInitialScreen && (
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Text style={styles.backButtonText}>{'< Voltar'}</Text>
            </TouchableOpacity>
          </View>
        )}
        <Slot />
        {renderTabBar()}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3E45',
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#2D3E45', 
},
  backButtonText: {
    color: '#007aff',
    fontWeight: 'bold',
  },
    header: {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#2C3E45',
    paddingHorizontal: 16,
  },
});
