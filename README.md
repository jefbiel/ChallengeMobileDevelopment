# 🚀 MAP — Módulo Avatar & Prevenção (Care Plus)

**Disciplina:** [Preencha a Disciplina]

**Grupo:** G³

**Turma:** Engenharia de Software - 3º Ano

---

## 👥 Integrantes

* Gilson Dias - RM552345
* Gustavo Bezerra - RM553076
* Gabriel de Mendonça - RM553149
* Larissa Estella - RM552695

📺🔗 **Vídeo Explicativo:** [https://youtu.be/8gxoQRHYS10](https://youtu.be/8gxoQRHYS10)

---

## 1. Contexto e Solução

### 1.1 O Problema
A Care Plus precisa de soluções digitais que promovam **prevenção e bem-estar**, aumentando o engajamento do usuário em **hábitos saudáveis** (sem realizar diagnósticos clínicos ou telemedicina).

### 1.2 A Solução Proposta: MAP
Desenvolvemos um protótipo de gamificação em React Native, o **MAP** (Módulo Avatar & Prevenção). A solução tem como núcleo um **avatar** que representa o usuário e um **sistema de pontos (XP)**, incentivando a adoção e a manutenção de rotinas saudáveis.

**Objetivo:** Prototipar uma solução de saúde digital que promova prevenção e bem-estar através de gamificação, com evidências de funcionamento no emulador Android.

### 1.3 Módulo Extra (Protótipo IoT/IA)
O projeto inclui um script experimental em Python (*Detector de Fadiga*) que simula como dados de sensores/visão computacional (detecção de micro-sono / bocejo) poderiam gerar telemetria para a plataforma (função apenas demonstrativa, não clínica).

---

## 2. Funcionalidades Implementadas

O aplicativo foi estruturado com as seguintes funcionalidades:

* **Tela de Login:** Validação básica de formulário e navegação para o app.
* **Tela Home:** Exibe resumo, progresso de hábitos, XP acumulado e lista de exames/recomendações.
* **Tela Hábitos:** Permite **criar, listar, concluir/excluir** hábitos ativos, além de visualizar histórico e estatísticas.
* **Tela Perfil:** Exibe o avatar, o XP acumulado e o histórico de atividades.
* **Sincronização Interna:** Atualização em tempo real da Home via evento (`DeviceEventEmitter`) quando hábitos são criados ou concluídos.
* **Armazenamento Local:** Uso de `AsyncStorage` para persistência dos dados (chaves `@habitos` e `@xp`).

---

## 3. Critérios de Avaliação e Estrutura

### 3.1 Mapeamento de Arquivos Chave

| Requisito | Arquivo/Módulo |
| :--- | :--- |
| **Login e Validação** (15 pts) | `src/screens/LoginScreen.tsx` |
| **Telas / Componentes** (40 pts) | `src/screens/HomeScreen.tsx`, `HabitosScreen.tsx`, `PerfilScreen.tsx` |
| **Estilização (StyleSheet)** (25 pts) | Estilos centralizados nas principais telas (`StyleSheet.create`) |
| **Arquitetura** (10 pts) | Organização em `src/screens`, `src/navigation`, `src/assets` |
| **Navegação** | `src/navigation/MainTabs.tsx` |

### 3.2 Credenciais de Teste (Login)
O login realiza apenas validação local de formato. Use estas credenciais para acessar o app:

* **Email:** `demo@test.com`
* **Senha:** `123456`

---

## 4. Setup e Execução

### 4.1 Requisitos de Ambiente

* **Node.js:** 18.x ou 20.x
* **NPM:** 9.x ou Yarn equivalente
* **Android SDK / AVD:** Configurado para emulação Android

### 4.2 Instalação de Dependências (React Native)

Instale os pacotes principais e as dependências de navegação/armazenamento:

```bash
npm install
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs \
	react-native-screens react-native-safe-area-context react-native-gesture-handler \
	@react-native-picker/picker react-native-vector-icons @react-native-async-storage/async-storage
