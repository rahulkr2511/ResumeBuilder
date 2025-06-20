import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExtractComputedStyles } from '../../customHooks/useExtractComputedStyles';
import { Box, Divider } from '@mui/material';
import ResumeHeader from '../../components/ResumeHeader';
import ProfileImagePicker from '../../utils/ProfileImagePicker';
import { getBusinessBasicResumeData, setBusinessBasicResumeData } from './BusinessResumeBasicSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IBusinessResumeData } from '../../utils/BusinessResumeDefaultContent';
import RichTextField from '../../utils/RichTextField';
import { Colors } from '../../constants/Colors';
import { downloadResumePDF } from '../../utils/downloadResumePDF';
import '../../styles/BusinessResumeBasic.css';

/**
 * 
 * @returns The BusinessResumeBasic component renders a business resume template
 *          allowing users to edit their resume details, save changes, and download it as a PDF.
 *          It uses Material-UI for styling and layout, and integrates with Redux for state management.
 *          The component includes features like rich text editing, dynamic section handling,
 *          and PDF generation with exact dimensions and styles.
 */

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

    const handleImageSelect = (imageUrl: string) => {
        setResumeData(prev => ({
            ...prev,
            profilePhoto: {
                heading: "Profile Photo",
                content: imageUrl
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
        /**
         * * Downloads the resume as a PDF file.
         * * It uses the `downloadResumePDF` utility function to generate the PDF
         * * with the current resume data and styles.
         * * The `extractComputedStyles` function is used to get the styles applied to the resume.
         * * If an error occurs during PDF generation, it logs the error to the console.
         * * @returns {Promise<void>}
         *  * @throws {Error} If there is an error during PDF generation
         *  * @description
         *  * This function is triggered when the user clicks the download button.
         *  * It generates a PDF of the current resume using the `downloadResumePDF` utility.
         *  * The PDF will include all the styles and content as displayed in the resume editor.
         *  * The generated PDF will be downloaded to the user's device.
         *  * @example
         *  * handleDownloadPDF();
         *  * @see downloadResumePDF
         *  * @see useExtractComputedStyles
         *  * @see ResumeHeader
         *  * @see ProfileImagePicker
         *  * @see RichTextField    
         */
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
                <div className="resume-container business-resume" ref={resumeRef}>
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
                            <ProfileImagePicker 
                                onImageSelect={handleImageSelect}
                                size={180}
                                backgroundColor={Colors.BACKGROUND.LIGHT}
                                containerStyle={{ marginBottom: '32px' }}
                                tooltipText="Add Profile Photo"
                                borderRadius="50%"
                                initialImage={resumeData.profilePhoto?.content || ''}
                            />

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
                                <Box sx={{ color: '#000000' }}>
                                    <RichTextField
                                        value={resumeData.profile.content}
                                        onChange={(value) => handleSectionChange("profile", "content", value)}
                                    />
                                </Box>
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
                                <Box sx={{ color: '#000000' }}>
                                    <RichTextField
                                        value={resumeData.contact.content.replace(/(<[^>]*>)([^<]*)(<\/[^>]*>)/g, '$1 $2 $3')}
                                        onChange={(value) => handleSectionChange("contact", "content", value)}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ 
                            flex: { xs: '1 1 100%', md: '0 0 70%' },
                            padding: '32px',
                            backgroundColor: Colors.BACKGROUND.WHITE
                        }}>
                            <Box sx={{ mb: 4 }}>
                                <Box>
                                    <div className="name-heading">
                                        <RichTextField
                                            value={`<h1 style="color: #000000; font-weight: bold;">${resumeData.name.content}</h1>`}
                                            onChange={(value) => handleSectionChange("name", "content", value.replace(/<[^>]*>/g, ''))}
                                        />
                                    </div>
                                    <RichTextField
                                        value={`<div style="text-align: left; font-size: 16px; margin: 0; width: 100%; color: #000000; font-style: italic">${resumeData.title.content}</div>`}
                                        onChange={(value) => handleSectionChange("title", "content", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ 
                                        backgroundColor: Colors.BLUE.DARK,
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        color: Colors.TEXT.WHITE
                                    }}>
                                        <RichTextField
                                            value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%; color: ${Colors.TEXT.WHITE};">${resumeData.education.heading}</div>`}
                                            onChange={(value) => handleSectionChange("education", "heading", value.replace(/<[^>]*>/g, ''))}
                                            isHeading={true}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ color: '#000000' }}>
                                    <RichTextField
                                        value={resumeData.education.content}
                                        onChange={(value) => handleSectionChange("education", "content", value)}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ 
                                        backgroundColor: Colors.BLUE.DARK,
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        color: Colors.TEXT.WHITE
                                    }}>
                                        <RichTextField
                                            value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%; color: ${Colors.TEXT.WHITE};">${resumeData.language.heading}</div>`}
                                            onChange={(value) => handleSectionChange("language", "heading", value.replace(/<[^>]*>/g, ''))}
                                            isHeading={true}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ color: '#000000' }}>
                                    <RichTextField
                                        value={resumeData.language.content}
                                        onChange={(value) => handleSectionChange("language", "content", value)}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ 
                                        backgroundColor: Colors.BLUE.DARK,
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        color: Colors.TEXT.WHITE
                                    }}>
                                        <RichTextField
                                            value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%; color: ${Colors.TEXT.WHITE};">${resumeData.computerSkills.heading}</div>`}
                                            onChange={(value) => handleSectionChange("computerSkills", "heading", value.replace(/<[^>]*>/g, ''))}
                                            isHeading={true}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ color: '#000000' }}>
                                    <RichTextField
                                        value={resumeData.computerSkills.content}
                                        onChange={(value) => handleSectionChange("computerSkills", "content", value)}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ 
                                        backgroundColor: Colors.BLUE.DARK,
                                        padding: '8px 16px',
                                        borderRadius: '4px',
                                        color: Colors.TEXT.WHITE
                                    }}>
                                        <RichTextField
                                            value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%; color: ${Colors.TEXT.WHITE};">${resumeData.workExperience.heading}</div>`}
                                            onChange={(value) => handleSectionChange("workExperience", "heading", value.replace(/<[^>]*>/g, ''))}
                                            isHeading={true}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ color: '#000000' }}>
                                    <RichTextField
                                        value={resumeData.workExperience.content}
                                        onChange={(value) => handleSectionChange("workExperience", "content", value)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </div>
            </Box>
        </div>
    );
}

export default React.memo(BusinessResumeBasic);