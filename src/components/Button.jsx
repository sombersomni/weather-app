import styled from 'styled-components';
const Button = styled.button`
    font-size: 1em;
    min-width: 200px;
    padding: 10px;
    margin-top: 10px;
    border: none;
    background-color: ${props => props.color}
    border-radius: 5px;
    opacity: ${props => props.turnOff ? '0.3' : '1'};
    cursor: ${props => props.turnOff ? 'not-allowed' : (props.disable ? 'default' : 'pointer')};
    transition: opacity 500ms, background-color 1s;
    &:hover {
        opacity: ${props => props.turnOff? '0.3' : (props.disable ? '1' : '0.7')};
        box-shadow: ${props => props.turnOff || props.disable ? 'none' : '1px 1px 4px 2px rgba(0,0,0,0.2)'};
    }
`;

export default Button;