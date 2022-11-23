const fs = require('fs');

let data = fs.readFileSync('./res/tasks.json');
let boards = JSON.parse(data);

const boardStatistics = (name) => {
    for (const board of boards.Boards) {
        let prog = [0,0,0];  //prog[0] = To-Do, prog[1] = In Progress, prog[2] = Done
        let prior = [0,0,0]; //prior[0] = Low, prior[1] = Medium, prior[2] = High
        let taskCount = 0;
        if(board.BoardName == name) {
            for(const task of board.Tasks) {
                taskCount++;
                switch (task.Status) {
                    case "To-Do":
                        prog[0]++;
                        break;
                    case "In Progress":
                        prog[1]++;
                        break;
                    case "Done":
                        prog[2]++;
                        break;
                    default:
                        break;
                }
                switch (task.Priority) {
                    case "Low":
                        prior[0]++;
                        break;
                    case "Medium":
                        prior[1]++;
                        break;
                    case "High":
                        prior[2]++;
                        break;
                    default:
                        break;
                }
            }
            console.log("Status Statistic");
            console.log("To-Do: " + ((prog[0]/taskCount) * 100) + "%");
            console.log("In Progress: " + ((prog[1]/taskCount) * 100) + "%");
            console.log("Done: " + ((prog[2]/taskCount) * 100) + "%");
            console.log("Priority Statistic");
            console.log("Low: " + ((prior[0]/taskCount) * 100) + "%");
            console.log("Medium: " + ((prior[1]/taskCount) * 100) + "%");
            console.log("High: " + ((prior[2]/taskCount) * 100) + "%");
        }
    }
}

boardStatistics("R&D");