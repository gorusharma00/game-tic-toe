let playerTurn;

const playShow = document.querySelector('.play-game-section')

playShow.addEventListener('click', (e) => {
    const parent = e.target.parentNode.parentNode;
    parent.style.display = 'none';
})

const signChooseBtn = document.querySelectorAll('.select-btn')
signChooseBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.style.borderBottom = '2px solid #fff';        
        const sign = e.target.textContent;
        showTurn(sign)
        setDisableorEnable(signChooseBtn, true);
        playerTurn = sign;
        BoxEnableOrDisable(false)
    })
})

function showTurn(sign){
    document.querySelector('.player-turn').textContent = `${sign}'s turn...`;
}

function setDisableorEnable(signChooseBtn, value){
    signChooseBtn.forEach(item => item.disabled = value)
}

const boxes = document.querySelectorAll('.box')


function BoxEnableOrDisable(value){
    boxes.forEach(box => box.disabled = value);
}

const patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
]

let count = 0;
boxes.forEach((box) => {
    box.addEventListener('click', (e) => {
        if(playerTurn == 'X'){
            box.style.color = '#FB1349';
            box.textContent = 'X';
            playerTurn = 'O'
            showTurn('O')
        }else{
            box.style.color = '#fff';
            box.textContent = 'O';
            playerTurn = 'X'
            showTurn('X')
        }
        
        box.disabled = true;
        checkWinner();
        count++;
    })
})


function checkWinner(){
    for(let pattern of patterns){
        if(boxes[pattern[0]].textContent != "" && boxes[pattern[1]].textContent != "" && boxes[pattern[2]].textContent != ""){
            if(boxes[pattern[0]].textContent == boxes[pattern[1]].textContent && boxes[pattern[1]].textContent ==  boxes[pattern[2]].textContent){
                announceWinner(boxes[pattern[2]].textContent);
                return;
            } else if(count === 8){
                announceWinner();
            }
        }
    }
}

function announceWinner(player = 'draw'){
    const winner = document.querySelector('.winner-announcement');
    if(player == 'X'){
        winner.textContent = "X is Winner!!"
    }else if(player == 'O'){
        winner.textContent = "O is winner!!"
    }else{
        winner.textContent = "Match Draw!!"
    }
}

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', restart);

function restart(){
    playerTurn = '';
    count = 0;

    boxes.forEach(box => box.textContent = "");
    BoxEnableOrDisable(true);

    const winner = document.querySelector('.winner-announcement');
    winner.textContent = "";

    setDisableorEnable(signChooseBtn, false);
    document.querySelector('.player-turn').textContent = "";
}