export const COLOR = {
  primary100: '#1493FF',
  primary200: '#0075DC',
  primary300: '#0058BA',
  primary400: '#003D99',
  primary500: '#002579',

  alert: '#333333',
  info: '#1493FF',
  success: '#36B37E',
  warning: '#FFAB00',
  error: '#E6382F',

  gray100: '#E0E0E0',
  gray200: '#D3D3D3',
  black: '#333333',
  white: '#FEFEFE',
  offwhite: '#FCFCFC',
} as const;

export type Color = typeof COLOR;
