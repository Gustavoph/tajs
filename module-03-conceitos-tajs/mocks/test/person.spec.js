import { describe, it, expect, jest } from '@jest/globals'
import Person from '../src/person'

// mock é a entrada necessarioa para que o teste passe
describe('Person', () => {
  describe('.validate', () => {
    it('should throw if the name is not present', () => {
      const mockInvalidPerson = { name: '', cpf: '123.456.789-00' }
      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(new Error('Name is required!'))
    })

    it('should throw if the cpf is not present', () => {
      const mockInvalidPerson = { name: 'Gustavo Oliveira', cpf: '' }
      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(new Error('CPF is required!'))
    })

    it('should not throw if person is valid', () => {
      const mockInvalidPerson = { name: 'Gustavo Oliveira', cpf: '123.456.789-10' }
      expect(() => Person.validate(mockInvalidPerson))
        .not.toThrow()
    })
  })

  describe('.format', () => {
    // parte do principio que os dados já foram validados!
    it('should format the person name and CPF', () => {
      // AAA
      // Arrange = Preparar
      const mockPerson = {
        name: 'Gustavo Oliveira',
        cpf: '123.456.789-00'
      }
      
      // Act = Executar
      const formattedPerson = Person.format(mockPerson)
      
      // Assert = Validar
      const expected = { 
        name: 'Gustavo', 
        lastName: 'Oliveira', 
        cpf: '12345678900'
      }
      expect(formattedPerson).toStrictEqual(expected)
    })
  })

  describe('.save', () => {
    it('should throw if not provided all properties', () => {
      const mockWithoutName = { lastName: 'Oliveira', cpf: '12345678910' }
      expect(() => Person.save(mockWithoutName))
        .toThrow()

      const mockWithoutLastName = { name: 'Gustavo', cpf: '12345678910' }
      expect(() => Person.save(mockWithoutLastName))
        .toThrow()

      const mockWithoutCPF = { name: 'Gustavo', lastName: 'Oliveira' }
      expect(() => Person.save(mockWithoutCPF))
        .toThrow()
    })

    it('should not throw if provided all properties', () => {
      const mockValidPerson = { name: 'Gustavo', lastName: 'Oliveira', cpf: '12345678910' }
      expect(() => Person.save(mockValidPerson))
        .not.toThrow()
    })
  })


  describe('.process', () => {
    it('should process a valid person', () => {
      const mockPerson = {
        name: 'Gustavo Olivera', 
        cpf: '123.456.789-00' 
      }

      jest
        .spyOn(Person, Person.validate.name)
        .mockReturnValue()

      jest
        .spyOn(Person, Person.format.name)
        .mockReturnValue({
          name: 'Gustavo',
          lastName: 'Oliveira',
          cpf: '12345678900' 
        })

      const result = Person.process(mockPerson)

      expect(result).toStrictEqual('ok')
    })
  })
})