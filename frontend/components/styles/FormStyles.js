import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  display: flex;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 50rem;
  color: ${props => props.theme.white};
  background: ${props => props.theme.opacitygrey};
  max-height: 90rem;
  height: 100%;
  input,
  textarea,
  select {
    &:focus {
      outline: 1;
      border-color: green;
    }
  }
  fieldset {
    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #ff3019 0%, #e2b04a 50%, #ff3019 100%);
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;
const FormHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.orange};
  height: ${props => (props.height ? props.height : '10rem')};
  width: ${props => (props.width ? props.width : '100%')};
  font-size: 4rem;
  font-weight: 600;
  min-height: 10rem;
`;
const FormTitle = styled.h2`
  font-size: 4rem;
  font-weight: 400;
  margin-bottom: 3rem;
  padding: 0;
`;
const FormFieldset = styled.fieldset`
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0 7rem;
  margin-bottom: 3rem;
`;
const FormGroup = styled.div`
  display: flex;
  flex-flow: column;
`;
const FormLabel = styled.label`
  display: flex;
  justify-content: center;
  height: ${props => (props.height ? props.height : 'auto')};
  width: ${props => (props.width ? props.width : '100%')};
  color: ${props => props.theme.white};
  background: ${props => props.theme.orange};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 1.6rem;
`;

const FormBox = styled.input`
  display: block;
  height: ${props => (props.height ? props.height : '5rem')};
  width: ${props => (props.width ? props.width : '100%')};
  font-size: 3.2rem;
  padding: 0 1.6rem;
  margin-bottom: 3rem;
`;

const FormArea = styled.textarea`
  display: block;
  height: ${props => (props.height ? props.height : '4rem')};
  width: ${props => (props.width ? props.width : '100%')};
  font-size: 3rem;
  padding: 0 1.6rem;
  margin-bottom: 0rem;
`;

export { Form, FormHeader, FormLabel, FormBox, FormArea, FormGroup, FormFieldset, FormTitle };
