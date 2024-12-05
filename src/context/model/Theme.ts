export type Themes = {
	dark: string;
	light: string;
};

export type Theme = {
	getCurrent: () => keyof Themes;
	toggleTheme: () => void;
};
