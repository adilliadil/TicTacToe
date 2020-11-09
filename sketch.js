let board = [
    ['','',''],
    ['','',''],
    ['','',''],
]


let w; // = width / 3;
let h; // = height / 3;

let ai = 'X';
let human = 'O';
let currentPlayer = human;
function setup() {
    createCanvas(400, 400);
    frameRate(4);
    w = width / 3;
    h = height / 3;
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

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          openSpots++;
        }
      }
    }
    if (winner == null && openSpots == 0) {
        return "Tie" 
    }
    return winner;
}

function draw() {
    background(220);
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
            if (spot == human) {
                noFill()
                ellipse(x,y,w/2)
            } else if (spot ==ai){
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
      }  
    }
}

function mousePressed() {

    console.log('mouse pressed', currentPlayer)
    if (currentPlayer == human) {
      // Human make turn
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      // If valid turn
      if (board[i][j] == '') {
        board[i][j] = human;
        currentPlayer = ai;
        nextTurn();
      }
    }
  }

  function nextTurn() {
    let available = [];
    for (let i=0; i< 3 ; i++) {
        for (let j=0; j< 3 ; j++) {
            if (board[i][j] == '') {
                available.push({i,j});
            }
        }
    }
    let move = random(available);
    board[move.i][move.j] = ai;
    currentPlayer = human
}