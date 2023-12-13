import { it, expect, describe, beforeAll, jest } from '@jest/globals'
import { Todo } from '../src/todo.js'
import { TodoRepository } from '../src/todo-repositort.js'

const mockDatabase = [
  {
    name: 'Gustavo',
    age: 21,
    meta: { revision: 0, created: 1702472399482, version: 0 },
    '$loki': 1
  }
]

describe('TodoRepository', () => {
  let repository

  beforeAll(() => {
    repository = new TodoRepository()
  })

  it ('should call insertOne from lokijs', () => {
    const expectedReturn = mockDatabase
    jest.spyOn(repository, repository.list.name)
      .mockReturnValue(expectedReturn)

    const result = repository.list()
    
    expect(result).toEqual(expectedReturn)
    expect(repository.list).toHaveBeenCalledTimes(1)
  })

  it ('should call insertOne from lokijs', () => {
    const expectedReturn = true
    jest.spyOn(repository, repository.create.name)
      .mockReturnValue(expectedReturn)
    
    const data = { name: 'Gustavo' }
    const result = repository.create(data)
    
    expect(result).toBe(expectedReturn)
    expect(repository.create).toHaveBeenNthCalledWith(1, data)
  })
})