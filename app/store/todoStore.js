import {create} from 'zustand'

const createDate = () => {

    const date = new Date(Date.now());
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-US', options); // "Nov 20, 2024, 01:00 PM"

} 

export const useTodoStore = create((set) => ({
    Todos: [],

    addTodo: (text, priority) => set((state) => ({
        Todos: [{text, priority, completed: false, id: Date.now(), dateCreated: createDate(), dateCompleted: "", toggleEdit: false }, ...state.Todos]
    })),

    remove: (index) => set((state) => ({
        Todos: state.Todos.filter(t => t.id !== index)
    })),

    removeAll: () => set((state) => ({
        Todos: []
    })),

    removeAllPending: () => set((state) => ({
        Todos: state.Todos.filter(t => t.completed === true) // to remove pending tasks, we keep the completed tasks
    })),

    removeAllCompleted: () => set((state) => ({
        Todos: state.Todos.filter(t => t.completed === false) // to remove completed tasks, we keep the pending tasks
    })),

    setEdit: (id) => set((state) => ({
        Todos: state.Todos.map(t => t.id === id ? {...t, toggleEdit: !t.toggleEdit}: t )
    })),

    update: (text, priority, index) => set((state) => ({
        Todos: state.Todos.map(t => t.id === index ? {...t, text: text, priority: priority, toggleEdit: false}: t)
    })),

    setCompleted: (id) => set((state) => ({
        Todos: state.Todos.map(t => t.id === id ? {...t, completed: !t.completed, dateCompleted: createDate()}: t )
    }))
}));