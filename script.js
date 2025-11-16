let block = Array.from(document.querySelectorAll(".block"));
let game_over = document.querySelector(".game-over");
let gm_over = document.querySelector(".gm-over");

let reset = document.querySelector(".Reset-btn");
let instruction = document.querySelector(".Instruction-btn");
let New_game = document.getElementById("New-game_btn");

let turn_X = true;

block.forEach(value => {
    value.addEventListener("click", () => {
        if (value.classList.contains("content-X") || value.classList.contains("content-O")) {
            return;
        }
        if (turn_X) {
            value.classList.add("content-X");
            turn_X = false;
        }
        else {
            value.classList.add("content-O");
            turn_X = true;
        }
        CheckWinner();
    })
})


let winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Row win pattern
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Column win pattern
    [0, 4, 8], [2, 4, 6]          // Diagonal win pattern 
]


function CheckWinner() {

    let WinnerFound = false;

    for (let pattern of winPatterns) {
        let pos1 = block[pattern[0]];
        let pos2 = block[pattern[1]];
        let pos3 = block[pattern[2]];

        if (pos1.classList.contains("content-X") && pos2.classList.contains("content-X") && pos3.classList.contains("content-X")) {
            WinnerFound = true;
            setTimeout(() => {
                pos1.style.backgroundColor = "White"
                pos2.style.backgroundColor = "White"
                pos3.style.backgroundColor = "White"
                DisableBlocks();
                game_over.classList.remove("hidden");
                gm_over.innerHTML = "<h1>Game Over, Winner is X</h1>";
            }, 100);
        }
        else if (pos1.classList.contains("content-O") && pos2.classList.contains("content-O") && pos3.classList.contains("content-O")) {
            WinnerFound = true;
            setTimeout(() => {
                pos1.style.backgroundColor = "White"
                pos2.style.backgroundColor = "White"
                pos3.style.backgroundColor = "White"
                DisableBlocks();
                game_over.classList.remove("hidden");
                gm_over.innerHTML = "<h1>Game Over, Winner is O</h1>";
            }, 100);
        }
    }

    let filled_blocks = block.filter(value => {
        return value.classList.contains("content-X") || value.classList.contains("content-O")
    });

    if (WinnerFound === false && filled_blocks.length === 9) {
        setTimeout(() => {
            game_over.classList.remove("hidden");
            gm_over.innerHTML = "<h1>No Result, Game Draw</h1>";
        }, 100);
    }
}

reset.addEventListener("click", () => {
    turn_X = true;
    EnableBlocks();
    block.forEach(value => {
        value.classList.remove("content-X");
        value.classList.remove("content-O");
    });
});

instruction.addEventListener("click", () => {
    alert("1. This game is Played between two players.\n2. Usually Player 1 takes X and Player 2 takes O.\n3. One by One both Players clicks on the boxes and fills the X and O.\n4. Whichever Players makes three consecutive X or O, that Player wins the game.\n5. Player According to the Rules.");
});


const DisableBlocks = () => {
    block.forEach(value => {
        value.style.pointerEvents = "none"; // This is used to disable the blocks after the move
    })
}

const EnableBlocks = () => {
    block.forEach(value => {
        value.style.pointerEvents = "auto"; // This is used to enable the blocks again
    })
}

New_game.addEventListener("click", () => {
    turn_X = true;
    EnableBlocks();
    game_over.classList.add("hidden");
    block.forEach(value => {
        value.classList.remove("content-X");
        value.classList.remove("content-O");
        value.style.backgroundColor = "gold"
        value.addEventListener("mouseover", () => {
            value.style.backgroundColor = "yellow";
        });
        value.addEventListener("mouseout", () => {
            value.style.backgroundColor = "gold";
        });
    })
});