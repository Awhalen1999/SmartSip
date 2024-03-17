//todo
// 1. close drawer button
// 2. fix open drawer button
// 3. better icons
// 4. page height
// 5. settings page
// 6. add links to side bar
// 7. change outline color of bartender list for light theme
// 8.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BartenderInfo from './BartenderInfo';
import { MdMenuOpen, MdPersonOutline } from 'react-icons/md';
import { CiBoxList, CiReceipt } from 'react-icons/ci';
import { FaRegStar } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';

const AIBartender = () => {
  const [drinkDescription, setDrinkDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [bartender, setBartender] = useState('Default');
  const [isLoading, setIsLoading] = useState(false);

  const bartenders = Object.keys(BartenderInfo); // List of bartenders

  const [initialPrompt, setInitialPrompt] = useState(
    BartenderInfo[bartender].initialPrompt
  );

  useEffect(() => {
    setInitialPrompt(BartenderInfo[bartender].initialPrompt);
    setRecipe('');
  }, [bartender]);

  const handleSubmit = async (quickStart = false) => {
    setIsLoading(true);
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: BartenderInfo[bartender].persona,
        },
        {
          role: 'user',
          content: quickStart
            ? 'Give me a random cocktail recipe.'
            : `I want a drink that is ${drinkDescription}. I have these ingredients: ${ingredients}. I will tip for good service. Thank you! `,
        },
      ],
    };

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    };

    axios
      .post('https://api.openai.com/v1/chat/completions', data, { headers })
      .then((response) => {
        const message = response.data.choices[0].message.content;
        setRecipe(message);
        setIsLoading(false);
      });
  };

  return (
    <div
      className='flex'
      style={{
        backgroundImage: `url(${BartenderInfo[bartender].background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* DaisyUI drawer */}
      <div className='drawer lg:drawer-open font-main'>
        <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col items-center justify-center'>
          {/* Chat section */}
          <div className='flex-grow w-full h-full flex flex-col p-6 bg-black bg-opacity-75 overflow-auto'>
            <h2 className='text-xl font-bold text-white'>
              AI Bartender ({bartender})
            </h2>
            <div className='mt-2'>
              <div className='flex items-center'>
                <div className='avatar'>
                  <div className='m-2 w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                    <img src={BartenderInfo[bartender].picture} />
                  </div>
                </div>
                <div className='chat chat-start'>
                  <div className='chat-bubble chat-bubble-accent'>
                    {initialPrompt}
                  </div>
                </div>
              </div>
            </div>
            <textarea
              value={drinkDescription}
              onChange={(e) => setDrinkDescription(e.target.value)}
              cols='30'
              rows='2'
              className='textarea textarea-primary w-1/2 mt-5'
              placeholder='Describe a drink (optional):'
            />
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              cols='30'
              rows='2'
              className='textarea textarea-primary w-1/2 mt-5'
              placeholder='Available ingredients (optional):'
            />
            <div className='flex items-start mt-5'>
              <button
                onClick={() => handleSubmit(false)}
                className='btn btn-primary mr-2'
              >
                Make this drink
              </button>
              <button
                onClick={() => handleSubmit(true)}
                className='btn btn-primary ml-2'
              >
                Random drink / Quick Start
              </button>
            </div>
            {/* AI recipe returned: */}
            {isLoading || recipe ? (
              <div className='mt-5'>
                <div className='flex items-end'>
                  <div className='avatar'>
                    <div className='m-2 w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                      <img src={BartenderInfo[bartender].picture} />
                    </div>
                  </div>
                  <div className='chat chat-start'>
                    <div className='chat-bubble chat-bubble-accent font-tech flex items-center justify-center'>
                      {isLoading ? (
                        <span className='loading loading-dots loading-lg'></span>
                      ) : (
                        recipe
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {/* end of page content */}
          <label
            htmlFor='my-drawer-2'
            className='btn btn-primary drawer-button lg:hidden'
          >
            <MdMenuOpen />
          </label>
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer-2'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
            {/* Sidebar content here */}
            <li>
              <a>
                <CiBoxList size={20} />
                Ingredients
              </a>
            </li>
            <li>
              <a>
                <CiReceipt size={20} />
                My Recipes
              </a>
            </li>
            <li>
              <a>
                <FaRegStar size={20} />
                Popular Drinks
              </a>
            </li>
            <li>
              <a>
                <IoSettingsOutline size={20} />
                Settings
              </a>
            </li>
            <li>
              <details className='dropdown'>
                <summary>
                  <MdPersonOutline size={20} />
                  Bartenders
                </summary>
                <ul className='p-2 mt-1 bg-base-100 rounded-xl border'>
                  {bartenders.map((bartenderKey) => (
                    <li key={bartenderKey}>
                      <div className='w-full h-22 bg-base rounded-xl flex my-1'>
                        <div className='avatar flex-shrink-0'>
                          <div className='m-2 w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                            <img
                              src={BartenderInfo[bartenderKey].picture}
                              alt={bartenderKey}
                            />
                          </div>
                        </div>
                        <div className='flex-grow flex flex-col justify-center items-start space-y-2 ml-4'>
                          <h3 className='text-white'>{bartenderKey}</h3>
                          <button
                            onClick={() => setBartender(bartenderKey)}
                            className='btn btn-primary'
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AIBartender;
