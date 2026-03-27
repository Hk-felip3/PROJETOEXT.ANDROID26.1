import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '@/components/header';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Header title="ScanGrab"/>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
