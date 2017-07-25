
import Auth from '../model/Auth'

export default async (ctx) => {
  const { userId } = ctx.request.decoded
  const { deviceId } = ctx.query

  const mathArr = await Auth.find( { $and: [
                            { user: userId },
                            { device: deviceId }
                          ] })
  const canView = matchArr.some((item, index) => {
      return item.canView === true
  })

  const canMonitor = matchArr.some((item, index) => {
    return item.canMonitor === true
  })

  return {
    canView,
    canMonitor
  }
}