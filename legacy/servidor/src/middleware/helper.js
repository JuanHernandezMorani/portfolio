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
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36");

    try {
        console.log("Verificando disponibilidad del sitio...");
        await fetch(url, { method: "HEAD" });

        const controller = new AbortController();
        const timeout = setTimeout(() => {
            console.warn("networkidle2 tardó más de 60 segundos, intentando con domcontentloaded...");
            controller.abort();
        }, 60100);

        try {
            await page.goto(url, { waitUntil: "networkidle2", timeout: 60000, signal: controller.signal });
        } catch (err) {
            if (err.name === "TimeoutError") {
                await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
            } else {
                throw err;
            }
        } finally {
            clearTimeout(timeout);
        }

        const screenshotBase64 = await page.screenshot({ encoding: "base64" });

        await browser.close();

        const uploadResponse = await cloudinary.uploader.upload(
            `data:image/png;base64,${screenshotBase64}`,
            { folder: "uploads", resource_type: "image" }
        );

        return uploadResponse.secure_url;
    } catch (error) {
        console.error("Error al capturar el thumbnail:", error);
        await browser.close();
        return null;
    }
};

module.exports = {
    captureThumbnail,
    parseJSONFields,
  }