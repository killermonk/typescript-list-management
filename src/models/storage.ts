export type Subscriber<T> = (value: T) => void;
export type Unsubscribe = () => void;

class Storage {
    _subscribers: Record<string, Subscriber<any>[]> = {};

    get<T>(key: string): T | null {
        const value = localStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value) as T;
        }

        return null;
    }

    put<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
        this._notify(key, value);
    }

    append<T>(key: string, value: T): void {
        const existing: T[] = this.get(key) || [];
        existing.push(value);

        this.put(key, existing);
    }

    _notify<T>(key: string, value: T): void {
        const subscribers = this._subscribers[key] || []
        subscribers.forEach(sub => sub(value));
    }

    subscribe<T>(key: string, callback: Subscriber<T>): Unsubscribe {
        if (!(key in this._subscribers)) {
            this._subscribers[key] = [];
        }
        const keySubs = this._subscribers[key];

        keySubs.push(callback);

        callback(this.get(key));

        return () => {
            this._subscribers[key] = this._subscribers[key].filter(sub => sub !== callback);
        };
    }
}

export default new Storage()