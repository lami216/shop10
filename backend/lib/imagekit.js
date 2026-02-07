// backend/lib/imagekit.js
import ImageKit from "imagekit";
import sharp from "sharp";

const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;

if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
  console.warn("[ImageKit] Missing env (IMAGEKIT_PUBLIC_KEY/PRIVATE_KEY/URL_ENDPOINT). Uploads will fail.");
}

export const imagekitClient = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY || "",
  privateKey: IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: IMAGEKIT_URL_ENDPOINT || "",
});

const MAX_COMPRESSED_BYTES = 10 * 1024 * 1024;
const DEFAULT_JPEG_QUALITY = 80;

const parseBase64Image = (image) => {
  if (typeof image !== "string") return null;
  const match = image.match(/^data:(image\/[\w+.-]+);base64,(.*)$/);
  if (!match) return null;
  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
};

const compressImage = async (input) => {
  if (Buffer.isBuffer(input)) {
    return sharp(input).rotate().jpeg({ quality: DEFAULT_JPEG_QUALITY }).toBuffer();
  }

  const parsed = parseBase64Image(input);
  if (!parsed) {
    return input;
  }

  return sharp(parsed.buffer)
    .rotate()
    .jpeg({ quality: DEFAULT_JPEG_QUALITY })
    .toBuffer();
};

const assertCompressedSize = (buffer) => {
  if (Buffer.isBuffer(buffer) && buffer.length > MAX_COMPRESSED_BYTES) {
    throw new Error("IMAGE_TOO_LARGE");
  }
};

export async function uploadImage(fileBase64OrBuffer, folder = "products") {
  if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
    throw new Error("ImageKit env missing (IMAGEKIT_PUBLIC_KEY/PRIVATE_KEY/URL_ENDPOINT).");
  }
  const compressed = await compressImage(fileBase64OrBuffer);
  assertCompressedSize(compressed);
  const res = await imagekitClient.upload({
    file: compressed, // Base64 data URL or Buffer
    fileName: `${Date.now()}.jpg`,
    folder,
  });
  return { url: res.url, fileId: res.fileId };
}

export async function deleteImage(fileId) {
  if (!fileId) return;
  if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
    console.warn("[ImageKit] Missing env, skip delete.");
    return;
  }
  await imagekitClient.deleteFile(fileId);
}
