# MAP — Módulo Avatar & Prevenção (Care Plus)

**Disciplina:**

**Grupo:** G³

**Turma:** Engenharia de Software - 3º Ano

## Integrantes

- Gilson Dias - RM552345
- Gustavo Bezerra - RM553076
- Gabriel de Mendonça - RM553149
- Larissa Estella - RM552695

📺🔗 Vídeo explicativo: https://youtu.be/8gxoQRHYS10

---

## Problema e Solução Proposta

### O Problema
A Care Plus precisa de soluções digitais para prevenção e bem-estar que aumentem o engajamento do usuário em hábitos saudáveis (sem realizar diagnósticos clínicos ou telemedicina).

### A Solução: MAP
Desenvolvemos um protótipo de gamificação — um módulo chamado **MAP** (Módulo Avatar & Prevenção). O núcleo é um avatar que representa o usuário. O avatar e o sistema de pontos (XP) incentivam a adoção de hábitos saudáveis.

O protótipo também inclui um módulo experimental (em Python) chamado *Detector de Fadiga* que demonstra como dados de sensores / visão computacional poderiam alimentar a plataforma (apenas simulação — não é diagnóstico).

---

## Objetivo do Projeto

Prototipar uma solução de saúde digital que promova prevenção e bem-estar através de gamificação, oferecendo evidências de funcionamento no emulador Android.

---

## Funcionalidades implementadas (resumo do código)

- Tela de Login: validação de formulário e navegação para a aplicação.
- Tela Home: resumo, progresso de hábitos, XP mostrado e lista de exames/recomendações.
- Tela Hábitos: criar hábitos, listar hábitos ativos, concluir/excluir, histórico e estatísticas; persistência com `AsyncStorage`.
- Tela Perfil: avatar do usuário, XP acumulado e histórico (visualização).
- Sincronização interna: quando hábitos são criados/concluídos, Home é atualizado em tempo real via evento (`DeviceEventEmitter`).
- Armazenamento local: `AsyncStorage` para hábitos e XP (chaves `@habitos` e `@xp`).

Extras (prototipagem IoT/IA — separado do app RN):
- Detector de Fadiga (script Python): exemplo de detector de micro-sono (EAR) e bocejo (MAR). Gera logs CSV simulando telemetria.

---

## Critérios de avaliação — onde encontrar no projeto

- (15 pts) Tela de Login (validação): `src/screens/LoginScreen.tsx` (validação básica do formato do e‑mail e campos obrigatórios).
- (40 pts) Telas e componentes (View, ScrollView, TextInput, Text, Image, TouchableOpacity, Alert, Picker): implementadas em `src/screens/*` (ver `HomeScreen`, `HabitosScreen`, `PerfilScreen`).
- (25 pts) Estilização: uso de `StyleSheet.create(...)` nas telas principais.
- (10 pts) Arquitetura: código organizado em `src/screens`, `src/navigation`, `src/assets`.

> Veja também o arquivo `TODO.md` / `REPO_URL.txt` para instruções de submissão no Teams.

---

## Dependências principais (React Native)

Instale as dependências do projeto (npm):

```bash
npm install
# pacotes principais usados pelo projeto
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs \
  react-native-screens react-native-safe-area-context react-native-gesture-handler \
  @react-native-picker/picker react-native-vector-icons @react-native-async-storage/async-storage
```

Após instalar dependências nativas (macOS/iOS) rode `pod install` dentro de `ios`:

```bash
cd ios && pod install && cd ..
```

Reinicie o Metro com cache limpo se adicionar assets:

```bash
npx react-native start --reset-cache
```

### Requisitos de ambiente recomendados

- Node.js 18.x ou 20.x
- NPM 9.x ou Yarn equivalente
- Android SDK e AVD configurado para emulação Android

---

## Dependências do módulo Detector de Fadiga (opcional, Python)

Este módulo é um protótipo separado (pasta `detector-fatigue` se incluída) e requer Python 3.x:

```bash
pip install opencv-python mediapipe numpy
```

Obs: `winsound` (alerta sonoro) é nativo do Windows; em macOS/Linux use alternativas para som.

---

## Como executar (Android emulador)

1. Instale dependências:

```bash
npm install
```

2. Inicie o Metro (opcional com reset de cache):

```bash
npx react-native start --reset-cache
```

3. Abra o emulador Android (AVD) e rode:

```bash
npx react-native run-android
```

4. Credenciais de teste (login):

- Email: `demo@test.com`
- Senha: `123456`

> Observação: o login atual apenas valida formato e campos; as credenciais acima são para facilitar a avaliação.

---

## Como entregar no Teams

Gere um arquivo simples com a URL do repositório e envie no sistema da disciplina. Exemplo:

```bash
echo "https://github.com/jefbiel/AppChallenge.git" > REPO_URL.txt
git add REPO_URL.txt && git commit -m "chore(docs): add REPO_URL.txt para submissão no Teams" && git push origin main
```

---

## Logs e dados (Histórico de hábitos)

Os hábitos e XP são salvos localmente em `AsyncStorage` com as chaves `@habitos` e `@xp`. O histórico de hábitos concluídos (data e XP ganho) aparece na tela `Hábitos` (Histórico).

O módulo Detector de Fadiga (quando usado) grava eventos em CSV: `log_sessao_*.csv` (simula telemetria IoT).

---

## Screenshots

Adicione screenshots aqui (ex.: `screenshots/login.png`, `screenshots/home.png`). Se deseja que eu gere um README com imagens, me envie os screenshots ou me diga para apenas instruir como capturá‑los.

---

## Mapeamento rápido dos arquivos importantes

- `src/screens/LoginScreen.tsx` — Tela de login e validação.
- `src/screens/HomeScreen.tsx` — Resumo, progresso e lista de hábitos.
- `src/screens/HabitosScreen.tsx` — Formulário, lista, histórico, conclusão e exclusão de hábitos.
- `src/screens/PerfilScreen.tsx` — Perfil do usuário e estatísticas.
- `src/navigation/MainTabs.tsx` — Navegação via tabs.

---

Se quiser, eu posso:

- A) Gerar e commitar o `REPO_URL.txt` (arquivo requerido pelo Teams). 
- B) Adicionar screenshots e inserir caminhos no README (me envie as imagens).
- C) Instruir passo-a-passo para criar um APK de release (caso precise entregar APK).

Diga qual dessas ações quer que eu faça agora.
This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metrio

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## Dependências usadas neste projeto

O projeto utiliza as seguintes bibliotecas de navegação, UI e utilitários:

- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`
- `react-native-screens`
- `react-native-safe-area-context`
- `react-native-gesture-handler`
- `@react-native-picker/picker`
- `react-native-vector-icons`

Comandos de instalação (npm):

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs \
	react-native-screens react-native-safe-area-context react-native-gesture-handler \
	@react-native-picker/picker react-native-vector-icons
```

Observações:
- Após instalar dependências nativas (iOS), rode `pod install` dentro da pasta `ios`:

```bash
cd ios && pod install && cd ..
```

- Reinicie o Metro com cache limpo quando adicionar/alterar dependências ou assets:

```bash
npx react-native start --reset-cache
```

## Assets

Coloque os arquivos de imagem usados pelo app em `src/assets/img/`:

```
src/assets/img/
	NewCareLogo.png
	NewCareLogoHorizontal.png
	bell.png
```

No código, importe imagens locais usando `require`, por exemplo:

```tsx
<Image source={require('./src/assets/img/NewCareLogo.png')} />
```


## Integrantes

- Gilson Dias - RM552345
- Gustavo Bezerra - RM553076
- Gabriel de Mendonça - RM553149
- Larissa Estella - RM552695


## Credenciais de teste (Login)

Use estas credenciais para testar o fluxo de login (validação de formulário):

- Email: `demo@test.com`
- Senha: `123456`

Observação: o login atualmente faz apenas validação local de formulário (sem backend). Informe estas credenciais no README para a avaliação.


## Como entregar no Teams

Crie um arquivo simples com a URL do repositório e envie pelo sistema Teams. Exemplo de comando para gerar o arquivo localmente:

```bash
echo "https://github.com/jefbiel/AppChallenge.git" > REPO_URL.txt
git add REPO_URL.txt && git commit -m "chore(docs): add REPO_URL.txt para submissão no Teams" && git push origin main
```


## Mapeamento dos critérios de avaliação

Rápido resumo sobre onde cada requisito está implementado no repositório (ajuda o avaliador):

- (15 pts) Tela de Login (validação de formulário): `src/screens/LoginScreen.tsx` — valida e navega para a tela principal.
- (40 pts) 3 a 5 telas e componentes obrigatórios:
	- Telas implementadas: `src/screens/LoginScreen.tsx`, `src/screens/HomeScreen.tsx`, `src/screens/HabitosScreen.tsx`, `src/screens/PerfilScreen.tsx` (navegação em `src/navigation/MainTabs.tsx`).
	- Componentes usados: `View`, `ScrollView`, `TextInput`, `Text`, `Image`, `TouchableOpacity`, `Alert`, `Picker` (por exemplo em `HabitosScreen` e `HomeScreen`).
- (25 pts) Estilização: estilos centralizados com `StyleSheet` em cada tela (`StyleSheet.create` presente nas telas principais).
- (10 pts) Arquitetura e pastas: código organizado em `src/screens`, `src/navigation`, `src/assets`.

Penalidades importantes a observar:
- Garanta que a navegação entre telas funcione (use `MainTabs` para trocar entre abas). Se a navegação falhar, haverá penalidade.
- Documente as credenciais de teste no README (já adicionadas acima).


## Versões / Ambientes recomendados

- Node.js recomendado: `18.x` ou `20.x`
- NPM: `9.x` ou Yarn equivalente
- React Native: conforme `package.json` do projeto
- Android: ter o Android SDK e um AVD configurado (emulador) ou dispositivo conectado.

Comandos úteis para desenvolvimento:

```bash
npm install
npx react-native start --reset-cache
npx react-native run-android
```

