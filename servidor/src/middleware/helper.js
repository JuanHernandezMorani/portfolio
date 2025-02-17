const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const parseJSONFields = (data, fields) => {
    fields.forEach(field => {
        if (typeof data[field] === 'string' && /^[\[{]/.test(data[field])) {
            try {
                data[field] = JSON.parse(data[field]);
            } catch (error) {
                console.warn(`No se pudo parsear el campo "${field}":`, error);
            }
        }
    });
    return data;
}

const captureThumbnail = async (url) => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const screenshotBase64 = await page.screenshot({ encoding: "base64", fullPage: true });

    await browser.close();

    try {
        const uploadResponse = await cloudinary.uploader.upload(
            `data:image/png;base64,${screenshotBase64}`,
            { folder: "uploads", resource_type: "image" }
        );

        return uploadResponse.secure_url;
    } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        return null;
    }
};


module.exports = {
    captureThumbnail,
    parseJSONFields,
  }