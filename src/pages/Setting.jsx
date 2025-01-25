import React, { useContext, useState } from 'react';
import { SettingsContext } from '../context/Setting';

const SettingsPage = () => {
  const {
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
  } = useContext(SettingsContext);

  const [newLanguage, setNewLanguage] = useState(language);
  const [newTheme, setNewTheme] = useState(theme);
  const [newNotificationsEnabled, setNewNotificationsEnabled] = useState(notificationsEnabled);
  const [newTimeZone, setNewTimeZone] = useState(timeZone);
  const [newPrivacySettings, setNewPrivacySettings] = useState(privacySettings);

  const handleSaveSettings = () => {
    // Update context and localStorage with new settings
    setLanguage(newLanguage);
    setTheme(newTheme);
    setNotificationsEnabled(newNotificationsEnabled);
    setTimeZone(newTimeZone);
    setPrivacySettings(newPrivacySettings);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Settings</h1>

      {/* Language Setting */}
      <div className="mb-6">
        <label className="block text-lg font-semibold">Language</label>
        <select
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
          className="mt-2 p-2 border rounded-md w-full"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>

      {/* Theme Setting */}
      <div className="mb-6">
        <label className="block text-lg font-semibold">Theme</label>
        <select
          value={newTheme}
          onChange={(e) => setNewTheme(e.target.value)}
          className="mt-2 p-2 border rounded-md w-full"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Notifications Setting */}
      <div className="mb-6">
        <label className="block text-lg font-semibold">Notifications</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={newNotificationsEnabled}
            onChange={(e) => setNewNotificationsEnabled(e.target.checked)}
            className="mr-2"
          />
          <span>Enable Notifications</span>
        </div>
      </div>

      {/* Time Zone Setting */}
      <div className="mb-6">
        <label className="block text-lg font-semibold">Time Zone</label>
        <select
          value={newTimeZone}
          onChange={(e) => setNewTimeZone(e.target.value)}
          className="mt-2 p-2 border rounded-md w-full"
        >
          <option value="UTC">UTC</option>
          <option value="GMT">GMT</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
        </select>
      </div>

      {/* Privacy Settings */}
      <div className="mb-6">
        <label className="block text-lg font-semibold">Privacy Settings</label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={newPrivacySettings.showProfile}
            onChange={(e) => setNewPrivacySettings({ ...newPrivacySettings, showProfile: e.target.checked })}
            className="mr-2"
          />
          <span>Show Profile to Others</span>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={newPrivacySettings.allowMessages}
            onChange={(e) => setNewPrivacySettings({ ...newPrivacySettings, allowMessages: e.target.checked })}
            className="mr-2"
          />
          <span>Allow Messages from Others</span>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
