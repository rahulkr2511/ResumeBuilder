import React, { useState, useRef } from 'react';
import { TextField, Button, Divider, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../styles/ProfessionalResume1.css';

interface ResumeData {
    name: string;
    summary: string;
    workExperience: string;
    education: string;
    additionalInfo: string;
    contact: string;
}

const ProfessionalResume1: React.FC = () => {
    const [resumeData, setResumeData] = useState<ResumeData>({
        name: "JACQUELINE THOMPSON",
        contact: `123 Anywhere St., Any City • 123-456-7890 • hello@reallygreatsite.com • www.reallygreatsite.com`,
        summary: `Results-oriented Engineering Executive with a proven track record of optimizing project outcomes. 
Skilled in strategic project management and team leadership. Seeking a challenging executive role 
to leverage technical expertise and drive engineering excellence.`,
        workExperience: `Engineering Executive, Borcelle Technologies (Jan 2023 - Present)
- Implemented cost-effective solutions, resulting in a 20% reduction in project expenses.
- Streamlined project workflows, enhancing overall efficiency by 25%.
- Led a team in successfully delivering a complex engineering project on time and within budget.

Project Engineer, Salford & Co (Mar 2021 - Dec 2022)
- Managed project timelines, reducing delivery times by 30%.
- Spearheaded the adoption of cutting-edge engineering software, improving project accuracy by 15%.
- Collaborated with cross-functional teams, enhancing project success rates by 10%.

Graduate Engineer, Arowwai Industries (Feb 2020 - Jan 2021)
- Coordinated project tasks, ensuring adherence to engineering standards and regulations.
- Conducted comprehensive project analyses, identifying and rectifying discrepancies in engineering designs.`,
        education: `Master of Science in Mechanical Engineering, University of Engineering and Technology (Sep 2019 - Oct 2020)
Specialization in Advanced Manufacturing. Thesis on "Innovations in Sustainable Engineering Practices".

Bachelor of Science in Civil Engineering, City College of Engineering (Aug 2015 - Aug 2019)
Relevant coursework in Structural Design and Project Management.`,
        additionalInfo: `Technical Skills: Project Management, Structural Analysis, Robotics and Automation, CAD
Languages: English, Malay, German
Certifications: Professional Engineer (PE) License, Project Management Professional (PMP)
Awards/Activities: Received the "Engineering Excellence" Award for outstanding contributions to project innovation, Borcelle Technologies`
        
    });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const resumeRef = useRef<HTMLDivElement>(null);

    const handleChange = (field: keyof ResumeData, value: string) => {
        setResumeData({ ...resumeData, [field]: value });
    };

    const handleSave = () => {
        // Save to localStorage
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        alert('Changes saved successfully!');
    };

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
                            font-family: Arial, sans-serif;
                            font-size: 14px;
                            line-height: 1.6;
                            color: black;
                            white-space: pre-wrap;
                            margin: 0;
                            padding: 0;
                            width: 100%;
                            background: white;
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
            styleElement.textContent = `
                .resume-container {
                    background: white !important;
                    color: black !important;
                    padding: 20px !important;
                    width: 100% !important;
                }
                .resume-header {
                    margin-bottom: 20px !important;
                }
                .resume-header div {
                    font-size: 36px !important;
                    font-weight: bold !important;
                    color: #000000 !important;
                }
                .resume-contact {
                    margin-bottom: 20px !important;
                    font-size: 14px !important;
                    color: #555 !important;
                }
                .resume-section {
                    margin: 20px 0 !important;
                    text-align: left !important;
                }
                .resume-section h2 {
                    color: #000000 !important;
                    font-size: 14px !important;
                    margin-bottom: 10px !important;
                    font-weight: bold !important;
                    text-align: left !important;
                    padding-left: 0 !important;
                }
                .resume-section div {
                    font-size: 14px !important;
                    line-height: 1.6 !important;
                    color: black !important;
                    background: white !important;
                    white-space: pre-wrap !important;
                    text-align: left !important;
                }
                .resume-divider {
                    margin: 15px 0 !important;
                    border-color: #e0e0e0 !important;
                    border-width: 0.5px !important;
                }
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
    
    
    

    const handleDownloadDOCX = async () => {
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: resumeData.name,
                                bold: true,
                                size: 32
                            })
                        ]
                    }),
                    new Paragraph({
                        children: [new TextRun(resumeData.contact)]
                    }),
                    new Paragraph({
                        children: [new TextRun('\nSUMMARY\n')]
                    }),
                    new Paragraph({
                        children: [new TextRun(resumeData.summary)]
                    }),
                    new Paragraph({
                        children: [new TextRun('\nWORK EXPERIENCE\n')]
                    }),
                    new Paragraph({
                        children: [new TextRun(resumeData.workExperience)]
                    }),
                    new Paragraph({
                        children: [new TextRun('\nEDUCATION\n')]
                    }),
                    new Paragraph({
                        children: [new TextRun(resumeData.education)]
                    }),
                    new Paragraph({
                        children: [new TextRun('\nADDITIONAL INFORMATION\n')]
                    }),
                    new Paragraph({
                        children: [new TextRun(resumeData.additionalInfo)]
                    })
                ]
            }]
        });

        const blob = await Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'resume.docx';
        link.click();
        window.URL.revokeObjectURL(url);
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
                    <MenuItem onClick={() => {
                        handleDownloadDOCX();
                        handleMenuClose();
                    }}>
                        Download as DOCX
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
                            style: { fontSize: '36px', fontWeight: 'bold', color: '#000000' },
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
                        InputProps={{
                            disableUnderline: true,
                            style: { color: '#555', fontSize: '0.9em' },
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

export default ProfessionalResume1;
