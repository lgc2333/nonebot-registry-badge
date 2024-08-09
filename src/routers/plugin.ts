import routeManager, { RouterHandlerParams } from '../route'
import { PluginItem, ShieldsResponse } from '../types'
import {
  baseShieldsResponse,
  fetchPluginsResult,
  pluginNotFoundShieldsResponse,
  queryFromPlugins,
} from '../utils'

export function constructPluginBadge(data: PluginItem | null): ShieldsResponse {
  if (!data) return pluginNotFoundShieldsResponse
  return {
    ...baseShieldsResponse,
    message: data.valid ? 'passing' : 'failing',
    color: data.valid ? 'brightgreen' : 'red',
  }
}

export async function pluginRouter({ args }: RouterHandlerParams): Promise<Response> {
  if (args.length > 1) return new Response(null, { status: 404 })
  const [query] = args
  const results = await fetchPluginsResult()
  const data = queryFromPlugins(results, query)
  return new Response(JSON.stringify(constructPluginBadge(data)), {
    headers: { 'content-type': 'application/json' },
  })
}

routeManager.register('plugin', pluginRouter)
