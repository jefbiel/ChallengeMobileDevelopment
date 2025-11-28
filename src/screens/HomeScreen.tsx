import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { DeviceEventEmitter } from 'react-native';
// removed unused useNavigation import
import { Picker } from '@react-native-picker/picker';

const sampleActivities = [
  { id: '1', title: 'Caminhada', detail: '5.2 km — 45 min' },
  { id: '2', title: 'Exercícios', detail: 'Treino cardio — 30 min' },
  { id: '3', title: 'Meditação', detail: '15 min' },
];

const sampleRecommendations = [
  { id: 'r1', title: 'Exame de sangue anual', type: 'sangue' },
  { id: 'r2', title: 'Check-up cardiológico', type: 'cardio' },
  { id: 'r3', title: 'Exame de visão', type: 'visao' },
];

const sampleUpcoming = [
  { id: 'u1', date: '25 Nov', title: 'Exame de sangue', subtitle: 'Laboratório São João' },
  { id: 'u2', date: '02 Dez', title: 'Check-up cardiológico', subtitle: 'Clínica Saúde' },
];

const HABITS_KEY = '@habitos';
const XP_KEY = '@xp';

const HomeScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [xp, setXp] = useState(0);
  const [habits, setHabits] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState('sangue');
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadAll = async () => {
      try {
        const raw = await AsyncStorage.getItem(HABITS_KEY);
        const list = raw ? JSON.parse(raw) : [];
        setHabits(list);
        updateProgress(list);
      } catch {
        // ignore
      }

      try {
        const rawXp = await AsyncStorage.getItem(XP_KEY);
        const value = rawXp ? Number(rawXp) : 0;
        setXp(value);
      } catch {
        // ignore
      }
    };

    if (isFocused) loadAll();

    // escutar eventos para atualizações em tempo real vindas da aba Hábitos
    const subscription = DeviceEventEmitter.addListener('habitsUpdated', () => {
      loadAll();
    });

    return () => subscription.remove();
  }, [isFocused]);

  const updateProgress = (list: any[]) => {
    if (!list || list.length === 0) {
      setProgress(0);
      return;
    }
    const completed = list.filter((h) => h.completed).length;
    const p = Math.round((completed / list.length) * 100);
    setProgress(p);
  };

  const toggleComplete = async (habitId: string) => {
    try {
      let increased = false;
      const updated = habits.map((h) => {
        if (h.id === habitId) {
          const wasCompleted = Boolean(h.completed);
          if (!wasCompleted) increased = true;
          if (!wasCompleted) {
            return { ...h, completed: true, completionDate: new Date().toISOString(), xpEarned: 10 };
          }
          // unmarking
          return { ...h, completed: false, completionDate: undefined };
        }
        return h;
      });

      if (increased) {
        const newXp = xp + 10;
        await AsyncStorage.setItem(XP_KEY, String(newXp));
        setXp(newXp);
      }

      setHabits(updated);
      updateProgress(updated);
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar o hábito');
    }
  };


  const handleSchedule = (rec: any) => {
    Alert.alert('Remarcação', `Remarcação necessária para ${rec.title}`);
  };

  const handleViewDetails = (exam: any) => {
    const message = `${exam.title}\nLocal: ${exam.subtitle}\nData: ${exam.date}\n\nInstruções:\n- Jejum de 8 horas\n- Levar documento de identificação\n\nObservações: Resultado em até 3 dias úteis.`;
    Alert.alert(exam.title, message, [
      { text: 'Fechar', style: 'cancel' },
      { text: 'Remarcar', onPress: () => Alert.alert('Remarcação', `Solicitada remarcação para ${exam.title} em ${exam.date}`) },
    ]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Image
          source={require('../assets/img/NewCareLogoHorizontal.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.bell} onPress={() => Alert.alert('Notificações', 'Sem novas notificações')}>
          <Image
            source={require('../assets/img/bell.png')}
            style={styles.bellIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Bem-vindo, Gabriel</Text>
        <Text style={styles.subtitle}>Sua saúde em foco</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo rápido</Text>
          {sampleActivities.map((a) => (
            <View key={a.id} style={styles.card}>
              <Text style={styles.cardTitle}>{a.title}</Text>
              <Text style={styles.cardDetail}>{a.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Progresso</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>Progresso: {progress}%</Text>
          <Text style={styles.xpText}>XP: {xp}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hábitos</Text>
          {habits.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum hábito registrado.</Text>
          ) : (
            habits.map((h) => (
              <View key={h.id} style={styles.habitCard}>
                <View style={styles.habitInfo}>
                  <Text style={styles.cardTitle}>{h.name}</Text>
                  <Text style={styles.cardDetail}>{h.description}</Text>
                  <Text style={styles.habitCategory}>{h.category}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.habitButton, h.completed ? styles.habitButtonCompleted : {}]}
                  onPress={() => toggleComplete(h.id)}
                >
                  <Text style={styles.habitButtonText}>{h.completed ? 'Feito' : 'Marcar'}</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendações de Exames</Text>

          <View style={styles.pickerRow}>
            <Text style={styles.pickerLabel}>Tipo:</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={selectedType} onValueChange={(v) => setSelectedType(String(v))}>
                <Picker.Item label="Sangue" value="sangue" />
                <Picker.Item label="Cardiológico" value="cardio" />
                <Picker.Item label="Visão" value="visao" />
              </Picker>
            </View>
          </View>

          {sampleRecommendations
            .filter((r) => (selectedType ? r.type === selectedType : true))
            .map((rec) => (
              <View key={rec.id} style={styles.recCard}>
                  <View style={styles.recInfo}>
                    <Text style={styles.recTitle}>{rec.title}</Text>
                  </View>
                <TouchableOpacity style={styles.recButton} onPress={() => handleSchedule(rec)}>
                  <Text style={styles.recButtonText}>Agendar</Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos Exames</Text>

          {sampleUpcoming.map((exam) => (
            <View key={exam.id} style={styles.upcomingCard}>
              <View style={styles.upcomingDate}>
                <Text style={styles.upcomingDateText}>{exam.date}</Text>
              </View>

              <View style={styles.upcomingInfo}>
                <Text style={styles.upcomingTitle}>{exam.title}</Text>
                <Text style={styles.upcomingSubtitle}>{exam.subtitle}</Text>
              </View>

              <TouchableOpacity style={styles.upcomingLink} onPress={() => handleViewDetails(exam)}>
                <Text style={styles.upcomingLinkText}>Ver detalhes</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f6',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 8) : 12,
    paddingBottom: 12,
  },
  logo: { width: 220, height: 40 },
  bell: { padding: 8 },
  bellIcon: { width: 28, height: 28, tintColor: '#3498DB' },
  container: { padding: 16 },
  welcome: { fontSize: 20, fontWeight: '700', color: '#02457a' },
  subtitle: { fontSize: 14, color: '#065f46', marginBottom: 12 },
  section: { marginTop: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#02457a', marginBottom: 8 },
  card: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e6f0fb',
  },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  cardDetail: { fontSize: 12, color: '#475569' },
  progressBar: {
    height: 14,
    backgroundColor: '#e6f3fb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#2e8b57' },
  progressText: { marginTop: 6, color: '#0f172a' },
  xpText: { marginTop: 6, color: '#0f172a', fontWeight: '700' },
  pickerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  pickerLabel: { width: 60, color: '#0f172a' },
  pickerWrapper: { flex: 1, borderWidth: 1, borderColor: '#e6eef6', borderRadius: 8, overflow: 'hidden' },
  recCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fbfeff',
    borderWidth: 1,
    borderColor: '#dbeefb',
    marginBottom: 8,
  },
  recTitle: { fontSize: 14, fontWeight: '600', color: '#02457a' },
  recButton: { backgroundColor: '#3498DB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  recButtonText: { color: '#fff', fontWeight: '600' },
  recInfo: { flex: 1 },

  /* Hábitos */
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fbfffb',
    borderWidth: 1,
    borderColor: '#dbeee0',
    marginBottom: 8,
  },
  habitInfo: { flex: 1 },
  habitCategory: { color: '#065f46', marginTop: 4 },
  habitButton: { backgroundColor: '#3498DB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  habitButtonCompleted: { backgroundColor: '#94d3a2' },
  habitButtonText: { color: '#fff', fontWeight: '700' },
  emptyText: { color: '#475569' },

  /* Próximos exames */
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fbfeff',
    borderWidth: 1,
    borderColor: '#e6f6f5',
    marginBottom: 8,
  },
  upcomingDate: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingDateText: {
    color: '#3498DB',
    fontWeight: '700',
  },
  upcomingInfo: {
    flex: 1,
    paddingLeft: 8,
  },
  upcomingTitle: { fontSize: 16, fontWeight: '700', color: '#02457a' },
  upcomingSubtitle: { color: '#a9c0bd', marginTop: 4 },
  upcomingLink: {
    paddingLeft: 8,
  },
  upcomingLinkText: { color: '#3498DB', fontWeight: '600' },

  bottomSpacer: { height: 48 },
});

export default HomeScreen;
