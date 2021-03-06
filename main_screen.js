let arrayRandomNumber = [];
let e = null;
let coinQuantity = 0;
let totalClicked = 0;

displayDivBlock = () => {
    let changeId = 0;
    for (let ctr = 0; ctr < 64; ctr += 1) {
        let createDiv = document.createElement('div');
        let createInnerDiv = document.createElement('div');
        let getElement = document.getElementById('main_container');
        createDiv.setAttribute("class", "coin_block");
        createInnerDiv.setAttribute("class", "coin_block_inner");
        changeId = ctr + 1;
        createInnerDiv.setAttribute("id", changeId);
        createDiv.appendChild(createInnerDiv);
        getElement.appendChild(createDiv);
    }
}
//Game start method
startGame = (event) => {    
    if (!btn_start_game.clicked) {
        let no = null;           
        setTimeout(() => {
            for (let ctr = 1; ctr < 55; ctr += 1) {
                no = randomNumber();  
                document.getElementById(no).style.opacity = "1";
                arrayRandomNumber.push(no);
            }
        }, 1000);   
        showArray();
        setTimeout(() => {
            for (let ctr = 0; ctr <= arrayRandomNumber.length; ctr += 1) {
                document.getElementById(arrayRandomNumber[ctr]).style.opacity = "0";  
            }                        
        }, 6000);
        btn_start_game.clicked = true;    
    } else {
        event.preventDefault();
    }     
}

showArray = () => {
    let flipCoinCounter = 0;
    let interval = setInterval(() => {
        flipCoinCounterMethod();
    }, 1000);
    flipCoinCounterMethod = () => {
        if (flipCoinCounter == 5) {    
            clearInterval(interval);
            startGameCounter();
            document.getElementById("show_time").innerHTML = "START";
            document.getElementById("shadow_black").style.visibility = "hidden";
        } else {     
            flipCoinCounter++;    
            document.getElementById("show_time").innerHTML = flipCoinCounter;
        }
    }
}

startGameCounter = () => {
    let counter = 0;
    let getShadowBlock = document.getElementById("shadow_black");
    let getScoreHeading = document.getElementById("score_heading");
    let startGameCtr = setInterval(() => {
        startTimer();
    }, 1000);   
    startTimer = () => {
        if (counter == 30) {
            let printResult = "";
            if (coinQuantity >= 20 && coinQuantity < 30) {
                printResult = "Passed";
            } else if (coinQuantity >= 30 && coinQuantity < 40) {
                printResult = "GREAT !!!";
            } else if (coinQuantity >= 40) {
                printResult = "Excellent";
            } else {
                printResult = "Try Again...Loser";
            }            
            clearInterval(startGameCtr);
            getScoreHeading.innerHTML += ": " + coinQuantity + " <br/> " + printResult + " <br> " + "Total Attempt: " + totalClicked;
            getShadowBlock.style.visibility = "visible";
            getShadowBlock.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            document.getElementById("score_board").style.visibility = "visible";
            document.getElementById("show_time").innerHTML = "Time's Up";
        } else {           
            counter++;          
            counter = counter <= 9 ? "0" + counter : counter;
            document.getElementById("show_time").innerHTML = counter;
        }
    }     
}

randomNumber = () => {
    let randNum = Math.floor(Math.random() * 64 + 1);
    return randNum;   
}

function printId(e) {
    e = e || window.event;
    e = e.srcElement || e.target;
    if (e.style.opacity == '1' || e.style.opacity == .21) {
        return false;
    }
    if (!((e.id === 'upper_container') || (e.id === 'header_image_container') || (e.id === '') || (e.id === 'btn_refresh') || (e.id === 'btn_start_game') || (e.id === 'shadow_black') || (e.id === 'show_time'))) {
        totalClicked += 1;
        e.style.opacity = .21;    
    }
    for (let ctr = 0; ctr < 65; ctr += 1) {
        if (e.id == arrayRandomNumber[ctr] && !(e.style.opacity == '1')) {
            e.style.backgroundColor = 'rgb(249, 249, 248)';
            coinQuantity += 1;
            e.style.opacity = 1;
        } 
    }
}

refreshPage = () => {
    location.reload();
}