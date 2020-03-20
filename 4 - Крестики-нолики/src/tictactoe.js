const KRESTIK = 'X'
const NOLIK   = '0'

class TicTacToe {
	constructor(fieldSize = 3, maxInRow = 3)
	{
		const data = []
		let isOver = false
		let ck = 0
		let currentPlayer = KRESTIK
		let result = '?'
		this.init = function () {
			ck = 0
			isOver = false
			currentPlayer = KRESTIK
			for (let i = 0; i < fieldSize; i++)
			{
				data[i] = []
				for (let j = 0; j < fieldSize; j++)
					data[i][j] = ''
			}
		}
		this.init(fieldSize)
		this.getPlayer = () => currentPlayer
		this.isOver    = () => isOver
		this.getField  = () => data
		this.getResult = () => result

		function endGame(symbol)
		{
			isOver = true
			result = symbol
		}

		function checkWinner()
		{
			if (isOver) return

			function checkLine(i, j, di, dj)
			{
				if (!data[i][j]) return false

				for (let k = 0; k < maxInRow; k++)
				{
					if (!data[i+k*di])                       return false
					if (!data[i+k*di][j+k*dj])               return false
					if (data[i][j] !== data[i+k*di][j+k*dj]) return false
				}
				return true
			}

			for (let i = 0; i < fieldSize; i++)
			for (let j = 0; j < fieldSize; j++)
			{
				if (checkLine(i, j, 1, 0)) return endGame(data[i][j])
				if (checkLine(i, j, 0, 1)) return endGame(data[i][j])
				if (checkLine(i, j, 1, 1)) return endGame(data[i][j])
				if (checkLine(i, j,-1, 1)) return endGame(data[i][j])
			}

			if (ck >= fieldSize * fieldSize) return endGame('draw')
		}

		function isCorrectMove(i, j) {
			if (i < 0 || i >= fieldSize) return false
			if (j < 0 || j >= fieldSize) return false
			if (data[i][j] != '') return false
			return true
		}

		this.turn = function (i, j = null) {
			function getCoords(cell) {
				const KEY_A = 65
				if (!cell) return {}
				const letter = cell[0].toUpperCase().charCodeAt(0) - KEY_A
				const digit = parseInt(cell[1]) - 1
				return [digit, letter]
			}
			if (typeof (i) === 'string') [i = null, j = null] = getCoords(i)
			if (i !== null && j !== null) {
				if (isCorrectMove(i, j)) {
					data[i][j] = currentPlayer
					currentPlayer = (currentPlayer === KRESTIK) ? NOLIK : KRESTIK
					ck++
					checkWinner()
					return true
				}
			}
			return false
		}
		return this
	}
}

module.exports = new TicTacToe()
