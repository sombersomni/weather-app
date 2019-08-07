import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';

export default function SubmitButton({ label, checkAnswer, disable, turnOff, bgcolor }) {
    const [buttonLabel, setLabel] = useState(label || 'Submit')
    const [color, setColor] = useState(bgcolor || '#198C8C');
    const [emoji, setEmoji] = useState('')
    useEffect(() => {
        switch(buttonLabel.toLowerCase()) {
            case 'correct':
                setColor('#5AC18E');
                setEmoji('👍');
                break;
            case 'try again':
                setColor('#999');
                setEmoji('');
                break;
            case 'wrong':
                setColor('#F00000');
                setEmoji('👎');
                break;
            default:
                setColor(bgcolor || '#198C8C')
                setEmoji('');
                break;
        }
    }, [buttonLabel])
    return (
        <Button 
            turnOff={turnOff}
            disable={disable}
            color={color}
            onClick={() => { if(!disable) checkAnswer(setLabel) }}>
            {buttonLabel} {emoji}
        </Button>
    )
}

SubmitButton.propTypes = {
    label: PropTypes.string, 
    checkAnswer: PropTypes.func, 
    disable: PropTypes.bool, 
    turnOff: PropTypes.bool, 
    bgcolor: PropTypes.string
}