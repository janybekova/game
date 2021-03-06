let button = document.querySelector('.guessSubmit')
let lastGuesses = document.querySelector('.guesses')
let lastResult = document.querySelector('.lastResult')
let lowOrHigh = document.querySelector('.lowOrHi')
let guessField = document.querySelector('#guessField')

let guesses = 1 // создаем переменную, которая отвечает за кол-во попыток
let randomNumber = Math.floor(Math.random() * 100) + 1 //генерируем случайное число от 1 до 100
let resetButton

let checkGuess = () => {
    if (guessField.value.length > 0) {
        let userGuess = Number(guessField.value) // создаем переменную, в которую записывается значение нашего интупа
        if(guesses === 1){
            lastGuesses.textContent = `Previous guesses:`
        }
        lastGuesses.textContent += userGuess + ' '
        if (userGuess === randomNumber) { // есди угадали число
            lastResult.textContent = `Поздравляю, вы угадали число!`
            lastResult.style.backgroundColor = `green`
            lowOrHigh.textContent = ''
            setGameOver()

        } else if (guesses === 10) { //если кол-во попыток больше 10
            lastResult.textContent = `Игра окончена! Превышено количество чисел!`
            button.disabled = true
            setGameOver()
        } else { // если не угадали число
            lastResult.textContent = `Не правильно!`
            lastResult.style.backgroundColor = `red`
            if (userGuess - randomNumber < 5 && userGuess - randomNumber > -5) { // если мы близко к загаданному числу
                lowOrHigh.textContent = `Вы близко!`
            } else if (userGuess > 100) { //если число которое мы ввели, больше 100
                lastResult.textContent = `Вы ввели число больше 100!`
            } else if (userGuess < 0) {//если число которое мы ввели, меньше 0
                lastResult.textContent = `Вы ввели число меньше 0!`
            } else { // если мы не близко к загаданному числу.
                lowOrHigh.textContent = `Холодно!`
                lowOrHigh.style.backgroundColor = `blue`
            }
        }
        guesses++
    }
}
let setGameOver = () =>{
    guessField.disabled = true // выключаем инпут
    button.disabled = true // включаем кнопку
    resetButton = document.createElement('button')//создаем переменную, в которой создаем новую кнопку
    resetButton.textContent = `Начать новую игру` //в значение этой кнокпи записываем начать новую игру
    document.body.appendChild(resetButton) //помещаем данные кнопку в body через appendChild
    resetButton.addEventListener('click', resetGame) //навешиваем на кнопку событие клика, при котором выполнится функция
}
let resetGame = () =>{ // функция для сброса всей игры
    guesses = 1
    lastResult.textContent = ''
    lastGuesses.textContent = ''
    lowOrHigh.textContent = ''
    guessField.disabled = false
    button.disabled = false
    lastResult.style.backgroundColor = 'white'
    resetButton.parentNode.removeChild(resetButton)

}


button.addEventListener('click', () => {
    checkGuess()
    guessField.value = ''
})