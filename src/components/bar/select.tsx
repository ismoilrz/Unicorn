import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./select.css";

type LangOption = {
  value: string;
  img: string;
  
};

const options: LangOption[] = [
  { value: "en", img: "/uk.png" },
  { value: "uz", img: "/uzb.png" },
  { value: "ru", img: "/rus.png" },
];

export default function LangSelect() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = options.find((opt) => opt.value === i18n.language) ?? options[0];

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lang-select-container" ref={dropdownRef}>
      <button
        className="lang-select-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={current.img} alt="jjs" className="lang-flag" />
        
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`lang-option ${opt.value === current.value ? "active" : ""}`}
              onClick={() => handleChange(opt.value)}
            >
              <img src={opt.img} alt="kls" className="lang-flag-small" />
              
            </button>
          ))}
        </div>
      )}
    </div>
  );
}