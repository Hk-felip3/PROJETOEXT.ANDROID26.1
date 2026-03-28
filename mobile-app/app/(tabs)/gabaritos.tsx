import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Header from '@/components/header';
import { GabaritoCard } from '@/components/ui/gabaritoCard';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header
          title="Meus Gabaritos"
          brand={<HeaderBackButton onPress={() => navigation.goBack()} />}
          rightAction={
            <TouchableOpacity style={styles.rightAction}>
              <Text style={styles.rightActionText}>Novo</Text>
            </TouchableOpacity>
          }
        />
      </View>
      <View style={styles.content}>
        <GabaritoCard
          titulo="Gabarito 1"
          descricao="Descricao do gabarito 1"
          questoes={30}
          data="01/01/2024"
          disciplina="geografia"
        />
      </View>
      <View style={styles.content}>
              <GabaritoCard
                titulo="Gabarito 1"
                descricao="Descricao do gabarito 1"
                questoes={30}
                data="01/01/2024"
                disciplina="matematica"
              />
            </View>
            <View style={styles.content}>
                    <GabaritoCard
                      titulo="Gabarito 1"
                      descricao="Descricao do gabarito 1"
                      questoes={30}
                      data="01/01/2024"
                      disciplina="portugues"
                    />
                  </View>
                  <View style={styles.content}>
                          <GabaritoCard
                            titulo="Gabarito 1"
                            descricao="Descricao do gabarito 1"
                            questoes={30}
                            data="01/01/2024"
                            disciplina="geografia"
                          />
                        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  rightAction: {
    marginLeft: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#7C3AED',
  },
  rightActionText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
