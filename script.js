let currentPlayer = "p1";
const boxes = document.querySelectorAll(".playing-boxes");
const resetBtn = document.querySelector("#reset-btn-container");
const hiddenCard = document.querySelector(".hidden-card");

const winningCases = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
let player1 = [];
let player2 = [];

//change the current player indicator in the header section
const changePlayer = (nowPlaying) => {
    const playerSelector = document.querySelector("#chnagePlayer");
    if(nowPlaying === 1) {
        playerSelector.textContent = 2;
    }
    else if(nowPlaying === 2){
        playerSelector.textContent = 1;
    }
}


const revealCard = (result) =>{
    const winnderInfo = document.querySelector("#winner-info");

    if(result === "tied"){
        winnderInfo.textContent = "Draw...!";
    }
    else{
        winnderInfo.textContent = result+" won...!";
    }

    hiddenCard.style.display = "block";
}


const updateScore = (result) => {
    if(result === "tied"){
        let tieScore = Number(document.querySelector("#tieScore").textContent);
        tieScore +=1;
        document.querySelector("#tieScore").textContent = tieScore;
    }
    else if(result === "Player1"){
        let p1Score = Number(document.querySelector("#p1Score").textContent);
        p1Score +=1;
        document.querySelector("#p1Score").textContent = p1Score;
    }
    else{
        let p2Score = Number(document.querySelector("#p2Score").textContent);
        p2Score +=1;
        document.querySelector("#p2Score").textContent = p2Score;
    }
}

const checkWon = (p) =>{
    let result = null;
    const player = p === "p1" ? player1 : player2;
    for (let val of winningCases) {
        let m = 0;
        for (let a of player) {
            if (val.includes(a)) {
                m++;
            }
        }
        if (m === 3) {
            result = p === "p1" ? "Player1" : "Player2";
            revealCard(result);
            updateScore(result);
            return result; // Return the result if a player has won
        }
    }

    if (player1.length + player2.length === 9) {
        result = "tied";
        revealCard(result);
        updateScore(result);
        return result; // Return the result if it's a draw
    }
    return result;
}

//defining the logic for adding X or O in the box when clicked
const addElementToBox = (evt) => {
    if (evt.target.querySelector("img")) return; 

    if(currentPlayer === "p1"){
        evt.target.innerHTML = "<img src='images/x.svg' alt='X' class='played-img'>";
        player1.push(Number(evt.target.id));
    }
    else {
        evt.target.innerHTML = "<img src='images/0.svg' alt='O' class='played-img'>";
        player2.push(Number(evt.target.id));
    }

    const result = checkWon(currentPlayer);
    if (result) return;

    changePlayer(currentPlayer === "p1" ? 1 : 2);
    currentPlayer = currentPlayer === "p1" ? "p2":"p1";

    const img = evt.srcElement.querySelector("img");
    img.addEventListener('click', (event) => {
        event.stopPropagation();
    })
}


//logic for resetting the playing area
const removeAllElementsFromAllBoxes = () => {
    hiddenCard.style.display = "";

    boxes.forEach( (box) => {
        box.innerHTML = "";
        player1=[];
        player2 =[];
    } )
}



//adding event listener to all the box in the playing area
boxes.forEach( (box) => {
    box.addEventListener("click",addElementToBox);
} )

//adding eventListener for reset button
resetBtn.addEventListener("click",removeAllElementsFromAllBoxes);

//eventListener for close button on winner card
const close = document.querySelector("#close");
close.addEventListener("click",removeAllElementsFromAllBoxes)