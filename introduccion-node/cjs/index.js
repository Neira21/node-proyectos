//cjs => common js, es el estandar de node para importar y exportar modulos, se usa require 
//y module.exports

const { suma }= require('./sum.js')

console.log('La suma es:', suma(1,10))