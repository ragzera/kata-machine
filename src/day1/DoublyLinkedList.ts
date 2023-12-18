type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        //bookkeeping
        this.length++;

        const node = { value: item } as Node<T>;
        const head = this.head;
        if (!head) {
            this.head = this.tail = node;
            return;
        }
        node.next = head;
        head.prev = node;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("nope");
        }

        if (idx === this.length) {
            this.append(item);
            return;
        }
        if (idx === 0) {
            this.prepend(item);
            return;
        }
        //bookkeeping
        this.length++;

        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }

        curr = curr as Node<T>;
        const node = { value: item } as Node<T>;

        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;

        if (curr.prev) {
            curr.prev.next = curr;
        }
    }
    append(item: T): void {
        //bookkeeping
        this.length++;

        const node = { value: item } as Node<T>;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        node.prev = this.tail;
        this.tail.next = node;

        this.tail = node;
    }
    remove(item: T): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        let curr = this.head;
        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }

        //bookkeeping
        this.length--;

        if (this.length === 0) {
            this.head = this.tail = undefined;
            return curr.value;
        }

        if (curr.prev) {
            curr.prev = curr.next;
        }

        if (curr.next) {
            curr.next = curr.prev;
        }

        if (curr === this.head) {
            this.head = curr.next;
        }

        if (curr === this.tail) {
            this.head = curr.prev;
        }

        curr.prev!.next = curr?.next;
        curr.next!.prev = curr?.prev;

        curr.prev = curr.next = undefined;
        return curr.value;
    }
    get(idx: number): T | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx > this.length) {
            return undefined;
        }

        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }

        //bookkeeping
        this.length--;

        if (this.length === 0) {
            this.head = this.tail = undefined;
            return curr?.value;
        }

        if (idx === 0) {
            this.head = curr?.next;
            return curr?.value;
        }
        if (idx === this.length) {
            this.tail = curr?.prev;
            return curr?.value;
        }

        curr!.prev!.next = curr?.next;
        curr!.next!.prev = curr?.prev;

        return curr?.value;
    }

    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr;
    }
}
