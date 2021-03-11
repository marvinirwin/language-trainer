import {Controller, Put, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {AnonymousGuard} from "../guards/anonymous.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {storageEngine} from 'multer-google-storage';
import f from '@google-cloud/video-intelligence';


@Controller('subtitles')
export class SubtitlesController {
    @Put('')
    @UseGuards(AnonymousGuard)
    @UseInterceptors(
        FileInterceptor(
            'file',
            {
                storage: storageEngine(),
                limits: {
                    files: 1,
                    fields: 1,
                    fileSize: 1024 * 1024 * 5 // 3MB file size
                }
            }
        )
    ) async computeVideoText(
        @UploadedFile() file: {uri: string},
    ) {
        const request = {
            inputUri: file.uri,
            features: ['TEXT_DETECTION'],
        };
// Detects text in a video
        // @ts-ignore
        const [operation] = await f.VideoIntelligenceServiceClient.annotateVideo(request);
        const results = await operation.promise();
    }
}
