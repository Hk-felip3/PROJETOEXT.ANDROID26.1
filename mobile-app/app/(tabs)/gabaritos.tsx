import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Header from '@/components/header';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Header
        title="ScanGab"
        brand={<HeaderBackButton onPress={() => navigation.goBack()} />}
        rightAction={
            <TouchableOpacity style={styles.rightAction}>
              <Text style={styles.rightActionText}>Novo</Text>
            </TouchableOpacity>
          }
        />
        </View>
        <Text>Explore Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightAction: {
    marginLeft: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#111827',
  },
  rightActionText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
