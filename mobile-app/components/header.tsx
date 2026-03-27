// mobile-app/components/header.tsx
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  logo: {
    width: 44,
    height: 44,
    backgroundColor: 'blue',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
title:{
    fontSize: 20,
    fontWeight: 'bold',
    }
});
