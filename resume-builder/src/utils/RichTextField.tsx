import React, { useState } from 'react';
import { IconButton, Paper, Tooltip, Select, MenuItem, Divider, Popover } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import FontSize from '@tiptap/extension-font-size';
import Color from '@tiptap/extension-color';
import '../styles/ProfessionalResumeBasic.css';

/**
 * This component provides a rich text editor with formatting options
 * such as bold, italic, underline, text alignment, font size, and color.
 * It is designed for use in a resume builder application, allowing users
 * to create and style text content easily.
 */


const FONT_SIZES = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
const COLORS = [
    '#000000', // Black
    '#004c99', // Blue
    '#2e7d32', // Green
    '#c62828', // Red
    '#6a1b9a', // Purple
    '#f57f17', // Yellow
    '#d84315', // Orange
    '#546e7a', // Gray
];

interface RichTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    isHeading?: boolean;
}

interface EditorWithHTML {
    getHTML: () => string;
}

const RichTextField: React.FC<RichTextFieldProps> = ({ value, onChange, isHeading = false }) => {
    const [colorAnchorEl, setColorAnchorEl] = useState<null | HTMLElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                    HTMLAttributes: {
                        class: 'resume-heading',
                    },
                },
            }),
            Underline,
            TextStyle,
            FontSize,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                defaultAlignment: isHeading ? 'center' : 'left',
            }),
        ],
        content: value,
        onUpdate: ({ editor }: { editor: unknown }) => {
            onChange((editor as EditorWithHTML).getHTML());
        },
        editorProps: {
            attributes: {
                class: isHeading ? 'resume-heading-editor' : 'rich-text-editor',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const getCurrentFontSize = () => {
        const fontSize = editor.getAttributes('textStyle').fontSize;
        return fontSize || (isHeading ? '24px' : '14px');
    };

    const getCurrentColor = () => {
        return editor.getAttributes('textStyle').color || '#000000';
    };

    const handleColorClick = (event: React.MouseEvent<HTMLElement>) => {
        setColorAnchorEl(event.currentTarget);
    };

    const handleColorClose = () => {
        setColorAnchorEl(null);
    };

    const handleColorSelect = (color: string) => {
        editor.chain().focus().setColor(color).run();
        handleColorClose();
    };

    return (
        <div className="rich-text-container">
            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="bubble-menu">
                    <Paper elevation={3} sx={{ display: 'flex', gap: 1, p: 0.5 }}>
                        {isHeading && (
                            <>
                                <Tooltip title="Heading 1">
                                    <IconButton
                                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                        color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
                                        size="small"
                                    >
                                        <TitleIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Heading 2">
                                    <IconButton
                                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                        color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
                                        size="small"
                                    >
                                        <TitleIcon fontSize="small" style={{ fontSize: '0.8em' }} />
                                    </IconButton>
                                </Tooltip>
                                <Divider orientation="vertical" flexItem />
                            </>
                        )}
                        <Tooltip title="Bold">
                            <IconButton
                                onClick={() => editor.chain().focus().toggleBold().run()}
                                color={editor.isActive('bold') ? 'primary' : 'default'}
                                size="small"
                            >
                                <FormatBoldIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Italic">
                            <IconButton
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                                color={editor.isActive('italic') ? 'primary' : 'default'}
                                size="small"
                            >
                                <FormatItalicIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Underline">
                            <IconButton
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                color={editor.isActive('underline') ? 'primary' : 'default'}
                                size="small"
                            >
                                <FormatUnderlinedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Divider orientation="vertical" flexItem />
                        <Tooltip title="Text Color">
                            <IconButton
                                onClick={handleColorClick}
                                size="small"
                                sx={{
                                    color: getCurrentColor(),
                                    '&:hover': { color: getCurrentColor() }
                                }}
                            >
                                <FormatColorTextIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Popover
                            open={Boolean(colorAnchorEl)}
                            anchorEl={colorAnchorEl}
                            onClose={handleColorClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Paper sx={{ p: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap', maxWidth: 200 }}>
                                {COLORS.map((color) => (
                                    <Tooltip key={color} title={color}>
                                        <IconButton
                                            onClick={() => handleColorSelect(color)}
                                            size="small"
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                backgroundColor: color,
                                                border: '1px solid #ccc',
                                                '&:hover': {
                                                    backgroundColor: color,
                                                    opacity: 0.8,
                                                },
                                            }}
                                        />
                                    </Tooltip>
                                ))}
                            </Paper>
                        </Popover>
                        <Divider orientation="vertical" flexItem />
                        <Tooltip title="Bullet List">
                            <IconButton
                                onClick={() => editor.chain().focus().toggleBulletList().run()}
                                color={editor.isActive('bulletList') ? 'primary' : 'default'}
                                size="small"
                            >
                                <FormatListBulletedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Numbered List">
                            <IconButton
                                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                                color={editor.isActive('orderedList') ? 'primary' : 'default'}
                                size="small"
                            >
                                <FormatListNumberedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Divider orientation="vertical" flexItem />
                        <Tooltip title="Align Left">
                            <IconButton
                                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                color={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'}
                                size="small"
                            >
                                <FormatAlignLeftIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Align Center">
                            <IconButton
                                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                color={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'}
                                size="small"
                            >
                                <FormatAlignCenterIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Align Right">
                            <IconButton
                                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                color={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'}
                                size="small"
                            >
                                <FormatAlignRightIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Divider orientation="vertical" flexItem />
                        <Tooltip title="Font Size">
                            <Select
                                value={getCurrentFontSize()}
                                onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
                                size="small"
                                sx={{
                                    minWidth: 80,
                                    height: 32,
                                    '& .MuiSelect-select': {
                                        py: 0.5,
                                        px: 1,
                                    },
                                }}
                            >
                                {FONT_SIZES.map((size) => (
                                    <MenuItem key={size} value={size} sx={{ fontSize: size }}>
                                        {size}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Tooltip>
                    </Paper>
                </BubbleMenu>
            )}
            <EditorContent editor={editor} className={isHeading ? 'resume-heading-editor' : 'rich-text-editor'} />
        </div>
    );
};

export default RichTextField; 