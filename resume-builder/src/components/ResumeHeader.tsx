import React from 'react';
import { Box, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IApplicationConstants from '../constants/Constants';
import { Colors } from '../constants/Colors';

/**
 * * Props for the ResumeHeader component
 * * @interface ResumeHeaderProps
 * * @property {Function} onBack - Callback for back button
 * * @property {Function} onSave - Callback for save button
 * * @property {Function} onDownload - Callback for download button
 * * @returns {JSX.Element} - Rendered ResumeHeader component
 * * @description
 * * This component renders the header for the resume builder, including back, save, and download buttons.
 * * It uses Material-UI for styling and icons.
 * * @example
 * * <ResumeHeader
 * *     onBack={() => console.log('Back clicked')}
 * *     onSave={() => console.log('Save clicked')}
 * *     onDownload={() => console.log('Download clicked')}
 * * />
 * 
 */

interface ResumeHeaderProps {
    onBack: () => void;
    onSave: () => void;
    onDownload: () => void;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ onBack, onSave, onDownload }) => {
    return (
        <Box 
            component="header"
            sx={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '64px',
                backgroundColor: Colors.BACKGROUND.WHITE,
                boxShadow: `0 2px 4px ${Colors.SHADOW}`,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px'
            }}
        >
            <Button 
                variant="contained" 
                onClick={onBack}
                startIcon={<ArrowBackIcon />}
                sx={{
                    backgroundColor: Colors.BLUE.PRIMARY,
                    color: Colors.TEXT.WHITE,
                    '&:hover': {
                        backgroundColor: Colors.BLUE.SECONDARY,
                    },
                    '& .MuiSvgIcon-root': {
                        color: Colors.TEXT.WHITE
                    }
                }}
            >
                {IApplicationConstants.BACK}
            </Button>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                    variant="contained" 
                    onClick={onSave}
                    sx={{
                        backgroundColor: Colors.BLUE.PRIMARY,
                        color: Colors.TEXT.WHITE,
                        '&:hover': {
                            backgroundColor: Colors.BLUE.SECONDARY,
                        }
                    }}
                >
                    {IApplicationConstants.SAVE_CHANGES}
                </Button>
                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={onDownload}
                    sx={{
                        backgroundColor: Colors.BLUE.PRIMARY,
                        color: Colors.TEXT.WHITE,
                        '&:hover': {
                            backgroundColor: Colors.BLUE.SECONDARY,
                        },
                        '& .MuiSvgIcon-root': {
                            color: Colors.TEXT.WHITE
                        }
                    }}
                >
                    {IApplicationConstants.DOWNLOAD}
                </Button>
            </Box>
        </Box>
    );
};

export default React.memo(ResumeHeader); 