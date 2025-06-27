# Gestor de Frota — Configuração e Instalação

Este guia mostra como configurar o ambiente no PowerShell do VS Code para rodar o projeto Gestor de Frota, feito com React Native, Firebase e Expo Router.

---

## ✅ Pré-requisitos

Antes de tudo, você precisa ter instalado:

1. **Node.js** (versão LTS recomendada)
   - [Download Node.js](https://nodejs.org/)
   - Verifique com:
     ```powershell
     node -v
     ```

2. **Expo CLI**
   ```powershell
   npm install -g expo-cli
   ```

---

## 📦 Instalando Dependências

Na pasta do projeto, execute:

```powershell
npm install
```

---

## 🔥 Firebase - Instalações necessárias

Certifique-se de ter os pacotes do Firebase instalados:

```powershell
npm install firebase
```

---

## 📱 AsyncStorage (armazenamento local)

```powershell
npx expo install @react-native-async-storage/async-storage
```

---

## 🧭 Navegação com Expo Router

```powershell
npx expo install expo-router react-native-screens react-native-safe-area-context
```

---

## 🧪 Tipagem (opcional mas recomendado)

```powershell
npm install --save-dev typescript @types/react @types/react-native
```

---

## ▶️ Rodando o projeto

Com tudo instalado, execute:

```powershell
npx expo start
```

Isso abrirá o Metro Bundler no navegador. Você pode rodar no emulador Android Studio, iOS (Mac), ou seu celular com o app **Expo Go**.

---
