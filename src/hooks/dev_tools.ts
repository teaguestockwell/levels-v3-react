import create, { State, StateCreator, UseBoundStore } from 'zustand'
import {devtools} from 'zustand/middleware'

// https://github.com/pmndrs/zustand/blob/main/tests/middlewareTypes.test.tsx
interface ISelectors<T> {
  use: {
    [key in keyof T]: () => T[key]
  }
}

const createSelectorHooks = <
  T extends State,
  TUseBoundStore extends UseBoundStore<T> = UseBoundStore<T>
>(
  store: TUseBoundStore
) => {
  const storeAsSelectors = store as unknown as ISelectors<T>
  storeAsSelectors.use = {} as ISelectors<T>['use']

  Object.keys(store.getState()).forEach((key) => {
    const storeKey = key as keyof T
    const selector = (state: T) => state[storeKey]

    storeAsSelectors.use[storeKey] = () => store(selector)
  })

  return store as TUseBoundStore & ISelectors<T>
}

export const createStoreWithDevtool = <T extends State>(
  createState: StateCreator<T>,
  options = { name: 'prefix' }
): UseBoundStore<T> & ISelectors<T> => {
  return createSelectorHooks(create(devtools(createState, options)))
}