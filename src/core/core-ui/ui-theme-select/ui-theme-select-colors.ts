import { DEFAULT_THEME, MantineColor, MantineColorsTuple } from '@mantine/core'

export const MANTINE_COLORS = DEFAULT_THEME.colors

export type BackgroundColors = 'gray' | 'neutral' | 'slate' | 'stone' | 'zinc'

// https://unpkg.com/browse/tailwindcss@3.4.1/lib/public/colors.js
export const BACKGROUND_COLORS: Record<BackgroundColors, MantineColorsTuple> = {
  gray: [
    // '#f9fafb',
    '#f3f4f6',
    '#e5e7eb',
    '#d1d5db',
    '#9ca3af',
    '#6b7280',
    '#4b5563',
    '#374151',
    '#1f2937',
    '#111827',
    '#030712',
  ],
  neutral: [
    // '#fafafa',
    '#f5f5f5',
    '#e5e5e5',
    '#d4d4d4',
    '#a3a3a3',
    '#737373',
    '#525252',
    '#404040',
    '#262626',
    '#171717',
    '#0a0a0a',
  ],
  slate: [
    // "#f8fafc",
    '#f1f5f9',
    '#e2e8f0',
    '#cbd5e1',
    '#94a3b8',
    '#64748b',
    '#475569',
    '#334155',
    '#1e293b',
    '#0f172a',
    '#020617',
  ],
  stone: [
    // '#fafaf9',
    '#f5f5f4',
    '#e7e5e4',
    '#d6d3d1',
    '#a8a29e',
    '#78716c',
    '#57534e',
    '#44403c',
    '#292524',
    '#1c1917',
    '#0c0a09',
  ],
  zinc: [
    // '#fafafa',
    '#f4f4f5',
    '#e4e4e7',
    '#d4d4d8',
    '#a1a1aa',
    '#71717a',
    '#52525b',
    '#3f3f46',
    '#27272a',
    '#18181b',
    '#09090b',
  ],
}

export const backgroundColorIds: BackgroundColors[] = ['gray', 'neutral', 'slate', 'stone', 'zinc'] as const

export const mantineColorIds: MantineColor[] = [
  'blue',
  'red',
  'pink',
  'grape',
  'violet',
  'indigo',
  'cyan',
  'green',
  'lime',
  'yellow',
  'orange',
  'teal',
] as const
