/* eslint-disable */
import React from 'react';
import { useIntl } from "react-intl";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

PhoneCard.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    phoneId: PropTypes.string.isRequired,
};

export default function PhoneCard({ name, image, cost, rating, phoneId }) {

    const intl = useIntl();

    const [isFavorite, setIsFavorite] = React.useState(false); // Initialize as false

    const buttonLink = localStorage.getItem("accUserName") ? `/products/${phoneId}/rent` : `/Login`;

    const link = "/products/" + phoneId;

    const toggleFavorite = () => {
        if (!localStorage.getItem("accUserName")) {
            window.location.href = "/Login";
        }
        if (isFavorite) {
            // Remove from favorites
            fetch(`http://localhost:3000/api/v1/phones/${phoneId}/users`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
        } else {
            // Add to favorites
            fetch(`http://localhost:3000/api/v1/phones/${phoneId}/users/${localStorage.getItem("accUserId")}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            });
        }
        setIsFavorite(!isFavorite);
    };
    return (
        <Card sx={cardStyle}>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');
            </style>
            <Link to={link} style={{ textDecoration: 'none' }}>
                <Box px={5} sx={{ marginTop: '1.5rem' }} >
                    <Typography gutterBottom variant="h5" component="div"
                        sx={nameStyle}
                        data-testid="nombreCelular"
                    >
                        {name}
                    </Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={9}>
                            <Typography xs={8} variant="body2" color="text.secondary"
                                sx={priceStyle}
                                data-testid="precioCelular"
                            >
                                {cost} USD / dia
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={ratingStyle}
                                data-testid="ratingCelular"
                            >
                                {rating}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <MediaRatio image={image} name={name} />

            </Link>
            <CardContent>
                <Grid container spacing={0} sx={{ alignItems: "center" }}>
                    <Grid item xs={2} onClick={toggleFavorite}>
                        <FavoriteIcon
                            sx={{ color: isFavorite ? '#9E30FF' : '#7f7f7f', fontSize: "2rem", verticalAlign: "middle" }}
                            fontSize="medium"
                            data-testid="favoriteIcon"
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <LastButton text={intl.formatMessage({ id: "Rent" })} link={buttonLink} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    );
}
const cardStyle = {
    height: "100%",
    width: "20rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#F1F1F1",
    borderRadius: "15px",
    boxShadow: 3,
}

const ratingStyle = {
    textAlign: "right",
    fontSize: "16px",
    fontFamily: "Open Sans",
    lineHeight: "1.5rem",
    color: "#495057",
    fontWeight: "medium",
    marginLeft: "1vw",
}

const priceStyle = {
    textAlign: "left",
    fontSize: "16px",
    fontFamily: "Open Sans",
    lineHeight: "1.5rem",
    color: "#495057",
    fontWeight: 500,
}

const nameStyle = {
    textAlign: "left",
    verticalAlign: "middle",
    fontSize: "20px",
    fontFamily: "Open Sans",
    color: "#495057",
    fontWeight: "bold",
}

LastButton.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

const LastButton = ({ text, link }) =>
    <Link to={link}>
        <Button
            style={{
                borderRadius: 13,
                padding: "10px 40px",
                backgroundColor: "#7724BF",
                fontSize: "15px",
                textTransform: "none",
                fontFamily: "Open Sans",
                width: "100%",
            }}
            variant="contained"
        >{text}</Button>
    </Link>;

MediaRatio.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};


const MediaRatio = ({ image, name }) =>
    <Box sx={{
        p: 1
    }}>
        <AspectRatio
            objectFit="contain"
            variant="plain"
            height="100%"
            ratio="7/8"
        >
            <img
                src={image}
                alt={name}
            />
        </AspectRatio>
    </Box>
