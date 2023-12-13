import { randomUUID } from 'node:crypto'

export class Todo {
  constructor({ text, when }) {
    this.text = text
    this.when = when

    this.status = ''
    this.id = randomUUID()
  }

  isValid() {
    return !!this.text && !isNaN(this.when.valueOf())
  }
}