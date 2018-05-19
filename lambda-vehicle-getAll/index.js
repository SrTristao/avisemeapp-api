'use strict';
let AWS = require('aws-sdk'),
    config = require('config'),
    logger = require("./services/logger"),
    makeItem = require('./services/makeItem'),
    util = require("util")

    AWS.config.update({
        region: process.env.REGION,
        accessKeyId: config.aws.config.accessKeyId,
        secretAccessKey: config.aws.config.secretAccessKey
    })

    let ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

module.exports.handler = (body, context, callback) => {
    logger.info("Monta query", body.nps);
    let tbl = {
        TableName: process.env.TABLE,
        Item: makeItem(body.nps)
    }
    
    logger.info("salva item", tbl);
    ddb.putItem(tbl, (err, data) => {
        if (err) {
            logger.info("Ocorreu um erro na requisição", err);
            return context.fail({"message": "Ocorreu um erro", error: err});
        }

        logger.info("Item salvo com sucesso", data);
        context.done(null, {"message": "NPS Salvo com sucesso"});
    })
}