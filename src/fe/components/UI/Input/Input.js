import React from 'react';

import * as Styled from './StyledInput.js';

const input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <Styled.InputElementTypeInput
          invalid={props.invalid}
          shouldValidate={props.shouldValidate}
          touched={props.touched}
          {...props.elementConfig}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.changed}
          onKeyPress={props.keyPress}
          onKeyDown={props.keyDown}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <Styled.InputElementTypeTextarea
          invalid={props.invalid}
          shouldValidate={props.shouldValidate}
          touched={props.touched}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <Styled.InputElementTypeSelect
          invalid={props.invalid}
          shouldValidate={props.shouldValidate}
          touched={props.touched}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map (option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </Styled.InputElementTypeSelect>
      );
      break;
    default:
      inputElement = (
        <Styled.InputElementTypeInput
          invalid={props.invalid}
          shouldValidate={props.shouldValidate}
          touched={props.touched}
          {...props.elementConfig}
          value={props.value}
          defaultValue={props.defaultValue}
          onChange={props.changed}
          onKeyPress={props.keyPress}
          onKeyDown={props.keyDown}
        />
      );
  }

  return (
    <Styled.Input>
      <Styled.Label>{props.label}</Styled.Label>
      {inputElement}
    </Styled.Input>
  );
};

export default input;
