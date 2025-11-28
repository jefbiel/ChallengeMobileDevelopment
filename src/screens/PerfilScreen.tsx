import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HABITS_KEY = '@habitos';
const XP_KEY = '@xp';

type Habit = {
  id: string;
  name: string;
  description: string;
  category: string;
  completed?: boolean;
  completionDate?: string;
  xpEarned?: number;
};

const PerfilScreen: React.FC = () => {
  const [xp, setXp] = useState(0);
  const [habits, setHabits] = useState<Habit[]>([]);
  const navigation: any = useNavigation();

  useEffect(() => {
    const load = async () => {
      try {
        const rawXp = await AsyncStorage.getItem(XP_KEY);
        setXp(rawXp ? Number(rawXp) : 0);
      } catch {
        // ignore
      }

      try {
        const raw = await AsyncStorage.getItem(HABITS_KEY);
        const list: Habit[] = raw ? JSON.parse(raw) : [];
        // keep only completed for history
        const completed = list.filter((h) => h.completed).sort((a, b) => {
          const da = a.completionDate ? new Date(a.completionDate).getTime() : 0;
          const db = b.completionDate ? new Date(b.completionDate).getTime() : 0;
          return db - da;
        });
        setHabits(completed);
      } catch {
        // ignore
      }
    };

    load();
  }, []);

  const totalCompleted = habits.length;

  const categoryCounts = habits.reduce<Record<string, number>>((acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + 1;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => `${name} (${count})`);

  const level = Math.floor(xp / 100) + 1;
  const progressToNext = xp % 100;

  const levelTitle = (lvl: number) => {
    if (lvl <= 1) return 'Iniciante saudável';
    if (lvl === 2) return 'Em progresso';
    if (lvl === 3) return 'Saúde ativa';
    return 'Veterano da saúde';
  };

  const handleEdit = () => {
    Alert.alert('Editar perfil', 'Funcionalidade de edição não implementada ainda.');
  };

  const handleChangePassword = () => {
    Alert.alert('Alterar senha', 'Funcionalidade de alteração de senha não implementada.');
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja sair da conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/img/NewCareLogo.png')}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Gabriel Mendonça</Text>
          <Text style={styles.userEmail}>gabriel@example.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Experiência</Text>
        <Text style={styles.xpLarge}>{xp} XP</Text>
        <Text style={styles.levelText}>Nível {level} – {levelTitle(level)}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressToNext}%` }]} />
        </View>
        <Text style={styles.progressSmall}>{progressToNext}% para o próximo nível</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Histórico de Hábitos (recentes)</Text>
        {habits.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum hábito concluído recentemente.</Text>
        ) : (
          habits.slice(0, 10).map((h) => (
            <View key={h.id} style={styles.habitRow}>
              <View style={styles.habitCol}>
                <Text style={styles.habitName}>{h.name}</Text>
                <Text style={styles.habitMeta}>{h.completionDate ? new Date(h.completionDate).toLocaleString() : '-'}</Text>
              </View>
              <Text style={styles.habitXp}>+{h.xpEarned ?? 10} XP</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Estatísticas</Text>
        <Text style={styles.statText}>Hábitos concluídos: {totalCompleted}</Text>
        <Text style={styles.statText}>Categorias mais praticadas: {topCategories.join(', ') || '—'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recompensas & Metas</Text>
        <Text style={styles.statText}>Medalhas desbloqueadas: {totalCompleted >= 10 ? 'Bronze' : 'Nenhuma'}</Text>
        <Text style={styles.statText}>Próxima meta: Conclua 5 hábitos de sono para ganhar +50 XP</Text>
      </View>

      <View style={styles.spacerSmall} />

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleChangePassword}>
          <Text style={styles.secondaryButtonText}>Alterar senha</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton} onPress={handleLogout}>
          <Text style={styles.ghostButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.spacerLarge} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 72, height: 72, borderRadius: 36, marginRight: 12 },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: '700', color: '#02457a' },
  userEmail: { color: '#6b7280' },
  editButton: { backgroundColor: '#3498DB', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  editButtonText: { color: '#fff', fontWeight: '700' },

  card: { backgroundColor: '#fbfeff', padding: 12, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#e6f3fb' },
  cardTitle: { fontWeight: '700', color: '#02457a', marginBottom: 8 },
  xpLarge: { fontSize: 28, fontWeight: '800', color: '#065f46' },
  levelText: { color: '#065f46', marginTop: 4 },
  progressBar: { height: 12, backgroundColor: '#e6f3fb', borderRadius: 8, marginTop: 8, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#2e8b57' },
  progressSmall: { color: '#475569', marginTop: 6 },

  emptyText: { color: '#475569' },
  habitRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eef6f5' },
  habitCol: { flex: 1, paddingRight: 12 },
  habitName: { fontWeight: '700', color: '#0f172a' },
  habitMeta: { color: '#6b7280', marginTop: 4 },
  habitXp: { color: '#065f46', fontWeight: '700' },

  statText: { color: '#0f172a', marginBottom: 6 },

  actionsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  secondaryButton: { backgroundColor: '#2e8b57', padding: 12, borderRadius: 8, flex: 1, marginRight: 8, alignItems: 'center' },
  secondaryButtonText: { color: '#fff', fontWeight: '700' },
  ghostButton: { borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, flex: 1, marginLeft: 8, alignItems: 'center' },
  ghostButtonText: { color: '#0f172a', fontWeight: '700' },
  spacerSmall: { height: 12 },
  spacerLarge: { height: 48 },
});

export default PerfilScreen;
