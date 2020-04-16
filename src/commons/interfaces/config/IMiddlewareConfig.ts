export interface IMiddlewareConfig {
  AUTH_SECRET: string;
  AUTH_KEY: string;
  WHITELISTED_IPS: string[];
  WHITELISTED_SUBNETS: RegExp[];
}