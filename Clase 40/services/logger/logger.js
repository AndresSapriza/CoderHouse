import log4js from 'log4js';

log4js.configure({
    appenders: {
        console: {type: 'console'},
        warnFile: {type: "file", filename: './warn.log'},
        errorFile: {type: "file", filename: './error.log'},
        logWarn: {
            type: 'logLevelFilter',
            level: 'WARN',
            appender: 'warnFile',
          },
        logError: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
        }
    },
    categories: {
        default: {
            appenders: ['console'], level: 'OFF'
        },
        DEV: {
            appenders: ['console','logWarn','logError'], level: 'ALL',
        }
    }
})

const logger = log4js.getLogger('DEV');

export default logger;