import online from './online/index.mjs'
import offline from './offline/index.mjs'
import event from '../event.js'

const target = {
  online,
  offline
}

const checkNetworkState = () => navigator.onLine

const handler = {
  get: function (obj, prop) {
    if (checkNetworkState()) return obj.online[prop]
    return obj.offline[prop]
  }
}

let api = new Proxy(target, handler);

window.addEventListener('online', function () {
  if (checkNetworkState()) {
    api.sync()
  }
  event.emit('network', true)
})

export default api