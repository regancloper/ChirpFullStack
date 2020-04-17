import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import chirpsRouter from './routes';
import config from './config';
import type { Error } from './utils/types';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use('/api', chirpsRouter);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            err: err.message
        }
    });
});

app.listen(config.port, () => console.log(`Server listening on port: ${config.port}`));
