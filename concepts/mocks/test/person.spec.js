import { jest, describe, it, expect } from '@jest/globals'
import { Person } from '../src/person'

describe('Person', () => {
  describe('.validate', () => {
    it('should throw an error if the name is not provided', () => {
      const mockInvalidPerson = {
        name: '',
        cpf: '123.456.789-10',
      }

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error('name is required.'),
      )
    })

    it('should throw an error if the cpf is not provided', () => {
      const mockInvalidPerson = {
        name: 'Gustavo',
        cpf: '',
      }

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error('cpf is required.'),
      )
    })
  })

  describe('.format', () => {
    it('should format person name and cpf', () => {
      const mockPerson = {
        name: 'Gustavo Oliveira',
        cpf: '000.999.888-10',
      }

      const formattedPerson = Person.format(mockPerson)

      expect(formattedPerson).toStrictEqual({
        name: 'Gustavo',
        lastname: 'Oliveira',
        cpf: '00099988810',
      })
    })
  })

  describe('.save', () => {
    it('should throw if required props not provided', () => {
      const mockPersonWithoutCpf = {
        name: 'Gustavo',
        lastname: 'Oliveira',
      }

      const mockPersonWithoutName = {
        cpf: '12345678910',
        lastname: 'Oliveira',
      }

      const mockPersonWithoutLastName = {
        name: 'Gustavo',
        cpf: '12345678910',
      }

      expect(() => Person.save(mockPersonWithoutCpf)).toThrow(
        new Error(
          `Cannot save invalid person ${JSON.stringify(mockPersonWithoutCpf)}`,
        ),
      )

      expect(() => Person.save(mockPersonWithoutName)).toThrow(
        new Error(
          `Cannot save invalid person ${JSON.stringify(mockPersonWithoutName)}`,
        ),
      )

      expect(() => Person.save(mockPersonWithoutLastName)).toThrow(
        new Error(
          `Cannot save invalid person ${JSON.stringify(mockPersonWithoutLastName)}`,
        ),
      )
    })
  })

  describe('.process', () => {
    it('should process a valid person', () => {
      const mockPerson = {
        name: 'Gustavo Oliveira',
        cpf: '123.456.789-10',
      }

      jest.spyOn(Person, Person.validate.name).mockReturnValue()

      jest.spyOn(Person, Person.format.name).mockReturnValue({
        cpf: '12345678910',
        name: 'Gustavo',
        lastname: 'Oliveira',
      })

      const result = Person.process(mockPerson)
      const expected = 'ok'

      expect(result).toStrictEqual(expected)
    })
  })
})
