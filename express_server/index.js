
const express = require('express');
const sharp = require('sharp');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: "10mb" }));

const UPLOAD_FOLDER = path.join(__dirname, 'uploads');

// Create directories if they don't exist
if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER);
}

app.post('/upload', async (req, res) => {
    try {
        const base64Image = req.body.img;
        if (!base64Image) {
            return res.status(400).send('No image provided');
        }

        // Decode the base64 image
        const imageBuffer = Buffer.from(base64Image.split(",")[1], 'base64');

        // Generate unique filenames
        const uniqueId = uuid.v4();

        const originalFilename = uniqueId + '_original.jpg';
        const compressedFilename = uniqueId + '_compressed.jpg';

        const originalPath = path.join(UPLOAD_FOLDER, originalFilename);
        const compressedPath = path.join(UPLOAD_FOLDER, compressedFilename);

        // Save original image
        fs.writeFileSync(originalPath, imageBuffer);

        // Process and save compressed image
        sharp(originalPath)
            .metadata()
            .then(metadata => {
                const minDimension = Math.min(metadata.width, metadata.height);
                const leftOffset = Math.floor((metadata.width - minDimension) / 2);
                const topOffset = Math.floor((metadata.height - minDimension) / 2);

                return sharp(originalPath)
                    .extract({ width: minDimension, height: minDimension, left: leftOffset, top: topOffset })
                    .resize(80, 80)
                    .jpeg({ quality: 80 })
                    .toFile(compressedPath);
            })
            .then(() => res.send(JSON.stringify({
                original: originalFilename,
                compress: compressedFilename
            })))
            .catch(err => {
                console.error(err);
                res.status(500).send('Error processing image');
            });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving image');
    }
});
app.get('/get/:filename', (req, res) => {
    try {
        res.sendFile(path.join(UPLOAD_FOLDER, req.params.filename));
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving image');
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});