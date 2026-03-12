import React, { createContext, useContext, useState } from 'react';
import translations from '../constants/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [languageId, setLanguageId] = useState('en-us');

    const t = (key) => {
        const lang = translations[languageId] || translations['en-us'];
        return lang[key] ?? translations['en-us'][key] ?? key;
    };

    return (
        <LanguageContext.Provider value={{ languageId, setLanguageId, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
    return ctx;
}
