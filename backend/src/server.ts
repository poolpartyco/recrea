import app from './app';
import {config} from './config';
const port: number = parseInt(config.server.port, 10);

app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});