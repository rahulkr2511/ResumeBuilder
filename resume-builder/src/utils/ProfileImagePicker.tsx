import React, { useRef, useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Colors } from '../constants/Colors';

/**
 * * * ProfileImagePicker component allows users to select and display a profile image.
 * * * It provides a file input for image selection, displays the selected image,
 * * * and supports customization of size, styles, and tooltip text.
 * * *
 * * @interface ProfileImagePickerProps
 * * @property {Function} onImageSelect - Callback function to handle image selection.
 * * @property {number} [size] - Size of the image container in pixels (default is 150).
 * * @property {React.CSSProperties} [containerStyle] - Custom styles for the container.
 * * @property {React.CSSProperties} [imageStyle] - Custom styles for the image.
 * * @property {string} [tooltipText] - Text to display in the tooltip (default is "Click to add photo").
 * * @property {string} [backgroundColor] - Background color of the image container (default is light background).
 * * @property {string} [borderRadius] - Border radius of the image container (default is '75px 75px 0 0').
 * * @property {string} [initialImage] - Initial image URL to display (default is empty).
 * * @returns {JSX.Element} - Rendered ProfileImagePicker component.
 * * @description
 * * This component uses Material-UI for styling and layout.
 * * It includes a file input for selecting images, a tooltip for user guidance,
 * * and handles image preview and selection using the FileReader API.
 * * The component is designed to be reusable and customizable for different use cases.
 * * It also supports an initial image URL to display when the component is first rendered.
 * *
 * @example
 * <ProfileImagePicker
 *    onImageSelect={(imageUrl) => console.log('Selected image URL:', imageUrl)}
 *     size={200}
 * *   containerStyle={{ margin: '20px auto' }}
 * *   imageStyle={{ border: '2px solid #ccc' }}
 * *   tooltipText="Upload your profile picture"
 * *   backgroundColor="#f0f0f0"
 * *   borderRadius="50%"
 * *   initialImage="https://example.com/initial-image.jpg"
 * />
 */



interface ProfileImagePickerProps {
    onImageSelect: (imageUrl: string) => void;
    size?: number;  // Size in pixels
    containerStyle?: React.CSSProperties;
    imageStyle?: React.CSSProperties;
    tooltipText?: string;
    backgroundColor?: string;
    borderRadius?: string;
    initialImage?: string;  // Add this prop for initial image URL
}

const ProfileImagePicker: React.FC<ProfileImagePickerProps> = ({
    onImageSelect,
    size = 150,
    containerStyle,
    imageStyle,
    tooltipText = "Click to add photo",
    backgroundColor = Colors.BACKGROUND.LIGHT,
    borderRadius = '75px 75px 0 0',
    initialImage = ''  // Add default value
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string>(initialImage);  // Initialize with initialImage

    // Update imageUrl when initialImage changes
    React.useEffect(() => {
        if (initialImage) {
            setImageUrl(initialImage);
        }
    }, [initialImage]);

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