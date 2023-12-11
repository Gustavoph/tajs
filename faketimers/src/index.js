import { Task } from './task.js';

const oneSecond = 1000
const runInASec = new Date(Date.now() + oneSecond);
const runInTwSecs = new Date(Date.now() + oneSecond * 2);
const runInThreeSecs = new Date(Date.now() + oneSecond * 3);

const task = new Task()

task.save({
  name: 'Task 1',
  dueAt: runInASec,
  fn: () => console.log('Task 1 executed successfully.')
})

task.save({
  name: 'Task 2',
  dueAt: runInTwSecs,
  fn: () => console.log('Task 2 executed successfully.')
})


task.save({
  name: 'Task 3',
  dueAt: runInThreeSecs,
  fn: () => console.log('Task 3 executed successfully.')
})


task.run(oneSecond)