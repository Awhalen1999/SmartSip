import React, { useState, useEffect } from 'react';
import {
  getSettingFromLocalStorage,
  saveSettingsToLocalStorage,
} from '../../utils/api';

const defaultSettings = {
  useSavedIngredients: false,
  signatureStyle: false,
  nonAlcoholicMode: false,
  showBackground: false,
  showBartenderImage: false,
};

const BartenderSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const initialSettings = Object.keys(defaultSettings).reduce((acc, key) => {
      acc[key] = getSettingFromLocalStorage(key) || defaultSettings[key];
      return acc;
    }, {});

    setSettings(initialSettings);
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const newSettings = { ...settings, [name]: checked };
    setSettings(newSettings);
    saveSettingsToLocalStorage(name, checked);
  };

  return (
    <div className='p-4 space-y-4'>
      <h1 className='text-lg font-semibold'>Bartender Settings</h1>

      <div>
        <label className='flex items-center space-x-3 mb-1'>
          <input
            type='checkbox'
            className='toggle toggle-success'
            name='useSavedIngredients'
            checked={settings.useSavedIngredients}
            onChange={handleCheckboxChange}
          />
          <span>Use Saved Ingredients</span>
        </label>
        <p className='text-sm text-neutral-content'>
          Enable this setting to allow the AI bartender to utilize previously
          saved ingredients from your profile for creating custom drinks.
        </p>
      </div>

      <div>
        <label className='flex items-center space-x-3 mb-1'>
          <input
            type='checkbox'
            className='toggle toggle-success'
            name='signatureStyle'
            checked={settings.signatureStyle}
            onChange={handleCheckboxChange}
          />
          <span>Signature Style</span>
        </label>
        <p className='text-sm text-neutral-content'>
          Enable this feature to imbue the selected bartender's personality into
          the crafted recipes, adding a unique flair and character to each drink
          suggestion.
        </p>
      </div>

      <div>
        <label className='flex items-center space-x-3 mb-1'>
          <input
            type='checkbox'
            className='toggle toggle-success'
            name='nonAlcoholicMode'
            checked={settings.nonAlcoholicMode}
            onChange={handleCheckboxChange}
          />
          <span>Non-Alcoholic Mode</span>
        </label>
        <p className='text-sm text-neutral-content'>
          Enable this mode for a selection of non-alcoholic drink options
          tailored to your preferences, perfect for those seeking refreshing
          alternatives.
        </p>
      </div>

      <div>
        <label className='flex items-center space-x-3 mb-1'>
          <input
            type='checkbox'
            className='toggle toggle-success'
            name='showBackground'
            checked={settings.showBackground}
            onChange={handleCheckboxChange}
          />
          <span>Show Background</span>
        </label>
        <p className='text-sm text-neutral-content'>
          Enable this setting to display a unique background for each bartender,
          setting the ambiance for your virtual bartending experience.
        </p>
      </div>

      <div>
        <label className='flex items-center space-x-3 mb-1'>
          <input
            type='checkbox'
            className='toggle toggle-success'
            name='showBartenderImage'
            checked={settings.showBartenderImage}
            onChange={handleCheckboxChange}
          />
          <span>Show Bartender Image</span>
        </label>
        <p className='text-sm text-neutral-content'>
          Enable this option to reveal a charming image of the AI bartender,
          enhancing the visual appeal and personal connection to your cocktail
          creation journey.
        </p>
      </div>
    </div>
  );
};

export default BartenderSettings;
