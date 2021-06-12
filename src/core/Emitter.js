export class Emitter {
    constructor() {
        this.listereners = {}
    }

    // Уведомление для слушателей
    // table.emit("formula:done", {args})
    emit(event, ...args) {
        if(!Array.isArray(this.listereners[event])) {
            return false
        }
        this.listereners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }
    
    // Подписка на уведомления
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listereners[event] = this.listereners[event] || []
        this.listereners[event].push(fn)
        return () => {
            this.listereners[event] = this.listereners[event].filter(listener => listener !== fn)
        }
    }
}

// Example
// const emitter = new Emitter()
// const unSub = emitter.subscribe('test', data => console.log(data))
// emitter.emit('test', 42)
// setTimeout(() => {
//     emitter.emit('test', 'lol')
//     // unSub()
// }, 2000)
// setTimeout(() => {
//     emitter.emit('test', 'lol2')
// }, 4000)