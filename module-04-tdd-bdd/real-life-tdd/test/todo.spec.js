import { it, expect, describe } from '@jest/globals'
import { Todo } from '../src/todo.js'

describe('Todo', () => {
  describe('.isValid', () => {
    it('should return invalid when creating a object without text', () => {
      const data = {
        text: '',
        when: new Date('2020-12-01')
      }

      const todo = new Todo(data)
      const result = todo.isValid()
      expect(result).toBeFalsy()
    })

    it('should return invalid when creating a object using the "when" property invalid', () => {
      const data = {
        text: 'Hello World',
        when: new Date('20-12-01')
      }

      const todo = new Todo(data)
      const result = todo.isValid()
      expect(result).toBeFalsy()
    })

    it('should have "id", "text", "when" and "status" props after creating object', () => {
      const data = {
        text: 'Hello World',
        when: new Date('2020-12-01')
      }

      const todo = new Todo(data)
      const result = todo.isValid()
      expect(result).toBeTruthy()
    })
  })
})

