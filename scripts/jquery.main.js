'use strict';

// page init
jQuery(function() {
	initCrossesZeros();
});

function initCrossesZeros() {
	var crossClass = 'cross-active';
	var zeroClass = 'zero-active';
	var winMessageCross = '"X" has won!';
	var winMessageZero = '"0" has won!';

	jQuery('.game-block').each(function() {
		var holder = jQuery(this);
		var cells = holder.find('td');
		var winMessageBlock = holder.find('.win-message');

		var clicksBeforeCheck = 5;
		var clickCounter = 0;
		var won = false;
		var dataArray = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];

		function clickHandler(e) {
			var cell = e.currentTarget;
			var row = cell.parentNode;
			var hIndex = cell.cellIndex;
			var vIndex = row.rowIndex;

			if (dataArray[vIndex][hIndex] !== 0 && !dataArray[vIndex][hIndex] && !won) {
				clickCounter++;
				if (clickCounter % 2) {
					dataArray[vIndex][hIndex] = 1;
				} else {
					dataArray[vIndex][hIndex] = 0;
				}
				redrawField();

				if (clickCounter === 1) {
					winMessageBlock.html('');
				}

				if (clickCounter >= clicksBeforeCheck) {
					checkWin();
				}
			}
		}

		function redrawField() {
			for (var i in dataArray) {
				for (var k in dataArray[i]) {
					var cellIndex = parseInt(i) * 3 + parseInt(k);
					if (dataArray[i][k] === 1) {
						cells[cellIndex].className = crossClass;
					} else if (dataArray[i][k] === 0) {
						cells[cellIndex].className = zeroClass;
					} else if (dataArray[i][k] === null) {
						cells[cellIndex].className = '';
					}
				}
			}
		}

		function checkWin() {
			var checkStep = clickCounter % 2;

			function fiirstCondition() {
				for (var i in dataArray) {
					var hFull = dataArray[i][0] != null && dataArray[i][1] != null && dataArray[i][2] != null;
					if (hFull) {
						var condition = dataArray[i][0] === dataArray[i][1] && dataArray[i][0] === dataArray[i][2] && dataArray[i][1] === dataArray[i][2];
						if(condition) {
							showMessage();
							return true;
						}
					}
				}
			}

			function secondCondition() {
				for (var i = 0; i < 3; i++) {
					var vFull = dataArray[0][i] != null && dataArray[1][i] != null && dataArray[2][i] != null;
					if (vFull) {
						var condition = dataArray[0][i] === dataArray[1][i] && dataArray[0][i] === dataArray[2][i] && dataArray[1][i] === dataArray[2][i];
						if(condition) {
							showMessage();
							return true;
						}
					}
				}
			}

			function thirdCondition() {
				if (dataArray[1][1] !== null) {
					var checkFor = dataArray[1][1];
					if (dataArray[0][0] === dataArray[1][1] && dataArray[2][2] === dataArray[1][1]) {
						showMessage();
						return true;
					}
					if (dataArray[0][2] === dataArray[1][1] && dataArray[2][0] === dataArray[1][1]) {
						showMessage();
						return true;
					}
				}
			}

			function showMessage() {
				if (checkStep) {
					winMessageBlock.html(winMessageCross);
				} else {
					winMessageBlock.html(winMessageZero);
				}
				won = true;
			}

			if (fiirstCondition()) {
				fiirstCondition();
				return;
			} else if (secondCondition()) {
				secondCondition();
				return;
			} else if (thirdCondition()) {
				thirdCondition();
				return;
			}
		}

		function restartHandler(e) {
			if (e) e.preventDefault();
			clickCounter = 0;
			won = false;
			dataArray = [
				[null, null, null],
				[null, null, null],
				[null, null, null]
			];
			redrawField();
			if (e) winMessageBlock.html('');
		}

		holder.on('click', 'td', clickHandler);
		holder.on('click', '.btn-restart', restartHandler);
	});
}
