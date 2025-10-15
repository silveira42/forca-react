import { Languages } from '../context/model/Intl';
import { Themes } from '../context/model/Theme';

/**
 * Gets the preferred theme from browser settings
 * @returns 'dark' or 'light' - defaults to 'dark'
 */
export const getPreferredTheme = (): keyof Themes => {
    try {
        // Check if the browser supports prefers-color-scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
    } catch (error) {
        console.log('Error detecting theme preference:', error);
    }
    // Default to dark theme
    return 'dark';
};

/**
 * Gets the preferred language from browser settings
 * @returns 'en' or 'pt_br' - defaults to 'en'
 */
export const getPreferredLanguage = (): keyof Languages => {
    try {
        // Get browser language
        const browserLanguage = navigator.language || (navigator as any).userLanguage;

        // Check if it's Portuguese (Brazil)
        if (browserLanguage.toLowerCase().startsWith('pt')) {
            return 'pt_br';
        }
    } catch (error) {
        console.log('Error detecting language preference:', error);
    }
    // Default to English
    return 'en';
};

/**
 * Gets the preferred currency based on browser language
 * @returns 'BRL' or 'USD' - defaults to 'USD'
 */
export const getPreferredCurrency = (): 'BRL' | 'USD' => {
    try {
        const browserLanguage = navigator.language || (navigator as any).userLanguage;

        // If Portuguese, default to BRL
        if (browserLanguage.toLowerCase().startsWith('pt')) {
            return 'BRL';
        }
    } catch (error) {
        console.log('Error detecting currency preference:', error);
    }
    // Default to USD
    return 'USD';
};
