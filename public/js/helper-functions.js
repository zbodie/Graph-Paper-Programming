var PictureArray = null;
var PenColors = ['black', 'gray'];
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
        alert('Uh-oh, I cannot go that way without leaving the grid!');
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
        alert('Uh-oh, I cannot go that way without leaving the grid!');
    } else {
        CurrentArrayPosition[CUR_ARRAY_Y] = newY;
        updatePaintBrushIcon();
    }
};

function updatePaintBrushIcon() {
    // TODO
    // remove current paint brush
    // place new paint brush at CurrentArrayPosition
};

function paintCurrentSquare() {
    // TODO
    // paint square at CurrentArrayPosition to be CurrentPenColor
};

function resetPenColor() {
    CurrentPenColor = 0;
};

function nextPenColor() {
    CurrentPenColor++;
    if(CurrentPenColor >= PenColors.length) {
        resetPenColor();
    }
};

function resetTable() {

};

function createNewTable(h, w) {
    createPictureArray(h,w);
    var theTable = $('#the-table');
    theTable.empty();

    for(var i = 0; i < h; i++) {
        var newRow = '<tr>';

        for(var j = 0; j < w; j++) {
            newRow += '<td></td>';
        }

        newRow += '</tr>';
        theTable.append(newRow);
    }
    resizeTableToSquares();
};

function resizeTableToSquares() {
    var theTable = $('#the-table');
    var allTableRows = theTable.find('tr');
    var allTableDataCells = theTable.find('td');
    var cellWidth = $(allTableDataCells[0]).css('width');

    for(var i = 0; i < allTableRows.length; i++) {
        $(allTableRows[i]).css('height', cellWidth);
    }
};