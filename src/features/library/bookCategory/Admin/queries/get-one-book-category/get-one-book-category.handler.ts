import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {
    GetOneBookCategoryQuery
} from "@/features/library/bookCategory/Admin/queries/get-one-book-category/get-one-book-category.query";
import {
    GetOneBookCategoryResponse
} from "@/features/library/bookCategory/Admin/queries/get-one-book-category/get-one-book-category.response";
import {BookCategories} from "@/features/library/bookCategory/bookCategories.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";


@QueryHandler(GetOneBookCategoryQuery)
export class GetOneBookCategoryHandler implements IQueryHandler<GetOneBookCategoryQuery>{
    async execute(query : GetOneBookCategoryQuery) :Promise<GetOneBookCategoryResponse> {
        const category = BookCategories.findOne({where : query})
        if(!category){
            throw new NotFoundException('id topilmadi')
        }

        return plainToInstance(GetOneBookCategoryResponse,category,{excludeExtraneousValues : true})
    }
}