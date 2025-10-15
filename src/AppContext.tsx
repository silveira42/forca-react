import React from 'react';
import { Theme, Themes } from './context/model/Theme';
import { Currencies, Intl, Languages } from './context/model/Intl';
import pt_brDictionary from './context/dictionary/pt_br';
import useLocalStorage from './util/useLocalStorage';
import enDictionary from './context/dictionary/en';
import { getPreferredTheme, getPreferredLanguage, getPreferredCurrency } from './util/getBrowserPreferences';

const theme: Theme = {
	getCurrent: () => {
		const storedTheme = localStorage.getItem('theme');
		return storedTheme ? (storedTheme as keyof Themes) : getPreferredTheme();
	},
	toggleTheme: () => {},
};

const languages: Languages = {
	en: 'English',
	pt_br: 'Português',
}

const intl: Intl = {
	listLanguages: () => languages,
	getLanguage: () => {
		const storedLanguage = localStorage.getItem('language');
		return storedLanguage ? (storedLanguage as keyof Languages) : getPreferredLanguage();
	},
	getCurrency: () => {
		const storedCurrency = localStorage.getItem('currency');
		return storedCurrency ? (storedCurrency as keyof Currencies) : getPreferredCurrency();
	},
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
		getPreferredTheme()
	);
	const [currentLanguage, setCurrentLanguage] = useLocalStorage<
		keyof Languages
	>('language', getPreferredLanguage());
	const [currentCurrency, setCurrentCurrency] = useLocalStorage<
		keyof Currencies
	>('currency', getPreferredCurrency());

	theme.getCurrent = () => currentTheme;
	theme.toggleTheme = () => {
		setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');
	};

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
			intl.getDictionary = () => pt_brDictionary;
	}

	return (
		<AppContext.Provider value={{ theme, intl }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => React.useContext(AppContext);
