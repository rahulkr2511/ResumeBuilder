import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExtractComputedStyles } from '../../customHooks/useExtractComputedStyles';
import { Box, Divider } from '@mui/material';
import ResumeHeader from '../../components/ResumeHeader';
import { getBusinessBasicResumeData, setBusinessBasicResumeData } from './BusinessResumeBasicSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IBusinessResumeData } from '../../utils/BusinessResumeDefaultContent';
import RichTextField from '../../utils/RichTextField';
import { Colors } from '../../constants/Colors';
import { downloadResumePDF } from '../../utils/downloadResumePDF';

const BusinessResumeBasic = () => {
    const resumeDataFromStore = useSelector(getBusinessBasicResumeData);
    const dispatch = useDispatch();
    const [resumeData, setResumeData] = useState<IBusinessResumeData>(resumeDataFromStore);
    const resumeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleSectionChange = (section: keyof IBusinessResumeData, field: 'heading' | 'content', value: string) => {
        setResumeData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    /**
     * * Custom hook to extract computed styles from the resume container
     */
    const { extractComputedStyles } = useExtractComputedStyles({
        containerClass: 'resume-container',
        skipProperties: ['list-style', 'cursor'] // Skip cursor styles for PDF export
    });

    const handleBack = () => {
        navigate(`/`);
    }

    const handleSave = () => {
        dispatch(setBusinessBasicResumeData(resumeData));
    }

    const handleDownloadPDF = async () => {
        await downloadResumePDF({
            resumeRef,
            extractComputedStyles,
            onError: (error) => {
                console.error('Error generating PDF:', error);
            }
        });
    }
 
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
                    backgroundColor: Colors.BACKGROUND.LIGHT
                }}
            >
                <div className="resume-container" ref={resumeRef}>
                    <Box sx={{ 
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 0,
                        backgroundColor: Colors.BACKGROUND.WHITE,
                        borderRadius: '8px',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{ 
                            flex: { xs: '1 1 100%', md: '0 0 30%' },
                            padding: '32px',
                        }}>
                            <div className="photo-placeholder">[Upload Image]</div>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ 
                                    mb: 2,
                                    backgroundColor: Colors.BLUE.DARK,
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    color: Colors.TEXT.WHITE
                                }}>
                                    <RichTextField
                                        value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%; color: ${Colors.TEXT.WHITE};">${resumeData.profile.heading}</div>`}
                                        onChange={(value) => handleSectionChange("profile", "heading", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                </Box>
                                <RichTextField
                                    value={resumeData.profile.content}
                                    onChange={(value) => handleSectionChange("profile", "content", value)}
                                />
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ 
                                    mb: 2,
                                    backgroundColor: Colors.BLUE.DARK,
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    color: Colors.TEXT.WHITE
                                }}>
                                    <RichTextField
                                        value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%; color: ${Colors.TEXT.WHITE};">${resumeData.contact.heading}</div>`}
                                        onChange={(value) => handleSectionChange("contact", "heading", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                </Box>
                                <div
                                    className="contact-section"
                                    dangerouslySetInnerHTML={{ __html: resumeData.contact.content }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ 
                            flex: { xs: '1 1 100%', md: '0 0 70%' },
                            padding: '32px',
                            backgroundColor: Colors.BACKGROUND.WHITE
                        }}>
                            <Box sx={{ mb: 4 }}>
                                <RichTextField
                                    value={resumeData.name.content}
                                    onChange={(value) => handleSectionChange("name", "content", value)}
                                    isHeading={true}
                                />
                                <RichTextField
                                    value={resumeData.title.content}
                                    onChange={(value) => handleSectionChange("title", "content", value)}
                                    isHeading={true}
                                />
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <RichTextField
                                        value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%;">Education</div>`}
                                        onChange={(value) => handleSectionChange("education1", "heading", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                    <Divider sx={{ borderColor: 'black', borderWidth: 1, mt: 1 }} />
                                </Box>
                                <Box sx={{ mb: 3 }}>
                                    <RichTextField
                                        value={resumeData.education1.heading}
                                        onChange={(value) => handleSectionChange("education1", "heading", value)}
                                        isHeading={true}
                                    />
                                    <RichTextField
                                        value={resumeData.education1.content}
                                        onChange={(value) => handleSectionChange("education1", "content", value)}
                                    />
                                </Box>
                                <Box>
                                    <RichTextField
                                        value={resumeData.education2.heading}
                                        onChange={(value) => handleSectionChange("education2", "heading", value)}
                                        isHeading={true}
                                    />
                                    <RichTextField
                                        value={resumeData.education2.content}
                                        onChange={(value) => handleSectionChange("education2", "content", value)}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <RichTextField
                                        value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%;">${resumeData.language.heading}</div>`}
                                        onChange={(value) => handleSectionChange("language", "heading", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                    <Divider sx={{ borderColor: 'black', borderWidth: 1, mt: 1 }} />
                                </Box>
                                <RichTextField
                                    value={resumeData.language.content}
                                    onChange={(value) => handleSectionChange("language", "content", value)}
                                />
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <RichTextField
                                        value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%;">${resumeData.computerSkills.heading}</div>`}
                                        onChange={(value) => handleSectionChange("computerSkills", "heading", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                    <Divider sx={{ borderColor: 'black', borderWidth: 1, mt: 1 }} />
                                </Box>
                                <RichTextField
                                    value={resumeData.computerSkills.content}
                                    onChange={(value) => handleSectionChange("computerSkills", "content", value)}
                                />
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <RichTextField
                                        value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%;">Work Experience</div>`}
                                        onChange={(value) => handleSectionChange("workExperience", "heading", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                    <Divider sx={{ borderColor: 'black', borderWidth: 1, mt: 1 }} />
                                </Box>
                                <RichTextField
                                    value={resumeData.workExperience.heading}
                                    onChange={(value) => handleSectionChange("workExperience", "heading", value)}
                                    isHeading={true}
                                />
                                <RichTextField
                                    value={resumeData.workExperience.content}
                                    onChange={(value) => handleSectionChange("workExperience", "content", value)}
                                />
                            </Box>
                        </Box>
                    </Box>
                </div>
            </Box>
        </div>
    );
}

export default React.memo(BusinessResumeBasic);