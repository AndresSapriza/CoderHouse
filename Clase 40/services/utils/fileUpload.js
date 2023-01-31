import logger from '../logger/logger.js'
import path from 'path';

export async function avatarUpload(files) {
    logger.info(JSON.stringify(files));
    const { avatar } = files;
    let url = path.join(path.dirname(process.env.dirname), '/ProyectoFinal3/public/avatars/') + avatar.name; 
    logger.info(url);

    // If no image submitted, exit
    if (!avatar) return;

    // Move the uploaded image to our upload folder
    await avatar.mv(url);

    return url;
}