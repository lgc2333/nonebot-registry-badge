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

export interface PluginItem {
  module_name: string
  project_link: string
  supported_adapters: string[] | null
  valid: boolean
}
export type PluginsResult = PluginItem[]

export interface AdapterItem {
  module_name: string
  project_link: string
  name: string
}
export type AdaptersResult = AdapterItem[]

export interface RegistryResultItemResults {
  validation: boolean
  load: boolean
  metadata: boolean
}
export interface RegistryResultItem {
  results: RegistryResultItemResults
}
export type RegistryResults = Record<string, RegistryResultItem>
