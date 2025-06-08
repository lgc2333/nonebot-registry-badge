import type { RouterHandlerParams } from '../route'
import routeManager from '../route'
import type { ShieldsResponse } from '../types'
import {
  baseShieldsResponse,
  fetchAdaptersResult,
  fetchPluginsResult,
  fetchRegistryResults,
  isTruthy,
  pluginNotFoundShieldsResponse,
  queryFromPlugins,
} from '../utils'

const label = 'Supported Adapters'
const checkSames = [
  ['nonebot_plugin_alconna', 'Alconna'],
  ['nonebot_plugin_uninfo', 'UniInfo'],
  ['nonebot_plugin_saa', 'SAA'],
  ['nonebot_plugin_session', 'Session'],
]

export async function constructPluginAdaptersBadge(
  query: string,
  forceShow?: boolean,
  forceAll?: boolean,
  truncateCount = 0,
): Promise<ShieldsResponse> {
  const baseResponse = {
    ...baseShieldsResponse,
    label,
    color: '#ea5252',
  } satisfies Partial<ShieldsResponse>

  const plugins = await fetchPluginsResult()
  const data = queryFromPlugins(plugins, query)
  if (!data) return { ...pluginNotFoundShieldsResponse, label }

  if (!data.supported_adapters) {
    const registryResults = await fetchRegistryResults()
    const pluginResult = registryResults[`${data.project_link}:${data.module_name}`]
    if (!pluginResult) return { ...pluginNotFoundShieldsResponse, label }
    if (!pluginResult.results.metadata) {
      return { ...baseResponse, color: 'red', message: 'No data' }
    }
  }

  if (!data.supported_adapters || !data.supported_adapters.length) {
    return { ...baseResponse, message: 'Any' }
  }

  const lenTip = `${data.supported_adapters.length} adapters`
  const adapters = await fetchAdaptersResult()

  if (!forceShow) {
    const isAllAdapterSupported =
      data.supported_adapters.length === adapters.length &&
      adapters.every((it) => data.supported_adapters!.find((a) => a === it.module_name))
    if (isAllAdapterSupported) {
      return { ...baseResponse, message: `All (${lenTip})` }
    }

    const checkSupportedSameAdapters = (targetModule: string) => {
      const targetAdapters = plugins.find(
        (it) => it.module_name === targetModule,
      )?.supported_adapters
      return targetAdapters
        ? data.supported_adapters!.length === targetAdapters.length &&
            targetAdapters.every((it) => data.supported_adapters!.find((a) => a === it))
        : false
    }

    for (const [moduleName, sameName] of checkSames) {
      if (checkSupportedSameAdapters(moduleName)) {
        return { ...baseResponse, message: `Same as ${sameName} (${lenTip})` }
      }
    }
  }

  let truncated = false
  let shownAdapters = data.supported_adapters
  if (data.supported_adapters.length > truncateCount && !forceAll) {
    truncated = true
    shownAdapters = data.supported_adapters.slice(0, truncateCount)
  }

  const baseMsg = shownAdapters
    ?.map(
      (it) =>
        adapters.find((a) => a.module_name === it)?.name ||
        it.replace('nonebot.adapters.', '~'),
    )
    .join(' & ')
  return {
    ...baseResponse,
    message: truncated
      ? truncateCount
        ? `${baseMsg} & ... (${lenTip} total)`
        : lenTip
      : baseMsg,
  }
}

export async function pluginAdaptersRouter({
  url,
  args,
}: RouterHandlerParams): Promise<Response> {
  if (args.length > 1) return new Response(null, { status: 404 })
  const [query] = args
  const forceShow = isTruthy(url.searchParams.get('force_show'))
  const forceAll = isTruthy(url.searchParams.get('force_all'))
  const truncateCountQuery = url.searchParams.get('truncate_count')
  const truncateCount = truncateCountQuery ? Number.parseInt(truncateCountQuery, 10) : 0
  return new Response(
    JSON.stringify(
      await constructPluginAdaptersBadge(query, forceShow, forceAll, truncateCount),
    ),
    { headers: { 'content-type': 'application/json' } },
  )
}

routeManager.register('plugin-adapters', pluginAdaptersRouter)
