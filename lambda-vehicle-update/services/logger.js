let winston = require('winston'),
    config = require('config'),
    project = require('../package'),
    date_format = require('dateformat'),
    shortid = require('shortid'),
    util = require('util'),
    CloudWatchTransport = require('winston-aws-cloudwatch')

let GMT_TIME = function () { return date_format(new Date(), "isoDateTime") };
let SHORT_ID = function () { return require('shortid').generate() };

let env = "DEFAULT";
if (process.env.NODE_ENV != null && process.env.NODE_ENV != undefined && process.env.NODE_ENV != '')
    env = process.env.NODE_ENV.toUpperCase();

var logConsole = function (type, message, data) {

    if (data)
        console.log(type + " - " + message + ": " + JSON.stringify(data));
    else
        console.log(type + " - " + message);
}

const formatter = (options) => util.format('#%s %s:%s %s %s %s %s %s',
    SHORT_ID(),
    project.name,
    project.version,
    env,
    GMT_TIME(),
    options.level.toUpperCase(),
    (options.message ? options.message : ''),
    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : ''))

function logger() {
    if (config.log.enabled) {
        if (config.log.winston.enabled) {
            winston.configure({
                exitOnError: false,
                transports: [
                    new (winston.transports.Console)({
                        level: "verbose",
                        formatter
                    })
                ]
            })

            winston.add(CloudWatchTransport, {
                logGroupName: project.name, // REQUIRED
                logStreamName: env, // REQUIRED
                createLogGroup: true,
                createLogStream: true,
                submissionInterval: 2000,
                batchSize: 20,
                awsConfig: {
                    accessKeyId: config.aws.config.accessKeyId,
                    secretAccessKey: config.aws.config.secretAccessKey,
                    region: config.aws.config.region
                }
                // formatLog: function (item) {
                //     return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
                // }
            })
        }
    }
    return {
        info: (message, data) => {
            if (config.log.enabled) {
                if (config.log.winston.enabled) {
                    if (data)
                        winston.info(message, data);
                    else
                        winston.info(message);
                }
                else
                    logConsole("INFO", message, data);
            }
        },
        error: (message, data) => {
            if (config.log.enabled) {
                if (config.log.winston.enabled) {
                    if (data)
                        winston.error(message, data);
                    else
                        winston.error(message);
                }
                else
                    logConsole("ERROR", message, data);
            }
        },
        success: (message, data) => {
            if (config.log.enabled) {
                if (config.log.winston.enabled) {
                    if (data)
                        winston.info(message, data);
                    else
                        winston.info(message);
                }
                else
                    logConsole("SUCCESS", message, data);
            }
        }
    };
}

module.exports = logger()