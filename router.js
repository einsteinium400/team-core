const {getBoards, findBoardByName, errorHandler,findBoardById,createNewBoard,updateBoard,updateTask,deleteBoard,deleteTask,createNewTask,renderHomePage} = require('./controllers');
const {URL} = require('url');

const ROUTES = {
    GET: {
        '/': renderHomePage,
        '/boards': getBoards,
        '/board/name': findBoardByName,
        '/board/id': findBoardById
    },
    POST: {
        '/board': createNewBoard,
        '/board/:id/task': createNewTask
    },
    PUT: {
        '/board/:id/task/:id': updateTask,
        '/board/id': updateBoard,
    },
    DELETE: {
        '/board/:id': deleteBoard,
        '/board/:id/task/:id': deleteTask
    }

};

module.exports = (req,res) => {
    const pathName = new URL(req.url,`http://${req.headers.host}`).pathname;
    const handler = ROUTES[req.method][pathName];
    console.log(req.url);
    if(!handler) {
        return errorHandler(req,res);
    }
    return handler (req,res);
}