var grid = require('./grid');
var Grid = grid.Grid;

var test = new Grid({x:4,y:3});

console.log(test.keysK());
console.log('[]');
console.log(test.sizeYX());
console.log('{ x: 4, y: 3 }\n');

console.log(test.addItemToCellYX({x:0,y:0}, {t : 'test 0 0'}));
console.log("{ t: 'test 0 0' }");
console.log(test.getCellYX({x:0,y:0}));
console.log("[ { t: 'test 0 0' } ]\n");

console.log(test.addItemToCellYX({y:2,x:3}, {t : 'test 2 3'}));
console.log("{ t: 'test 2 3' }");
console.log(test.getCellYX({y:2,x:3}));
console.log("[ { t: 'test 2 3' } ]\n");

console.log(test.addItemToCellYX({y:2,x:3}, {t : 'test 2,3 (2)'}));
console.log("{ t: 'test 2,3 (2)' }\n");
console.log(test.getCellYX({y:2,x:3}));
console.log("[ { t: 'test 2 3' }, { t: 'test 2,3 (2)' } ]\n");

console.log(test.keysK());
console.log("[ '0', '11' ]");
console.log(test.getCellK(11));
console.log("[ { t: 'test 2 3' }, { t: 'test 2,3 (2)' } ]\n");

console.log(test.addItemToCellYX({x:5,y:5}, {t : 'test3'}));
console.log('undefined');
console.log(test.getCellYX({x:5,y:5}));
console.log('undefined');
console.log(test.getCellK(14));
console.log('undefined\n');

console.log(test.getAllCells());
console.log("[ [ { t: 'test 0 0' } ],\n  [ { t: 'test 2 3' }, { t: 'test 2,3 (2)' } ] ]");
test.clearCellYX({x:0,y:0});
console.log(test.keysK());
console.log("[ '11' ]\n");

test.clearAllCells();
console.log(test.getAllCells());
console.log("[]");
console.log(test);
console.log("{ x: { e: 3, c: 4 },\n  y: { e: 2, c: 3 },\n  k: { e: 11, c: 12 },\n  cells: [ , , , , , , , , , , ,  ] }\n");

