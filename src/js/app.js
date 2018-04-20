var tttBoxes = document.querySelectorAll('.ttt-container div'),
		turnContainer = document.querySelector('.player-turns'),
    pTurns = 1,
    p1Score = [],
    p2Score = [];

var successfulCombos = {
  row1: [1,2,3],
  row2: [4,5,6],
  row3: [7,8,9],
  col1: [1,4,7],
  col2: [2,5,8],
  col3: [3,6,9],
  diagonal1: [3,5,7],
  diagonal2: [1,5,9],
};


var checkScore = function(scoreArr,player){
	var ordered = scoreArr.sort();
  for(var key in successfulCombos){
  	if(!successfulCombos.hasOwnProperty(key)) continue;
  	if(successfulCombos[key].join() === ordered.join()){
    	console.log(player, 'wins!!');
    }
  }
};

var playerOne = function(pickedBox, boxNumber){
    p1Score.push(boxNumber);

    pickedBox.classList.add('p1-active');
    pickedBox.setAttribute('data-taken','true');

		turnContainer.innerText = 'Player 2 Turn';

    if(p1Score.length === 3){
    	checkScore(p1Score,'Player 1');
    }
};

var playerTwo = function(pickedBox,boxNumber){

    p2Score.push(boxNumber);

    pickedBox.classList.add('p2-active');
    pickedBox.setAttribute('data-taken','true');

  	turnContainer.innerText = 'Player 1 Turn';

    if(p2Score.length === 3){
    	checkScore(p2Score,'Player 2');
    }
};
tttBoxes.forEach(function(item,index){
  item.addEventListener('click', function(){
			var box = this;
      var i = index+1;
      pTurns % 2 === 0 ? playerTwo(box, i) : playerOne(box, i);
      pTurns++;
  });
});
