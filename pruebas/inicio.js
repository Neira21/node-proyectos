const array = [
  1, 2, 3, 45, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
]

const esPrimo = (numero) => {
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) {
      return false
    }
  }
  return numero !== 1 && numero !== 0
}

// const primos = array.filter(numero => esPrimo(numero))
// console.log(primos) // [2,3,5,7,11,13,17,19]

array.forEach((numero) => {
  console.log(`${numero} es primo: ${esPrimo(numero)}`)
})
