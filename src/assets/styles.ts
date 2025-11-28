import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#02457a',
  accent: '#2e8b57',
  white: '#ffffff',
  lightBg: '#f3f7f9',
  muted: '#6b7280',
  text: '#0f172a',
  cardBg: '#fbfeff',
  border: '#e6eef6',
  cardBorder: '#e6f3fb',
  blue: '#3498DB',
  grayBorder: '#d1d5db',
};

const globalStyles = StyleSheet.create({
  // Containers
  container: { flex: 1, backgroundColor: colors.white, justifyContent: 'center' },
  page: { padding: 16, backgroundColor: colors.white },
  inner: { paddingHorizontal: 24, alignItems: 'center' },

  // Typography
  title: { fontSize: 22, fontWeight: '700', color: colors.primary, marginBottom: 24 },
  titleHelp: { fontSize: 14, color: colors.muted, marginBottom: 12, textAlign: 'center' },

  // Inputs / Buttons
  input: {
    width: '100%',
    height: 48,
    backgroundColor: colors.lightBg,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
  },
  button: {
    marginTop: 8,
    width: '100%',
    height: 48,
    backgroundColor: colors.accent,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  signUpPrompt: { marginTop: 12, color: '#065f46', fontSize: 13, textAlign: 'center' },

  // Cards
  card: {
    backgroundColor: colors.cardBg,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  cardTitle: { fontWeight: '700', color: colors.primary, marginBottom: 8 },

  // Avatar / header
  avatar: { width: 72, height: 72, borderRadius: 36, marginRight: 12 },
  editButton: { backgroundColor: colors.blue, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  editButtonText: { color: colors.white, fontWeight: '700' },

  // Layout helpers
  spacerSmall: { height: 12 },
  spacerLarge: { height: 48 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between' },

  // Action buttons
  secondaryButton: { backgroundColor: colors.accent, padding: 12, borderRadius: 8, flex: 1, marginRight: 8, alignItems: 'center' },
  secondaryButtonText: { color: colors.white, fontWeight: '700' },
  ghostButton: { borderWidth: 1, borderColor: colors.grayBorder, padding: 12, borderRadius: 8, flex: 1, marginLeft: 8, alignItems: 'center' },
  ghostButtonText: { color: colors.text, fontWeight: '700' },

  // Logo sizes
  logoLarge: { width: 220, height: 220, marginBottom: 16, borderRadius: 12 },
});

export default globalStyles;
