import React, { useRef, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Colors } from '../constants/Colors';

interface ProfileImagePickerProps {
    onImageSelect: (imageUrl: string) => void;
    size?: number;  // Size in pixels
    containerStyle?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
    tooltipText?: string;
    backgroundColor?: string;
    borderRadius?: string;
}

const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
    onImageSelect,
    size = 150,
    containerStyle,
    imageStyle,
    tooltipText = "Click to add photo",
    backgroundColor = Colors.BACKGROUND.LIGHT,
    borderRadius = '75px 75px 0 0'
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImageUrl(result);
                onImageSelect(result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            mb: 3,
            position: 'relative',
            ...containerStyle
        }}>
            <Tooltip title={tooltipText}>
                <Box
                    onClick={handleImageClick}
                    sx={{
                        width: size,
                        height: size,
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor,
                        borderRadius,
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                        '&:hover': {
                            opacity: 0.9
                        },
                        ...imageStyle
                    }}
                >
                    {imageUrl ? (
                        <Box
                            component="img"
                            src={imageUrl}
                            alt="Profile"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'relative',
                                zIndex: 0,
                                transform: 'scale(1.2)',
                                transformOrigin: 'center center'
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                zIndex: 0,
                                backgroundColor
                            }}
                        >
                            <PhotoCameraIcon sx={{ fontSize: size * 0.27, color: Colors.TEXT.DARK }} />
                        </Box>
                    )}
                </Box>
            </Tooltip>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />
        </Box>
    );
};

export default ProfileImagePicker; 