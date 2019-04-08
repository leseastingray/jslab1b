// start with these global variables
var xIsNext = true;
var winner = null;
var squares = Array(9).fill(null);
var winningLine = Array();
// array of arrays of all the possible ways to win
var lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

function init()
{
    // Add an onclick handler to all of the squares
    // The name attribute for all of the divs is square
    // Use the function handleClick to handle the event
    var domSquares = document.getElementsByName("square");
    for (i = 0; i < domSquares.length; i++)
    {   
        domSquares[i].onclick = handleClick;
    }
}

function handleClick() {

    // Get the id from the square and put it in a variable
    // Remember that the id is an integer 0 - 8
    var id = this.id;

    // Set the element in the squares array to the player's symbol
    // Update the inner html for this square in the UI
    // Set the onclick handler for this square in the UI to an empty anonymous function or arrow function
    // Update the variable xIsNext
    if (xIsNext)
    {
        this.innerHTML = "X";
    }
    else
        this.innerHTML = "O";

    this.onclick = function(){};
    xIsNext = !xIsNext;

    // If calculateWinner returns true
    // highlight the winner and disable all of the squares
    // otherwise update the status in the UI to display the player

    if (calculateWinner())
    {
        highlightWinner();
        disableAll();
    }
    else
    {
        if (xIsNext)
        {
            document.getElementById("status").innerHTML = "Next Player: X";
        }
        else
        {
            document.getElementById("status").innerHTML = "Next Player: O";
        }
    }
}

function calculateWinner() 
{
    for (var i = 0; i < lines.length; i++) 
    {
        var a = lines[i][0];
        var b = lines[i][1];
        var c = lines[i][2];       
        if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) 
        {
            winner = squares[a];
            winningLine = lines[i];
            return true;
        }
    }
    return false;
    winner = null;
    winningLine = Array();

}

//
function highlightWinner() {

    // Update the status in the UI to display the winner
    // Iterate through the winningLine array.  It contains the indices of the winning squares
    //      get the next square using the current index in the winningLine array as the id
    //      add the class red to the square
    if (xIsNext)
    {
        document.getElementById("status").innerHTML = "Player O wins!";
    }
    else
        document.getElementById("status").innerHTML = "Player X wins!";

    // array iteration
    for (i = 0; i < winningLine.length; i++)
    {
        var id = winningLine[i];
        document.getElementById(id).className += "red";
    }
    // Disable all of the squares
    disableAll();
}

function disableAll() {

    // Set the onclick handler for all squares to function that does nothing
    // The id of the square is a number 0 - 8
    var domSquares = document.getElementsByName("square");
    for (i = 0; i < domSquares.length; i++)
    {
        domSquares[i].onclick = function(){};        
    }
}

// When the page has finished loading, call the function init 
window.onload = init;