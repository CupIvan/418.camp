const readline = require('readline-sync')
const game = require('./tictactoe')

console.log('Игра крестики-нолики')

while (!game.isOver()) {
	print_field(game.getField())
	let x = game.getPlayer()
	if (x == 'X') x = 'крестиков'
	if (x == '0') x = 'ноликов'
	process.stdout.write(`Ход ${x}, `)
	const cell = readline.question('куда ставить? ')
	if (!game.turn(cell)) {
		console.log('Ошибка!')
	}
}

let result = game.getResult()
if (result == 'X') result = 'выиграли крестики'
else if (result == '0') result = 'выиграли нолики'
else if (result == 'draw') result = 'ничья'
else result = 'но что-то пошло не так...'
console.log(`Конец игры, ${result}`)

function print_field(data) {
	const w = function (x) { process.stdout.write(x) }
	const KEY_A = 65

	for (let i = 0; i < data.length; i++) {
		if (i === 0) {
			w(' ')
			w(' ')
			for (let j = 0; j < data[0].length; j++) w(String.fromCharCode(KEY_A + j))
			w('\n')
		}
		w(`${i + 1} `)
		for (let j = 0; j < data[0].length; j++) {
			w(data[i][j] || '-')
		}
		w('\n')
	}
}
