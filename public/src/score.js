(function (Definition) {

    // use webpack
    module.exports = Definition();
    // export to window
    /*
    (function() {
        window[module_name] = Definition();
    })(module_name);
     */

})(function () {
    'use strict';

	function inBounds(field, x, y) {
		const width  = field.length;
		const height = field[0].length;
		return (0 <= x && x < width) && (0 <= y && y < height);
	}

	function maxWidth(field, x, y, cls) {
		// 行けるところまで右横に行く
		let i = 1;
		while(inBounds(field, x + i, y)) {
			if(field[x + i][y] === null) { break; }
			if(field[x + i][y].checked === true) { break; }
			if(field[x + i][y].cls !== cls) { break; }
			++i;
		}
		return i;
	}

	function maxHeight(field, x, y, cls, max_width) {
		// 行けるところまで横で行く
		let i = 1;
		while(inBounds(field, x, y + i)) {
			for(let j = 0; j < max_width; ++j) {
				if(field[x + j][y + i] === null) { return i; }
				if(field[x + j][y + i].checked === true) { return i; }
				if(field[x + j][y + i].cls != cls) { return i; }
			}
			++i;
		}
		return i;
	}

	function setCheck(field, x, y, width, height) {
		for(let i = 0; i < width; ++i) {
			for(let j = 0; j < height; ++j) {
                if (field[x + i][y + j] !== null) {
				    field[x + i][y + j].checked = true;
                }
			}
		}
	}


	/*
	 * ここからmodule定義
	 */

	var module = function(field) {
		this.field = field;
		this.width  = 8;
		this.height = 6;

		for(let i = 0; i < this.width; ++i) {
			for(let j = 0; j < this.height; ++j) {
				if(this.field[j][i] === null) { continue; }
				
				this.field[j][i].checked = false;
			}
		}
	};

	module.prototype.calc = function() {
		let sum = 0;

		for(let i = 0; i < this.width; ++i) {
			for(let j = 0; j < this.height; ++j) {
				if(this.field[j][i] === null) { continue; }

				if(this.field[j][i].checked === false) {
					const check_cls = this.field[j][i].cls;
					const max_width = maxWidth(this.field, i, j, check_cls);
					const max_height = maxHeight(this.field, i, j, check_cls, max_width);
					const block_num = max_width * max_height;

					// 2^(矩形のブロック数)をスコアに加算
					sum += Math.pow(2, block_num);

					setCheck(this.field, i, j, max_width, max_height);
				}
			}
		}

		return sum;
	};

    return module;
});
