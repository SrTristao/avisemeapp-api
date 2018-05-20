const port = process.env.PORT || 5000;
const DBHOST = '@ds129670.mlab.com:29670/avisemecar';
const DBUSER = 'admin';
const DBPASSWORD = 'admin123'
const SALT_KEY = 'fXb_QLf0*W)|&0@3n26kOx@V}cda4(HN!#]$spqvEb%wGH9=L:1dJL$PtxX+@!}p';
module.exports = {
    port,
    DBHOST,
    DBUSER,
    DBPASSWORD,
    SALT_KEY
}