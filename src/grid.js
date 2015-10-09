exports.Grid = (function () {

    //    e *---*---*---*---*
    //      |   |   |   |   |
    //      *---*---*---*---*
    //      |...| k |...|   |
    //      *---*---*---*---*
    //      |   |   |   |   |
    //    y *---*---*---*---*
    //      |e+1|e+2|...| 2e|
    //      *---*---*---*---*
    //      | 0 | 1 |...| e |
    //    0 *---*---*---*---*
    //      0       x       e

    function Grid(cnt) {
        cnt = cnt || {x: 0, y: 0};
        cnt.x = cnt.x || 0;
        cnt.y = cnt.y || 0;
        cnt.x = Math.max(0, Math.floor(cnt.x));
        cnt.y = Math.max(0, Math.floor(cnt.y));
        this.x = this._init(cnt.x);
        this.y = this._init(cnt.y);
        this.k = this._init(cnt.x * cnt.y);
        this.cells = [];
    }

    Grid.prototype._init = function (cnt) {
        return {
            e: cnt - 1, // end, lastIndex
            c: cnt      // cnt,size
        };
    };

    //without parameters
    Grid.prototype.keysK = function () {
        return Object.keys(this.cells);
    };

    Grid.prototype.keysYX = function () {
        var result = [];
        var keys = this.keysK();
        for (var i in keys) {
            result.push(this.K2YX(keys[i], false));
        }
        return result;
    };


    Grid.prototype.countK = function () {
        return Object.keys(this.cells).length;
    };

    Grid.prototype.sizeK = function () {
        return this.k.c;
    };

    Grid.prototype.sizeYX = function () {
        return {x: this.x.c, y: this.y.c};
    };

    Grid.prototype.lastIndexK = function () {
        return this.k.e;
    };

    Grid.prototype.lastIndexYX = function () {
        return {x: this.x.e, y: this.y.c};
    };

    Grid.prototype.getAllCells = function () {
        var result = [];
        var keys = this.keysK();
        for (var i in keys) {
            result.push(this.getCellK(keys[i], false));
        }
        return result;
    };

    Grid.prototype.clearAllCells = function () {
        var keys = this.keysK();
        for (var i in keys) {
            delete(this.cells[keys[i]]);
        }
    };

    //K
    Grid.prototype._isCorrectIndexK = function (k) {
        return (k >= 0 && k <= this.k.e);
    };

    Grid.prototype.K2YX = function (k, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexK(k))
            return undefined;
        var x = k % this.x.c;
        return {x: x, y: (k - x) / this.x.c};
    };

    Grid.prototype.isEmptyCellK = function (k, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexK(k))
            return undefined;
        return !(this.cells[k] && this.cells[k]['items'] && this.cells[k]['items'].length);
    };

    Grid.prototype.getCellK = function (k, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexK(k))
            return undefined;
        return (this.cells[k] ? this.cells[k].items : undefined);
    };

    Grid.prototype.addItemToCellK = function (k, item, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexK(k))
            return undefined;
        if (this.cells[k] === undefined)
            this.cells[k] = {items: []};
        this.cells[k].items.push(item);
        return item;
    };

    Grid.prototype.setItemToCellK = function (k, item, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexK(k))
            return undefined;
        this.cells[k] = {items: []};
        this.cells[k].items.push(item);
        return item;
    };

    Grid.prototype.clearCellK = function (k, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexK(k))
            return undefined;
        delete(this.cells[k]);
    };

    //YX
    Grid.prototype._isCorrectIndexYX = function (yx) {
        return (yx.x >= 0 && yx.x < this.x.c && yx.y >= 0 && yx.y < this.y.c);
    };

    Grid.prototype.YX2K = function (yx, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexYX(yx))
            return undefined;
        return yx.y * this.x.c + yx.x;
    };

    Grid.prototype.isEmptyCellYX = function (yx, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexYX(yx))
            return undefined;
        return this.isEmptyCellK(this.YX2K(yx), true);
    };

    Grid.prototype.getCellYX = function (yx, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexYX(yx))
            return undefined;
        return this.getCellK(this.YX2K(yx), true);
    };

    Grid.prototype.addItemToCellYX = function (yx, item, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexYX(yx))
            return undefined;
        return this.addItemToCellK(this.YX2K(yx), item, true);
    };

    Grid.prototype.setItemToCellYX = function (yx, item, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexYX(yx))
            return undefined;
        return this.setItemToCellK(this.YX2K(yx), item, true);
    };

    Grid.prototype.clearCellYX = function (yx, skipCheck) {
        if (skipCheck !== true && !this._isCorrectIndexYX(yx))
            return undefined;
        delete(this.cells[this.YX2K(yx, true)]);
    };

    return Grid;
})();

//var test = new Grid({x:4,y:3});
//
//console.log(test.keysK());
//console.log('[]');
//console.log(test.sizeYX());
//console.log('Object {x: 4, y: 3}');
//
//console.log(test.addItemToCellYX({x:0,y:0}, {t : 'test 0 0'}));
//console.log('Object {t: "test 0 0"}');
//console.log(test.getCellYX({x:0,y:0}));
//console.log('Object {items: Array[1]}');
//
//console.log(test.addItemToCellYX({y:2,x:3}, {t : 'test 2 3'}));
//console.log('Object {t: "test 2,3"}');
//console.log(test.getCellYX({y:2,x:3}));
//console.log('Object {items: Array[1]}');
//
//console.log(test.addItemToCellYX({y:2,x:3}, {t : 'test 2,3 (2)'}));
//console.log('Object {t: "test 2,3 (2)"}');
//console.log(test.getCellYX({y:2,x:3}));
//console.log('Object {items: Array[2]}');
//
//console.log(test.addItemToCellYX({x:5,y:5}, {t : 'test3'}));
//console.log('undefined');
//console.log(test.getCellYX({x:5,y:5}));
//console.log('undefined');
//
//console.log(test.keysK());
//console.log('["0", "11"]');
//
//console.log(test.getCellK(11));
//console.log('[Object, Object]');
//console.log(test.getCellK(14));
//console.log('undefined');
//console.log(test.getAllCells());
//console.log('[Array[1], Array[2]]');
//test.clearCellYX({x:0,y:0});
//console.log(test.keysK());
//console.log('["11"]');
//test.clearAllCells();
//console.log(test.getAllCells());
//console.log('[]');
//
//console.log(test);
