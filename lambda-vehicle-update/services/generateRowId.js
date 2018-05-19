const EPOCH = 1300000000000;

function generateRowId(subid) {
    var ts = new Date().getTime() - EPOCH; // limit to recent
    var randid = Math.floor(Math.random() * 512);
    ts = (ts * 64);   // bit-shift << 6
    ts = (ts + subid);
    return (ts * 512) + (randid % 512);
}

module.exports = generateRowId;