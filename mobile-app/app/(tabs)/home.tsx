import { SafeAreaView, StyleSheet, View,Text } from 'react-native';
import Header from '@/components/header';
import { StatusBar } from 'expo-status-bar';
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Header
        title="ScanGrab"
        brand={ <View style={{ width: 32, height: 32, backgroundColor: 'black', borderRadius: 8 }} />}
        />
        </View>
        <Text>Home Screen</Text>
          <StatusBar
          style="auto"
          hidden={true}
          />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});