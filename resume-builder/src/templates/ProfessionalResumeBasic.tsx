import React, { useState, useRef } from 'react';
import { TextField, Button, Divider, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/ProfessionalResumeBasic.css';
import { useNavigate } from 'react-router-dom';
import { ResumeData, defaultResumeContent, defaultResumeStaticCSS, defaultTextContentCSS } from '../utils/ProfessionalResumeDefaultContent';

const ProfessionalResumeBasic: React.FC = () => {
    const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeContent);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const resumeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleChange = (field: keyof ResumeData, value: string) => {
        setResumeData({ ...resumeData, [field]: value });
    };

    const handleSave = () => {
        // TODO: Create Slice to save the resume data
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
                    <TextField
                        fullWidth
                        value={resumeData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        variant="standard"
                        InputProps={{
                            disableUnderline: true,
                            style: { 
                                fontSize: '36px', 
                                fontWeight: 'bold', 
                                color: '#000000',
                                textAlign: 'center',
                                width: '100%'
                            },
                        }}
                        sx={{
                            width: '100%',
                            '& .MuiInputBase-root': {
                                width: '100%',
                                textAlign: 'center'
                            },
                            '& .MuiInputBase-input': {
                                textAlign: 'center',
                                width: '100%'
                            }
                        }}
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
                    <h2 style={{ textAlign: 'left', paddingLeft: 0, color: '#000000' }}>SUMMARY</h2>
                    <TextField
                        fullWidth
                        multiline
                        value={resumeData.summary}
                        onChange={(e) => handleChange("summary", e.target.value)}
                        variant="standard"
                        InputProps={{ 
                            disableUnderline: true,
                            style: { textAlign: 'left' }
                        }}
                    />
                </div>

                <Divider className="resume-divider" sx={{ borderColor: '#e0e0e0', borderWidth: '0.5px' }} />

                <div className="resume-section">
                    <h2 style={{ textAlign: 'left', paddingLeft: 0, color: '#000000' }}>WORK EXPERIENCE</h2>
                    <TextField
                        fullWidth
                        multiline
                        value={resumeData.workExperience}
                        onChange={(e) => handleChange("workExperience", e.target.value)}
                        variant="standard"
                        InputProps={{ 
                            disableUnderline: true,
                            style: { textAlign: 'left' }
                        }}
                    />
                </div>

                <Divider className="resume-divider" sx={{ borderColor: '#e0e0e0', borderWidth: '0.5px' }} />

                <div className="resume-section">
                    <h2 style={{ textAlign: 'left', paddingLeft: 0, color: '#000000' }}>EDUCATION</h2>
                    <TextField
                        fullWidth
                        multiline
                        value={resumeData.education}
                        onChange={(e) => handleChange("education", e.target.value)}
                        variant="standard"
                        InputProps={{ 
                            disableUnderline: true,
                            style: { textAlign: 'left' }
                        }}
                    />
                </div>

                <Divider className="resume-divider" sx={{ borderColor: '#e0e0e0', borderWidth: '0.5px' }} />

                <div className="resume-section">
                    <h2 style={{ textAlign: 'left', paddingLeft: 0, color: '#000000' }}>ADDITIONAL INFORMATION</h2>
                    <TextField
                        fullWidth
                        multiline
                        value={resumeData.additionalInfo}
                        onChange={(e) => handleChange("additionalInfo", e.target.value)}
                        variant="standard"
                        InputProps={{ 
                            disableUnderline: true,
                            style: { textAlign: 'left' }
                        }}
                    />
                </div>

                <Divider className="resume-divider" sx={{ borderColor: '#e0e0e0', borderWidth: '0.5px' }} />
            </div>
        </div>
    );
};

export default ProfessionalResumeBasic;
