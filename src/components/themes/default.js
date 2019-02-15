// https://github.com/diegohaz/arc/wiki/Styling
import { reversePalette } from 'styled-theme/composer'

const theme = {}

theme.palette = {
  primary: ['#1976d2', '#2196f3', '#71bcf7', '#c2e2fb'],
  secondary: ['#c2185b', '#e91e63', '#f06292', '#f8bbd0'],
  danger: ['#d32f2f', '#f44336', '#f8877f', '#ffcdd2'],
  alert: ['#ffa000', '#ffc107', '#ffd761', '#ffecb3'],
  success: ['#388e3c', '#4caf50', '#7cc47f', '#c8e6c9'],
  white: ['#fff', '#fff', '#eee'],
  grayscale: [
    '#212121',
    '#414141',
    '#616161',
    '#818181',
    '#bdbdbd',
    '#e0e0e0',
    '#eeeeee',
    '#ffffff',
  ],
  cta: ['#fbab16', '#4286f5'],
  pinnedBubbleMain: ['#1565c0', '#00b8d4', '#00bfa5', '#ffb300', '#e65100', '#c2185b', '#d00000'],
  pinnedBubbleSecondary: ['#1565c0', '#9ef8ff', '#9be9c6', '#ffec76', '#f5a668', '#e97e93', '#e66f6d'],
  pinnedBubbleText: ['#ffffff', '#212121', '#212121', '#212121', '#ffffff', '#ffffff', '#ffffff'],
  pinnedBubblePlaceholder: [
    'rgba(255,255,255,0.5)',
    'rgba(0,0,0,0.5)',
    'rgba(0,0,0,0.5)',
    'rgba(0,0,0,0.5)',
    'rgba(255,255,255,0.75)',
    'rgba(255,255,255,0.75)',
    'rgba(255,255,255,0.75)',
  ],
  blackTransparent: [
    'rgba(0,0,0,0.9)',
    'rgba(0,0,0,0.8)',
    'rgba(0,0,0,0.7)',
    'rgba(0,0,0,0.6)',
    'rgba(0,0,0,0.5)',
    'rgba(0,0,0,0.4)',
    'rgba(0,0,0,0.3)',
  ],
  fb: ['#3b5998'],
}

theme.reversePalette = reversePalette(theme.palette)

theme.fonts = {
  primary: 'Helvetica Neue, Helvetica, Roboto, sans-serif',
  pre: 'Consolas, Liberation Mono, Menlo, Courier, monospace',
  quote: 'Georgia, serif',
}

theme.sizes = {
  maxWidth: '1100px',
  fontMessageRegular: '12px',
  fontBubble: '14px',
  fontTitle: '14px',
  fontInput: '14px',
  fontLabel: '10px',
  inputHeight: '36px',

  // for media-queries
  mobile: '(max-width: 480px)',
  landscape: '(orientation: landscape)',
}

export default theme
