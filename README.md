# 📱 NewCare — Pequenos Hábitos, Grandes Conquistas

## 👥 Integrantes

| Nome                                 | RM       |
| ------------------------------------ | -------- |
| Gilson Dias Ramos Junior             | RM552345 |
| Gustavo Bezerra Assumção             | RM553076 |
| Jeferson Gabriel De Mendonça         | RM553149 |
| Larissa Estella Gonçalves dos Santos | RM552695 |

## 📌 Descrição do Projeto

Aplicativo mobile desenvolvido em **React Native** com foco em saúde preventiva. O usuário cria e mantém hábitos saudáveis, acumulando XP conforme cumpre tarefas diárias. O avatar evolui conforme seu desempenho, reforçando o progresso.

Protótipo acadêmico para a disciplina **Mobile Development and IoT**.

---

## 🚀 Funcionalidades

* Cadastro e gerenciamento de hábitos
* Evolução do avatar através de XP
* Histórico de conquistas
* Navegação entre telas com atualização imediata
* Interface prática e gamificada

---

## 🧱 Arquitetura & Tecnologias

* **React Native**
* **TypeScript**
* **React Navigation**
* Async Storage
* Componentização por telas e navegação stack/tab

---

## 🛠️ Instalação & Configuração

### 4️⃣ Setup & Execução

### 4.1 Pré‑requisitos

* Node.js **18.x** ou **20.x**
* NPM 9.x ou Yarn
* Android Studio com SDK + AVD configurado
* (Opcional) dispositivo Android com USB Debugging

### 4.2 Instalar Dependências

```bash
npm install

# Navegação e utilitários
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs \
react-native-screens react-native-safe-area-context react-native-gesture-handler \
@react-native-picker/picker react-native-vector-icons @react-native-async-storage/async-storage
```

### 4.3 Limpeza de Cache 

```bash
npx react-native start --reset-cache

cd android
./gradlew clean
cd ..

```

### 4.4 Executar no Emulador Android

**Terminal 1 — Metro Bundler**

```bash
npx react-native start
```

**Terminal 2 — Build e execução**

```bash
npx react-native run-android
```

**Tudo em um comando (com Metro ativo):**

```bash
npx react-native run-android --variant=debug
```

---


## 🏁 Resultado Esperado

Ao executar o app, o usuário poderá:

* Registrar e concluir hábitos diariamente
* Ganhar XP e evoluir o avatar
* Acompanhar progresso no perfil
* Navegar entre telas com sincronização interna

> Aplicação com foco educacional/saúde preventiva — sem caráter diagnóstico.

---

## 📚 Licença

© 2025 — Grupo **G³**
Projeto acadêmico — uso exclusivo para fins educacionais.

---

👨‍💻 Desenvolvido pela **G³ — NewCare**
**Pequenos hábitos, grandes conquistas.**
