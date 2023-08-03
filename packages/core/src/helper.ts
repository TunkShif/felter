export const uniqueId = () => crypto.randomUUID()

export const observable = <T>(value: T) => {
  type Listener = (state: T) => void

  const state = value
  const listeners = new Set<Listener>()

  return {
    getState() {
      return state
    },
    setState(setter: (state: T) => void) {
      setter(state)
      listeners.forEach((listener) => listener(state))
    },
    subscribe(listener: Listener) {
      listener(state)
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  }
}
