const fs = require('fs');

let data = fs.readFileSync('./res/tasks.json');
let boards = JSON.parse(data);

const showBoard = (name) => {
    for (const board of boards.Boards) {
        if(board.BoardName == name) {
            for(const task of board.Tasks) {
                console.log(task.TaskName);
            }
        }
    }
}

showBoard("R&D");