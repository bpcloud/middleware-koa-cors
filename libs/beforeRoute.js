'use strict';

/**
* Copyright (c) 2021 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2021-03-11 13:13
* Desc: 
*/

var afterRoute = require('./afterRoute');

module.exports = async function (ctx) {
  // https://segmentfault.com/a/1190000000709909
  if (ctx.method.toLowerCase() == 'options') {
    await afterRoute.middleware(ctx);
    ctx.response.body = '';
    return false;
  }
}