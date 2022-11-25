const Logger = require('./Logger');
const logger = new Logger();
const Path = require('path');
const dotenv = require('./dotenv');


module.exports = server => {
    // dotenv.config({ path: Path.join( __dirname, './dotenv') });
    const port = process.env.PORT || 3030;
    const start = () => server.listen(port);

    server.on('request', request => {
        logger.newRequest(request);
        request.on('error',err => logger.log(err));
    });
    server.on('error',err => logger.log(err));

    return { start };
}