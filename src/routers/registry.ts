import { baseShieldsResponse, ShieldsResponse } from '../const'
import routeManager, { RouterHandlerParams } from '../route'

export interface RegistryResultItem {
  results: { validation: boolean }
}
export type RegistryResult = Record<string, RegistryResultItem>

export function constructShieldsResponse(
  data: RegistryResultItem | null,
): ShieldsResponse {
  if (data) {
    return {
      ...baseShieldsResponse,
      message: data.results.validation ? 'passing' : 'failing',
      color: data.results.validation ? 'brightgreen' : 'red',
    }
  } else {
    return {
      ...baseShieldsResponse,
      isError: true,
      message: 'Plugin Not Found',
      color: 'red',
    }
  }
}

export async function fetchRegistryResults(): Promise<RegistryResult> {
  return fetch('https://registry.nonebot.dev/results.json').then((res) => res.json())
}

export async function registryRouter({ args }: RouterHandlerParams): Promise<Response> {
  if (args.length > 1) return new Response(null, { status: 404 })
  const [query] = args
  const results = await fetchRegistryResults()
  const data = (() => {
    for (const [key, value] of Object.entries(results)) {
      const [projectName, packageName] = key.split(':')
      if (
        projectName === query ||
        packageName === query ||
        projectName === `nonebot-plugin-${query}` ||
        packageName === `nonebot_plugin_${query}`
      ) {
        return value
      }
    }
    return null
  })()
  return new Response(JSON.stringify(constructShieldsResponse(data)), {
    headers: { 'content-type': 'application/json' },
  })
}

routeManager.register('registry', registryRouter)
