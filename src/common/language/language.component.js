import React from 'react';
import { Text } from 'native-base';

const specialCharacters = ['/', ':', '.', ',', '?', '!', '"', '\'', '(', ')'];

const Language = props => {
  const { children, text } = props;
  const initialText = Array.isArray(children) ? children.join('') : children;

  let displayText = initialText;

  if (typeof initialText === 'string') {
    specialCharacters.forEach(character => {
      displayText = displayText.replace(new RegExp(`[${character}]`, 'g'), ` ${character} `);
    });

    displayText = displayText
      .split(' ')
      .map(string => text[string] || string)
      .join(' ');

    specialCharacters.forEach(character => {
      displayText = displayText.replace(new RegExp(`\\s[${character}]\\s`, 'g'), character);
    });
  }


  return <Text {...props}>{displayText}</Text>;
};

export default Language;
