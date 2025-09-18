# importar numpy
from numpy import sqrt

def calcularnumeroperfecto(num1, num2):
  if num1 < num2:
      for i in range(num1, num2 + 1):
          suma = 0
          for j in range(1, int(i/2)+ 1):
              if i % j == 0:
                  suma += j
          if suma == i:
              print(i)
  else:
      print("El primer número debe ser menor que el segundo número")

      
calcularnumeroperfecto(1, 50000)