# koa CORS middleware in bpframework.

### Middleware specification

https://github.com/bpcloud/middleware

### usage

Setup.

```js
import { Application } from 'bpframework';
import * as middleware_cors from '@bpframework/middleware-koa-cors';

// set CORS by default.
Application.use(middleware_cors.middleware({
  allowOrigin: '*',
  withCredentials: true,
  allowHeaders: ['X-Custom-Headers'],
  exposeHeaders: ['X-Custom-Headers'],
}));
Application.runKoa(...);

// enable or disable.
middleware_cors.setEnable(false);
```