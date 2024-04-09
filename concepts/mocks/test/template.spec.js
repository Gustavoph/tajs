import { it, expect } from '@jest/globals'

function sum(a, b){
  return a + b
}

it('should be sum two values', () => {
  expect(sum(1, 2)).toBe(3)
})

