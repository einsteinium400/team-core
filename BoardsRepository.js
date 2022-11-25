const {EventEmmiter} = require('events');
const fs = require('fs');

module.exports = class BoardsRepository extends EventEmmiter{
    constructor() {
        super();
        this.connectToStorage();
    }

    connectToStorage() {
        const TasksData = require('./tasks.json');
        this.setData(TasksData);
        this.on('updateData', () => {
            fs.writeFile('./tasks.json',JSON.stringify((this.TasksData),err => {
                if(err) throw err;
                console.log('File has been saved');
            }));
        });
        return this;
    }

    setData(TasksData){
        this.TasksData = TasksData;
    }

    updateData(payload){
        this.TasksData = [...this.TasksData,payload];
        this.emit('updateData');
    }
    getAllBoards () {
        return this.TasksData;
    }
    createNewTask (payload){
        // id: ,
            title: payload.TaskName,
            description: payload.TaskDetails,
            Status: payload.Status,
            Priority: payload.Priority,
            Type: payload.Type,
            Assignee: payload.Assignee,
            Creator: payload.Creator
        }

    }
}