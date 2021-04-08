/// <reference types="node" />

interface BpframeworkMiddleware {
  type: string,
  name: string,
  afterRoute: (app:any)=>Promise<boolean>,
  beforeRoute: (app:any)=>Promise<boolean>,
  initiator: (app:any)=>void,
}

export const name: string;

/** 打开关闭CORS处理. */
export function setEnable(isEnable:boolean): void;

export function middleware(cfg: {
  /** Access-Control-Allow-Origin; 默认为请求origin */
  allowOrigin?: string,
  /** Access-Control-Allow-Credentials; 是否同意在服务端接收cookie */
  withCredentials?: boolean,
  /** Access-Control-Allow-Headers */
  allowHeaders?: string[],
  /** Access-Control-Expose-Headers; 允许XMLHttpRequest获取的response headers. */
  exposeHeaders?: string[],
}): BpframeworkMiddleware;
