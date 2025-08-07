const fs = require('fs-extra');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
// pdf-parse cant read it as an image
// It looks like Amazon just takes a picture, I might need to use something else.
//const pdf = require('pdf-parse')


const INPUT_DIR = path.join(__dirname, '../scribe-files');
const OUTPUT_DIR = path.join(__dirname, '../notes-final');


async function main() {
    // OK,
    // Step 1: Make sure the 2 file directories exist or can be created without any issue.
    try {
        await fs.ensureDir(OUTPUT_DIR);
        await fs.ensureDir(INPUT_DIR);
    } catch (err) {
        console.error(`Failed to ensure INPUT_DIR/OUTPUT_DIR: ${INPUT_DIR} , ${OUTPUT_DIR}`, err )
    }

    console.log("main called");

    // Step 2: Get all the PDF files inside the INPUT File
    // ToDo Bonus: Only updated files from last run. We dont need to re-run this for old files that have not been updated.
    // Step 3: Convert the .pdf file to .md.
    const files = (await fs.readdir(INPUT_DIR)).filter(x=> x.endsWith('.pdf'));


    for (const file of files) {
        const filePath = path.join(INPUT_DIR, file);
        const dataBuffer = fs.readFileSync(filePath);
        console.log(`\\u{1F7E2} Processing: ${file}`);

        //ToDo: begin converting the pages into images.
        //ToDo: begin OCRing each page.

        // ToDo Bonus: Check that the pdf is not empty.

        const fakeText = `# ${file}\n\n_This is fake OCR output for testing._`;
        const outputPath = path.join(OUTPUT_DIR, file.replace(/\.pdf$/, '.md'));
        await fs.writeFile(outputPath, fakeText);
        console.log(`\\u{2705} Wrote to ${outputPath}`);;
    }
}
/*
    Lets try to use Tesseract to convert the pictures to txt.
    URL: https://tesseract.projectnaptha.com/
    GitHub: https://github.com/naptha/tesseract.js#tesseractjs
    OCR: Use Tesseract to help see text in an image.
 */
async function runOCROnImage(imagePath) {
    const { data: { text } } = Tesseract.recognize(
        imagePath,
        'eng',
        { logger: m => console.log(m)}
    );
    return text;
}

/*
    Try to extract the image from the pages.
    * Notes can have multiple pages.
    * ToDo Bonus: Find something to do this, might already be something out there.
    * ToDo Now: Get the pdf and loop through the pages to scan. Using pdf-lib.https://pdf-lib.js.org/
 */
async function extractImages(pdfPath) {
    const data = await fs.readFile(pdfPath);
    const pdf = await PDFDocument.load(data);
    const pages = pdf.getPages();

    const images = [];

    for (const page of pages ) {
        // Begin converting each pdf into a list of pages
        runOCROnImage()
    }
}

main();

