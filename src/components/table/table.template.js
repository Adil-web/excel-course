const CODES = {
    A: 65,
    Z: 90
}
// /summon zombie ~ ~1 ~ {ArmorItems:[{id:diamond_boots,Count:1b},{id:diamond_leggings,Count:1b},{id:diamond_chestplate,Count:1b},{id:diamond_helmet,Count:1b}]}

// function createCell(_, col) {
//     return `<div class="cell" contenteditable data-col="${col}"></div>`
// }

function toCell(row) {
    return function(_, col) {
        return `<div 
                    class="cell" 
                    contenteditable 
                    data-type="cell"
                    data-col="${col}"
                    data-id="${row}:${col}">
                </div>`
    }
}

function createCol(col, index) {
    return `<div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(content, index) {
    const resizer = index ? `<div class="row-resize" data-resize="row"></div>`:''
    return `<div class="row" data-type="resizable">
                <div class="row-info">
                    ${index}
                    ${resizer}
                </div>
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
    
    rows.push(createRow(cols, ''))

    
    for(let row=0;row<rowsCount;row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map(createCell)
            .map(toCell(row))
            .join('')
        rows.push(createRow(cells, row+1))
    }
    
    return rows.join(' ')
}