import React from 'react';
import Problem from './Problem.jsx';
import PropTypes from 'prop-types';

export default function Quiz({quiz}) {
    return (
        <React.Fragment>
            { quiz.map((problem, i) => <Problem key={i.toString()} {...problem} id={i}/>) }
        </React.Fragment>
    )
}

Quiz.propTypes = {
    quiz: PropTypes.arrayOf(PropTypes.shape({
        question: PropTypes.string,
        choices: PropTypes.array,
        answer: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.array])
    }))
}