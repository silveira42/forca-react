import Dictionary from '../dictionary/Type';

export type Languages = {
	pt_br: string;
	en: string;
};

export type Currencies = {
	BRL: string;
	USD: string;
};

export type Intl = {
	listLanguages: () => Languages;
	getLanguage: () => keyof Languages;
	getCurrency: () => keyof Currencies;
	getDictionary: () => Dictionary;
	changeLanguage: (language: keyof Languages) => void;
	changeCurrency: (currency: keyof Currencies) => void;
};
