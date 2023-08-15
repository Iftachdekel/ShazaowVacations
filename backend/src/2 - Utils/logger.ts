import fsPromises from 'fs/promises';

export const logger = async (msg: string): Promise<void> => {
    const now = new Date();
    let line = `\n${now.toLocaleString()} - ${msg} \n -------------------------------------------------------------------------`
    await fsPromises.appendFile('./logger.txt', line);
}