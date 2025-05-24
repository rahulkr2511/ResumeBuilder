import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExtractComputedStyles } from '../../customHooks/useExtractComputedStyles';
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';




const CreateResumeBasic = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
    
    const handleMenuClose = () => {
            setAnchorEl(null);
        };

    
 
    return (
       <>
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
                    // onClick={handleSave}
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
                        // handleDownloadPDF();
                        handleMenuClose();
                    }}>
                        Download as PDF
                    </MenuItem>
                </Menu>
            </Box>
            <div className="resume-container" ref={resumeRef}>
                Creative Resume Basic Template
            </div>
            </div>
       </>);
}

export default React.memo(CreateResumeBasic);