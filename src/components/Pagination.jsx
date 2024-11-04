import React from 'react';
import Pagination from '@mui/material/Pagination';

PaginationRounded.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    totalElements: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
};

export default function PaginationRounded({ setCurrentPage, totalElements, itemsPerPage }) {
    return (

        <Pagination
            onChange={(event, page) => setCurrentPage(page)}
            count={Math.ceil(totalElements / itemsPerPage)}
            shape="rounded"
            variant="outlined"
            size="small"
            sx={{
                '& .MuiPaginationItem-page.Mui-selected': {
                    border: '1px solid',
                    backgroundColor: '#E6CAFF',
                    color: '#280C40',
                    borderColor: '#280C40',
                    fontWeight: 'bold',
                },
                '& .MuiPaginationItem-icon': {
                    backgroundColor: 'white',
                    color: '#280C40',
                    fontSize: '2vw',

                },
                '&& .MuiTouchRipple-rippleVisible': {
                    animationDuration: '400ms',
                    color: '#E6CAFF'
                },
                color: 'black'
            }}
        />

    );
}