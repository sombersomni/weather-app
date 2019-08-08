import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Description } from './Containers.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        maxWidth: 400,
        minWidth: 300,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 10,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
        transform: 'translate(-50%, -50%)',
        outline: 'none',
    },
}));

const IconContainer = styled.div`
    opacity: 1;
    cursor: pointer;
    transiton: opacity 1s;
    &:hover {
        opacity: 0.6;
    }
`;
export default function WeatherModal({ open, handleClose, description, primaryColor, name}) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    <IconContainer onClick={handleClose}>
                        <FontAwesomeIcon icon={['far', 'times']} />
                    </IconContainer>
                    <h2 id="modal-title">{name}</h2>
                    <Description color={primaryColor}>
                        {description}
                    </Description>

                </div>
            </Modal>
        </div>
    );
}