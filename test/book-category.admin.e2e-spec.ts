import 'dotenv/config';
import {INestApplication} from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import {createTestApp} from "./utils/test-app";
// @ts-ignore
import {teardownTestApp} from './utils/teardown';
import {DataSource} from 'typeorm';
import argon2 from "argon2"


describe('NewsCategoryAdminController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    ({app, dataSource} = await createTestApp());
  });
  afterAll(async () => await teardownTestApp(app, dataSource));

  it(
    'POST /NewsCategory/sign-in -> should respond with a jwt token and 201',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/NewsCategory/sign-in')
        .send({login: 'bilolyoqubjonv2@gmail.com', password: '12345'})
        .expect(201);

      expect(res.body.accessToken).toBeDefined();
    },
  );

  it(
    'POST /admin/news-category -> should return 401',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/news-category')
        .send({title: 'Tarix'})
        .expect(401);
    }
  );

  it(
    'POST /admin/news-category',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/news-category')
        .send({title: 'Tarix'})
        .expect(201);

      expect(res.body.id).toEqual(1);
      expect(res.body.title).toEqual('Tarix');
    }
  );

  it(
    'POST /admin/news-category -> should conflic with the existing Tarix category',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/news-category')
        .send({title: 'Tarix'})
        .expect(400);
    }
  );
});
