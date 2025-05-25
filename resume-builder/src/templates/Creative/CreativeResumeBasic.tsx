import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExtractComputedStyles } from '../../customHooks/useExtractComputedStyles';
import { Box } from '@mui/material';
import ResumeHeader from '../../components/ResumeHeader';
import { defaultResumeContent } from '../../utils/CreativeResumeDefaultContent';
import { ICreativeResumeData } from '../../utils/CreativeResumeDefaultContent';
import RichTextField from '../../utils/RichTextField';

const CreateResumeBasic = () => {
    const resumeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [resumeData, setResumeData] = React.useState(defaultResumeContent);
    
     const handleSectionChange = (section: keyof ICreativeResumeData, field: 'heading' | 'content', value: string) => {
            // setResumeData(prev => ({
            //     ...prev,
            //     [section]: {
            //         ...prev[section],
            //         [field]: value
            //     }
            // }));
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
        // TODO: Implement save functionality
    }

    const handleDownloadPDF = async () => {
        // TODO: Implement PDF download functionality
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
                    backgroundColor: '#f5f5f5'
                }}
            >
                <div className="resume-container" ref={resumeRef}>
                    
                </div>
            </Box>
        </div>
    );
}

export default React.memo(CreateResumeBasic);