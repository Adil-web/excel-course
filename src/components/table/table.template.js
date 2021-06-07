const CODES = {
    A: 65,
    Z: 90
}
// /summon zombie ~ ~1 ~ {ArmorItems:[{id:diamond_boots,Count:1b},{id:diamond_leggings,Count:1b},{id:diamond_chestplate,Count:1b},{id:diamond_helmet,Count:1b}]}

function createCell(args) {
    return `<div class="cell" contenteditable></div>`
}

function createCol(col) {
    return `<div class="column">${col}</div>`
}

function createRow(content, i) {
    return `<div class="row">
                <div class="row-info">${i}</div>
                <div class="row-data">${content}</div>
            </div>`
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
                .fill('')
                .map((el, index) => String.fromCharCode(CODES.A + index))
                .map(createCol)
                .join('')
    
    rows.push(createRow(cols, ' '))

    
    for(let i=0;i<rowsCount;i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('')
        rows.push(createRow(cells, i+1))
    }
    
    return rows.join(' ')
}