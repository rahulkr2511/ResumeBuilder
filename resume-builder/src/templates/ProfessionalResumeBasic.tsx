import React, { useState, useRef } from 'react';
import { TextField, Button, Divider, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RichTextField from '../utils/RichTextField';
import '../styles/ProfessionalResumeBasic.css';
import { useNavigate } from 'react-router-dom';
import { ProfessionalResumeData } from '../utils/ProfessionalResumeDefaultContent';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionalBasicResumeData, setProfessionalBasicResumeData } from './ProfessionalResumeBasicSlice';

const extractComputedStyles = (rootElement: HTMLElement): string => {
    const allElements = rootElement.querySelectorAll('*');
    let styleSheet = '';

    // Add base styles for lists
    styleSheet += `
        .resume-container ul, .resume-container ol {
            margin: 0;
            padding-left: 24px;
            list-style-position: outside;
        }
        .resume-container li {
            margin: 4px 0;
            padding-left: 4px;
            line-height: 1.6;
            position: relative;
        }
        .resume-container ul li {
            list-style-type: disc;
        }
        .resume-container ol {
            counter-reset: item;
            list-style-type: none;
        }
        .resume-container ol li {
            counter-increment: item;
            list-style-type: none;
            position: relative;
        }
        .resume-container ol li::before {
            content: counter(item) ".";
            position: absolute;
            left: -24px;
            width: 20px;
            text-align: right;
        }
        .resume-container p {
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
    `;

    allElements.forEach((el, index) => {
        const computed = window.getComputedStyle(el);
        const className = `static-style-${index}`;
        el.classList.add(className);

        let styleRule = `.${className} {\n`;
        Array.from(computed).forEach(prop => {
            const value = computed.getPropertyValue(prop);
            // Skip list-style properties as we handle them separately
            if (value && !prop.startsWith('list-style')) {
                styleRule += `  ${prop}: ${value};\n`;
            }
        });
        styleRule += '}\n';
        styleSheet += styleRule;
    });

    return styleSheet;
};

const ProfessionalResumeBasic: React.FC = () => {
    const resumeDataFromStore = useSelector(getProfessionalBasicResumeData);
    const dispatch = useDispatch();
    const [resumeData, setResumeData] = useState<ProfessionalResumeData>(resumeDataFromStore);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const resumeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleChange = (field: keyof ProfessionalResumeData, value: string) => {
        setResumeData(prev => ({ ...prev, [field]: value }));
    };

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
            tempDiv.style.width = '800px';
            tempDiv.style.padding = '40px';
            tempDiv.style.background = 'white';
            document.body.appendChild(tempDiv);
            tempDiv.appendChild(resumeClone);

            // Convert all editable fields to static text
            const convertToStaticText = (element: HTMLElement) => {
                const textFields = element.querySelectorAll('.MuiInputBase-input, .ProseMirror');
                textFields.forEach((field: Element) => {
                    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
                        const textContent = field.value;
                        const textDiv = document.createElement('div');
                        textDiv.innerHTML = textContent; // Use innerHTML to preserve list structure
                        textDiv.className = field.className;
                        field.parentElement?.replaceWith(textDiv);
                    } else if (field.classList.contains('ProseMirror')) {
                        const content = field.innerHTML;
                        const textDiv = document.createElement('div');
                        textDiv.innerHTML = content; // Preserve HTML structure including lists
                        textDiv.className = field.className;
                        field.parentElement?.replaceWith(textDiv);
                    }
                });
            };

            // Convert all editable fields to static text
            convertToStaticText(resumeClone);

            // Extract computed styles and create style element
            const extractedStyles = extractComputedStyles(resumeClone);
            const styleElement = document.createElement('style');
            styleElement.textContent = extractedStyles;
            tempDiv.appendChild(styleElement);

            // Capture the static content
            const canvas = await html2canvas(tempDiv.firstChild as HTMLElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false
            });

            // Clean up
            document.body.removeChild(tempDiv);

            // Create PDF
            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [canvas.width / 2, canvas.height / 2]
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width / 2, canvas.height / 2);
            pdf.save('resume.pdf');

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            if (buttons) buttons.style.display = 'flex';
        }
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="resume-wrapper">
             <Box className="resume-actions" sx={{ 
                position: 'fixed', 
                top: 20, 
                left: 20, 
                zIndex: 1000,
                display: 'flex',
                gap: 2
            }}>
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={handleBack}
                >
                    Back
                </Button>
            </Box>
            <Box className="resume-actions" sx={{ 
                position: 'fixed', 
                top: 20, 
                right: 20, 
                zIndex: 1000,
                display: 'flex',
                gap: 2
            }}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSave}
                >
                    Apply Changes
                </Button>
                <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => {
                        handleDownloadPDF();
                        handleMenuClose();
                    }}>
                        Download as PDF
                    </MenuItem>
                </Menu>
            </Box>

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
        </div>
    );
};

export default ProfessionalResumeBasic;
