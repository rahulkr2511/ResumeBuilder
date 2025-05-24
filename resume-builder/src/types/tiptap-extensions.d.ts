declare module '@tiptap/extension-color' {
    import { Extension } from '@tiptap/core'
    const Color: Extension
    export default Color
}

/**
 * This module extends the Tiptap core commands to include color manipulation.
 * It allows setting and unsetting text color in the editor.
 * Used in Rich Text Editor for styling text with colors.
 */

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        color: {
            setColor: (color: string) => ReturnType
            unsetColor: () => ReturnType
        }
    }
} 