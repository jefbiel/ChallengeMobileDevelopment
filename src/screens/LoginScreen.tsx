import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../assets/styles';

const LoginScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateEmail = (value: string) => {
    // regex simples e efetiva para validação básica de e-mail
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(value).toLowerCase());
  };

  const handleLogin = () => {
    if (!email.trim() || !password) {
      Alert.alert('Erro', 'Por favor, insira usuário e senha');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido');
      return;
    }

    // TODO: Integrar com AsyncStorage / API no futuro
    // Navega diretamente para a tela principal sem exibir popup
    navigation.replace('MainTabs');
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={globalStyles.inner}>
        <Image
          source={require('../assets/img/NewCareLogo.png')}
          style={globalStyles.logoLarge}
          resizeMode="contain"
        />

        <Text style={globalStyles.title}>Login</Text>
        <Text style={globalStyles.titleHelp}>Use seu e-mail e senha para acessar sua conta.</Text>

        <TextInput
          style={globalStyles.input}
          placeholder="E-mail"
          placeholderTextColor="#6b7280"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={globalStyles.input}
          placeholder="Senha"
          placeholderTextColor="#6b7280"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={globalStyles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={globalStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={globalStyles.signUpPrompt}>Não tem conta? Cadastre-se grátis e começe agora.</Text>
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;
