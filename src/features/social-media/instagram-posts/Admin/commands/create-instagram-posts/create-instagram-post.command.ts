import { Command } from '@nestjs/cqrs';
import { CreateInstagramPostResponse } from './create-instagram-post.response';

export class CreateInstagramPostCommand extends Command<CreateInstagramPostResponse> {
    constructor(
        public readonly image: Express.Multer.File,
        public readonly link: string,
    ) {
        super();
    }
}