const primary = '#388e3c';
const primaryLight = '#66bb6a';
const primaryDark = '#2c6e2f';
const secondary = '#1b5e20';
const accent = '#00e676';
const lightBackground = '#f1f8e9';
const lightPaper = '#ffffff';
const darkBackground = '#121212';
const darkPaper = '#1e1e1e';

const lightPalette = {
  mode: 'light' as const,
  primary: {
    main: primary,
    light: primaryLight,
    dark: primaryDark,
  },
  secondary: {
    main: secondary,
  },
  background: {
    default: lightBackground,
    paper: lightPaper,
  },
  text: {
    primary: '#1b5e20',
    secondary: '#424242',
  },
  action: {
    active: '#00e676',
    hover: '#66bb6a',
    selected: '#388e3c',
  },
};

const darkPalette = {
  mode: 'dark' as const,
  primary: {
    main: primaryDark,
    light: primaryLight,
    dark: '#2e7d32',
  },
  secondary: {
    main: accent,
  },
  background: {
    default: darkBackground,
    paper: darkPaper,
  },
  text: {
    primary: '#a5d6a7',
    secondary: '#e8f5e9',
  },
};

export { lightPalette, darkPalette };
