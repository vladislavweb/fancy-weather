class Store<T> {
  private readonly key: string;

  constructor(localKey: string) {
    this.key = localKey;
  }

  read(): null | T {
    const wrap = localStorage.getItem(this.key);

    if (typeof wrap === "string") {
      const parsedWrap: { value: T } = JSON.parse(wrap);

      return parsedWrap.value;
    } else {
      return wrap;
    }
  }

  write(value: T): void {
    localStorage.setItem(this.key, JSON.stringify({ value }));
  }
}

export default Store;
