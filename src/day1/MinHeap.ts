export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length++;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }
        const out = this.data[0];

        this.length--;
        if (this.length === 0) {
            this.data = [];
            return out;
        }
        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);

        if (idx >= this.length || lIdx >= this.length) {
            return;
        }

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];
        const v = this.data[idx];
        if (lV > rV && v > rV) {
            this.data[rIdx] = v;
            this.data[idx] = rV;
            this.heapifyDown(rIdx);
        } else if (rV > lV && v > lV) {
            this.data[lIdx] = v;
            this.data[idx] = lV;
            this.heapifyDown(lIdx);
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const parentIdx = this.parent(idx);
        const parentV = this.data[parentIdx];
        const v = this.data[idx];
        if (parentV > v) {
            this.data[idx] = parentV;
            this.data[parentIdx] = v;
            this.heapifyUp(parentIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number) {
        return 2 * idx + 1;
    }

    private rightChild(idx: number) {
        return 2 * idx + 2;
    }
}
