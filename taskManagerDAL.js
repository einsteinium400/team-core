const fs = require('fs');
const Path = require('path');
const { EventEmitter } = require('events');

module.exports = class TaskManagerDAL extends EventEmitter {
    constructor () {
        super();
        this.connectBoardJSON();
    }

    connectBoardJSON () {
        const data = require('./tasks.json');
        this.setData(data);
        this.on('updateData', () => {
            fs.writeFile(Path.join(__dirname, './data.json'), JSON.stringify(this.data), 'utf8', err => {
                console.log(this.data);
                if (err) throw err;
                console.log('File has been saved!');
            });
        });
        return this;
    }
    setData(data) {
        this.data = data;
    }
    setBoards(data){
        this.data.Boards = data;
    }
    setTaskByBoard(boardId,data){
        for(const board of this.data.Boards){
            if(board.BoardId == boardId){
                this.data.Boards.boardId = data;
            }
        }
    }

    updateBoards(payload) {
        this.setBoards([...this.data.Boards, payload]);
        this.emit('updateData');
    }

    getAllBoards () {
        return this.data;
    }

    getAllTaskByBoard(boardName) {
        for (const board of this.data.Boards) {
            if(board.BoardName == boardName) {
                return board.Tasks
            }
        }
    }
    createNewBoard(payload){
        const newID = this.data.Boards[this.data.Boards.length - 1].BoardId +1;

        const newBoard = {
            boardId: newID,
            BoardName: payload.BoardName,
            Tasks: []
        }
        this.updateBoards(newBoard);
    }
    createNewTask(payload,boardId){
        console.log(boardId)
        // console.log(payload);
        const newID = this.data.Boards[boardId].Tasks[this.data.Boards[boardId].Tasks.length - 1].TaskId + 1;
        const newTask = {
            TaskId: newID,
            TaskName: payload.TaskName,
            TaskDetails: payload.TaskDetails,
            Status: payload.Status,
            Priority: payload.Priority,
            Type: payload.Type,
            Assignee: payload.Assignee,
            Creator: payload.Creator
        }
        this.updateTaskByBoard(newTask,boardId);
    }
}