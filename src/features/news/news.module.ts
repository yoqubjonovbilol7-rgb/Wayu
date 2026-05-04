import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategoryAdminController } from '@/features/news/news-category/Admin/news-category.admin.controller';
import { GetAllNewsCategoriesHandler } from '@/features/news/news-category/Admin/queries/get-all-news-category/get-all-news-category.handler';
import { CreateNewsCategoryHandler } from '@/features/news/news-category/Admin/commands/create-news-category/create-news-category.handler';
import { NewsCategories } from '@/features/news/news-category/newsCategories.entity';
import { DeleteNewsCategoryHandler } from '@/features/news/news-category/Admin/commands/delete-news-category/delete-news-category.handler';
import { NewsCategoryPublicController } from '@/features/news/news-category/Public/news-category.public.controller';
import { GetAllNewsCategoriesPublicHandler } from '@/features/news/news-category/Public/queries/get-all-news-category/get-all-news-category.handler';
import { News } from '@/features/news/news/news.entity';
import { GetOneNewsCategoryPublicHandler } from '@/features/news/news-category/Public/queries/get-one-news-category/get-one-news-category.handler';
import { GetOneNewsCategoryAdminHandler } from '@/features/news/news-category/Admin/queries/get-one-news-category/get-one-news-category-admin.handler';
import { CreateNewsHandler } from '@/features/news/news/Admin/commands/create.news/create-news.handler';
import { NewsAdminController } from '@/features/news/news/Admin/news.admin.controller';
import { UpdateNewsCategoryHandler } from '@/features/news/news-category/Admin/commands/update-news-category/update-news-category.handler';
import { TagsAdminController } from '@/features/news/tags/Admin/tags-admin.controller';
import { CreateTagsHandler } from '@/features/news/tags/Admin/command/create-tags/create-tags.handler';
import { DeleteTagsHandler } from '@/features/news/tags/Admin/command/delete-tags/delete-tags.handler';
import { UpdateTagsHandler } from '@/features/news/tags/Admin/command/update-tags/update-tags.handler';
import { GetOneTagsAdminHandler } from '@/features/news/tags/Admin/queries/get-one-tags/get-one-tags-admin.handler';
import { GetAllTagsPublicHandler } from '@/features/news/tags/Public/queries/get-all-tags/get-all-tags.handler';
import { GetOneTagsPublicHandler } from '@/features/news/tags/Public/queries/get-one-tags/get-one-tags-public.handler';
import { TagsPublicController } from '@/features/news/tags/Public/tags-public.controller';
import { GetAllTagsAdminHandler } from '@/features/news/tags/Admin/queries/get-all-tags/get-all-tags.handler';
import { GetAllNewsHandler } from '@/features/news/news/Admin/queries/get-all-news/get-all-news.handler';
import { GetOneNewsHandler } from '@/features/news/news/Admin/queries/get-one-news/get-one-news.handler';
import { UpdateNewsHandler } from '@/features/news/news/Admin/commands/update-news/update-news.handler';
import { DeleteNewsHandler } from '@/features/news/news/Admin/commands/delete-news/delete-news.handler';

@Module({
  imports: [TypeOrmModule.forFeature([NewsCategories, News])],
  controllers: [
    NewsCategoryAdminController,
    NewsCategoryPublicController,
    NewsAdminController,
    TagsAdminController,
    TagsPublicController,
  ],
  providers: [
    GetAllNewsCategoriesHandler,
    CreateNewsCategoryHandler,
    DeleteNewsCategoryHandler,
    GetAllNewsCategoriesPublicHandler,
    GetOneNewsCategoryPublicHandler,
    GetOneNewsCategoryAdminHandler,
    UpdateNewsCategoryHandler,
    CreateNewsHandler,
    GetAllNewsHandler,
    GetOneNewsHandler,
    UpdateNewsHandler,
    DeleteNewsHandler,
    CreateTagsHandler,
    DeleteTagsHandler,
    UpdateTagsHandler,
    GetAllTagsAdminHandler,
    GetOneTagsAdminHandler,
    GetAllTagsPublicHandler,
    GetOneTagsPublicHandler,
  ],
})
export class NewsModule {}
