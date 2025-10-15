import { useAppContext } from "../../AppContext";
import { Languages } from "../../context/model/Intl";
import './styles.css';

type LanguageChooserProps = {
    disabled?: boolean
}

export default function LanguageChooser({disabled}: LanguageChooserProps) {
  const { intl } = useAppContext();

  const selectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    intl.changeLanguage(event.target.value as keyof Languages);
  }

  const getLanguageFlag = (lang: string) => {
    const flags: { [key: string]: string } = {
      'pt_br': '🇧🇷',
      'en': '🇺🇸'
    };
    return flags[lang] || '🌐';
  };

  const getLanguageCode = (lang: string) => {
    const codes: { [key: string]: string } = {
      'pt_br': 'PT',
      'en': 'EN'
    };
    return codes[lang] || lang.toUpperCase();
  };

  return (
    <div className="language-button">
      <div className="language-display">
        <span className="language-flag">{getLanguageFlag(intl.getLanguage())}</span>
        <span className="language-code">{getLanguageCode(intl.getLanguage())}</span>
      </div>
      {!disabled ?
        <>
            <select 
                onChange={selectLanguage} 
                value={intl.getLanguage()}
                className="language-select"
            >
                {
                Object.entries(intl.listLanguages()).map(([key, value]) => (
                    <option key={key} value={key}>{getLanguageFlag(key)} {getLanguageCode(key)}</option>
                ))
                }
            </select>
            <span className="language-arrow">▼</span>
        </>
      :''}
    </div>
  );
}