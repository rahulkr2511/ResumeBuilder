/**
 * Color constants for the application
 * These colors are used throughout the application to maintain consistency
 */

export const Colors = {
    // Primary colors
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    
    // Accent colors
    ORANGE: {
        LIGHT: '#FFA559',
        MEDIUM: '#FF6B00',
        DARK: '#E65C00'
    },
    
    // Background colors
    BACKGROUND: {
        LIGHT: '#F5F5F5',
        WHITE: '#FFFFFF'
    },
    
    // Hover states
    HOVER: {
        BLACK: '#333333'
    },
    
    // Text colors
    TEXT: {
        WHITE: '#FFFFFF',
        BLACK: '#000000'
    },
    
    // Shadow colors
    SHADOW: 'rgba(0, 0, 0, 0.1)',
    
    // Blue colors
    BLUE: {
        PRIMARY: '#1976d2',    // Material-UI primary blue
        DARK: '#1565c0',       // Darker shade for hover
        LIGHT: '#42a5f5'       // Lighter shade
    }
} as const;

// Type for the Colors object
export type ColorType = typeof Colors; 