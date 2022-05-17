const state = {
    scores: {
        player1 : 0,
        player2 : 0
    },

    squares: Array(9).fill(null),
    xIsNext: true,
};

function calculateWinner(squares){
    const winning_lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(line in winning_lines){
        const[a, b, c] = winning_lines[line];
        if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
            winner = squares[a]
            showWinner(winner)
            setTimeout(() => resetBoard(winner), 1000)
            break
        }
    }

    if(!squares.includes(null)){
        showWinner(null)
        setTimeout(() => resetBoard(null), 1000)
    }
}

function resetBoard(winner){
    if(winner){
        if(winner === 'X'){
            state.scores.player1++;
        }
        else{
            state.scores.player2++;
        }
    }
    state.squares = Array(9).fill(null)
    state.xIsNext = true;
    $("#player1Score").text(state.scores.player1)
    $("#player2Score").text(state.scores.player2)
    renderBoard()
}

function showWinner(winner){
    const alertBox = $("#alert-box")
    if(winner){
        if(winner === 'X'){
            displayWinner = "Player 1"
        }
        else{
            displayWinner = "Player 2"
        }
        alertBox.html(`${displayWinner} <strong> Won! </strong>`)
    } else {
        alertBox.html(`It's a draw!`)
    }
    alertBox.slideDown();
    setTimeout(() => alertBox.slideUp(), 1000)
}

function renderSquare(index){
    const val = state.squares[index] ? state.squares[index] : "&nbsp"
    square = document.createElement("div")
    square.setAttribute("value", `${index}`)
    square.setAttribute("class", "box col-lg-4 col-md-4 col-sm-4 col-xs-4")
    square.setAttribute("onclick", `boxClick(${index})`)
    square.innerHTML = `${val}`
    document.getElementById("board").appendChild(square) 
}

function renderBoard(){
    $("#board").html("")
    for(let i = 0; i < 9; i++){
        renderSquare(i)
    }
    calculateWinner(state.squares)
}

function boxClick(index){
    const squares = state.squares;
    if(calculateWinner(squares) || squares[index]){
        return;
    }
    squares[index] = state.xIsNext ? 'X' : 'O'
    state.squares = squares
    state.xIsNext = !state.xIsNext
    renderBoard()
}

function resetGame(){
    state.scores.player1 = 0
    state.scores.player2 = 0
    resetBoard(null);
}

$(() => {
    renderBoard();
    $("#alert-box").slideUp(0.0001);
    $("#clear").on("click", () => resetBoard(null))
    $("#reset").on("click", () => resetGame());
})