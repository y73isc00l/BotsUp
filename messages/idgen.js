var crypto=require('crypto')
var current_date = (new Date()).valueOf().toString();
var random = Math.random().toString();
console.log(typeof crypto.createHash('sha1').update(current_date + random).digest('hex'));
