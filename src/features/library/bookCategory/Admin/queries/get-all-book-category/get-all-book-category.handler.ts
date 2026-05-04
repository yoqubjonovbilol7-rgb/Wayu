import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllBookCategoryQuery } from "@/features/library/bookCategory/Admin/queries/get-all-book-category/get-all-book-category.query";
import { GetAllBookCategoryResponse } from "@/features/library/bookCategory/Admin/queries/get-all-book-category/get-all-book-category.response";
import { BookCategories } from "@/features/library/bookCategory/bookCategories.entity";
import { plainToInstance } from "class-transformer";

@QueryHandler(GetAllBookCategoryQuery)
export class GetAllBookCategoryHandler implements IQueryHandler<GetAllBookCategoryQuery, GetAllBookCategoryResponse[]> {

    async execute(query: GetAllBookCategoryQuery): Promise<GetAllBookCategoryResponse[]> {

        const take = query.filters?.size ?? 10;
        const currentPage = query.filters?.page ?? 1;
        const skip = (currentPage - 1) * take;

        const bookCategories = await BookCategories.find({skip: skip, take: take});

        return plainToInstance(GetAllBookCategoryResponse, bookCategories, {excludeExtraneousValues: true});
    }
}