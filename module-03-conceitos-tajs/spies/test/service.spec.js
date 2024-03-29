import { it, describe, expect, beforeEach, jest } from '@jest/globals'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import { Service } from '../src/service'

describe('Service Test Suite', () => {
  let _service
  const filename = 'testfile.ndjson'
  const MOCKED_HASH_PWD = 'hashedPassword'

  beforeEach(() => {
    jest
      .spyOn(crypto, crypto.createHash.name)
      .mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD)
      })

    jest
      .spyOn(fs, fs.appendFile.name)
      .mockResolvedValue()

    _service = new Service({ filename })
  })

  describe('.create - spies', () => {
    it('should call appendFile with right params', async () => {
      const input = { username: 'user1', password: 'pass1' }
      const expectedCreatedAt = new Date().toDateString()
      jest
        .spyOn(Date.prototype, Date.prototype.toISOString.name)
        .mockRejectedValue(expectedCreatedAt)
      await _service.create(input)

      expect(crypto.createHash).toHaveBeenCalledTimes(1)
      expect(crypto.createHash).toHaveBeenCalledWith('sha256')

      const hash = crypto.createHash('sha256')
      expect(hash.update).toHaveBeenCalledWith(input.password)
      expect(hash.digest).toHaveBeenCalledWith('hex')

      const expected = JSON.stringify({
        ...input,
        createdAt: expectedCreatedAt,
        password: MOCKED_HASH_PWD
      }).concat('\n')

      expect(fs.appendFile).toHaveBeenCalledWith(filename, expected)
    })
  })
})
