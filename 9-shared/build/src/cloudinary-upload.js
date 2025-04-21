"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploads = uploads;
exports.videoUpload = videoUpload;
const cloudinary_1 = __importDefault(require("cloudinary"));
function uploads(file, public_id, overwrite, invalidate) {
    return new Promise((resolve) => {
        cloudinary_1.default.v2.uploader.upload(file, {
            public_id,
            overwrite,
            invalidate,
            resource_type: 'auto' // zip, images
        }, (error, result) => {
            if (error)
                resolve(error);
            resolve(result);
        });
    });
}
function videoUpload(file, public_id, overwrite, invalidate) {
    return new Promise((resolve) => {
        cloudinary_1.default.v2.uploader.upload(file, {
            public_id,
            overwrite,
            invalidate,
            chunk_size: 50000,
            resource_type: 'video'
        }, (error, result) => {
            if (error)
                resolve(error);
            resolve(result);
        });
    });
}
//# sourceMappingURL=cloudinary-upload.js.map