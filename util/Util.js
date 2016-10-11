/**
 * New node file
 */
var crypto = require('crypto');
var sd = require('silly-datetime');
function Util() {
	this.md5 = function(str) {
		var _w = '2016_10_talk_';
		var hash = crypto.createHash('md5');
		return hash.update(_w + str).digest('hex');
	}
	this.nowTime = function() {
	return sd.format(new Date(), 'YYYYMMDDHHmm');
   }
}
module.exports=new Util();