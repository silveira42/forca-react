import React from 'react';
import { useAppContext } from '../../AppContext';
import './styles.css';

export default function ThemeToggle() {
	const { theme } = useAppContext();
	const currentTheme = theme.getCurrent();

	return (
		<button
			className="theme-toggle"
			onClick={theme.toggleTheme}
			aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
			title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
		>
			<div className="theme-toggle-track">
				<div className="theme-toggle-thumb">
					<span className="theme-icon">
						{currentTheme === 'light' ? '☀️' : '🌙'}
					</span>
				</div>
			</div>
			<span className="theme-toggle-label">
				{currentTheme === 'light' ? 'Light' : 'Dark'}
			</span>
		</button>
	);
}