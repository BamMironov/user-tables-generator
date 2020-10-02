class User {
  constructor({
    id = new Date().getTime(),
    name = '',
    surname = '',
    age = '',
    city = '',
  } = {}) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.city = city;
  }

  copy() {
    return new User({
      ...this,
      id: undefined,
    })
  }
}

export default function (data) {
  return new User(data);
};
