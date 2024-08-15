import {v2 as cloudinary} from 'cloudinary';
import {config as dotenvConfig} from "dotenv";
import { ConfigService } from '@nestjs/config';


dotenvConfig({path: ".env.development"})
        
export const CloudinaryConfig = {
    provide: "cloudinary",
    useFactory: (configService: ConfigService) => {
        return cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });
    },
    inject: [ConfigService],
};

