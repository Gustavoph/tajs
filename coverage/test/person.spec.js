import { it, jest, describe, beforeEach, expect } from '@jest/globals'
import { mapPerson } from '../src/person.js'

describe('Person Test Suit', () => {
  describe('Happy path', () => {
    it('should map person', () => {
      const personStr = '{"name":"Gustavo","age":21}'
      const personObj = mapPerson(personStr)

      expect(personObj).toEqual({
        name: "Gustavo",
        age: 21,
        createdAt: expect.any(Date)
      })
    })
  })

  describe('What coverage doesnt tell you', () => {
    it('should not map person given invalid JSON string', () => {
      const personStr = '{"name":'
      expect(() => mapPerson(personStr))
        .toThrowError('Unexpected end of JSON input')
    })

    it('should not map person given invalid JSON data', () => {
      const personStr = '{}'
      const personObj = mapPerson(personStr)

      expect(personObj).toEqual({
        name: undefined,
        age: undefined,
        createdAt: expect.any(Date)
      })
    })
  })
})