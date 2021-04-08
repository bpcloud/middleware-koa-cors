'use strict';

/**
* Copyright (c) 2021 Copyright bp All Rights Reserved.
* Author: brian.li
* Date: 2021-03-11 13:13
* Desc: 
*/

const SYM_ENABLE = Symbol('SYM_ENABLE');
const SYM_CFG = Symbol('SYM_CFG');

exports.setEnable = function setEnable(isEnable) {
  global[SYM_ENABLE] = isEnable;
}
exports.setCfg = function setCfg(cfg) {

  if (cfg.allowHeaders) {
    let v = '';
    cfg.allowHeaders.forEach(element => {
      // trim.
      element = element.replace(/(^\s*)|(\s*$)/g, "");
      if (v.length > 0) v += ', ';
      v += element;
    });
    cfg.allowHeaders = v;
  }
  if (cfg.exposeHeaders) {
    let v = '';
    cfg.exposeHeaders.forEach(element => {
      // trim.
      element = element.replace(/(^\s*)|(\s*$)/g, "");
      if (v.length > 0) v += ', ';
      v += element;
    });
    cfg.exposeHeaders = v;
  }

  global[SYM_CFG] = {
    allowOrigin: cfg.allowOrigin,
    withCredentials: cfg.withCredentials,
    allowHeaders: cfg.allowHeaders? cfg.allowHeaders.concat(): null,
    exposeHeaders: cfg.exposeHeaders? cfg.exposeHeaders.concat(): null,
  };
}

module.exports = async function (ctx) {

  if (global[SYM_ENABLE]) {
    if (ctx.request.headers.origin && ctx.request.headers.origin.length < 256) {
      let cfg = global[SYM_CFG];

      if (undefined === ctx.response.headers['Access-Control-Allow-Origin']) {
        ctx.set('Access-Control-Allow-Origin', cfg.allowOrigin ? cfg.allowOrigin : (ctx.request.headers.origin || 'null'));
      }
      if (cfg.withCredentials && undefined === ctx.response.headers['Access-Control-Allow-Credentials']) {
        ctx.set('Access-Control-Allow-Credentials', 'true');
      }
      if (cfg.allowHeaders && undefined === ctx.response.headers['Access-Control-Allow-Headers']) {
        ctx.set('Access-Control-Allow-Headers', cfg.allowHeaders);
      }
      if (cfg.exposeHeaders && undefined === ctx.response.headers['Access-Control-Expose-Headers']) {
        ctx.set('Access-Control-Expose-Headers', cfg.exposeHeaders);
      }
    }
  } // if.
}