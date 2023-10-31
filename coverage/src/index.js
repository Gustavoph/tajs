import { Task } from './task.js'

const oneSecond = 1000
const runInASec = new Date(Date.now() + oneSecond)
const runInTwSecs = new Date(Date.now() + oneSecond * 2)
const runInThreeeSecs = new Date(Date.now() + oneSecond * 3)

const task = new Task()

task.save({
  name: 'task1',
  dueAt: runInASec,
  fn: () => console.log('Task1 executed')
})

task.save({
  name: 'task2',
  dueAt: runInTwSecs,
  fn: () => console.log('Task2 executed')
})

task.save({
  name: 'task3',
  dueAt: runInThreeeSecs,
  fn: () => console.log('Task3 executed')
})


task.run(oneSecond)