import { MD3DarkTheme, configureFonts } from 'react-native-paper';

const fontConfig = {
  displayLarge: {
    fontFamily: 'System',
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 56,
  },
  titleLarge: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
    lineHeight: 34,
  },
  labelLarge: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    lineHeight: 16,
    textTransform: 'uppercase',
  },
} as const;

export const theme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#CCFF00',
    primaryContainer: 'rgba(204, 255, 0, 0.1)',
    secondary: '#FFFFFF',
    secondaryContainer: 'rgba(255, 255, 255, 0.05)',
    background: '#040404',
    surface: '#151515',
    surfaceVariant: '#1D1D1D',
    onSurface: '#FFFFFF',
    outline: '#333333',
    error: '#FF3B30',
  },
  roundness: 16,
};
