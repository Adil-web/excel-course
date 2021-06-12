import { range } from "@/core/utils";

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($current, $target) {
    const currentID = $current.id(true)
    const targetID = $target.id(true)
    const cols = range(currentID.col, targetID.col)
    const rows = range(currentID.row, targetID.row)
    return cols.reduce((acc, col) => {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    }, [])
}

export function nextSelector(key, {col, row}) {
    const MIN_VALUE = 0
    switch (key) {
        case 'Enter':
        case 'ArrowDown':
        row++
        break;
        case 'Tab':
        case 'ArrowRight':
        col++
        break;
        case 'ArrowUp':
        row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1 
        break;
        case 'ArrowLeft':
        col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1 
        break;
    }
    return `[data-id="${row}:${col}"]`
}