import { createContext, useState, useEffect } from 'react';

// Create context
export const SettingsContext = createContext();

function SettingsContextProvider({ children }) {
  const [language, setLanguage] = useState('English'); // Default language
  const [theme, setTheme] = useState('light'); // Default theme
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Notifications ON by default
  const [timeZone, setTimeZone] = useState('UTC'); // Default time zone
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    allowMessages: true,
  });

  // Load settings from localStorage when the component mounts
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    const storedTheme = localStorage.getItem('theme');
    const storedNotifications = JSON.parse(localStorage.getItem('notificationsEnabled'));
    const storedTimeZone = localStorage.getItem('timeZone');
    const storedPrivacySettings = JSON.parse(localStorage.getItem('privacySettings'));

    if (storedLanguage) setLanguage(storedLanguage);
    if (storedTheme) setTheme(storedTheme);
    if (storedNotifications !== null) setNotificationsEnabled(storedNotifications);
    if (storedTimeZone) setTimeZone(storedTimeZone);
    if (storedPrivacySettings) setPrivacySettings(storedPrivacySettings);
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
    localStorage.setItem('timeZone', timeZone);
    localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
  }, [language, theme, notificationsEnabled, timeZone, privacySettings]);

  return (
    <SettingsContext.Provider
      value={{
        language,
        theme,
        notificationsEnabled,
        timeZone,
        privacySettings,
        setLanguage,
        setTheme,
        setNotificationsEnabled,
        setTimeZone,
        setPrivacySettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContextProvider;
