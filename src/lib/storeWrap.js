export default function (obj) {
  const mutations = {
    updateState (state, payloads) {
      if (!Array.isArray(payloads)) {
        payloads = [payloads]
      }
      payloads.forEach(({ prop, payload }) => {
        state[prop] = payload
      })
    }
  }
  return Object.assign(obj, {
    mutations: { ...mutations, ...obj.mutations }
  })
}
