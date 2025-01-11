import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`);
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.originalUrl}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    console.log(`Headers: ${JSON.stringify(req.headers)}`);

    const originalSend = res.send.bind(res);
    res.send = (body) => {
      console.log(`Response...`);
      console.log(`Status: ${res.statusCode}`);
      console.log(`Body: ${body}`);
      return originalSend(body);
    };

    next();
  }
}
