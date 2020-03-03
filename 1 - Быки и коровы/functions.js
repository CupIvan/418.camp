/** есть ли одинаковые цифры в числе */
function isRepeatDigits(x)
{
	const h = []
	while (x)
	{
		if (h[x%10]) return true
		h[x%10] = 1
		x = Math.floor(x / 10)
	}
	return false
}

/** генерация случайного числа */
function generateNumber(numDigits)
{
	while (true)
	{
		let n = (''+Math.random()).substr(-numDigits)
		if (isRepeatDigits(n)) continue;
		return n
	}
}

/** функция подстановки окончаний */
function ok(st)
{
	return st.replace(/((\d+).+?)\((.+)\)/, (...re) => {
		const x = parseInt(re[1])
		const [n1, n2='', n5=''] = re[3].split('|')

		let res = n5; const d = x % 10, dd = x % 100;
		if (d < 5) res = n2;
		if (d < 2) res = n1;
		if (!d || (dd > 4 && dd < 21)) res = n5;

		return re[1] + res
	})
}

/** функция поиска быков и коров */
function findBKinNumber(x, need)
{
	const res = {b: 0, k: 0}
	x = ''+x; need = ''+need
	for (let i=0; i<x.length; i++)
	{
		if (x[i] == need[i]) res.b++
		else
			if (need.includes(x[i]))
				res.k++
	}
	return res
}

module.exports = {isRepeatDigits, generateNumber, ok, findBKinNumber}
