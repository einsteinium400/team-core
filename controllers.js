const TaskManagerDAL = require('./taskManagerDAL');
const {boardStatistics} = require('./boardStatistic');
const {URL} = require('url');

const taskManagerDAL = new TaskManagerDAL();

getBoardName = (req) => {
    const u = new URL(req.url, `http://${req.headers.host}`).searchParams.get('boardName');
    console.log(u);
    return u;
}
getBoardID = (req) => {
    const u = new URL(req.url, `http://${req.headers.host}`).searchParams.get('boardID');
    console.log(u);
    return u;
}

module.exports = {
    errorHandler: (req, res) => {
        res.writeHeader(404);
        res.write('Bad request');
        res.end();
    },
    getTasksByBoard: (req, res) => {
        const data = taskManagerDAL.getAllTaskByBoard(getBoardName(req));
        res.writeHeader(200);
        res.end(JSON.stringify(data));
    },

    getBoards: (req, res) => {
        const data = taskManagerDAL.getAllBoards();
        res.writeHeader(200);
        res.end(JSON.stringify(data));
    },

    findBoardByName: (req,res) => {
        const data = taskManagerDAL.getBoardByName(getBoardName(req));
        res.writeHeader(200);
        res.end(JSON.stringify(data));
    },

    findBoardById: (req,res) => {
        const data = taskManagerDAL.getBoardById(getBoardId(req));
        res.writeHeader(200);
        res.end(JSON.stringify(data));
    },
    createNewBoard: (req,res) => {
        let body = [];
        let board;
        req
            //.on('error', logger.log(err))
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = Buffer.concat(body).toString();
                board = JSON.parse(body);
                taskManagerDAL.createNewBoard(board);
                res.end('done');
            })

    },
    createNewTask: (req,res) => {

    }
}