import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Mario!';
  }

  newEndpoint(): any {
    return {
      message: 'Soy nuevo',
    };
  }
}
