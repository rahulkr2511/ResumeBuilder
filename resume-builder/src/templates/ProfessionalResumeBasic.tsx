import React, { useState, useRef } from 'react';
import { TextField, Button, Divider, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RichTextField from '../utils/RichTextField';
import '../styles/ProfessionalResumeBasic.css';
import { useNavigate } from 'react-router-dom';
import { ResumeData, defaultResumeStaticCSS, defaultTextContentCSS } from '../utils/ProfessionalResumeDefaultContent';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionalBasicResumeData, setProfessionalBasicResumeData } from './ProfessionalResumeBasicSlice';

const ProfessionalResumeBasic: React.FC = () => {

    const resumeDataFromStore = useSelector(getProfessionalBasicResumeData);
    const dispath = useDispatch();
    const [resumeData, setResumeData] = useState<ResumeData>(resumeDataFromStore);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const resumeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleChange = (field: keyof ResumeData, value: string) => {
        setResumeData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        dispath(setProfessionalBasicResumeData(resumeData));
    };

    const handleBack = () => {
        navigate(`/`);
    }

    const handleDownloadPDF = async () => {
        if (!resumeRef.current) return;

        const buttons = document.querySelector('.resume-actions') as HTMLElement;
        if (buttons) buttons.style.display = 'none';

        try {
            // Create a clone of the resume for PDF generation
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

            // Convert all editable fields to static text so that the whole content will be visible
            const convertToStaticText = (element: HTMLElement) => {
                const textFields = element.querySelectorAll('.MuiInputBase-input');
                textFields.forEach((field: Element) => {
                    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
                        const textContent = field.value;
                        const textDiv = document.createElement('div');
                        textDiv.style.cssText = `
                            ${defaultTextContentCSS}
                        `;
                        textDiv.textContent = textContent;
                        
                        // Replace the input with the static text div
                        const parent = field.parentElement;
                        if (parent) {
                            // Preserve the original styling classes
                            textDiv.className = parent.className;
                            parent.replaceWith(textDiv);
                        }
                    }
                });
            };

            // Convert all editable fields to static text
            convertToStaticText(resumeClone);

            // Add styles for the static content
            const styleElement = document.createElement('style');
            styleElement.textContent = `${defaultResumeStaticCSS}
                
            `;
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
                        value={resumeData.name}
                        onChange={(value) => handleChange("name", value)}
                        isHeading={true}
                    />
                </div>
                <div className="resume-contact">
                    <TextField
                        fullWidth
                        multiline
                        value={resumeData.contact}
                        onChange={(e) => handleChange("contact", e.target.value)}
                        variant="standard"
                        className='align-center'
                        InputProps={{
                            disableUnderline: true,
                            style: { color: '#555', fontSize: '0.9em', textAlign: 'center', maxWidth:'70%' },
                        }}
                        sx={{
                            '& .MuiInputBase-input': {
                                textAlign: 'center', 
                            },
                        }}
                    />
                </div>

                <Divider className="resume-divider" />

                <div className="resume-section">
                    <RichTextField
                        value="<h2>SUMMARY</h2>"
                        onChange={(value) => {/* We don't need to save the heading as it's static */}}
                        isHeading={true}
                    />
                    <RichTextField
                        value={resumeData.summary}
                        onChange={(value) => handleChange("summary", value)}
                    />
                </div>

                <Divider className="resume-divider" />

                <div className="resume-section">
                    <RichTextField
                        value="<h2>WORK EXPERIENCE</h2>"
                        onChange={(value) => {/* We don't need to save the heading as it's static */}}
                        isHeading={true}
                    />
                    <RichTextField
                        value={resumeData.workExperience}
                        onChange={(value) => handleChange("workExperience", value)}
                    />
                </div>

                <Divider className="resume-divider" />

                <div className="resume-section">
                    <RichTextField
                        value="<h2>EDUCATION</h2>"
                        onChange={(value) => {/* We don't need to save the heading as it's static */}}
                        isHeading={true}
                    />
                    <RichTextField
                        value={resumeData.education}
                        onChange={(value) => handleChange("education", value)}
                    />
                </div>

                <Divider className="resume-divider" />

                <div className="resume-section">
                    <RichTextField
                        value="<h2>ADDITIONAL INFORMATION</h2>"
                        onChange={(value) => {/* We don't need to save the heading as it's static */}}
                        isHeading={true}
                    />
                    <RichTextField
                        value={resumeData.additionalInfo}
                        onChange={(value) => handleChange("additionalInfo", value)}
                    />
                </div>

                <Divider className="resume-divider" />
            </div>
        </div>
    );
};

export default ProfessionalResumeBasic;
