import Loki from 'lokijs'

export class TodoRepository {
  constructor() {
    const db = new Loki('todo', {})
    this.schedule = db.addCollection('schedule')
  }

  list () {
    return this.schedule.find()
  }

  create (data) {
    return this.schedule.insertOne(data)
  }
}
