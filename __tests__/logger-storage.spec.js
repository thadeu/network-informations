import { setItem, getItem, clear } from '../src/storage'
import * as loggerStorage from '../src/logger-storage'
import { stringify, parse } from '../src/utils'

describe('Manage localStorage', () => {
  it("when setItem", () => {
    setItem(STORAGE_KEY, JSON.stringify({ text: 'Jane Doe' }))
  });

  it('when getItem', () => {
    setItem(STORAGE_KEY, JSON.stringify({ text: 'Jane Doe' }))
    expect(getItem(STORAGE_KEY)).toEqual({ text: 'Jane Doe' })
  })
  
  it('when clear', () => {
    setItem(STORAGE_KEY, JSON.stringify({ text: 'Jane Doe' }))
    expect(loggerStorage.clear()).toEqual(undefined)
  })
})

describe('loggerStorage methods', () => {
  const dateToString = parse(stringify(new Date()))

  describe('when setting options', () => {
    const options = { auto_start: true }

    it('override is true', () => {
      expect(loggerStorage.sync(options).autoStarted()).toBe(true)
    })
    
    it('override is false', () => {
      options.auto_start = false
      expect(loggerStorage.sync(options).autoStarted()).toBe(false)
    })
  })

  describe('when logger is execute', () => {    
    beforeEach(() => {
      loggerStorage.clear()
    })

    it('new entry type log', () => {
      let entryLog = 'testing new entry'
      let items = loggerStorage.logger(entryLog)
      expect(getItem(STORAGE_KEY)).toEqual(items)
    })
    
    it('new entry type error', () => {
      let options = { body: 'testing new entry', type_event: 'error', timestamp: dateToString }
      let items = loggerStorage.logger(null, options)
      expect(getItem(STORAGE_KEY)[0]).toEqual(options)
    })
    
    it('new entry type warn', () => {
      let options = { body: 'testing new entry', type_event: 'warn', timestamp: dateToString }
      let items = loggerStorage.logger(null, options)
      expect(getItem(STORAGE_KEY)[0]).toEqual(options)
    })
    
    it('new entry type info', () => {
      let options = { body: 'testing new entry', type_event: 'info', timestamp: dateToString }
      let items = loggerStorage.logger(null, options)
      expect(getItem(STORAGE_KEY)[0]).toEqual(options)
    })
  })

  describe('filters records in localStorage', () => {
    let error = { body: 'testing new entry', type_event: 'error', timestamp: dateToString }
    let info = { body: 'testing new entry', type_event: 'info', timestamp: dateToString }
    let warn = { body: 'testing new entry', type_event: 'warn', timestamp: dateToString }
    let log = { body: 'testing new entry', type_event: 'log', timestamp: dateToString }

    beforeEach(() => {
      loggerStorage.logger(null, error)
      loggerStorage.logger(null, info)
      loggerStorage.logger(null, warn)
      loggerStorage.logger(null, log)
    })
  
    it('when filter by log', async () => {      
      let items = await loggerStorage.logs()
      expect(items && items[0].type_event).toBe('log')
    })
    
    it('when filter by error', async () => {      
      let items = await loggerStorage.errors()
      expect(items && items[0].type_event).toBe('error')
    })
    
    it('when filter by info', async () => {      
      let items = await loggerStorage.infos()
      expect(items && items[0].type_event).toBe('info')
    })
    
    it('when filter by warn', async () => {      
      let items = await loggerStorage.warns()
      expect(items && items[0].type_event).toBe('warn')
    })

    describe('when filter all logs', () => {
      it('get error true when empty storage', async () => {
        loggerStorage.clear()
        let items = await loggerStorage.all(STORAGE_KEY)
        expect(items.error).toBe(true)
      })
      
      it('get error message when empty storage', async () => {
        loggerStorage.clear()
        let items = await loggerStorage.all(STORAGE_KEY)
        expect(items.message).toBe(`Undefined record in localStorage`)
      })
    })
  })
})
