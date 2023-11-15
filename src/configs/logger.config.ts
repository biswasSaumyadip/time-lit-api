import winston, { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const logFormat = format.combine(
  format.label({ label: 'worker' }),
  format.timestamp({
    format: 'HH-MM:ss YYYY-MM-DD',
  }),
  format.prettyPrint(),
  format.colorize(),
  format.align(),
  format.printf((info) => {
    return `[${info.timestamp}] [${info.label}]@[${info.level}]: ${info.message}`;
  }),
);

const fileTransport = new transports.DailyRotateFile({
  format: format.combine(
    format.label({ label: 'worker' }),
    format.timestamp({
      format: 'HH-MM:ss YYYY-MM-DD',
    }),
  ),
  json: true,
  filename: 'log/%DATE%.log',
  datePattern: 'YYYY--MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d',
});

const consoleTransport = new transports.Console({
  format: logFormat,
  // level: process.env.LOG_LEVEL || "info"
  level: 'info',
});

const logger = winston.createLogger({
  transports: [consoleTransport, fileTransport],
  format: logFormat,
});

fileTransport.on('rotate', (past: Date, present: Date) => logger.info(`File rotated from "${past}" to "${present}"`));

export default logger;
