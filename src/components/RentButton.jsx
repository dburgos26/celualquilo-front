import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

RentButton.propTypes = {
    text: PropTypes.string
}

export default function RentButton({ text }) {
    return <Button
        style={buttonStyle}
        variant="contained"
    >{text}</Button>;
}


const buttonStyle = {
    borderRadius: 13,
    padding: "10px 40px",
    backgroundColor: "#7724BF",
    fontSize: "18px",
    textTransform: "none",
}
