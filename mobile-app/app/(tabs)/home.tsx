import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '@/components/header';
import { LinearGradient } from 'expo-linear-gradient';
import { ScanLine, FileText, BarChart3, Settings, ListChecks } from 'lucide-react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  brand: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
  },
  primaryCard: {
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryTitle: {
    fontSize: 18,
    color: '#ffffff',
  },
  primarySubtitle: {
    fontSize: 15,
    color: '#ffffff',
  },
  primaryDesc: {
    color: '#ddd6fe',
    fontSize: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
    color: '#374151',
  },
});

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.safeArea}>
      <LinearGradient
        colors={['#f5f3ff', '#ffffff', '#eef2ff']}
        style={{ flex: 1 }}
      >
        <Header
          title="ScanGab"
          subtitle="Correção de Gabaritos"
          brand={
            <View style={styles.brand}>
              <ScanLine color="#fff" size={18} />
            </View>
          }
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>

          <TouchableOpacity onPress={() => navigation.navigates('scanner')}>
              <LinearGradient colors={[ '#7c3aed', '#4f46e5' ]}
                style={styles.primaryCard}>
                  <View>
                    <Text style={styles.primaryTitle}>Escanear Cartão</Text>
                    <Text style={styles.primarySubtitle}>Capture e corrija Respostas</Text>
                  </View>

                  <View style={styles.iconCircle}>
                    <ScanLine color='#ffffff' size={28} />
                  </View>
                </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Scan')}>
            <FileText size={24} color="#4f46e5" />
            <Text style={styles.actionText}>Novo Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Results')}>
            <BarChart3 size={24} color="#10b981" />
            <Text style={styles.actionText}>Resultados</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('History')}>
            <ListChecks size={24} color="#f59e0b" />
            <Text style={styles.actionText}>Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Settings')}>
            <Settings size={24} color="#8b5cf6" />
            <Text style={styles.actionText}>Configurações</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}