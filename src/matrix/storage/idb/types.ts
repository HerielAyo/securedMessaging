

export interface IDOMStorage {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
    key(n: number): string | null;
    readonly length: number;
}
