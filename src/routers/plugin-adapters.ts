import routeManager, { RouterHandlerParams } from '../route'
import { PluginItem, ShieldsResponse } from '../types'
import {
  baseShieldsResponse,
  fetchAdaptersResult,
  fetchPluginsResult,
  pluginNotFoundShieldsResponse,
  queryFromPlugins,
} from '../utils'

export async function constructPluginAdaptersBadge(
  data: PluginItem | null,
): Promise<ShieldsResponse> {
  if (!data) return pluginNotFoundShieldsResponse
  const adapters = await fetchAdaptersResult()
  return {
    ...baseShieldsResponse,
    label: 'Supported Adapters',
    message:
      data.supported_adapters
        ?.map(
          (it) =>
            adapters.find((a) => a.module_name === it)?.name ||
            it.replace('nonebot.adapters.', '~'),
        )
        .join(' & ') || 'Any',
  }
}

export async function pluginAdaptersRouter({
  args,
}: RouterHandlerParams): Promise<Response> {
  if (args.length > 1) return new Response(null, { status: 404 })
  const [query] = args
  const results = await fetchPluginsResult()
  const data = queryFromPlugins(results, query)
  return new Response(JSON.stringify(await constructPluginAdaptersBadge(data)), {
    headers: { 'content-type': 'application/json' },
  })
}

routeManager.register('plugin-adapters', pluginAdaptersRouter)
