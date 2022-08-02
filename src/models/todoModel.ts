import { v4 as uuidv4 } from 'uuid';
import storage, { Subscriber, Unsubscribe } from './storage';

const TODO_KEY = 'my-todo-storage';

export interface TodoItem {
    id: string;
    message: string;
    done: boolean;
}

class TodoModel {
    getAll(): TodoItem[] {
        return storage.get(TODO_KEY);
    }

    create(message: string): TodoItem {
        const item = {
            message,
            id: uuidv4(),
            done: false,
        };

        storage.append(TODO_KEY, item);

        return item;
    }

    markDone(id: string): void {
        const todos: TodoItem[] = storage.get(TODO_KEY);
        const index = todos.findIndex(t => t.id === id);
        
        if (index !== -1) {
            todos[index].done = true;
            storage.put(TODO_KEY, todos);
        }
    }

    delete(id: string): void {
        const todos: TodoItem[] = storage.get(TODO_KEY);

        const nextTodos = todos.filter(t => t.id !== id);
        storage.put(TODO_KEY, nextTodos);
    }

    subscribe(callback: Subscriber<TodoItem[]>): Unsubscribe {
        return storage.subscribe(TODO_KEY, callback);
    }
}

export default new TodoModel();