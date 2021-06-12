import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {

  constructor($root, options = {}) {
    super($root, options.listeners)
    this.emitter = options.emitter
    this.prepare()
    this.unsubscribers = []
  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Уведомление слушателей о событиях event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписка на события event
  $on(event, fn) {
    const unSub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unSub)
  }

  // Подготовка компонента до Init
  prepare() {}

  // Инициализация компонентов + DOM слушатели
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент + чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unSub => unSub())
  }
}
