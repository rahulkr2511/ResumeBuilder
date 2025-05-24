import { useCallback } from 'react';

interface StyleExtractionOptions {
    containerClass?: string;  // The container class to scope the styles
    baseStyles?: string;      // Custom base styles to include
    skipProperties?: string[]; // Properties to skip during extraction
}

export const useExtractComputedStyles = (options: StyleExtractionOptions = {}) => {
    const {
        containerClass = 'component-container',
        baseStyles = '',
        skipProperties = ['list-style']
    } = options;

    const extractComputedStyles = useCallback((rootElement: HTMLElement): string => {
        const allElements = rootElement.querySelectorAll('*');
        let styleSheet = '';

        // Add base styles if provided
        if (baseStyles) {
            styleSheet += baseStyles;
        }

        // Add default list styles if no custom base styles provided
        if (!baseStyles) {
            styleSheet += `
                .${containerClass} ul, .${containerClass} ol {
                    margin: 0;
                    padding-left: 24px;
                    list-style-position: outside;
                }
                .${containerClass} li {
                    margin: 4px 0;
                    padding-left: 4px;
                    line-height: 1.6;
                    position: relative;
                }
                .${containerClass} ul li {
                    list-style-type: disc;
                }
                .${containerClass} ol {
                    counter-reset: item;
                    list-style-type: none;
                }
                .${containerClass} ol li {
                    counter-increment: item;
                    list-style-type: none;
                    position: relative;
                }
                .${containerClass} ol li::before {
                    content: counter(item) ".";
                    position: absolute;
                    left: -24px;
                    width: 20px;
                    text-align: right;
                }
                .${containerClass} p {
                    margin: 0;
                    padding: 0;
                    line-height: 1.6;
                }
            `;
        }

        allElements.forEach((el, index) => {
            const computed = window.getComputedStyle(el);
            const className = `static-style-${index}`;
            el.classList.add(className);

            let styleRule = `.${className} {\n`;
            Array.from(computed).forEach(prop => {
                const value = computed.getPropertyValue(prop);
                // Skip specified properties
                if (value && !skipProperties.some(skipProp => prop.startsWith(skipProp))) {
                    styleRule += `  ${prop}: ${value};\n`;
                }
            });
            styleRule += '}\n';
            styleSheet += styleRule;
        });

        return styleSheet;
    }, [containerClass, baseStyles, skipProperties]);

    return { extractComputedStyles };
}; 