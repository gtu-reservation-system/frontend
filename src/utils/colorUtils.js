export const getDominantColor = (imgEl) => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Make canvas small for efficiency
        canvas.width = 1;
        canvas.height = 1;
        
        try {
            // Draw image scaled down to 1x1 pixel
            ctx.drawImage(imgEl, 0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            
            // Clean up
            canvas.remove();
            
            resolve({ r, g, b });
        } catch (error) {
            console.error('Error getting dominant color:', error);
            resolve({ r: 237, g: 56, b: 18 }); // Fallback color
        }
    });
};

export const isLightColor = (r, g, b) => {
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
};