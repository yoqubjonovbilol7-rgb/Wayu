import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import argon2 from 'argon2';

describe('NewsCategoriesXController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let categoryId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());

    const password = await argon2.hash('12345');

    await dataSource.query(`
      INSERT INTO users ("fullName", "login", "loginType", "isVerified", "isActive", "role", "password")
      VALUES ('Bilol', 'yoqubjonovbilol2@gmail.com', 'email', true, true, 'superAdmin', '${password}')
    `);
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  it('POST /auth/sign-in -> should return jwt token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ login: 'yoqubjonovbilol2@gmail.com', password: '12345' })
      .expect(201);

    jwtToken = res.body.accessToken;
  });

  it('POST /news-categories/admin -> 401 without token', async () => {
    await request(app.getHttpServer())
      .post('/news-categories/admin')
      .send({ title: 'tarix' })
      .expect(401);
  });

  it('POST /news-categories/admin -> 201 with token', async () => {
    const res = await request(app.getHttpServer())
      .post('/news-categories/admin')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'NewsCategory' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    categoryId = res.body.id;
  });

  it('PATCH /news-categories/admin/:id -> 200', async () => {
    await request(app.getHttpServer())
      .patch(`/news-categories/admin/${categoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ title: 'Updated' })
      .expect(200);
  });

  it('GET /news-categories/admin -> 401 without token', async () => {
    await request(app.getHttpServer())
      .get('/news-categories/admin')
      .expect(401);
  });

  it('DELETE /news-categories/admin/:id -> 200', async () => {
    await request(app.getHttpServer())
      .delete(`/news-categories/admin/${categoryId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });
});