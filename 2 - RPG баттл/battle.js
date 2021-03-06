#!/bin/env node

const chalk        = require('chalk')
const readlineSync = require('readline-sync')
const startHealth  = readlineSync.question('Начальное здоровье Мага [=20]: ')

const Unit = require('./factory.js')

/* strategy: manual, simple, random, maxDamage, smarty */
var monster  = Unit.create({type: 'Monster',  strategy: 'random'})
var magician = Unit.create({type: 'Magician', strategy: 'manual', maxHealth: parseInt(startHealth)||20 })

console.log(`Битва началась. Монстр против Мага: ${monster.getHealth()} / ${magician.getHealth()}`)
var ck = 1
while (true)
{
	monster.setMove()
	magician.setMove(monster.getMove())
	magician.attack(monster)
	monster.attack(magician)
	console.log(chalk.white.bold(`Ход ${ck}. ${monster.name} применяет ${monster.getMove()['name']}, `
		+`${magician.name} в ответ ${magician.getMove()['name']}. ${monster.getHealth()} / ${magician.getHealth()}`))
	if (magician.getHealth() <= 0) { console.log('Маг умер :-('); break }
	if (monster.getHealth()  <= 0) { console.log('Монстр повержен!'); break }
	ck++
}
