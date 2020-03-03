#!/bin/env node

console.log('TEST isRepeatDigits')
const {isRepeatDigits} = require('./functions.js')
equal(false, isRepeatDigits(0))
equal(false, isRepeatDigits(123))
equal(true,  isRepeatDigits(11))
equal(true,  isRepeatDigits(10001))

console.log('TEST ok')
const {ok} = require('./functions.js')
equal('1 стул',    ok('1 стул(|а|ьев)'))
equal('2 стула',   ok('2 стул(|а|ьев)'))
equal('5 стульев', ok('5 стул(|а|ьев)'))
equal('15 машин',  ok('15 машин(а|ы|)'))
equal('101 машина',ok('101 машин(а|ы|)'))

console.log('TEST findBKinNumber')
const {findBKinNumber} = require('./functions.js')
equal({b:3, k:0}, findBKinNumber(123, 123))
equal({b:2, k:0}, findBKinNumber(124, 123))
equal({b:1, k:0}, findBKinNumber(156, 123))
equal({b:0, k:0}, findBKinNumber(567, 123))
equal({b:1, k:2}, findBKinNumber(132, 123))
equal({b:0, k:2}, findBKinNumber(234, 123))
equal({b:0, k:3}, findBKinNumber(231, 123))

function equal(need, x)
{
	need = JSON.stringify(need)
	x    = JSON.stringify(x)
	console.log(need === x?'[ OK ]':'[FAIL] '+need+' !== '+x)
}
