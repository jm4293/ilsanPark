import { InternalServerErrorException } from '@nestjs/common';

export const ImageFileFilter = (reqest, file, callback) => {
  const isImage = file.originalname.match(/\.(jpg|jpeg|png|gif)$/);

  if (!isImage) {
    return callback(
      new InternalServerErrorException({ code: 'NI', message: 'only image files are allowed' }),
      false
    );
  }

  callback(null, true);
};
