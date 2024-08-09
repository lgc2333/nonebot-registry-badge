import { AdaptersResult, PluginsResult, ShieldsResponse } from './types'

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

export const pluginNotFoundShieldsResponse = {
  ...baseShieldsResponse,
  isError: true,
  message: 'Plugin Not Found',
  color: 'red',
} satisfies ShieldsResponse

export function trim(str: string, char: string): string {
  while (str.startsWith(char)) str = str.substring(1)
  while (str.endsWith(char)) str = str.substring(0, str.length - 1)
  return str
}

export function isTruthy(value?: string | null): boolean {
  if (!value) return false
  return ['true', '1', 'yes'].includes(value.trim().toLowerCase())
}

export async function fetchPluginsResult(): Promise<PluginsResult> {
  return fetch('https://registry.nonebot.dev/plugins.json').then((res) => res.json())
}

export async function fetchAdaptersResult(): Promise<AdaptersResult> {
  return fetch('https://registry.nonebot.dev/adapters.json').then((res) => res.json())
}

export function makePluginQueryFunc<P, T>(
  transformFunc: (it: P) => T[],
  extractFunc: (it: T) => { projectName: string; moduleName: string },
  projectNamePrefix?: string,
  moduleNamePrefix?: string,
) {
  return (data: P, query: string) => {
    const result = transformFunc(data)
    const found = result.find((it) => {
      const { moduleName, projectName } = extractFunc(it)
      return (
        projectName === query ||
        moduleName === query ||
        (projectNamePrefix && projectName === `${projectNamePrefix}${query}`) ||
        (moduleNamePrefix && moduleName === `${moduleNamePrefix}${query}`)
      )
    })
    return found || null
  }
}

export const queryFromPlugins = makePluginQueryFunc(
  (result: PluginsResult) => result,
  ({ project_link: projectName, module_name: moduleName }) => ({
    projectName,
    moduleName,
  }),
  'nonebot-plugin-',
  'nonebot_plugin_',
)

export const queryFromAdapters = makePluginQueryFunc(
  (result: AdaptersResult) => result,
  ({ project_link: projectName, module_name: moduleName }) => ({
    projectName,
    moduleName,
  }),
  'nonebot-adapter-',
  'nonebot.adapters.',
)
