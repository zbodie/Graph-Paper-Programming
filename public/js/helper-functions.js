var PictureArray = null;
var PenColors = ['black', 'blue-grey lighten-2'];
var BruchIconImages = ['/Graph-Paper-Programming/public/images/paint-brush-icon-black.png', '/Graph-Paper-Programming/public/images/paint-brush-icon-grey.png']
var CurrentPenColor = 0;
var CurrentArrayPosition = [0,0];
var CUR_ARRAY_X = 1;
var CUR_ARRAY_Y = 0;

function createPictureArray(h, w) {
    PictureArray = [];
    for(var i = 0; i < h; i++) {
        var newRow = [];
        for(var j = 0; j < w; j++) {
            newRow.push('clear');
        }
        PictureArray.push(newRow);
    }
};

function resetArrayPosition() {
    CurrentArrayPosition = [0,0];
    updatePaintBrushIcon();
};

function moveArrayPosition(moveDirection) {
    if(moveDirection == 'left' || moveDirection == 'right') {
        moveHorizontally(moveDirection);
    }
    if(moveDirection == 'up' || moveDirection == 'down') {
        moveVertically(moveDirection);
    }
};

function moveHorizontally(moveDirection) {
    var shift = -1;
    if(moveDirection == 'right') { shift = 1; };

    var newX = CurrentArrayPosition[CUR_ARRAY_X] + shift;
    if(newX < 0 || newX >= PictureArray[0].length) {
        Materialize.toast('Uh-oh, I cannot go that way without leaving the grid!', 2000);
    } else {
        CurrentArrayPosition[CUR_ARRAY_X] = newX;
        updatePaintBrushIcon();
    }
};

function moveVertically(moveDirection) {
    var shift = -1;
    if(moveDirection == 'down') { shift = 1; };

    var newY = CurrentArrayPosition[CUR_ARRAY_Y] + shift;
    if(newY < 0 || newY >= PictureArray.length) {
        Materialize.toast('Uh-oh, I cannot go that way without leaving the grid!', 2000);
    } else {
        CurrentArrayPosition[CUR_ARRAY_Y] = newY;
        updatePaintBrushIcon();
    }
};

function updatePaintBrushIcon() {
    // remove current paint brush
    var allTableCells = $('#the-table').find('td');
    $.each(allTableCells, function(index, cell) {
        $(cell).empty();
    });

    // place new paint brush at CurrentArrayPosition
    var cellWidth = getCellWidth();
    var currentTableCell = getCurrentTableCell();
    $(currentTableCell).append('<img src="' + BruchIconImages[CurrentPenColor] + '" width="' + (parseInt(cellWidth,10)*.65) 
                             + '" height="' + (parseInt(cellWidth,10)*.65) + '"></img>')
};

function getCurrentTableCell() {
    var allTableRows = $('#the-table').find('tr');
    var currentTableRow = allTableRows[CurrentArrayPosition[CUR_ARRAY_Y]];
    var tableCellsInCurrentRow = $(currentTableRow).find('td');
    var currentTableCell = tableCellsInCurrentRow[CurrentArrayPosition[CUR_ARRAY_X]];
    return currentTableCell;
};

function paintCurrentSquare() {
    // paint square at CurrentArrayPosition to be CurrentPenColor
    var currentTableCell = getCurrentTableCell();
    $(currentTableCell).removeClass();
    $(currentTableCell).addClass(PenColors[CurrentPenColor]);
};

function resetPenColor() {
    CurrentPenColor = 0;
};

function nextPenColor() {
    CurrentPenColor++;
    if(CurrentPenColor >= PenColors.length) {
        resetPenColor();
    }
    updatePaintBrushIcon();
};

function resetTable() {
    var height = PictureArray.length;
    var width = PictureArray[0].length;
    createPictureArray(height,width);
    resetArrayPosition();
    resetPenColor();
    createNewTable(height,width);
};

function createNewTable(h, w) {
    createPictureArray(h,w);
    var theTable = $('#the-table');
    theTable.empty();

    for(var i = 0; i < h; i++) {
        var newRow = '<tr>';

        for(var j = 0; j < w; j++) {
            newRow += '<td style="padding: 0px; text-align: center; padding-top: 6px"></td>';
        }

        newRow += '</tr>';
        theTable.append(newRow);
    }
    resizeTableToSquares();
    updatePaintBrushIcon();
};

function getCellWidth() {
    var theTable = $('#the-table');
    var allTableRows = theTable.find('tr');
    var allTableDataCells = theTable.find('td');
    var cellWidth = $(allTableDataCells[0]).css('width');
    return cellWidth;
};

function resizeTableToSquares() {
    var cellWidth = getCellWidth();
    var allTableRows = $('#the-table').find('tr');
    for(var i = 0; i < allTableRows.length; i++) {
        $(allTableRows[i]).css('height', cellWidth);
    }
};

function submitNewTableForm() {
    var height = $('#num_rows').val();
    var width = $('#num_cols').val();
    if(!(height == '' || width == '')) {
        resetArrayPosition();
        resetPenColor();
        createNewTable(height,width);
    } else {
        Materialize.toast('Uh-oh, you forgot to enter a size!', 2000);
    }
    $('#num_rows').val('');
    $('#num_cols').val('');
};
