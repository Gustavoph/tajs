export class Alarm {
  #runEvery = 1e3 // 1 second
  #alarms = new Set()
  
  add ({ name, dueAt }) {
    console.log('Alarm set to: ' + this.timeFormatter(dueAt))
    this.#alarms.add({ name, dueAt });
  }

  alarm({ name, dueAt }) {
    console.log(`${name} alarm: ${this.timeFormatter(dueAt)}`)
  }

  run () {
    const intervalId = setInterval(() => {
      const now = new Date()

      if (this.#alarms.size === 0) {
        console.log('Alarm stopped.')
        clearInterval(intervalId)
      }

      for (const alarm of this.#alarms) {
        if (alarm.dueAt <= now) {
          this.alarm({ name: alarm.name, dueAt: alarm.dueAt });
          this.#alarms.delete(alarm)
        }
      }
    }, this.#runEvery)
  }

  timeFormatter(date) {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'long',
    }).format(date)
  }
}