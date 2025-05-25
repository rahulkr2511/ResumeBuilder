import React, { useState, useRef } from 'react';
import { TextField, Divider, Box } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import RichTextField from '../../utils/RichTextField';
import '../../styles/ProfessionalResumeBasic.css';
import { useNavigate } from 'react-router-dom';
import { ProfessionalResumeData } from '../../utils/ProfessionalResumeDefaultContent';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionalBasicResumeData, setProfessionalBasicResumeData } from './ProfessionalResumeBasicSlice';
import { useExtractComputedStyles } from '../../customHooks/useExtractComputedStyles';
import ResumeHeader from '../../components/ResumeHeader';
import IApplicationConstants from '../../constants/Constants';

/**
 * 
 * @returns The ProfessionalResumeBasic component renders a professional resume template
 *          allowing users to edit their resume details, save changes, and download it as a PDF.
 *         It uses Material-UI for styling and layout, and integrates with Redux for state management.
 *         The component includes features like rich text editing, dynamic section handling,
 *         and PDF generation with exact dimensions and styles.
 */

const ProfessionalResumeBasic: React.FC = () => {
    const resumeDataFromStore = useSelector(getProfessionalBasicResumeData);
    const dispatch = useDispatch();
    const [resumeData, setResumeData] = useState<ProfessionalResumeData>(resumeDataFromStore);
    const resumeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    /**
     * * Custom hook to extract computed styles from the resume container
     */
    const { extractComputedStyles } = useExtractComputedStyles({
        containerClass: 'resume-container',
        skipProperties: ['list-style', 'cursor'] // Skip cursor styles for PDF export
    });


    
    const handleSectionChange = (section: keyof ProfessionalResumeData, field: 'heading' | 'content', value: string) => {
        setResumeData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSave = () => {
        dispatch(setProfessionalBasicResumeData(resumeData));
    };

    const handleBack = () => {
        navigate(`/`);
    }

    const handleDownloadPDF = async () => {
        if (!resumeRef.current) return;

        const buttons = document.querySelector('.resume-actions') as HTMLElement;
        if (buttons) buttons.style.display = 'none';

        try {
            const resumeClone = resumeRef.current.cloneNode(true) as HTMLElement;
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            tempDiv.style.top = '-9999px';
            tempDiv.style.width = '800px';  // Match the resume container width
            tempDiv.style.padding = '40px';  // Match the resume container padding
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
                scale: 2,  // Higher scale for better quality
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                width: 800,  // Exact width
                height: contentHeight,  // Dynamic height
                windowWidth: 800,  // Match container width
                windowHeight: contentHeight  // Match content height
            });

            // Clean up
            document.body.removeChild(tempDiv);
            
            const imgData = canvas.toDataURL('image/jpeg', 1.0);  // Maximum quality
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [800, canvas.height / 2]  // Exact width, scaled height
            });

            // Add image with exact width
            pdf.addImage(imgData, 'JPEG', 0, 0, 800, canvas.height / 2);
            pdf.save('resume.pdf');

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            if (buttons) buttons.style.display = 'flex';
        }
    };

    return (
        <div className="resume-wrapper">
            <ResumeHeader 
                onBack={handleBack}
                onSave={handleSave}
                onDownload={handleDownloadPDF}
            />

            <Box 
                component="main"
                sx={{
                    marginTop: '64px',
                    padding: '24px',
                    minHeight: 'calc(100vh - 64px)',
                    backgroundColor: '#f5f5f5'
                }}
            >
                <div className="resume-container" ref={resumeRef}>
                    <div className="resume-header">
                        <RichTextField
                            value={resumeData.name.content}
                            onChange={(value) => handleSectionChange("name", "content", value)}
                            isHeading={true}
                        />
                    </div>
                    <div className="resume-contact">
                        <TextField
                            fullWidth
                            multiline
                            value={resumeData.contact.content}
                            onChange={(e) => handleSectionChange("contact", "content", e.target.value)}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                                style: { 
                                    color: '#555', 
                                    fontSize: '0.9em', 
                                    textAlign: 'center',
                                    fontFamily: 'Arial, sans-serif',
                                    whiteSpace: 'pre-wrap'
                                },
                            }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    width: '70%',
                                    margin: '0 auto'
                                },
                                '& .MuiInputBase-input': {
                                    textAlign: 'center',
                                    padding: '0'
                                }
                            }}
                        />
                    </div>

                    <Divider className="resume-divider" />

                    <div className="resume-section">
                        <RichTextField
                            value={`<h2>${resumeData.summary.heading}</h2>`}
                            onChange={(value) => handleSectionChange("summary", "heading", value.replace(/<[^>]*>/g, ''))}
                            isHeading={true}
                        />
                        <RichTextField
                            value={resumeData.summary.content}
                            onChange={(value) => handleSectionChange("summary", "content", value)}
                        />
                    </div>

                    <Divider className="resume-divider" />

                    <div className="resume-section">
                        <RichTextField
                            value={`<h2>${resumeData.workExperience.heading}</h2>`}
                            onChange={(value) => handleSectionChange("workExperience", "heading", value.replace(/<[^>]*>/g, ''))}
                            isHeading={true}
                        />
                        <RichTextField
                            value={resumeData.workExperience.content}
                            onChange={(value) => handleSectionChange("workExperience", "content", value)}
                        />
                    </div>

                    <Divider className="resume-divider" />

                    <div className="resume-section">
                        <RichTextField
                            value={`<h2>${resumeData.education.heading}</h2>`}
                            onChange={(value) => handleSectionChange("education", "heading", value.replace(/<[^>]*>/g, ''))}
                            isHeading={true}
                        />
                        <RichTextField
                            value={resumeData.education.content}
                            onChange={(value) => handleSectionChange("education", "content", value)}
                        />
                    </div>

                    <Divider className="resume-divider" />

                    <div className="resume-section">
                        <RichTextField
                            value={`<h2>${resumeData.additionalInfo.heading}</h2>`}
                            onChange={(value) => handleSectionChange("additionalInfo", "heading", value.replace(/<[^>]*>/g, ''))}
                            isHeading={true}
                        />
                        <RichTextField
                            value={resumeData.additionalInfo.content}
                            onChange={(value) => handleSectionChange("additionalInfo", "content", value)}
                        />
                    </div>

                    <Divider className="resume-divider" />
                </div>
            </Box>
        </div>
    );
};

export default React.memo(ProfessionalResumeBasic);
