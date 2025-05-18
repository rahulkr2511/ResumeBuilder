declare module '@tiptap/extension-color' {
    import { Extension } from '@tiptap/core'
    const Color: Extension
    export default Color
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        color: {
            setColor: (color: string) => ReturnType
            unsetColor: () => ReturnType
        }
    }
} 