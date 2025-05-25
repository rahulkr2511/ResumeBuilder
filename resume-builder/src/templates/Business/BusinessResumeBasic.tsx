import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExtractComputedStyles } from '../../customHooks/useExtractComputedStyles';
import { Box } from '@mui/material';
import ResumeHeader from '../../components/ResumeHeader';

const BusinessResumeBasic = () => {
    const resumeRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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
                    Business Resume Basic Template
                </div>
            </Box>
        </div>
    );
}

export default React.memo(BusinessResumeBasic);