const resultDisplay = document.querySelector('#result');
const timeLeftDisplay = document.querySelector('#time-left');
const startPauseButton = document.querySelector('#start-pause-button');
const squares = document.querySelectorAll('.grid div');

const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');



const width = 9;
let currentIndex = 76;
let currentTime = 20;


function moveFrog(evt){
    squares[currentIndex].classList.remove('frog');    
    switch(evt.key)
    {
        case 'ArrowLeft':
        case 'a':
            if (currentIndex % width !== 0){
                currentIndex--;
            }
            break;

        case 'ArrowRight':
        case 'd':
            if (currentIndex % width !== width - 1){
                currentIndex++;
            }
            break;

        case 'ArrowUp':
        case 'w':
            if (currentIndex >= width){
                currentIndex -= width;
            } 
            break;

        case 'ArrowDown':
        case 's':
            if (currentIndex <= width**2 - width - 1){
                currentIndex += width;
            }
            break;

    }
    squares[currentIndex].classList.add('frog');
}






function autoMoveLogs()
{
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    checkLose();

}



function moveLogLeft(logLeft)
{
    switch(true)
    {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1');
            logLeft.classList.add('l2');
            break;

        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;

        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;

        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;

        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1');
            break;
    }
}





function moveLogRight(logRight)
{
    switch(true)
    {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;

        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;

        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;

        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;

        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
            break;
    }
}









function autoMoveCars()
{
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));

}




function moveCarLeft(carLeft)
{
    switch(true)
    {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;

        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;

        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;
    }
}





function moveCarRight(carRight)
{
    switch(true)
    {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;

        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;

        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }
}



function checkLose()
{
    if (squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') || 
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0 )
    {
        resultDisplay.textContent = 'You Lost !!!';
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup',moveFrog);
        clearInterval(countdownTimerId);
        clearInterval(outcomeTimerId);
    }
}



function checkWin()
{
    if (squares[currentIndex].classList.contains('ending-block'))
    {
        resultDisplay.textContent = 'You Win !!!';
        document.removeEventListener('keyup',moveFrog);
        clearInterval(countdownTimerId);
        clearInterval(outcomeTimerId);

    }
}


function countdown()
{
    currentTime--;
    timeLeftDisplay.textContent = currentTime;
}
let countdownTimerId;



function checkOutcome()
{
    checkLose();
    checkWin();
}



startPauseButton.addEventListener('click',() => {
    if (countdownTimerId){
        clearInterval(countdownTimerId);
        clearInterval(outcomeTimerId);
        clearInterval(timerIdCars);
        clearInterval(timerIdLogs);
        document.removeEventListener('keyup',moveFrog);
        countdownTimerId = null;
        outcomeTimerId = null;
        timerIdCars = null;
        timerIdLogs = null;
    }
    else{
        countdownTimerId = setInterval(countdown,1000);
        outcomeTimerId = setInterval(checkOutcome,50);
        document.addEventListener('keyup',moveFrog);
        timerIdLogs = setInterval(autoMoveLogs,300);
        timerIdCars = setInterval(autoMoveCars,450);
    }
})


