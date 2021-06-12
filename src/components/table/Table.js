import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { tableResize } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '@/core/Dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  
  toHTML() {
    return createTable(25)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]') )
    this.$on("formula:input", text => {
      this.selection.current.text(text)
    })
    this.$on("formula:done", () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
  
  onMousedown(event) {
    if(shouldResize(event)) {
      tableResize(event, this.$root)
    } else if(isCell(event)) {
      const $target = $(event.target)
      if(event.shiftKey) {
        const $cells = matrix(this.selection.current, $target).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if(keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(event.key, id))
      this.selectCell($next)
      this.$emit('table:select', $next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}