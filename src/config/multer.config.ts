import { diskStorage } from 'multer';
import * as fs from 'fs';
import { BadRequestException } from '@nestjs/common';

function getFileType(mime: string): string {
    switch (mime) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
        case 'image/webp':
            return 'image';
        case 'application/pdf':
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'document';
        default:
            return 'file';
    }
}

export const storageOptions = diskStorage({
    destination: (req, file, cb) => {
        let subFolder: string = getFileType(file.mimetype);
        let destination: string = `./uploads/${subFolder}`;
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }
        cb(null, destination);
    },
    filename: (req, file, cb) => {
        let extension = file.originalname.split('.').pop();
        if (!extension) {
            return cb(new BadRequestException('File does not have extension'), '');
        }
        let prefix = getFileType(file.mimetype);
        let fileName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${extension}`;
        return cb(null, fileName);
    },
});

export const multerOptions = {
    storage: storageOptions,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (req: any, file: any, cb: any) => {
        // Allow any file type
        cb(null, true);
    },
};
