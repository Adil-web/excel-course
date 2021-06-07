import { capitalize } from "./utils"

export class DomListener {
    constructor($root, listeners = []) {
        if(!$root) {
            throw new Error(`No $root provided for DomListener!`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.remove(listener, method)
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}