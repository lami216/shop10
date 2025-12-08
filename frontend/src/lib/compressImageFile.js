const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
const DEFAULT_MAX_DIMENSION = 1200;
const MIN_QUALITY = 0.4;

const readFileAsDataURL = (file) =>
        new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
        });

const loadImage = (dataUrl) =>
        new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = reject;
                image.src = dataUrl;
        });

const blobToDataURL = (blob) =>
        new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
        });

const createCompressedBlob = (canvas, image, width, height, quality) => {
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        return new Promise((resolve, reject) => {
                canvas.toBlob(
                        (blob) => {
                                if (blob) {
                                        resolve(blob);
                                } else {
                                        reject(new Error("فشل ضغط الصورة"));
                                }
                        },
                        "image/jpeg",
                        quality
                );
        });
};

export const compressImageFile = async (
        file,
        { maxDimension = DEFAULT_MAX_DIMENSION, quality: initialQuality = 0.8, maxSizeBytes = MAX_IMAGE_SIZE_BYTES } = {}
) => {
        const base64 = await readFileAsDataURL(file);
        const image = await loadImage(base64);
        let targetWidth = image.width;
        let targetHeight = image.height;

        if (targetWidth > maxDimension || targetHeight > maxDimension) {
                const scale = Math.min(maxDimension / targetWidth, maxDimension / targetHeight);
                targetWidth = Math.round(targetWidth * scale);
                targetHeight = Math.round(targetHeight * scale);
        }

        const canvas = document.createElement("canvas");
        let quality = initialQuality;
        let blob = await createCompressedBlob(canvas, image, targetWidth, targetHeight, quality);
        let attempts = 0;

        while (blob.size > maxSizeBytes && attempts < 6) {
                if (quality > MIN_QUALITY) {
                        quality = Math.max(MIN_QUALITY, quality - 0.15);
                } else {
                        targetWidth = Math.round(targetWidth * 0.9);
                        targetHeight = Math.round(targetHeight * 0.9);
                }

                blob = await createCompressedBlob(canvas, image, targetWidth, targetHeight, quality);
                attempts += 1;
        }

        if (blob.size > maxSizeBytes) {
                throw new Error("الصورة بعد الضغط ما تزال أكبر من 2 ميجا. جرّب صورة أصغر أو قلل الأبعاد.");
        }

        const dataUrl = await blobToDataURL(blob);
        return { dataUrl, size: blob.size };
};
