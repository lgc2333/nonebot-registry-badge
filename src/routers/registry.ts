import routeManager from '../route'
import { pluginRouter } from './plugin'

routeManager.register('registry', pluginRouter)
