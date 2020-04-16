import { Express, Router } from 'express';

// TODO: This should expose the actual method under the same interface.
// That would allow to unit-test the middleware.
export interface IMiddlewareProvider {
  register(router: Router | Express): void;
}