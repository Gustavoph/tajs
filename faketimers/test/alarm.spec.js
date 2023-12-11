import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Alarm } from '../src/alarm'

describe('Alarm Test Suite', () => {
  let clock
  let logMock

  beforeEach(() => {
    clock = new Alarm()
    logMock = jest
      .spyOn(console, console.log.name)
      .mockImplementation() // mock para o console.log não printe nada no terminal
  })

  it.only('should run alarm are due', () => {
    jest.useFakeTimers()

    const alarms = [
      {
        name: 'School',
        dueAt: new Date(Date.now() + 60e3 * 60 * 2) // 2 hours
      },
      {
        name: 'Lunch',
        dueAt: new Date(Date.now() + 60e3 * 60 * 4) // 4 hours
      }
    ]

    const alarmSpy = jest
      .spyOn(clock, clock.alarm.name)
      .mockImplementation()

    clock.add(alarms.at(0))
    clock.add(alarms.at(1))

    clock.run()
    
    jest.advanceTimersByTime(60e3 * 60 * 2)
    expect(alarmSpy).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(60e3 * 60 * 2)
    expect(alarmSpy).toHaveBeenCalledTimes(2)
  })
})
