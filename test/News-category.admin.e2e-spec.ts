import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');

import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('NewsCategoryController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));


  it('POST /auth/sign-in -> should return jwt token', async () => {
    const res = await request(app.getHttpServer())
      .post('/admin/login')
      .send({
        login: 'bilolyoqubjonov2@gmail.com',
        password: '11111',
      })
      .expect(200);

    expect(res.body.accessToken).toBeDefined();
    jwtToken = res.body.accessToken;
  });

  it('POST /admin/news-category -> 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/admin/news-category')
      .send({ title: 'Category 3' })
      .expect(401);
  });


  it('POST /admin/news-category -> should create category', async () => {
    const res = await request(app.getHttpServer())
      .post('/admin/news-category')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Category 4' })
      .expect(201);

    expect(res.body.title).toEqual('Category 4');
    expect(res.body.id).toBeDefined();
  });

  it('POST /admin/news-category -> duplicate title should return 400', async () => {
    await request(app.getHttpServer())
      .post('/admin/news-category')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Category 4' })
      .expect(400);
  });

  it("GET /admin/news-category/:id -> not found returns 404", async () => {
    await request(app.getHttpServer())
      .get('/admin/news-category/999999')
      .expect(404);
  });
});