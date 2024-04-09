export class Person {
  static validate(person) {
    const requiredFields = ['name', 'cpf']
    requiredFields.forEach((field) => {
      if (!person[field]) throw new Error(`${field} is required.`)
    })
  }

  static save(person) {
    if (!['cpf', 'name', 'lastname'].every((prop) => person[prop])) {
      throw new Error(`Cannot save invalid person ${JSON.stringify(person)}`)
    }

    console.log('Registrado com sucesso!!', person)
  }

  static format(person) {
    const [name, ...lastname] = person.name.split(' ')

    return {
      cpf: person.cpf.replace(/\D/g, ''),
      name,
      lastname: lastname.join(' '),
    }
  }

  static process(person) {
    this.validate(person)
    const formatted = this.format(person)
    this.save(formatted)
    return 'ok'
  }
}
