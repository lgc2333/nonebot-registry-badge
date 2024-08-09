import routeManager from '../route'

export async function rootRouter(): Promise<Response> {
  return Response.redirect('https://github.com/lgc2333/nonebot-registry-badge')
}

routeManager.register('', rootRouter)
