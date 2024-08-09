import routeManager from './route'
import './routers'

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url)
    const routeRes = routeManager.getRoute(url)
    if (!routeRes) return new Response(null, { status: 404 })
    const [route, args] = routeRes
    return route({ url, args, request, env, ctx })
  },
} satisfies ExportedHandler<Env>
