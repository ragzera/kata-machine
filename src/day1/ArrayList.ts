export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private arr: Array<T>;

    constructor(initCapactity: number) {
        this.length = 0;
        this.arr = new Array<T>(initCapactity);
    }

    prepend(item: T): void {}
    insertAt(item: T, idx: number): void {}
    append(item: T): void {
        const currIndex = this.length;
        this.arr[currIndex] = item;
        this.length++;
        if (this.length === this.arr.length) {
            const currCapactity = this.arr.length;
            const newArr = new Array<T>(10 * currCapactity);
            for (let i = 0; i < this.length; i++) {
                newArr[i] = this.arr[i];
            }
            this.arr = newArr;
        }
        return;
    }
    remove(item: T): T | undefined {
        return undefined;
    }
    get(idx: number): T | undefined {
        if (idx > this.length) {
            return undefined;
        }
        return this.arr[idx];
    }
    removeAt(idx: number): T | undefined {
        return undefined;
    }
}
