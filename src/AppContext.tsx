import enDictionary from './context/dictionary/en';
import pt_brDictionary from './context/dictionary/pt_br';
import { Currencies, Intl, Languages } from './context/model/Intl';
import { Theme, Themes } from './context/model/Theme';
import React from 'react';
import useLocalStorage from './util/useLocalStorage';

const theme: Theme = {
	getCurrent: () => {
		const saved = localStorage.getItem('theme') as keyof Themes;
		if (saved) return saved;
		// Auto-detect based on system preference
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			return 'dark';
		}
		return 'light';
	},
	toggleTheme: () => {},
};

const languages: Languages = {
	en: 'English',
	pt_br: 'Português',
}

const intl: Intl = {
	listLanguages: () => languages,
	getLanguage: () => localStorage.getItem('language') as keyof Languages,
	getCurrency: () => localStorage.getItem('currency') as keyof Currencies,
	getDictionary: () => pt_brDictionary,
	changeLanguage: (language: keyof Languages) => {},
	changeCurrency: (currency: keyof Currencies) => {},
};

const AppContext = React.createContext({
	theme: theme,
	intl: intl,
});

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [currentTheme, setCurrentTheme] = useLocalStorage<keyof Themes>(
		'theme',
		theme.getCurrent() || 'light'
	);
	const [currentLanguage, setCurrentLanguage] = useLocalStorage<
		keyof Languages
	>('language', intl.getLanguage());
	const [currentCurrency, setCurrentCurrency] = useLocalStorage<
		keyof Currencies
	>('currency', intl.getCurrency());

	theme.getCurrent = () => currentTheme;
	theme.toggleTheme = () => {
		setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');
	};

	// Apply theme to document
	React.useEffect(() => {
		document.documentElement.setAttribute('data-theme', currentTheme);
	}, [currentTheme]);

	// Listen for system theme changes if no explicit theme is set
	React.useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = () => {
			// Only auto-update if user hasn't explicitly set a theme
			if (!localStorage.getItem('theme')) {
				setCurrentTheme(mediaQuery.matches ? 'dark' : 'light');
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [setCurrentTheme]);

	intl.getLanguage = () => currentLanguage;
	intl.getCurrency = () => currentCurrency;
	intl.changeLanguage = (language: keyof Languages) => {
		setCurrentLanguage(language);
	};
	intl.changeCurrency = (currency: keyof Currencies) => {
		setCurrentCurrency(currency);
	};

	switch (currentLanguage) {
		case 'en':
			intl.getDictionary = () => enDictionary;
			break;
		case 'pt_br':
			intl.getDictionary = () => pt_brDictionary;
			break;
		default:
			intl.getDictionary = () => enDictionary;
	}

	return (
		<AppContext.Provider value={{ theme, intl }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => React.useContext(AppContext);
