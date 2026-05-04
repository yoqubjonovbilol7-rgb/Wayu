import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777863693185 implements MigrationInterface {
    name = 'Wayu1777863693185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Questions _status_enum" AS ENUM('pending', 'answered', 'repeated', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "Questions " ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "question" character varying(2000) NOT NULL, "status" "public"."Questions _status_enum" NOT NULL, CONSTRAINT "PK_31ef66dd6854d1d2b57a97d9179" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqs" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "question" character varying(256) NOT NULL, "answer" character varying(512) NOT NULL, CONSTRAINT "PK_2ddf4f2c910f8e8fa2663a67bf0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqs_tags" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "tagId" integer NOT NULL, "faqId" integer NOT NULL, CONSTRAINT "PK_072153566531711b5b074da3847" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "InstagramPosts" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "image" character varying(256) NOT NULL, "link" character varying(256) NOT NULL, CONSTRAINT "PK_bcf755bef1fb7aac4ac6c85b145" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "representatives" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "fullName" character varying(64) NOT NULL, "image" character varying(128) NOT NULL, "email" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "resume" text NOT NULL, CONSTRAINT "PK_80e9af53802d5e0376d1ae8f68c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, "flag" character varying(256) NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "countryId" integer NOT NULL, "representativeId" integer NOT NULL, "city" character varying(64) NOT NULL, "latitude" numeric(10,7) NOT NULL, "longitude" numeric(10,7) NOT NULL, "phoneNumber" character varying(16) NOT NULL, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "NewsCategories" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_2c5d75d806f098b17a94387fb39" UNIQUE ("title"), CONSTRAINT "PK_3c38b23c384c04fed20586c0ed6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "categoryId" integer NOT NULL, "countryId" integer, "title" character varying(256) NOT NULL, "image" character varying(128) NOT NULL, "date" date NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsTag" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "newsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_afc209f346131eabf98737472c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Language" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_5abd0de610ce0c31b727f5547ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookCategories" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_ea689f47d8e96f5545bcdb411b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authors" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "fullName" character varying(64) NOT NULL, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "authorId" integer NOT NULL, "categoryId" integer NOT NULL, "title" character varying(256) NOT NULL, "image" character varying(128) NOT NULL, "description" text, "file" character varying(128) NOT NULL, "pages" integer NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "UsefulLinks" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(128) NOT NULL, "icon" character varying(128) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_accc6d8c1112e9b1acdb4799e0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "StaticInfo" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "appStoreLink" character varying(128) NOT NULL, "playMarketLink" character varying(128) NOT NULL, "aboutUs" text NOT NULL, CONSTRAINT "PK_03f92be77143c963c7eb159e6ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "SocialLinks" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, "icon" character varying(128) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_4357b3770a936da211b321eea58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Expenses" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "amount" numeric(12,2) NOT NULL, "date" TIMESTAMP NOT NULL, "title" character varying(256) NOT NULL, "description" text NOT NULL, "transaction" character varying(64) NOT NULL, CONSTRAINT "PK_73a0d7637c29244275d95476dfd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Donations_paidby_enum" AS ENUM('payme', 'click', 'oson')`);
        await queryRunner.query(`CREATE TABLE "Donations" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "amount" numeric(12,2) NOT NULL, "fullName" character varying(64) NOT NULL, "date" TIMESTAMP NOT NULL, "paidBy" "public"."Donations_paidby_enum" NOT NULL, CONSTRAINT "PK_e33b23e4b84b4cc2ea43a6264fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "EventCategories" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_90af47650d8b24cb1485ebd9d71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "categoryId" integer NOT NULL, "title" character varying(256) NOT NULL, "content" text NOT NULL, "image" character varying(128) NOT NULL, "date" TIMESTAMP NOT NULL, "address" character varying(128) NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vacancies_type_enum" AS ENUM('fullTime', 'partTime')`);
        await queryRunner.query(`CREATE TABLE "vacancies" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "title" character varying(256) NOT NULL, "address" character varying(128) NOT NULL, "description" text NOT NULL, "phoneNumber" character varying(16) NOT NULL, "type" "public"."vacancies_type_enum" NOT NULL, "salary" character varying(64) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."applications_status_enum" AS ENUM('active', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" SERIAL NOT NULL, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated" TIMESTAMP WITH TIME ZONE DEFAULT now(), "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "email" character varying(64) NOT NULL, "vacancyId" integer NOT NULL, "status" "public"."applications_status_enum" NOT NULL DEFAULT 'active', "resume" character varying(255), CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "faqs_tags" ADD CONSTRAINT "FK_1d4e78ece937fc1381f661bdf7a" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faqs_tags" ADD CONSTRAINT "FK_f75c8c2a79c6dde25ebb3e8b502" FOREIGN KEY ("faqId") REFERENCES "faqs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_f2f21e749e2aaecb95a3f8937d2" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_fae3c908e2b2c6b2ce299bcbbe4" FOREIGN KEY ("representativeId") REFERENCES "representatives"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01" FOREIGN KEY ("categoryId") REFERENCES "NewsCategories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_81498edd9eaa443973b3f8f655f" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsTag" ADD CONSTRAINT "FK_5fdc6c08cbe1130d6904f16163e" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsTag" ADD CONSTRAINT "FK_f67c36709cb9a88c57758ae275f" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_efaa1a4d8550ba5f4378803edb2" FOREIGN KEY ("categoryId") REFERENCES "bookCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_d44e52c4ca04619ef9b61a11982" FOREIGN KEY ("categoryId") REFERENCES "EventCategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_5707a4abd8063c6494064d22d05" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_5707a4abd8063c6494064d22d05"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_d44e52c4ca04619ef9b61a11982"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_efaa1a4d8550ba5f4378803edb2"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`);
        await queryRunner.query(`ALTER TABLE "newsTag" DROP CONSTRAINT "FK_f67c36709cb9a88c57758ae275f"`);
        await queryRunner.query(`ALTER TABLE "newsTag" DROP CONSTRAINT "FK_5fdc6c08cbe1130d6904f16163e"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_81498edd9eaa443973b3f8f655f"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_fae3c908e2b2c6b2ce299bcbbe4"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_f2f21e749e2aaecb95a3f8937d2"`);
        await queryRunner.query(`ALTER TABLE "faqs_tags" DROP CONSTRAINT "FK_f75c8c2a79c6dde25ebb3e8b502"`);
        await queryRunner.query(`ALTER TABLE "faqs_tags" DROP CONSTRAINT "FK_1d4e78ece937fc1381f661bdf7a"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TYPE "public"."applications_status_enum"`);
        await queryRunner.query(`DROP TABLE "vacancies"`);
        await queryRunner.query(`DROP TYPE "public"."vacancies_type_enum"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "EventCategories"`);
        await queryRunner.query(`DROP TABLE "Donations"`);
        await queryRunner.query(`DROP TYPE "public"."Donations_paidby_enum"`);
        await queryRunner.query(`DROP TABLE "Expenses"`);
        await queryRunner.query(`DROP TABLE "SocialLinks"`);
        await queryRunner.query(`DROP TABLE "StaticInfo"`);
        await queryRunner.query(`DROP TABLE "UsefulLinks"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "authors"`);
        await queryRunner.query(`DROP TABLE "bookCategories"`);
        await queryRunner.query(`DROP TABLE "Language"`);
        await queryRunner.query(`DROP TABLE "newsTag"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "NewsCategories"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "representatives"`);
        await queryRunner.query(`DROP TABLE "InstagramPosts"`);
        await queryRunner.query(`DROP TABLE "faqs_tags"`);
        await queryRunner.query(`DROP TABLE "faqs"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "Questions "`);
        await queryRunner.query(`DROP TYPE "public"."Questions _status_enum"`);
    }

}
