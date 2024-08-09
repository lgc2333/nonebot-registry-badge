import routeManager, { RouterHandlerParams } from '../route'
import { ShieldsResponse } from '../types'
import {
  baseShieldsResponse,
  fetchAdaptersResult,
  fetchPluginsResult,
  isTruthy,
  pluginNotFoundShieldsResponse,
  queryFromPlugins,
} from '../utils'

export async function constructPluginAdaptersBadge(
  query: string,
  forceShow?: boolean,
): Promise<ShieldsResponse> {
  const baseResponse = {
    ...baseShieldsResponse,
    label: 'Supported Adapters',
    color: '#ea5252',
  } satisfies Partial<ShieldsResponse>

  const plugins = await fetchPluginsResult()
  const data = queryFromPlugins(plugins, query)
  if (!data) return { ...pluginNotFoundShieldsResponse, label: 'Supported Adapters' }

  const adapters = await fetchAdaptersResult()
  if (!forceShow) {
    const isAllAdapterSupported = adapters.every((it) =>
      data.supported_adapters?.find((a) => a === it.module_name),
    )
    if (isAllAdapterSupported) {
      return { ...baseResponse, message: 'All' }
    }

    const checkSupportedSameAdapters = (targetModule: string) => {
      const targetAdapters = plugins.find(
        (it) => it.module_name === targetModule,
      )?.supported_adapters
      return targetAdapters
        ? targetAdapters.every((it) => data.supported_adapters?.find((a) => a === it))
        : false
    }

    if (checkSupportedSameAdapters('nonebot_plugin_alconna')) {
      return { ...baseResponse, message: 'Same as Alconna' }
    }
    if (checkSupportedSameAdapters('nonebot_plugin_saa')) {
      return { ...baseResponse, message: 'Same as SAA' }
    }
  }

  return {
    ...baseResponse,
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
  url,
  args,
}: RouterHandlerParams): Promise<Response> {
  if (args.length > 1) return new Response(null, { status: 404 })
  const [query] = args
  const forceShow = isTruthy(url.searchParams.get('force_show'))
  return new Response(
    JSON.stringify(await constructPluginAdaptersBadge(query, forceShow)),
    {
      headers: { 'content-type': 'application/json' },
    },
  )
}

routeManager.register('plugin-adapters', pluginAdaptersRouter)
