// Tela de Hábitos: permite criar, listar, concluir e excluir hábitos.
// Comentários simples adicionados para explicar cada parte do código.
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// navegação não é necessária aqui

// Tipo que representa um hábito salvo no app
type Habit = {
  id: string;
  name: string;
  description: string;
  category: string;
  completed?: boolean;
  completionDate?: string;
  xpEarned?: number;
};

// Chave usada no AsyncStorage para persistir hábitos
const HABITS_KEY = '@habitos';

const HabitosScreen: React.FC = () => {
  // Estado local: lista de hábitos e XP acumulado
  const [habits, setHabits] = useState<Habit[]>([]);
  const [xp, setXp] = useState<number>(0);

  // Campos do formulário para novo hábito
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Exercício');

  // Ao montar o componente, carregamos hábitos e XP do armazenamento
  useEffect(() => {
    loadHabits();
    loadXp();
  }, []);

  // Carrega os hábitos do AsyncStorage e atualiza o estado local
  const loadHabits = async () => {
    try {
      const json = await AsyncStorage.getItem(HABITS_KEY);
      const current: Habit[] = json ? JSON.parse(json) : [];
      setHabits(current);
    } catch {
      // Se ocorrer erro, ignoramos para não travar a UI
    }
  };

  // Carrega o XP total armazenado
  const loadXp = async () => {
    try {
      const raw = await AsyncStorage.getItem('@xp');
      const value = raw ? Number(raw) : 0;
      setXp(value);
    } catch {
      // Ignora erros de leitura
    }
  };

  // Salva um novo hábito: valida campos, persiste e notifica a Home
  const saveHabit = async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: name.trim(),
        description: description.trim(),
        category,
        completed: false,
        xpEarned: 0,
      };

      // lê lista atual, adiciona novo hábito e persiste
      const json = await AsyncStorage.getItem(HABITS_KEY);
      const current: Habit[] = json ? JSON.parse(json) : [];
      const updated = [newHabit, ...current];
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));

      // atualiza estado e avisa Home para recarregar (sincronização entre abas)
      setHabits(updated);
      DeviceEventEmitter.emit('habitsUpdated');

      Alert.alert('Sucesso', 'Hábito salvo com sucesso');
      setName('');
      setDescription('');
      setCategory('Exercício');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o hábito');
    }
  };

  // Marca um hábito como concluído: atualiza lista, grava data e incrementa XP
  const concludeHabit = async (id: string) => {
    try {
      const updated = habits.map((h) => {
        if (h.id === id && !h.completed) {
          return { ...h, completed: true, completionDate: new Date().toISOString(), xpEarned: 10 };
        }
        return h;
      });
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));

      // atualiza XP armazenado
      const raw = await AsyncStorage.getItem('@xp');
      const currentXp = raw ? Number(raw) : 0;
      const newXp = currentXp + 10;
      await AsyncStorage.setItem('@xp', String(newXp));
      setXp(newXp);

      setHabits(updated);
      DeviceEventEmitter.emit('habitsUpdated');
    } catch {
      Alert.alert('Erro', 'Não foi possível concluir o hábito');
    }
  };

  // Exclui um hábito após confirmação do usuário
  const deleteHabit = async (id: string) => {
    Alert.alert('Confirmar', 'Deseja excluir este hábito?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            const updated = habits.filter((h) => h.id !== id);
            await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
            setHabits(updated);
            DeviceEventEmitter.emit('habitsUpdated');
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir o hábito');
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registrar Novo Hábito</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nome do hábito</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Beber 2L de água"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descrição do hábito"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={category} onValueChange={(v) => setCategory(String(v))}>
            <Picker.Item label="Exercício" value="Exercício" />
            <Picker.Item label="Alimentação" value="Alimentação" />
            <Picker.Item label="Sono" value="Sono" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveHabit}>
          <Text style={styles.saveButtonText}>Salvar Hábito</Text>
        </TouchableOpacity>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{habits.filter((h) => !h.completed).length}</Text>
          <Text style={styles.statLabel}>Ativos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{habits.filter((h) => h.completed).length}</Text>
          <Text style={styles.statLabel}>Concluídos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{xp}</Text>
          <Text style={styles.statLabel}>XP</Text>
        </View>
      </View>

      {/* Hábitos Ativos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hábitos Ativos</Text>
        {habits.filter((h) => !h.completed).length === 0 ? (
          <Text style={styles.empty}>Nenhum hábito ativo.</Text>
        ) : (
          habits
            .filter((h) => !h.completed)
            .map((h) => (
              <View key={h.id} style={styles.habitCard}>
                <View style={styles.habitInfo}>
                  <Text style={styles.habitTitle}>{h.name}</Text>
                  <Text style={styles.habitCategory}>{h.category}</Text>
                  <Text style={styles.habitDesc}>{h.description}</Text>
                </View>
                <View style={styles.habitActions}>
                  <TouchableOpacity style={styles.concludeButton} onPress={() => concludeHabit(h.id)}>
                    <Text style={styles.actionText}>Concluir</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deleteHabit(h.id)}>
                    <Text style={styles.actionText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
        )}
      </View>

      {/* Histórico */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Histórico - Concluídos</Text>
        {habits.filter((h) => h.completed).length === 0 ? (
          <Text style={styles.empty}>Nenhum hábito concluído recentemente.</Text>
        ) : (
          habits
            .filter((h) => h.completed)
            .map((h) => (
              <View key={h.id} style={styles.historyCard}>
                <View style={styles.historyInfo}>
                  <Text style={styles.habitTitle}>{h.name}</Text>
                  <Text style={styles.historyMeta}>
                    {h.completionDate ? new Date(h.completionDate).toLocaleString('pt-BR') : '-'} • {h.xpEarned || 0} XP
                  </Text>
                </View>
              </View>
            ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#ffffff', flexGrow: 1 },
  header: { fontSize: 20, fontWeight: '700', color: '#02457a', marginBottom: 12, alignSelf: 'center' },
  form: { backgroundColor: '#f8feff', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#e6f3fb' },
  label: { color: '#02457a', marginBottom: 6, fontWeight: '600' },
  input: { backgroundColor: '#fff', borderColor: '#dbeefb', borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  textArea: { height: 80, textAlignVertical: 'top' },
  pickerWrapper: { borderWidth: 1, borderColor: '#dbeefb', borderRadius: 8, overflow: 'hidden', marginBottom: 12 },
  saveButton: { backgroundColor: '#2e8b57', padding: 12, borderRadius: 8, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: '700' },
  /* Estatísticas */
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  statBox: { flex: 1, backgroundColor: '#f3fbff', padding: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: '#dbeefb' },
  statNumber: { fontSize: 18, fontWeight: '700', color: '#02457a' },
  statLabel: { fontSize: 12, color: '#065f46', marginTop: 4 },

  section: { marginTop: 18 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#02457a', marginBottom: 8 },
  empty: { color: '#6b7280', fontStyle: 'italic' },

  /* Hábitos */
  habitCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fbfeff', borderWidth: 1, borderColor: '#dbeefb', padding: 12, borderRadius: 10, marginBottom: 8 },
  habitInfo: { flex: 1 },
  habitTitle: { fontSize: 14, fontWeight: '700', color: '#0f172a' },
  habitCategory: { color: '#065f46', marginTop: 4 },
  habitDesc: { color: '#475569', marginTop: 6 },
  habitActions: { marginLeft: 8, alignItems: 'flex-end' },
  concludeButton: { backgroundColor: '#2e8b57', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, marginBottom: 8 },
  deleteButton: { backgroundColor: '#e53e3e', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8 },
  actionText: { color: '#fff', fontWeight: '700' },

  /* Histórico */
  historyCard: { backgroundColor: '#f9fff7', borderWidth: 1, borderColor: '#dfefe0', padding: 12, borderRadius: 10, marginBottom: 8 },
  historyInfo: {},
  historyMeta: { color: '#475569', marginTop: 6 },
});

export default HabitosScreen;
