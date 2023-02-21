
function printHello() {
  setTimeout(() => {
    console.log('Hello World');
  }, 2000);
}

printHello();

// funcao que retorna uma string depois de 2 seg

function asyncString() {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('string');
    }, 2000);
  });
  return promise;
};

// codigo imprime string retornada depois de 2 seg

asyncString().then((result) => console.log(result)); 
console.log(await asyncString());
