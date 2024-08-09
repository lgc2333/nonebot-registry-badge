import { trim } from './utils'

export type RouterHandlerParams = {
  url: URL
  args: string[]
  request: Request
  env: Env
  ctx: ExecutionContext
}
export type RouteHandler = (params: RouterHandlerParams) => Response | Promise<Response>

export class RouteManager {
  public routes: [string, RouteHandler][] = []

  public register(path: string, handler: RouteHandler) {
    this.routes.push([path, handler])
    this.routes.sort((a, b) => b[0].length - a[0].length)
    return this
  }

  public getRoute(url: URL): [RouteHandler, string[]] | null {
    const paths = url.pathname.substring(1)
    for (const [path, handler] of this.routes) {
      if (paths.startsWith(path)) {
        const restPath = trim(paths.substring(path.length), '/')
        return [handler, restPath.split('/')]
      }
    }
    return null
  }
}

export const routeManager = new RouteManager()
export default routeManager
