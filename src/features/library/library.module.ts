import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthorsAdminController} from "@/features/library/authors/Admin/authors.admin.controller";
import {CreateAuthorsHandler} from "@/features/library/authors/Admin/commands/create-authors/create-authors.handler";
import {GetAllAuthorsHandler} from "@/features/library/authors/Admin/queries/get-all-authors/get-all-authors.handler";
import {DeleteAuthorsHandler} from "@/features/library/authors/Admin/commands/delete-authors/delete-authors.handler";
import {GetAllAuthorsPublicHandler} from "@/features/library/authors/Public/queries/get-all-authors/get-all-authors-public.handler";
import {AuthorsPublicController} from "@/features/library/authors/Public/authors.public.controller";
import {UpdateAuthorsHandler} from "@/features/library/authors/Admin/commands/update-authors/update-authors.handler";
import {GetOneAuthorsPublicHandler} from "@/features/library/authors/Public/queries/get-one-authors/get-one-authors-public.handler";
import {GetOneAuthorsHandler} from "@/features/library/authors/Admin/queries/get-one-authors/get-one-authors.handler";
import {CreateLanguageHandler} from "@/features/library/language/Admin/commands/create-language/create-language.handler";
import {LanguageAdminController} from "@/features/library/language/Admin/language.admin.controller";
import {DeleteLanguageHandler} from "@/features/library/language/Admin/commands/delete-language/delete-language.handler";
import {GetAllLanguageHandler} from "@/features/library/language/Admin/queries/get-all-language/get-all-language.handler";
import {UpdateLanguageHandler} from "@/features/library/language/Admin/commands/update-language/update-language.handler";
import {GetOneLanguageHandler} from "@/features/library/language/Admin/queries/get-one-language/get-one-language.handler";
import {LanguagePublicController} from "@/features/library/language/Public/language.public.controller";
import {GetOneLanguagePublicHandler} from "@/features/library/language/Public/queries/get-one-language/get-one-language-public.handler";
import {GetAllLanguagePublicHandler} from "@/features/library/language/Public/queries/get-all-language/get-all-language-public.handler";
import {CreateBookCategoryHandler} from "@/features/library/bookCategory/Admin/commands/create-book-category/create-book-category.handler";
import {BookCategoryAdminController} from "@/features/library/bookCategory/Admin/book-category.admin.controller";
import {GetAllBookCategoryHandler} from "@/features/library/bookCategory/Admin/queries/get-all-book-category/get-all-book-category.handler";
import {DeleteBookCategoryHandler} from "@/features/library/bookCategory/Admin/commands/delete-book-category/delete-book-category.handler";
import {UpdateBookCategoryHandler} from "@/features/library/bookCategory/Admin/commands/update-book-category/update-book-category.handler";
import {GetOneBookCategoryHandler} from "@/features/library/bookCategory/Admin/queries/get-one-book-category/get-one-book-category.handler";
import {CreateBookHandler} from "@/features/library/book/Admin/commands/create-book/create-book.handler";
import {BooksController} from "@/features/library/book/Admin/books.admin.controller";
import {GetOneBookHandler} from "@/features/library/book/Admin/queries/get-one-book/get-one-book.handler";
import {GetAllBookHandler} from "@/features/library/book/Admin/queries/get-all-book/get-all-book.handler";
import {Book} from "@/features/library/book/book.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
    controllers : [
        AuthorsAdminController,
        AuthorsPublicController,


        LanguageAdminController,
        LanguagePublicController,

        BookCategoryAdminController,


        BooksController

    ],
    providers : [
        CreateAuthorsHandler,
        GetAllAuthorsHandler,
        DeleteAuthorsHandler,
        GetAllAuthorsPublicHandler,
        UpdateAuthorsHandler,
        GetOneAuthorsPublicHandler,
        GetOneAuthorsHandler,



        CreateLanguageHandler,
        DeleteLanguageHandler,
        GetAllLanguageHandler,
        UpdateLanguageHandler,
        GetOneLanguageHandler,
        GetOneLanguagePublicHandler,
        GetAllLanguagePublicHandler,


        CreateBookCategoryHandler,
        GetAllBookCategoryHandler,
        DeleteBookCategoryHandler,
        UpdateBookCategoryHandler,
        GetOneBookCategoryHandler,


        CreateBookHandler,
        GetOneBookHandler,
        GetAllBookHandler
    ]
})

export class LibraryModule {}