let board = [
    ['','',''],
    ['','',''],
    ['','',''],
]
let players = ['O','X'];
let currentPlayer;
let available = [];
function setup() {
    createCanvas(400, 400);
    frameRate(4);
    currentPlayer = floor(random(players.length));
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            available.push([i,j]);
        }
    }
}

function equal3(a,b,c) {
    return a==b && b==c && a!=''
}
function checkWinner() {
    let winner = null;
    for (let i = 0; i < 3; i++) {
        //vertical
        if(equal3(board[0][i] ,board[1][i] ,board[2][i])) {
            winner = board[0][i];
        }
        //horizontal
        if(equal3(board[i][0] , board[i][1] , board[i][2])) {
            winner = board[i][0];
        }
    }
    //forward diagonal
    if(equal3(board[0][0] , board[1][1] , board[2][2])) {
        winner = board[1][1];
    }
    //backward diagonal
    if(equal3(board[2][0] , board[1][1] , board[0][2])) {
        winner = board[1][1];
    }

    if (winner == null && available.length == 0) {
        return "Tie" 
    }
    return winner;
}
function nextTurn() {
    let index = floor(random(available.length))
    let spot = available.splice(index,1)[0];
    board[spot[0]][spot[1]] = players[currentPlayer];
    currentPlayer = 1-currentPlayer
}

// function mousePressed() {
//     nextTurn()
// }

function draw() {
    background(220);
    let w = width / 3;
    let h = height / 3;
    line(w,0, w, height)
    line(2*w,0, 2*w, height)
    line(0,h, width, h)
    line(0,2*h, width, 2*h)
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            let x = w * i+ w/2;
            let y = h * j+ w/2;
            let spot = board[i][j];
            textSize(32);
            strokeWeight(3);
            if (spot == players[0]) {
                noFill()
                ellipse(x,y,w/2)
            } else if (spot == players[1]){
                let xr = w/4
                line(x-xr,y-xr,x+xr,y+xr)
                line(x+xr,y-xr,x-xr,y+xr)
            }
        } 
  }

  result = checkWinner();
  if (result != null) {
      noLoop();
      console.log(result);
      let resultP = createP('');
      resultP.style('font-size', '32pt');
      if (result == 'tie') {
        resultP.html("Tie!")
      } else {
        resultP.html(`${result} wins!`);
      }  } else {
    nextTurn();
  }
}