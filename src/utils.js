import { Buffer } from "buffer"
export const convertBufferImageToBase64 = (fileImg) => {
    const buffer = new Buffer(fileImg, 'base64').toString('binary');
    return buffer;
}