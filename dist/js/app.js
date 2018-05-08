var tttBoxes = document.querySelectorAll('.ttt-container div'),
    turnContainer = document.querySelector('.player-turns'),
    vsComputer = document.querySelector('#vs-computer'),
    pTurns = 1,
    p1Score = [],
    p2Score = [];

var successfulCombos = {
    row1: [1, 2, 3],
    row2: [4, 5, 6],
    row3: [7, 8, 9],
    col1: [1, 4, 7],
    col2: [2, 5, 8],
    col3: [3, 6, 9],
    diagonal1: [3, 5, 7],
    diagonal2: [1, 5, 9]
};


//For Both Manual and AI Player
var playerTwo = function(pickedBox, boxNumber) {

    p2Score.push(boxNumber);

    pickedBox.classList.add('p2-active');
    pickedBox.setAttribute('data-taken', 'true');

    turnContainer.innerText = 'Player 1 Turn';

    if (p2Score.length === 3) {
        checkScore(p2Score, 'Player 2');
    }
};

var computerCheck = function(combos) {

    //creating a random array of combo NAMES
    var randomArr = [];
    for (var key in combos) {
        if (!combos.hasOwnProperty(key)) continue;
        randomArr.push(key);
    }

    //grab a random combo based on random name
    var randomCombo = combos[randomArr[Math.floor(Math.random() * randomArr.length)]];
    // console.log(randomCombo);
    // console.log(p1Score);


    //push values that the player hasn't yet played from the random potential combo
    var cbArr = [];
    randomCombo.forEach(function(item, index) {
        if (p1Score.indexOf(item) === -1) cbArr.push(item);
    });

    // grab the first value from unplayed potential plays and set that as the computers choice
    // also, select the div that corresponds to the unplayed play.
    var compChoice = cbArr[0];
    var compDivChoice;
    document.querySelectorAll('.ttt-container div').forEach(function(i, index) {
        if ((index + 1) === compChoice) compDivChoice = i;
    });
    //console.log(compChoice);

    //pass in both as player two to play
    playerTwo(compDivChoice, compChoice);

}
///// AI ///////
var computerPlayer = function() {
    var fd;
    var potentialCombos = {}

    // Essentially doing exactly what array.every is doing - for practice
    // checking combos that match what's currently in p1 score array.
    // If ALL items in p1score array are found within a successful combo,
    // then push those combos to potential combos.

    for (var key in successfulCombos) {
        // var df = p1Score.every(function(v){
        // 	return successfulCombos[key].indexOf(v) > -1;
        // });
        // var df;
        var chk = [],
            df = false;
        p1Score.forEach(function(item, index) {
            // console.log(successfulCombos[key], successfulCombos[key].indexOf(item));
            if (successfulCombos[key].indexOf(item) > -1) {
                chk.push('true');
            } else {
                chk.push('false');
            }
            if (index === p1Score.length - 1) {
                if (chk.indexOf('false') === -1) df = true;
            }
        });
        if (df) {
            potentialCombos[key] = successfulCombos[key];
        }
    }
    //invoke after iterations are done and pass in potential combos to play
    computerCheck(potentialCombos);
    // successfulCombos[key].every(function(){
    // 	return this.indexOf(p1Score)
    // });
    // console.log(fd);
};

var checkScore = function(scoreArr, player) {
    var ordered = scoreArr.sort();
    for (var key in successfulCombos) {
        if (!successfulCombos.hasOwnProperty(key)) continue;
        if (successfulCombos[key].join() === ordered.join()) {
            console.log(player, 'wins!!');
        }
    }
};

var playerOne = function(pickedBox, boxNumber, computer) {
    p1Score.push(boxNumber);

    pickedBox.classList.add('p1-active');
    pickedBox.setAttribute('data-taken', 'true');

    turnContainer.innerText = 'Player 2 Turn';

    if (p1Score.length === 3) {
        checkScore(p1Score, 'Player 1');
    }
    //If AI enabled, start the computer player
    if (computer) {
        computerPlayer(boxNumber);
    }
};

tttBoxes.forEach(function(item, index) {
    item.addEventListener('click', function() {
        var box = this
        i = index + 1;
        //If computer mode is enabled, use AI
        if (vsComputer.checked) {
            playerOne(box, i, true);
        } else {
            //Manual players - if pTurns increment is divisible by 2 (every 2nd turn) then p2 turn, else p1 turn.
            pTurns % 2 === 0 ? playerTwo(box, i) : playerOne(box, i, false);
            pTurns++;
        }
    });
});