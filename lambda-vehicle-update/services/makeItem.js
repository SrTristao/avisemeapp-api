let uuid = require('uuid/v4');
function makeItem(nps) {
    const objKeys = Object.keys(nps);
    let item = {};
    objKeys.forEach((value, index) => {
        item[objKeys[index]] = makeValue(nps[value]);
    }) 
        
    item["uuid"] = makeValue(uuid());

    return item;
} 

function makeValue(value) {
    let makeParameter = {};
    makeParameter[typeParam(value)] = value;
    return makeParameter;
}

function typeParam(value) {
    let regexValue = new RegExp(/[a-zA-Z\/]/g);

    if(regexValue.test(value)) return 'S'
    
    return 'N'
}

module.exports = makeItem;