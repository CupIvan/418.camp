const Unit = require('./unit.js')

module.exports = {
	create: params => {
		let defaults = {}
		if (params.type == 'Monster')  defaults = require('./monster.js')
		if (params.type == 'Magician') defaults = require('./magician.js')
		for (let i in defaults) if (!params[i]) params[i] = defaults[i]
		return new Unit(params)
	}
}
