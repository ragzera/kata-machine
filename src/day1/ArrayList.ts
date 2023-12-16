export default class ArrayList<T> {
    public length: number;
    private arr: Array<T>;

    constructor(initCapactity: number) {
        this.length = 0;
        this.arr = new Array<T>(initCapactity);
    }

    prepend(item: T): void {
        this.updateCapacity();
        if (this.length === 0) {
            this.arr[0] = item;
            this.length++;
            return;
        }
        const auxArr = [...this.arr];
        this.arr[0] = item;
        for (let i = 1; i <= this.length; i++) {
            this.arr[i] = auxArr[i - 1];
        }
        this.length++;
        return;
    }
    insertAt(item: T, idx: number): void {
        this.updateCapacity();
        if (idx > this.length) {
            return;
        }
        const auxArr = [...this.arr];
        this.arr[idx] = item;
        for (let i = idx + 1; i <= this.length; i++) {
            this.arr[i] = auxArr[i - 1];
        }
    }
    append(item: T): void {
        this.updateCapacity();
        const currIndex = this.length;
        this.arr[currIndex] = item;
        this.length++;
        return;
    }
    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (this.arr[i] === item) {
                for (let j = i; j < this.length; j++) {
                    this.arr[i] = this.arr[i + 1];
                }
                this.length--;
                return item;
            }
        }
        return undefined;
    }
    get(idx: number): T | undefined {
        if (idx > this.length) {
            return undefined;
        }
        return this.arr[idx];
    }
    removeAt(idx: number): T | undefined {
        if (idx > this.length) {
            return undefined;
        }
        const item = this.arr[idx];
        for (let i = idx; i < this.length; i++) {
            this.arr[i] = this.arr[i + 1];
        }
        this.length--;
        return item;
    }
    updateCapacity() {
        if (this.length < this.arr.length - 1) {
            return;
        }
        const currCapactity = this.arr.length;
        const newArr = new Array<T>(2 * currCapactity);
        for (let i = 0; i < this.length; i++) {
            newArr[i] = this.arr[i];
        }
        this.arr = newArr;
        return;
    }
}
