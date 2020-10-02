class List {
  constructor(data = []) {
    this.store = data;
  }

  value() {
    return this.store;
  }

  get(index) {
    return this.store[index];
  }

  find(cb) {
    return this.store.findIndex(cb);
  }

  findIndex(cb) {
    return this.store.findIndex(cb);
  }

  valueOf() {
    return this.value();
  }

  add(data) {
    return new List([...this.store, data]);
  }

  remove(index) {
    return new List(this.store.filter((_, i) => i !== index));
  }

  setIn(index, data) {
    return new List(this.store.map((o, i) => {
      if (i !== index) return o;

      if (data instanceof List) {
        return data;
      }

      return {
        ...o,
        ...data,
      }
    }))
  }
}

export default function (data) {
  return new List(data);
};
