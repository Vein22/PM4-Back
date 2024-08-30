import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthService } from './../src/auth/auth.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    authService = moduleFixture.get<AuthService>(AuthService);
    await app.init();

    const userCredentials = { email: 'mado@mail.com', password: 'Suenoooo13$' };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userCredentials);

      console.log('Sign-in response:', response.body);
    token = response.body.token; 
  });

  it('Get /users/ Return an array of users with an OK status code', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`); 

    console.log(req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
});