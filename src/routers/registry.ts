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
    }
  } else {
    return {
      ...baseShieldsResponse,
      isError: true,
      message: 'Plugin Not Found',
    }
  }
}

export async function fetchRegistryResults(): Promise<RegistryResult> {
  return fetch(
    'https://raw.githubusercontent.com/nonebot/registry/results/results.json',
  ).then((res) => res.json())
}

export async function registryRouter({ args }: RouterHandlerParams): Promise<Response> {
  if (args.length > 1) return new Response(null, { status: 404 })
  const results = await fetchRegistryResults()
  const data = (() => {
    for (const [key, value] of Object.entries(results)) {
      const [projectName, packageName] = key.split(':')
      if (projectName === args[0] && packageName === args[1]) return value
    }
    return null
  })()
  return new Response(JSON.stringify(constructShieldsResponse(data)), {
    headers: { 'content-type': 'application/json' },
  })
}

routeManager.register('registry', registryRouter)
