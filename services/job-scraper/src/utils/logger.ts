import { createLogger, format, transports } from 'winston';
import config from '../config';

const logger = createLogger({
    level: config.logLevel || 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }), // include stack trace
        format.splat(), // string interpolation
        format.json() // log in JSON (better for cloud logging)
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(), // pretty colors in dev
                format.simple() // human readable
            )
        })
    ]
});

export default logger;
