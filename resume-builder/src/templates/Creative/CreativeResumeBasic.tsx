import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExtractComputedStyles } from '../../customHooks/useExtractComputedStyles';
import { Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IApplicationConstants from '../../constants/Constants';

const CreateResumeBasic = () => {
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
            <Box 
                component="header"
                sx={{ 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '64px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px'
                }}
            >
                <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon />}
                >
                    {IApplicationConstants.BACK}
                </Button>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSave}
                    >
                        {IApplicationConstants.SAVE_CHANGES}
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownloadPDF}
                    >
                        {IApplicationConstants.DOWNLOAD}
                    </Button>
                </Box>
            </Box>

            <Box 
                component="main"
                sx={{
                    marginTop: '64px', // Height of the header
                    padding: '24px',
                    minHeight: 'calc(100vh - 64px)',
                    backgroundColor: '#f5f5f5'
                }}
            >
                <div className="resume-container" ref={resumeRef}>
                    Creative Resume Basic Template
                </div>
            </Box>
        </div>
    );
}

export default React.memo(CreateResumeBasic);