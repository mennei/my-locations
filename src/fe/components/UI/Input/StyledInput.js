import styled from 'styled-components';

export const InputElementTypeInput = styled.input`
    outline: none;
    border: ${props => (props.invalid && props.shouldValidate && props.touched ? '1px solid red' : '1px solid #ccc')};
    background-color: ${props => (props.invalid && props.shouldValidate && props.touched ? '#FDA49A' : 'white')};
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    :focus & {
        outline: none;
        background-color: #ccc;
    }
`;

export const InputElementTypeTextarea = styled.textarea`
    outline: none;
    border: ${props => (props.invalid && props.shouldValidate && props.touched ? '1px solid red' : '1px solid #ccc')};
    background-color: ${props => (props.invalid && props.shouldValidate && props.touched ? '#FDA49A' : 'white')};
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    :focus & {
        outline: none;
        background-color: #ccc;
    }
`;

export const InputElementTypeSelect = styled.select`
    outline: none;
    border: ${props => (props.invalid && props.shouldValidate && props.touched ? '1px solid red' : '1px solid #ccc')};
    background-color: ${props => (props.invalid && props.shouldValidate && props.touched ? '#FDA49A' : 'white')};
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    :focus & {
        outline: none;
        background-color: #ccc;
    }
`;

export const Input = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
`;

export const Label = styled.label`
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
`;

export const Invalid = styled.div`
    border: 1px solid red;
    background-color: #FDA49A;
`;
