import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
export const imageFileFilter = (
  req,
  file,
  callback,
) => {
  if (
    !file.originalname.match(
      /\.(jpg|jpeg|png|gif|doc|docx|pdf)$/,
    )
  ) {
    console.log(file);
    return callback(
      new Error(
        'Only jpg|jpeg|png|gif|doc|docx|pdf files are allowed!',
      ),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (
  req,
  file,
  callback,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const uuid = uuidv4();
  const randomName = Array(4)
    .fill(null)
    .map(() =>
      Math.round(Math.random() * 16).toString(16),
    )
    .join('');
  callback(
    null,
    `${uuid}.${file.originalname.split('.')[1]}`,
  );
};
