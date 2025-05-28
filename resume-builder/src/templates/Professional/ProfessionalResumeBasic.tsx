import React, { useState, useRef } from 'react';
import { TextField, Divider, Box } from '@mui/material';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import RichTextField from '../../utils/RichTextField';
import '../../styles/common.css';
import '../../styles/ProfessionalResumeBasic.css';
import { useNavigate } from 'react-router-dom';
import { IProfessionalResumeData } from '../../utils/ProfessionalResumeDefaultContent';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionalBasicResumeData, setProfessionalBasicResumeData } from './ProfessionalResumeBasicSlice';
import { useExtractComputedStyles } from '../../customHooks/useExtractComputedStyles';
import ResumeHeader from '../../components/ResumeHeader';
import IApplicationConstants from '../../constants/Constants';
import { downloadResumePDF } from '../../utils/downloadResumePDF';

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
    const [resumeData, setResumeData] = useState<IProfessionalResumeData>(resumeDataFromStore);
    const resumeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    /**
     * * Custom hook to extract computed styles from the resume container
     */
    const { extractComputedStyles } = useExtractComputedStyles({
        containerClass: 'resume-container',
        skipProperties: ['list-style', 'cursor'] // Skip cursor styles for PDF export
    });


    
    const handleSectionChange = (section: keyof IProfessionalResumeData, field: 'heading' | 'content', value: string) => {
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
        await downloadResumePDF({
            resumeRef,
            extractComputedStyles,
            onError: (error) => {
                console.error('Error generating PDF:', error);
            }
        });
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
                            isNameHeading={true}
                        />
                    </div>
                    <div className="resume-contact">
                        <RichTextField
                            value={resumeData.contact.content}
                            onChange={(value) => handleSectionChange("contact", "content", value)}
                            style={{
                                textAlign: 'center',
                                color: '#555',
                                fontSize: '0.9em',
                                fontFamily: 'Arial, sans-serif',
                                width: '80%',
                                margin: '0 auto'
                            }}
                            defaultColor="#555"
                            isNameHeading={true}
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
