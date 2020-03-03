#!/bin/env node

const fs = require('fs')
const readlineSync = require('readline-sync')

/**
 * Генератор: возвращает случайный вопрос для викторины
 */
function* questions()
{
	const DIR = './db/'
	const files = fs.readdirSync(DIR)
	files.sort(_=>Math.random()-0.5) // COMMENT: перемешиваем

	function trim(x) { return x.replace(/^\s+|\s+$/g, '') }

	for (let i=0; i<files.length; i++)
	{
		const data = trim(fs.readFileSync(`${DIR}/${files[i]}`).toString()).split("\n")
		const question = trim(data.splice(0, 1)[0])
		const answer = data.splice(0, 1)[0] - 1
		const answers = data
		if (answers[answer] == undefined) continue // простая валидация

		// перемешиваем ответы
		let newAnswer = answers[answer]
		answers.sort(_=>Math.random()-0.5)
		for (let i=0; i<answers.length; i++)
			if (answers[i] == newAnswer) { newAnswer = i; break; }

		yield { file: files[i], question, answer: newAnswer, answers }
	}
}


let numQuestions = 5 // COMMENT: кол-во вопросов в викторине
let result = 0       // COMMENT: кол-во правильных ответов
for (let a of questions())
{
	console.log(a.question)
	for (i=0; i<a.answers.length; i++)
		console.log(`  [${i+1}] ${a.answers[i]}`)
	const answer = readlineSync.question('Ваш вариант ответа: ')
	if (parseInt(answer) - 1 == a.answer)
		result++
	if (!--numQuestions) break
}

console.log(`Вы дали ${result} правильных ответов`)
