import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';

Breadcrumb.propTypes = {
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default function Breadcrumb({ breadcrumbs }) {

    const breadcrumbItems = breadcrumbs.map((breadcrumb, index) => (
        index < breadcrumbs.length - 1 ? (
            <Link
                key={index}
                underline="hover"
                color="inherit"
                to={breadcrumb.href}
            >
                {breadcrumb.text}
            </Link>
        ) : (
            <Typography key={index} color="text.primary">
                {breadcrumb.text}
            </Typography>
        )
    ));

    return (
        <Toolbar
            sx={{
                alignItems: 'flex-start',
                flexDirection: 'row',
                paddingTop: '10px',
            }}
        >
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbItems}
            </Breadcrumbs>
        </Toolbar>
    );
}
