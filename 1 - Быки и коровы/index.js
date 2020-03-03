#!/bin/env node

const readlineSync = require('readline-sync')
const {isRepeatDigits, generateNumber, ok, findBKinNumber} = require('./functions')

var numAttempts = 20
const n = Math.round(Math.random() * 3) + 3
const number = generateNumber(n)
console.log(`Я загадал число из ${n} цифр`)

while (true)
{
	let num = readlineSync.question('Угадайте чиcло: ')
	if (num == number)
	{
		console.log(`Отлично, Вы угадали!`)
		break;
	}

	// валидация
	if (num.length != number.length)
	{
		console.log(`Введите число из ${n} цифр`)
		continue;
	}
	if (isRepeatDigits(num))
	{
		console.log(`В числе не должно быть повторяющихся цифр`)
		continue;
	}

	printHint(num, number)

	// уменьшаем кол-во попыток
	numAttempts--
	if (!numAttempts)
	{
		console.log(`Упс, вы проиграли - все попытки исчерпаны :-)`)
		break;
	}
	if (numAttempts < 5 || numAttempts%5==0)
		console.log(ok(`Осталось ${numAttempts} попыт(ка|ки|ок)`))
}

/** печать подсказки */
function printHint(x, need)
{
	const {b, k} = findBKinNumber(x, need)
	let res = []
	if (b) res.push(ok(`${b} бык(|а|ов)`))
	if (k) res.push(ok(`${k} коров(а|ы|)`))
	console.log(res.length ? res.join(', ') : 'Таких цифр в задуманном числе нет')
}
