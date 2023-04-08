class Store<T> {
  private readonly key: string;
  private readonly defaultValue: T;

  constructor(localKey: string, defaultValue: T) {
    this.key = localKey;
    this.defaultValue = defaultValue;
  }

  read(): undefined | T {
    const wrap = localStorage.getItem(this.key);

    if (typeof wrap === "string") {
      const parsedWrap: { value: T } = JSON.parse(wrap);

      return parsedWrap.value;
    } else {
      return undefined;
    }
  }

  write(value: T): void {
    localStorage.setItem(this.key, JSON.stringify({ value }));
  }

  setDefaultValue(): T {
    this.write(this.defaultValue);

    return this.defaultValue;
  }
}

export default Store;
