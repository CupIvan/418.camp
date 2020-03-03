const strategies = require('./strategy.js')

function Unit(params)
{
	this._ck_attacks = 1 // счётчик атак для cooldown

	this.answerMove = {}
	this.health = params.maxHealth || 10

	for (let i in params) this[i] = params[i]

	/** кол-во здоровья у персонажа */
	this.getHealth = _=> this.health

	/** выбор действия для атаки */
	this.setMove = function(opponent_move)
	{
		var move
		let strategy = strategies[params.strategy] || strategies.simple
		while (true)
		{
			move = strategy.call(this, opponent_move)
			if (this.isMoveActive(move)) break;
			strategy = strategies.simple
		}
		this.answerMove = move
	}

	/** выбранное действие */
	this.getMove = function() { return this.answerMove }

	/** атака */
	this.attack = function(opponent)
	{
		let move = opponent.getMove()
		this.health -= this.getDamage(move, this.answerMove)
		this.health = Math.round(this.health * 100) / 100
		if (this.health < 0) this.health = 0
		this.answerMove.lastTime = this._ck_attacks
		this._ck_attacks++
	}

	/** общее повреждение от атаки */
	this.getDamage = function(move, armor = {physicArmorPercents: 0, magicArmorPercents: 0})
	{
		var x = 0
		x += move.physicalDmg * (100 - armor.physicArmorPercents) / 100
		x += move.magicDmg    * (100 - armor.magicArmorPercents) / 100
		return x
	}

	/** активно ли это действие */
	this.isMoveActive = function(move)
	{
		if (!move) return false;
		if (!move.lastTime) return true; // ещё не применяли
		return this._ck_attacks - move.lastTime > move.cooldown
	}

	return this
}

module.exports = Unit
