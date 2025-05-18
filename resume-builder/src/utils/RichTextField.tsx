import React from 'react';
import { IconButton, Paper, Tooltip, Select, MenuItem, Divider } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import TitleIcon from '@mui/icons-material/Title';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import FontSize from '@tiptap/extension-font-size';
import '../styles/ProfessionalResumeBasic.css';

const FONT_SIZES = ['8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];

interface RichTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    isHeading?: boolean;
}

const RichTextField: React.FC<RichTextFieldProps> = ({ value, onChange, isHeading = false }) => {
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
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                defaultAlignment:'left',
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
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