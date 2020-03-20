const { Given, When, Then } = require('cucumber');
const game = require('../src/tictactoe');
const assert = require('assert');

Given('пустое поле', function () {
	game.init();
});

Given('игрок ходит в клетку {string}', function (cell) {
	game.turn(cell);
});

Given('поле {string}', function (field) {
	const rows = field.split('|');

	function* gen(field, char) {
		for (let j=0; j<rows.length; j++)
		for (let i=0; i<rows[j].length; i++)
			if (rows[i][j] === char) yield [i, j];
		return [];
	}

	const genX = gen(field, 'X');
	const gen0 = gen(field, '0');

	game.init();

	for (coordX of genX)
	{
		game.turn(...coordX);
		let coordY = gen0.next().value;
		game.turn(...coordY);
	}
});

Then('поле становится {string}', function (field) {
	const a = game.getField();
	let st = '';
	for (let i=0; i<a.length; i++)
	{
		if (i>0) st += '|'
		for (let j=0; j<a[0].length; j++)
			st += a[i][j]||' ';
	}
	assert.equal(field, st);
});

Then('выиграли {string}', function (player) {
	let char = '?';
	if (player == "крестики") char = 'X';
	if (player == "нолики")   char = '0';
	assert.equal(char, game.getResult());
});

Then('игра окончена', function () {
	assert.ok(game.isOver());
});

Then('объявляется ничья', function () {
	assert.equal('draw', game.getResult());
});

Then('ходят нолики', function () {
	assert.equal('0', game.getPlayer());
});

Then('ходят крестики', function () {
	assert.equal('X', game.getPlayer());
});
