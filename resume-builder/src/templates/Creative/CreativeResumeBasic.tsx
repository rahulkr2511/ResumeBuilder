import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExtractComputedStyles } from '../../customHooks/useExtractComputedStyles';
import { Box, Divider } from '@mui/material';
import ResumeHeader from '../../components/ResumeHeader';
import ProfileImagePicker from '../../utils/ProfileImagePicker';
import { ICreativeResumeData } from '../../utils/CreativeResumeDefaultContent';
import RichTextField from '../../utils/RichTextField';
import { Colors } from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'http';
import { getCreativeResumeBasicData, setCreativeResumeBasicData } from './CreativeResumeBasicSlice';
import { downloadResumePDF } from '../../utils/downloadResumePDF';
import '../../styles/CreativeResumeBasic.css';

/**
 * 
 * @returns The CreateResumeBasic component renders a creative resume template
 *          allowing users to edit their resume details, save changes, and download it as a PDF.
 *          It uses Material-UI for styling and layout, and integrates with Redux for state management.
 *          The component includes features like rich text editing, dynamic section handling,
 *          and PDF generation with exact dimensions and styles.
 */

const CreateResumeBasic = () => {
    const resumeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const defaultResumeContentFromStore = useSelector(getCreativeResumeBasicData);
    const [resumeData, setResumeData] = React.useState<ICreativeResumeData>(defaultResumeContentFromStore);
    
    const handleSectionChange = (section: keyof ICreativeResumeData, field: 'heading' | 'content', value: string) => {
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
        dispatch(setCreativeResumeBasicData(resumeData));
    }

    const handleDownloadPDF = async () => {
        /**
         * * * Function to download the resume as a PDF
         * * * It uses the `downloadResumePDF` utility function to generate the PDF
         * * * with the current resume data and styles.
         * * * The `extractComputedStyles` function is used to get the styles from the resume container.
         * * * If an error occurs during PDF generation, it logs the error to the console.
         * * * @async
         * * * @function handleDownloadPDF
         * * * @returns {Promise<void>} A promise that resolves when the PDF is downloaded
         * * * @throws {Error} If there is an error during PDF generation
         * * * @description
         * * * This function is triggered when the user clicks the download button in the resume header.
         * * * It generates a PDF of the resume using the current data and styles,
         * * * allowing users to save or print their resume in a professional format.
         * * * It ensures that the PDF matches the visual layout of the resume displayed on the screen.
         * *
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
                <div className="resume-container" ref={resumeRef}>
                    <Box sx={{ 
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 0
                    }}>
                        <Box sx={{ 
                            flex: { xs: '1 1 100%', md: '0 0 40%' },
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: { xs: '8px 8px 0 0', md: '8px 0 0 8px' },
                            overflow: 'hidden'
                        }}>
                            <Box sx={{ 
                                backgroundColor: Colors.BACKGROUND.CREAM,
                                color: Colors.TEXT.DARK,
                                padding: '32px',
                                flex: '0 0 auto',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: { xs: '8px', md: '0' }
                            }}>
                                <ProfileImagePicker 
                                    onImageSelect={handleImageSelect}
                                    size={150}
                                    backgroundColor={Colors.BACKGROUND.CREAM}
                                    containerStyle={{ marginBottom: '24px' }}
                                    tooltipText="Add Profile Photo"
                                    initialImage={resumeData.profilePhoto?.content || ''}
                                />
                                <Box sx={{ mb: 4 }}>
                                    <RichTextField
                                        value={resumeData.contact.content}
                                        onChange={(value) => handleSectionChange("contact", "content", value)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ 
                                backgroundColor: Colors.BACKGROUND.WHITE,
                                color: Colors.TEXT.DARK,
                                padding: '32px',
                                flex: '1 1 auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4
                            }}>
                                <Box>
                                    <Box sx={{ mb: 2 }}>
                                        <RichTextField
                                            value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%;">${resumeData.skills.heading}</div>`}
                                            onChange={(value) => handleSectionChange("skills", "heading", value.replace(/<[^>]*>/g, ''))}
                                            isHeading={true}
                                        />
                                        <Divider sx={{ borderColor: 'black', borderWidth: 1, mt: 1 }} />
                                    </Box>
                                    <RichTextField
                                        value={resumeData.skills.content}
                                        onChange={(value) => handleSectionChange("skills", "content", value)}
                                    />
                                </Box>
                                <Box>
                                    <Box sx={{ mb: 2 }}>
                                        <RichTextField
                                            value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%;">${resumeData.certification?.heading || 'CERTIFICATION'}</div>`}
                                            onChange={(value) => handleSectionChange("certification", "heading", value.replace(/<[^>]*>/g, ''))}
                                            isHeading={true}
                                        />
                                        <Divider sx={{ borderColor: 'black', borderWidth: 1, mt: 1 }} />
                                    </Box>
                                    <RichTextField
                                        value={resumeData.certification?.content || ''}
                                        onChange={(value) => handleSectionChange("certification", "content", value)}
                                    />
                                </Box>
                                <Box>
                                    <Box sx={{ mb: 2 }}>
                                        <RichTextField
                                            value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%;">${resumeData.membership?.heading || 'MEMBERSHIP'}</div>`}
                                            onChange={(value) => handleSectionChange("membership", "heading", value.replace(/<[^>]*>/g, ''))}
                                            isHeading={true}
                                        />
                                        <Divider sx={{ borderColor: 'black', borderWidth: 1, mt: 1 }} />
                                    </Box>
                                    <RichTextField
                                        value={resumeData.membership?.content || ''}
                                        onChange={(value) => handleSectionChange("membership", "content", value)}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ 
                            flex: { xs: '1 1 100%', md: '0 0 60%' },
                            backgroundColor: Colors.BACKGROUND.WHITE,
                            padding: '32px',
                            borderRadius: { xs: '0 0 8px 8px', md: '0 8px 8px 0' },  
                            borderTop: { xs: 'none', md: 'none' }  
                        }}>
                            <Box sx={{ 
                                mb: 4,
                                backgroundColor: Colors.BACKGROUND.OLIVE_GREEN,
                                color: Colors.BACKGROUND.WHITE,
                                padding: '24px',
                                marginTop: { xs: '0', md: '-32px' },  // Negative margin to connect with contact section
                                marginLeft: { xs: '0', md: '-32px' },  // Negative margin to remove padding
                                marginRight: { xs: '0', md: '-32px' }, // Negative margin to remove padding
                                borderTopRightRadius: { xs: '8px', md: '0' },  // Adjust border radius
                                borderTopLeftRadius: { xs: '8px', md: '0' }    // Adjust border radius
                            }}>
                                <Box sx={{ mb: 2 }}>
                                    <RichTextField
                                        value={`<h1 style="text-align: left; font-size: 18px; margin: 0; color: white;">${resumeData.name.heading || 'NAME'}</h1>`}
                                        onChange={(value) => handleSectionChange("name", "heading", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                    <Divider sx={{ borderColor: Colors.BACKGROUND.WHITE, borderWidth: 1, mt: 1 }} />
                                </Box>
                                <RichTextField
                                    value={resumeData.name.content}
                                    onChange={(value) => handleSectionChange("name", "content", value)}
                                />
                            </Box>
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <RichTextField
                                        value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%;">${resumeData.summary.heading}</div>`}
                                        onChange={(value) => handleSectionChange("summary", "heading", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                    <Divider sx={{ borderColor: 'black', borderWidth: 1, mt: 1 }} />
                                </Box>
                                <RichTextField
                                    value={resumeData.summary.content}
                                    onChange={(value) => handleSectionChange("summary", "content", value)}
                                />
                            </Box>
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <RichTextField
                                        value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%;">${resumeData.experience.heading}</div>`}
                                        onChange={(value) => handleSectionChange("experience", "heading", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                    <Divider sx={{ borderColor: 'black', borderWidth: 1, mt: 1 }} />
                                </Box>
                                <RichTextField
                                    value={resumeData.experience.content}
                                    onChange={(value) => handleSectionChange("experience", "content", value)}
                                />
                            </Box>
                            <Box sx={{ mb: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    <RichTextField
                                        value={`<div style="text-align: left; font-size: 18px; font-weight: bold; margin: 0; width: 100%;">${resumeData.education.heading}</div>`}
                                        onChange={(value) => handleSectionChange("education", "heading", value.replace(/<[^>]*>/g, ''))}
                                        isHeading={true}
                                    />
                                    <Divider sx={{ borderColor: 'black', borderWidth: 1, mt: 1 }} />
                                </Box>
                                <RichTextField
                                    value={resumeData.education.content}
                                    onChange={(value) => handleSectionChange("education", "content", value)}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ 
                        height: '30px',
                        backgroundColor: Colors.BACKGROUND.OLIVE_GREEN,
                        marginTop: '32px',
                        width: '100%',
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px'
                    }} />
                </div>
            </Box>
        </div>
    );
}

export default React.memo(CreateResumeBasic);