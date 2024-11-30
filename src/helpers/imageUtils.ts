// Function to load an image from a file
export const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = () => {
            img.src = reader.result as string;
        };
        reader.onloadend = () => resolve(img);
        reader.onerror = (err) => reject(err);

        reader.readAsDataURL(file);
    });
};

// Function to convert the image to ICO format
export const convertToIco = async (imageFile: File): Promise<string | null> => {
    const image = await loadImage(imageFile);

    // Create a canvas element to resize the image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        alert("Failed to get canvas context");
        return null;
    }

    // Resize the image to 256x256
    canvas.width = 256;
    canvas.height = 256;

    // Draw the image onto the canvas (which automatically converts to RGBA)
    ctx.drawImage(image, 0, 0, 256, 256);

    // Convert the canvas content to a Blob
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (blob) {
                // Create a URL for the Blob to be used as a downloadable link
                const icoUrl = URL.createObjectURL(blob);
                resolve(icoUrl);
            } else {
                resolve(null);
            }
        }, "image/ico");
    });
};
