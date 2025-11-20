const playground = document.querySelector('.playground');

// Create some variables for block size
const blockHeight = 30; // height of each block in px
const blockWidth = 30;  // width of each block in px

// columnes nikal ne ke liyee eka simple function hai ki playground area ki width leke usko 30 se divide kar deke

const cols = Math.floor(playground.clientWidth / blockWidth);
const rows = Math.floor(playground.clientHeight / blockHeight);
const totalBlocks = cols * rows;
let IntervalId = null ;


let blocks = []; // array to hold all blocks
let snake = [ 
    { x : 1 , y : 2 } ,
    { x : 1 , y : 3 } ,
    { x : 1 , y : 4 } 
]; // initial snake position
let direction = "right";

// ab humein totalBlocks ke hisaab se blocks create karne hai aur unko playground mein add karna hai
// for (let i = 0; i < totalBlocks; i++) {
//     const block = document.createElement('div');
//     block.classList.add('block');
//     playground.appendChild(block);
// }

// we are using nested loops to create blocks row by row and column by column
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        const block = document.createElement('div');
        block.classList.add('block');
        playground.appendChild(block);
    }
}

let render = () => {
    snake .forEach( segment => {
        const index = segment.x * cols + segment.y;
        const block = playground.children[index];  
        block.classList.add('fill');
    })
}

IntervalId = setInterval(() => {

    let snakeHead = null ;

    if( direction === "left" ) {
        snakeHead = { x : snake[0].x , y : snake[0].y - 1 } ;
    } else if( direction === "right" ) {
        snakeHead = { x : snake[0].x , y : snake[0].y + 1 } ;
    } else if( direction === "up" ) {
        snakeHead = { x : snake[0].x - 1 , y : snake[0].y } ;
    } else if( direction === "down" ) {
        snakeHead = { x : snake[0].x + 1 , y : snake[0].y } ;
    }

    if( snakeHead.x < 0 || snakeHead.x >= rows || snakeHead.y < 0 || snakeHead.y >= cols ) {
        alert("Game Over") ;
        clearInterval( IntervalId ) ;
        return;
    }

    snake.forEach( segment => {
        const index = segment.x * cols + segment.y ;
        const block = playground.children[index] ;
        block.classList.remove('fill') ;
    }) ;

    snake.unshift( snakeHead ) ;
    snake.pop() ;
    
    render();
}, 600);

addEventListener("keydown", (e) => {

    if (e.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } 
    else if (e.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    } 
    else if (e.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } 
    else if (e.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }

});

// // ab humne blocks create kar diye hai aur unko playground mein add bhi kar diya hai    
// console.log(`Playground has ${cols} columns and ${rows} rows, total blocks: ${totalBlocks}`);

// Show number of blocks in the playground area   ...
// ab hum yeh dekh sakte hai ki blocks sahi se create hue hai ya nahi   
// const allBlocks = document.querySelectorAll('.block');
// console.log(`Total blocks in DOM: ${allBlocks.length}`);    
// // ab hum yeh dekh sakte hai ki blocks sahi se create hue hai ya nahi
// allBlocks.forEach((block, index) => {
//     block.textContent = index + 1; // just to visualize the blocks with numbers
// }); 