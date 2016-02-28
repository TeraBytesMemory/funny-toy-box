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

	function initCheck() {
		for(let i = 0; i < width; ++i) {
			for(let j = 0; j < height; ++j) {
				if(field[i][j] === null) { continue; }
				
				field[i][j].checked = false;
			}
		}
	}

	function calcScore2(field) {
		let sum = 0;

		const a = [-1, 0, 1];
		let arounds = [];
		for(let i in a) {
			for(let j in a) {
				arounds.push([a[i], a[j]]);
			}
		}

		for(let i = 0; i < width; ++i) {
			for(let j = 0; j < height; ++j) {
				if(field[i][j] === null) { continue; }

				let count = 0;
				const cls = field[i][j].cls;
				for(let i in arounds) {
				}
			}
		}
	}

	function inBounds(x, y) {
		const width  = field.length;
		const height = field[0].length;
		return (0 <= x && x < width) && (0 <= y && y < height);
	}

	function maxWidth(x, y, cls) {
		// 行けるところまで右横に行く
		let i = 1;
		while(inBounds(x + i, y)) {
			if(field[x + i][y] === null) { break; }
			if(field[x + i][y].checked === true) { break; }
			if(field[x + i][y].cls !== cls) { break; }
			++i;
		}
		return i;
	}

	function maxHeight(x, y, cls, max_width) {
		// 行けるところまで横で行く
		let i = 1;
		while(inBounds(x, y + i)) {
			for(let j = 0; j < max_width; ++j) {
				if(field[x + j][y + i] === null) { return i; }
				if(field[x + j][y + i].checked === true) { return i; }
				if(field[x + j][y + i].cls != cls) { return i; }
			}
			++i;
		}
		return i;
	}

	function setCheck(x, y, width, height) {
		for(let i = 0; i < width; ++i) {
			for(let j = 0; j < height; ++j) {
				field[x + i][y + j].checked = true;
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

		initCheck();
	}

	module.prototype.calc = function() {
		let sum = 0;

		for(let i = 0; i < width; ++i) {
			for(let j = 0; j < height; ++j) {
				if(field[i][j] === null) { continue; }

				if(field[i][j].checked === false) {
					const check_cls = field[i][j].cls;
					const max_width = maxWidth(i, j, check_cls);
					const max_height = maxHeight(i, j, check_cls, max_width);
					const block_num = max_width * max_height;

					// 2^(矩形のブロック数)をスコアに加算
					sum += Math.pow(2, block_num);

					setCheck(i, j, max_width, max_height);
				}
			}
		}

		return sum;
	}

    return module;
});
