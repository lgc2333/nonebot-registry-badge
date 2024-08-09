export interface ShieldsResponse {
  schemaVersion: 1
  label: string
  message: string
  color?: string
  labelColor?: string
  isError?: boolean
  namedLogo?: string
  logoSvg?: string
  logoColor?: string
  logoWidth?: number
  style?: string
}

export const logoSvg = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="32" height="32" viewBox="0 0 32 32" version="1.1"
 xmlns="http://www.w3.org/2000/svg">
<circle cx="16" cy="16" r="15" stroke="#ea5252" fill="transparent" stroke-width="2"/>
</svg>
`.replaceAll('\n', '')

export const baseShieldsResponse = {
  schemaVersion: 1,
  label: 'NoneBot Registry',
  logoSvg,
} satisfies Partial<ShieldsResponse>
