import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type Habit = {
  id: string;
  name: string;
  description: string;
  category: string;
  completed?: boolean;
};

const HABITS_KEY = '@habitos';

const HabitosScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Exercício');

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
      };

      const json = await AsyncStorage.getItem(HABITS_KEY);
      const current: Habit[] = json ? JSON.parse(json) : [];
      const updated = [newHabit, ...current];
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));

      Alert.alert('Sucesso', 'Hábito salvo com sucesso');
      setName('');
      setDescription('');
      setCategory('Exercício');

      // voltar para a Home para que ela recarregue (useIsFocused na Home irá buscar)
      // ou apenas navegar para a aba Home
      // @ts-ignore
      navigation.navigate('HomeTab');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar o hábito');
    }
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
});

export default HabitosScreen;
