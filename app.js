import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });

class MinimaxTicTacToe {
    #STATE;
    #X = 1;
    #O = 2;
    #DEPTH = 3;
    constructor(state) {
        this.#STATE = state;
    }
    // Method to get the best move using Minimax
    getMove() {
        const initialSuccessors = this.#getSuccessors(this.#STATE, this.#X);
        let bestScore = -Infinity;
        let bestMove;

        for (let successor of initialSuccessors) {
            const score = this.#minimax(successor, this.#O, this.#DEPTH, -Infinity, Infinity);
            if (score > bestScore) {
                bestScore = score;
                bestMove = successor;
            }
        }
        // Return the best move
        return bestMove;
    }

    // Method to generate all possible successors of a given state
    #getSuccessors(state, turn) {
        var successors = [];
        state.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 0) {
                    var newState = state.map(row => row.slice());
                    newState[i][j] = turn;
                    successors.push(newState);
                }
            });
        });
        return successors;
    }
    // Minimax algorithm
    #minimax(state, turn, depth, alpha, beta) {
        const winner = this.#checkWinner(state);
        if (winner === this.#X) {
            return 10 - depth; // X wins, higher score for quicker win
        } else if (winner === this.#O) {
            return depth - 10; // O wins, lower score for quicker win
        } else if (this.#isBoardFull(state)) {
            return 0; // Draw, neutral score
        }

        if (turn === this.#X) {
            let bestScore = -Infinity;
            for (let successor of this.#getSuccessors(state, turn)) {
                const score = this.#minimax(successor, this.#O, depth + 1, alpha, beta);
                bestScore = Math.max(bestScore, score);
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) break; // Beta cut-off
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let successor of this.#getSuccessors(state, turn)) {
                const score = this.#minimax(successor, this.#X, depth + 1, alpha, beta);
                bestScore = Math.min(bestScore, score);
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) break; // Alpha cut-off
            }
            return bestScore;
        }
    }

    // Method to check if there is a winner
    #checkWinner(state) {
        // Check rows
        for (let row of state) {
            if (row[0] === row[1] && row[1] === row[2] && row[0] !== 0) {
                return row[0];
            }
        }

        // Check columns
        for (let col = 0; col < 3; col++) {
            if (state[0][col] === state[1][col] && state[1][col] === state[2][col] && state[0][col] !== 0) {
                return state[0][col];
            }
        }

        // Check diagonals
        if (state[0][0] === state[1][1] && state[1][1] === state[2][2] && state[0][0] !== 0) {
            return state[0][0];
        }
        if (state[0][2] === state[1][1] && state[1][1] === state[2][0] && state[0][2] !== 0) {
            return state[0][2];
        }

        return null; // No winner
    }

    // Method to check if the board is full
    #isBoardFull(state) {
        for (let row of state) {
            for (let cell of row) {
                if (cell === 0) return false;
            }
        }
        return true;
    }
}


class TicTacToe {
    #oLine1 = '   OOO   ';
    #oLine2 = ' OO   OO ';
    #oLine3 = 'O       O';
    #oLine4 = ' OO   OO ';
    #oLine5 = '   OOO   ';

    #xLine1 = 'X       X';
    #xLine2 = '  X   X  ';
    #xLine3 = '    X    ';
    #xLine4 = '  X   X  ';
    #xLine5 = 'X       X';

    #turn = 'x';

    #state = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];

    // Define positions
    #positions = [
        [`         `, `         `, `         `, `         `, `         `], // Position 1
        [`         `, `         `, `         `, `         `, `         `], // Position 2
        [`         `, `         `, `         `, `         `, `         `], // Position 3
        [`         `, `         `, `         `, `         `, `         `], // Position 4
        [`         `, `         `, `         `, `         `, `         `], // Position 5
        [`         `, `         `, `         `, `         `, `         `], // Position 6
        [`         `, `         `, `         `, `         `, `         `], // Position 7
        [`         `, `         `, `         `, `         `, `         `], // Position 8
        [`         `, `         `, `         `, `         `, `         `]  // Position 9
    ];

    #setPosition = (poNum, xoro) => {
        const posis = { '00': 0, '01': 1, '02': 2, '10': 3, '11': 4, '12': 5, '20': 6, '21': 7, '22': 8 };
        if (xoro == 'x') {
            this.#positions[posis[poNum]][0] = this.#xLine1;
            this.#positions[posis[poNum]][1] = this.#xLine2;
            this.#positions[posis[poNum]][2] = this.#xLine3;
            this.#positions[posis[poNum]][3] = this.#xLine4;
            this.#positions[posis[poNum]][4] = this.#xLine5;
        } else if (xoro == 'o') {
            this.#positions[posis[poNum]][0] = this.#oLine1;
            this.#positions[posis[poNum]][1] = this.#oLine2;
            this.#positions[posis[poNum]][2] = this.#oLine3;
            this.#positions[posis[poNum]][3] = this.#oLine4;
            this.#positions[posis[poNum]][4] = this.#oLine5;
        }
        var status = false;
        this.#state.forEach((arr, i) => {
            arr.forEach((_, j) => {
                if (Number(poNum[0]) == i && Number(poNum[1] == j)) {
                    if (this.#state[i][j] == 0) {
                        this.#state[i][j] = (xoro == 'o') ? 2 : 1;
                        status = true;
                    }
                }
            });
        });
        return status;
    }

    #checkWinner = () => {
        if (
            (this.#state[0][0] === this.#state[0][1] && this.#state[0][1] === this.#state[0][2] && this.#state[0][0] !== 0) || // Row 1
            (this.#state[1][0] === this.#state[1][1] && this.#state[1][1] === this.#state[1][2] && this.#state[1][0] !== 0) || // Row 2
            (this.#state[2][0] === this.#state[2][1] && this.#state[2][1] === this.#state[2][2] && this.#state[2][0] !== 0) || // Row 3

            (this.#state[0][0] === this.#state[1][1] && this.#state[1][1] === this.#state[2][2] && this.#state[0][0] !== 0) || // Diagonal \
            (this.#state[0][2] === this.#state[1][1] && this.#state[1][1] === this.#state[2][0] && this.#state[0][2] !== 0) || // Diagonal /

            (this.#state[0][0] === this.#state[1][0] && this.#state[1][0] === this.#state[2][0] && this.#state[0][0] !== 0) || // Column 1
            (this.#state[0][1] === this.#state[1][1] && this.#state[1][1] === this.#state[2][1] && this.#state[0][1] !== 0) || // Column 2
            (this.#state[0][2] === this.#state[1][2] && this.#state[1][2] === this.#state[2][2] && this.#state[0][2] !== 0)    // Column 3
        ) {
            return true;
        } else {
            return false;
        }
    }

    print() {
        const posis = {
            '00x': () => this.#setPosition('00', 'x'),
            '01x': () => this.#setPosition('01', 'x'),
            '02x': () => this.#setPosition('02', 'x'),
            '10x': () => this.#setPosition('10', 'x'),
            '11x': () => this.#setPosition('11', 'x'),
            '12x': () => this.#setPosition('12', 'x'),
            '20x': () => this.#setPosition('20', 'x'),
            '21x': () => this.#setPosition('21', 'x'),
            '22x': () => this.#setPosition('22', 'x'),
            '00o': () => this.#setPosition('00', 'o'),
            '01o': () => this.#setPosition('01', 'o'),
            '02o': () => this.#setPosition('02', 'o'),
            '10o': () => this.#setPosition('10', 'o'),
            '11o': () => this.#setPosition('11', 'o'),
            '12o': () => this.#setPosition('12', 'o'),
            '20o': () => this.#setPosition('20', 'o'),
            '21o': () => this.#setPosition('21', 'o'),
            '22o': () => this.#setPosition('22', 'o'),
        };
        // Iterate through the state to set positions
        this.#state.forEach((row, j) => {
            row.forEach((num, i) => {
                if (num === 1) {
                    posis[`${j}${i}x`](); // Call the function for x
                } else if (num === 2) {
                    posis[`${j}${i}o`](); // Call the function for o
                }
            });
        });

        console.log(`
    #################################################################
    #################################################################
    ### 1              #### 2               #### 3               ####
    ###   ${this.#positions[0][0]}    ####    ${this.#positions[1][0]}    ####    ${this.#positions[2][0]}    ####
    ###   ${this.#positions[0][1]}    ####    ${this.#positions[1][1]}    ####    ${this.#positions[2][1]}    ####
    ###   ${this.#positions[0][2]}    ####    ${this.#positions[1][2]}    ####    ${this.#positions[2][2]}    ####
    ###   ${this.#positions[0][3]}    ####    ${this.#positions[1][3]}    ####    ${this.#positions[2][3]}    ####
    ###   ${this.#positions[0][4]}    ####    ${this.#positions[1][4]}    ####    ${this.#positions[2][4]}    ####
    ###                ####                 ####                 ####
    #################################################################
    #################################################################
    ### 4              #### 5               #### 6               ####
    ###   ${this.#positions[3][0]}    ####    ${this.#positions[4][0]}    ####    ${this.#positions[5][0]}    ####
    ###   ${this.#positions[3][1]}    ####    ${this.#positions[4][1]}    ####    ${this.#positions[5][1]}    ####
    ###   ${this.#positions[3][2]}    ####    ${this.#positions[4][2]}    ####    ${this.#positions[5][2]}    ####
    ###   ${this.#positions[3][3]}    ####    ${this.#positions[4][3]}    ####    ${this.#positions[5][3]}    ####
    ###   ${this.#positions[3][4]}    ####    ${this.#positions[4][4]}    ####    ${this.#positions[5][4]}    ####
    ###                ####                 ####                 ####
    #################################################################
    #################################################################
    ### 7              #### 8               #### 9               ####
    ###   ${this.#positions[6][0]}    ####    ${this.#positions[7][0]}    ####    ${this.#positions[8][0]}    ####
    ###   ${this.#positions[6][1]}    ####    ${this.#positions[7][1]}    ####    ${this.#positions[8][1]}    ####
    ###   ${this.#positions[6][2]}    ####    ${this.#positions[7][2]}    ####    ${this.#positions[8][2]}    ####
    ###   ${this.#positions[6][3]}    ####    ${this.#positions[7][3]}    ####    ${this.#positions[8][3]}    ####
    ###   ${this.#positions[6][4]}    ####    ${this.#positions[7][4]}    ####    ${this.#positions[8][4]}    ####
    ###                ####                 ####                 ####
    #################################################################
    #################################################################
                                                                     `); // Print the board state
    }
    /**
    * @param {Array} arrPos 3*3 array. [ [1,2,3], [4,5,6], [7,8,9] ]
    */
    setState(arrPos) {
        if (arrPos.length != 3)
            throw new Error("We have 3 rows. Error in position input...!");
        arrPos.forEach(col => {
            if (col.length != 3)
                throw new Error("We have 3 colunms. Error in position input...!");
            col.forEach(Num => {
                if (Num < 0 || Num > 2)
                    throw new Error("Enter 0 for null, 1 for X and 2 for O. Error in position input...!");
            });
        });
        this.#state = arrPos;
        return true;
    }

    play() {
        this.print(); // Print the current game state

        if (this.#turn == 'x') {
            console.log('AI is thinking...!');
            const minimaxTTT = new MinimaxTicTacToe(this.#state);
            const bestMove = minimaxTTT.getMove();
            this.setState(bestMove);
        } else
            while (true) {
                const selectedPos = Number(prompt(`Enter a number 1-9 (player ${this.#turn}): `)) - 1;
                const posis1 = {
                    0: '00', 1: '01', 2: '02',
                    3: '10', 4: '11', 5: '12',
                    6: '20', 7: '21', 8: '22'
                };

                // Input validation
                if (selectedPos >= 0 && selectedPos <= 9) {
                    if (this.#setPosition(posis1[selectedPos], this.#turn)) {
                        break; // Exit loop if position was successfully set
                    } else {
                        console.log(`${selectedPos + 1} is already taken. Please select another position.`);
                    }
                } else {
                    console.log(`Enter a number between 1 and 9 (player ${this.#turn})...!`);
                }
            }

        // Switch turns
        this.#turn = this.#turn === 'x' ? 'o' : 'x';


        // Check for winner
        if (this.#checkWinner()) {
            this.print(); // Print updated game state
            console.log(`Winner: ${(this.#turn === 'x') ? 'o' : 'x'}`);
        } else {
            // Check for a draw
            const emptyCells = this.#state.flat().filter(num => num === 0).length;
            if (emptyCells > 0) {
                this.play(); // Continue the game if there are empty cells
            } else {
                this.print(); // Print updated game state
                console.log("Game finished...! It's a draw.");
            }
        }
    }
}

var game = new TicTacToe;
game.play();