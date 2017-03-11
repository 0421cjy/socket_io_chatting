/*
How to use
You you can install via npm install locutus and require it via require('locutus/php/math/mt_rand').
You could also require the math module in full so that you could access math.mt_rand instead.
If you intend to target the browser, you can then use a module bundler such as Browserify, webpack or rollup.js.
*/

module.exports = function mt_rand (min, max) {
  var argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  } else if (argc === 1) {
    throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
  } else {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//var result = mt_rand (1,100);
//console.log(result);
