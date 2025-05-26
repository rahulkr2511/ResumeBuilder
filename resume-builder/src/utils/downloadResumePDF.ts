import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


/**
 * This is a utility function to download a resume as a PDF.
 * It takes a reference to the resume element, extracts computed styles,
 * and handles the PDF generation process.
 * It also provides options for custom filename and callback functions for start, complete, and error events.
 * * @param {DownloadResumePDFOptions} options - The options for downloading the resume PDF.
 * @param {React.RefObject<HTMLDivElement | null>} options.resumeRef - The reference to the resume element.
 * @param {Function} options.extractComputedStyles - A function to extract computed styles from the resume element.
 * @param {string} [options.filename] - The name of the file to save the PDF as. Defaults to 'resume.pdf'.
 * @param {Function} [options.onStart] - Callback function to execute when the download starts.
 * @param {Function} [options.onComplete] - Callback function to execute when the download completes.
 * @param {Function} [options.onError] - Callback function to execute when an error occurs during the download.
 * @returns {Promise<void>} - A promise that resolves when the PDF is downloaded.
 * @throws {Error} - Throws an error if the PDF generation fails.
 * @description
 * This function uses html2canvas to render the resume element to a canvas,
 * then converts that canvas to an image and uses jsPDF to create a PDF document.
 * It hides the resume action buttons during the download process and restores them afterward.
 * It also converts editable text fields in the resume to static text to ensure proper rendering in the PDF.
 * The PDF is saved with the specified filename or 'resume.pdf' by default.
 * It also provides options for handling start, complete, and error events during the download process. 
 * 
 */

interface DownloadResumePDFOptions {
    resumeRef: React.RefObject<HTMLDivElement | null>;
    extractComputedStyles: (element: HTMLElement) => string;
    filename?: string;
    onStart?: () => void;
    onComplete?: () => void;
    onError?: (error: any) => void;
}

const defaultFilename = 'resume.pdf';

export const downloadResumePDF = async ({
    resumeRef,
    extractComputedStyles,
    filename = defaultFilename,
    onStart,
    onComplete,
    onError
}: DownloadResumePDFOptions): Promise<void> => {
    if (!resumeRef.current) return;

    onStart?.();

    const buttons = document.querySelector('.resume-actions') as HTMLElement;
    if (buttons) buttons.style.display = 'none';

    try {
        const resumeClone = resumeRef.current.cloneNode(true) as HTMLElement;
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '-9999px';
        tempDiv.style.width = '800px';
        tempDiv.style.padding = '40px';
        tempDiv.style.background = 'white';
        document.body.appendChild(tempDiv);
        tempDiv.appendChild(resumeClone);

         /**
             * 
             * @param element HTMLElement
             * This function converts all editable text fields in the resume to static text.
             * It replaces input and textarea elements with divs containing their text content.
             * This is necessary to ensure that the PDF captures the text as static content
             * and not as editable fields, which can cause issues in the PDF rendering. 
             * 
             */

        const convertToStaticText = (element: HTMLElement) => {
            const textFields = element.querySelectorAll('.MuiInputBase-input, .ProseMirror');
            textFields.forEach((field: Element) => {
                if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
                    const textContent = field.value;
                    const textDiv = document.createElement('div');
                    textDiv.innerHTML = textContent;
                    textDiv.className = field.className;
                    field.parentElement?.replaceWith(textDiv);
                } else if (field.classList.contains('ProseMirror')) {
                    const content = field.innerHTML;
                    const textDiv = document.createElement('div');
                    textDiv.innerHTML = content;
                    textDiv.className = field.className;
                    field.parentElement?.replaceWith(textDiv);
                }
            });
        };

        convertToStaticText(resumeClone);


        /**
         * * This function extracts computed styles from the cloned resume element.
         */
        const extractedStyles = extractComputedStyles(resumeClone);
        const styleElement = document.createElement('style');
        styleElement.textContent = extractedStyles;
        tempDiv.appendChild(styleElement);

        const contentElement = tempDiv.firstChild as HTMLElement;
        const contentHeight = contentElement?.scrollHeight || 0;


        /**
             * * html2canvas is used to render the content element to a canvas.
             * * It captures the content with a higher scale for better quality (2),
             * * and sets the background color to white.
             * * The width is set to 800px (exact width of component), and the height is dynamically calculated based on the content.
             * * The canvas is then converted to a JPEG image with maximum quality.
             * * Finally, jsPDF is used to create a PDF document with the exact dimensions,
             * * and the image is added to the PDF.
             * * The PDF is then saved with the filename 'resume.pdf' by default.
             */

        const canvas = await html2canvas(contentElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: 800,
            height: contentHeight,
            windowWidth: 800,
            windowHeight: contentHeight
        });

        document.body.removeChild(tempDiv);
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [800, canvas.height / 2]
        });

        // Add image with exact width
        pdf.addImage(imgData, 'JPEG', 0, 0, 800, canvas.height / 2);
        pdf.save(filename);

        onComplete?.();
    } catch (error) {
        console.error('Error generating PDF:', error);
        onError?.(error);
        alert('Error generating PDF. Please try again.');
    } finally {
        if (buttons) buttons.style.display = 'flex';
    }
}; 