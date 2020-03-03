module.exports = {
	// просто первое действие
	simple: function() { return this.moves[0] },
	// случайное действие
	random: function() {
		while (true)
		{
			let i = Math.round(Math.random()*(this.moves.length - 1))
			if (this.isMoveActive(this.moves[i])) return this.moves[i]
		}
	},
	// максимальный урон
	maxDamage: function() {
		// из всех действий выбираем то, которое даёт наименьший урон нам и наибольший противнику
		var move_i = 0, damage = 0, damage_from_opponent = 999
		for (let i=0; i<this.moves.length; i++)
		if (this.isMoveActive(this.moves[i]))
		{
			// считаем повреждения от нашей атаки
			let x = this.getDamage(this.moves[i])
			if (x > damage) { damage = x; move_i = i; }
		}
		return this.moves[move_i]
	},
	// "умная" стратегия
	smarty: function(opponent) {
		if (opponent.name == 'Удар хвостом') return this.moves[2]
		if (this.getHealth() < this.getDamage(opponent)) return this.moves[3]
		return this.moves[1]
	}
}
