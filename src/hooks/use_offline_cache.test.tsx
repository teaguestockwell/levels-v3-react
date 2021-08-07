/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { acceptPendingRqCache, useClientSyncStore, CacheState, getLastSyncEpoch, getIsOutdated, getIsCached, getNewLastUpdated, handleFetchLastUpdated, API_ClientServerSync, getState, getStateHandler} from "./use_offline_cache";
import {renderHook} from '@testing-library/react-hooks'
import { mockAircraftsDeep } from "../testUtils/mock_aircrafts_deep";

it('creates a global store', () => {
  expect({...useClientSyncStore.getState(), set: undefined}).toStrictEqual({
    isDebouncing:false,
    state: CacheState.OUTDATED,
    pendingRqClientCache: null,
    set: undefined
  })
})

it('acceptPendingRqCache', async ()=>{
  const pendingRqClientCache = {
    serverEpoch: 123,
    dataState: {[1]: '123'},
    data: {} as any
  }

  const prevRqClientCache = {
    serverEpoch: 123123123,
    dataState: {[1]: '121231233'},
    data: {} as any
  }

  useClientSyncStore.setState({
    isDebouncing: false,
    state: CacheState.OUTDATED,
    pendingRqClientCache,
  })

  const queryClient = new QueryClient();

  const wrapper = ({ children }:any) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  const setupRqCache = () => useQuery('userAirs', () => prevRqClientCache)

  const { result, waitFor } = renderHook(() => setupRqCache(), { wrapper });
  
  await waitFor(() => result.current.isSuccess);

  acceptPendingRqCache()
  
  expect({...useClientSyncStore.getState(), set: undefined}).toStrictEqual({
    set:undefined,
    isDebouncing:false,
    state: CacheState.SYNCED,
    pendingRqClientCache: null
  })
})

it('mocks local storage', () => {
  const store = {
    lastSync: '123'
  } as any

  global.Storage.prototype.setItem = jest.fn((key, value) => {
    store[key] = value
  })

  global.Storage.prototype.getItem = jest.fn((key) => store[key])


  expect(localStorage.getItem('lastSync')).toBe('123')

})

it('getLastSyncEpoch', () => {
  const store = {
    lastSync: '123'
  } as any

  global.Storage.prototype.setItem = jest.fn((key, value) => {
    store[key] = value
  })

  global.Storage.prototype.getItem = jest.fn((key) => store[key])


  expect(localStorage.getItem('lastSync')).toBe('123')

  expect(getLastSyncEpoch()).toBe(123)


  store.lastSync = 'not a number'
  expect(getLastSyncEpoch()).toBe(0)

  delete store.lastSync
  expect(getLastSyncEpoch()).toBe(0)

})

it('getIsOutdated', ()=>{
  const threeDayAgo = Date.now() - (1000 * 60 * 60 * 24 * 3)
  const oneDayAgo = Date.now() - (1000 * 60 * 60 * 24 * 1)

  expect(getIsOutdated(threeDayAgo)).toBe(true)
  expect(getIsOutdated(oneDayAgo)).toBe(false)
})

it('getIsCached', ()=>{
  const threeSecAgo = Date.now() - (1000 * 3)
  const fiveMinAgo = Date.now() - (1000 * 60 * 5)

  expect(getIsCached(threeSecAgo)).toBe(false)
  expect(getIsCached(fiveMinAgo)).toBe(true)
})

it('getNewLastUpdated', async () => {
  const test = await getNewLastUpdated() as any
  const serverEpoch = Date.now()
  test.serverEpoch = serverEpoch

  expect(test).toStrictEqual({
    data: mockAircraftsDeep,
    serverEpoch,
    dataState: {
      '1': '1',
      '2': '2'
    }
  })
})

it('handleFetchLastUpdated', async ()=>{
  await handleFetchLastUpdated()
  const serverEpoch = Date.now()

  const test = useClientSyncStore.getState() as any
  test.set = null
  test.pendingRqClientCache = {
    serverEpoch,
    data: mockAircraftsDeep,
    dataState: {
      '1': '1',
      '2': '2'
    }
  }

  expect(test).toEqual({
    pendingRqClientCache: {
      serverEpoch,
      data: mockAircraftsDeep,
      dataState: {
        '1': '1',
        '2': '2'
      }
    },
    set: null,
    state: CacheState.UPDATABLE,
    isDebouncing: false,
  })
})

it('handleFetchLastUpdated', async ()=>{

  await handleFetchLastUpdated()
  const serverEpoch = Date.now()

  const test = useClientSyncStore.getState() as any
  test.set = null
  test.pendingRqClientCache = {
    serverEpoch,
    data: mockAircraftsDeep,
    dataState: {
      '1': '1',
      '2': '2'
    }
  }

  expect(test).toEqual({
    pendingRqClientCache: {
      serverEpoch,
      data: mockAircraftsDeep,
      dataState: {
        '1': '1',
        '2': '2'
      }
    },
    set: null,
    state: CacheState.UPDATABLE,
    isDebouncing: false,
  })
})

it('getStateHandlers', async () => {
  getStateHandler[CacheState.OFFLINE]()
  getStateHandler[CacheState.SYNCED]()
  getStateHandler[CacheState.OUTDATED]()
})

it('gets synced state', () =>{
  const synced: API_ClientServerSync = {
    serverEpoch: Date.now(),
    isClientSyncedWithServer: true,
    dataState: {}
  }

  expect(getState(synced)).toBe(CacheState.SYNCED)
})

it('gets outdated state', () =>{
  const outdated = null

  const store = {
    lastSync: '123'
  } as any

  global.Storage.prototype.setItem = jest.fn((key, value) => {
    store[key] = value
  })

  global.Storage.prototype.getItem = jest.fn((key) => store[key])

  expect(getState(outdated)).toBe(CacheState.OUTDATED)
})

it('gets fetching state', () => {
  const fetching: API_ClientServerSync = {
    serverEpoch: Date.now(),
    isClientSyncedWithServer: false,
    dataState: {}
  }

  const store = {
    lastSync: Date.now()
  } as any

  global.Storage.prototype.setItem = jest.fn((key, value) => {
    store[key] = value
  })

  global.Storage.prototype.getItem = jest.fn((key) => store[key])

  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(true)

  expect(getState(fetching)).toBe(CacheState.FETCHING)
})

it('gets fetching offline state', () => {
  const offline = {}

  const store = {
    lastSync: Date.now()
  } as any

  global.Storage.prototype.setItem = jest.fn((key, value) => {
    store[key] = value
  })

  global.Storage.prototype.getItem = jest.fn((key) => store[key])

  jest.spyOn(navigator, 'onLine', 'get').mockReturnValueOnce(false)

  expect(getState(offline)).toBe(CacheState.OFFLINE)
})



