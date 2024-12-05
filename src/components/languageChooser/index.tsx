import { useAppContext } from "../../AppContext";
import { Languages } from "../../context/model/Intl";
import './styles.css';

export default function LanguageChooser() {
  const { intl } = useAppContext();

  const selectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    intl.changeLanguage(event.target.value as keyof Languages);
  }

  return (
    <div>
      <label>{intl.getDictionary().language}: </label>
      <select onChange={selectLanguage} defaultValue={intl.getLanguage()}>
        {
          Object.entries(intl.listLanguages()).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))
        }
      </select>
    </div>
  );
}