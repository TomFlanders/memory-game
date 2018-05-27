/* Initialize Variables */
let movecount = 0;
let tempID = "";
let flipped = 0;
let flippedClass = "";
let flippedID = "";
let timeRunning = false;
let newTime = 0;
let clock = "";
let finalTime = 0;
let matches = 0;

/* Reset Function */
/* 
Removes classes open,show and match from each square
Sets moves to 0
Shows all 3 stars
Sets timer to 0
Sets number of matches to 0
Calls shuffle and deal functions
*/
function reset() {
    for(let i = 1;i <= 16; i++){
        tempID = "c" + i;
            if(document.getElementById(tempID).classList.contains("open")){
                document.getElementById(tempID).classList.remove("open");
            }
            if(document.getElementById(tempID).classList.contains("show")){
                document.getElementById(tempID).classList.remove("show");
            }
            if(document.getElementById(tempID).classList.contains("match")){
                document.getElementById(tempID).classList.remove("match");
            }
 
    }

    movecount = 0;
    document.getElementsByClassName("moves")[0].innerHTML = movecount;

    document.getElementById("star2").style.display = "inline-block";
    document.getElementById("star3").style.display = "inline-block";
    document.getElementById("fstar2").style.display = "inline-block";
    document.getElementById("fstar3").style.display = "inline-block";

    timeRunning = false;
    newTime = 0;
    document.getElementById("seconds").innerHTML = newTime;
    clearInterval(clock);

    matches = 0;

    allCards = shuffle(allCards);
    putCards(allCards);

}

/* Move Handler */
/*
Counts move
Starts timer if needed
Reduces stars as needed
*/
function addMove(){
    if(timeRunning === false){
        timeRunning = true;
        runTime();
    }
    movecount++;
    document.getElementsByClassName("moves")[0].innerHTML = movecount;
    if(movecount > 20){
        document.getElementById("star3").style.display = "none";
        document.getElementById("fstar3").style.display = "none";
    }
    if(movecount > 40){
        document.getElementById("star2").style.display = "none";
        document.getElementById("fstar2").style.display = "none";
    }
}

/*
 * Create a list that holds all of your cards
 */
let allCards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb","fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
allCards = shuffle(allCards);
putCards(allCards);

/* Deal cards */
function putCards(newCards){
    let tempCard = ""
    for(let x = 1; x <= 16; x++){
        tempCard = "c" + x;
        document.getElementById(tempCard).children[0].classList = "";
        document.getElementById(tempCard).children[0].classList.add("fa");
        document.getElementById(tempCard).children[0].classList.add(newCards[x-1]);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Card Flipper */
/*
Adds classes open and show to square
Checks for matches
Locks cards if there is a match
Checks for win
If there is a win, stops timer and launches win modal
*/
 function flipCard(lid) {
     if(!document.getElementById(lid).classList.contains("open")){
        document.getElementById(lid).classList.toggle("open");
        document.getElementById(lid).classList.toggle("show");
        addMove();
        flipped++;
    }

    if(flipped == 1) {
        flippedClass = document.getElementById(lid).children[0].classList;
        flippedID = lid;
    }


    if(flipped == 2) {
        if(flippedClass[1] != document.getElementById(lid).children[0].classList[1]) {
            unFlip(flippedID);
            unFlip(lid);

        } else {
            matches++;

            document.getElementById(lid).classList.add("match");
            document.getElementById(flippedID).classList.add("match");

            if(matches > 7) {
                timeRunning = false;
                clearInterval(clock);
                document.getElementById("myModal").style.display = "block";
                document.getElementsByClassName("moves")[1].innerHTML = movecount;
                document.getElementById("fseconds").innerHTML = newTime;
                ;
            }
        }
        flipped = 0;
        flippedClass = "";
        flippedID = "";
    }


}

/* unflip non-matching cards */
function unFlip(uid) {
    setTimeout(function(){
    document.getElementById(uid).classList.remove("open");
    document.getElementById(uid).classList.remove("show");
}, 1500);
}

/* Timer */
function runTime(){
    if(timeRunning){
        clock = setInterval(function(){
            newTime++;
            document.getElementById("seconds").innerHTML = newTime;
        }, 1000);
    }
}

/* Closes modal box when close button is clicked */
function closeModal() {
    document.getElementById("myModal").style.display = "none";
    reset();
}
