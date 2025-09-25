
const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            boardCells: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ],
            message: 'Lets play',
            currentPlayer: 'X',
            showBoard: false,
            hideButton: true,
        }
    },

});
app.component("Heading", {
    props: [],
    data() {
        return {
            boardCells: [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ],
            message: 'Lets play',
            currentPlayer: 'X',
            showBoard: false,
            hideButton: true,
        }

    },
    template: `<div v-if="showBoard" class="grid grid-cols-3 bg-blue-300 w-108 px-[5px] h-95 rounded-lg shadow-lg border border-gray-300">
            <div v-for="(row, rowIndex) in boardCells">
                <div v-for="(cell,colIndex) in row" @click="cellClicked(rowIndex, colIndex)"
                    class="flex justify-center items-center bg-gray-200 w-25 h-25 m-5" :class="{
                    'text-2xl text-center text-pink-600': cell === 'X',
                    'text-2xl text-center text-blue-600': cell === 'O',
                 }">
                    {{cell}}
                </div>

            </div>

        </div>
        <div class="flex justify-center mt-5 gap-10">
            <h1 class="text-black font-bold text-2xl">{{message}}</h1>
            <button v-if="hideButton" @click="startGame" class="border px-5 rounded-lg bg-blue-500 font-semibold text-2xl py-[3px] hover:bg-blue-200 cursor-pointer transition duration-150 ease-in-out">Start game</button>
        </div>`,
    methods: {
        startGame() {
            this.showBoard = true;
            this.hideButton = false;
        },
        cellClicked(row, col) {
            if (this.boardCells[row][col] === '') {
                this.boardCells[row][col] = this.currentPlayer
                if (this.isWinner(this.currentPlayer)) {
                    this.message = `Player ${this.currentPlayer} wins!`;
                    setTimeout(() => {
                        this.resetGame();
                    }, 1000);
                } else if (this.isDraw()) {
                    this.message = ` It's a draw!`;
                    setTimeout(() => {
                        this.resetGame();
                    }, 1000);
                } else {
                    this.currentPlayer = (this.currentPlayer == 'X') ? 'O' : 'X';
                }
            }
        },
        isWinner(user) {
            for (let row = 0; row < 3; row++) {
                if (this.boardCells[row][0] == user
                    && this.boardCells[row][1] == user
                    && this.boardCells[row][2] == user) {
                    return true;

                }
            }
            for (let col = 0; col < 3; col++) {
                if (this.boardCells[0][col] == user
                    && this.boardCells[1][col] == user
                    && this.boardCells[2][col] == user) {
                    return true;

                }
            }
            if (this.boardCells[0][0] == user
                && this.boardCells[1][1] == user
                && this.boardCells[2][2] == user) {
                return true;
            }
            if (this.boardCells[0][2] == user
                && this.boardCells[1][1] == user
                && this.boardCells[2][0] == user) {
                return true;

            }
            return false;
        },
        isDraw() {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (this.boardCells[row][col] === "") {
                        return false;
                    }
                }
            }
            return !this.isWinner("X") && !this.isWinner("O");
        },
        resetGame() {
            this.boardCells = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ];
            this.currentPlayer = "X";
            this.message = `Let's Play Again!`;
        },
    }



});
app.mount('#app')
