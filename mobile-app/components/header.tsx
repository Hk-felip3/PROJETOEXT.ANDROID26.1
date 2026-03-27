// mobile-app/components/header.tsx
import type { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';

type HeaderProps = {
  title: string;
  brand?: ReactNode;
  rightAction?: ReactNode;
};

export default function Header({ title, brand, rightAction }: HeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandContainer}>{brand}</View>
      <Text style={styles.title}>{title}</Text>
      {rightAction}
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
  brandContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
