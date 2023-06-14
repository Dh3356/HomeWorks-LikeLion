export class CreatePostDto {
  content: string;
  file?: Express.Multer.File;
}
