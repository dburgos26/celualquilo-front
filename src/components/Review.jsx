import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from "react-intl";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RatingStars from './RatingStars';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import { COLORS } from '../styles/colors';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import GoBack from './GoBack';
import { useParams } from 'react-router-dom';

export default function Review() {
    const theme = useTheme();
    const oss = useMediaQuery(theme.breakpoints.down("sm"));

    const intl = useIntl();
    const title = intl.formatMessage({ id: 'Review_Title' });
    const stock = intl.formatMessage({ id: 'PhoneDetail_LablelStock' });
    const reviewPublished = intl.formatMessage({ id: 'ReviewPublished' });
    const errorPublishingReview = intl.formatMessage({ id: 'ErrorPublishingReview' });

    const [reviewRating, setReviewRating] = React.useState(4);
    const [reviewText, setReviewText] = React.useState("");

    const params = useParams();
    const idCel = params.productId;

    localStorage.setItem("currentCel", idCel);

    const phone = localStorage.getItem("cel" + idCel);
    let phoneJson = JSON.parse(phone);

    async function postReview() {
        const response = await fetch(`http://localhost:3000/api/v1/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),

            },
            body: JSON.stringify({
                rating: reviewRating,
                text: reviewText
            }),
        });

        const data = await response.json();
        console.log(data);
        const idReview = await data.id;

        if (idReview === undefined) {
            alert(errorPublishingReview);
        } else {

            await fetch(`http://localhost:3000/api/v1/phones/${idCel}/reviews/${idReview}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            });

            setReviewText("");

            if (response.status === 201) {
                alert(reviewPublished);
            } else {
                alert(errorPublishingReview);
            }

        }
    }

    return (
        <>
            <GoBack text={title} route={`/RentHistory`} />
            <Stack marginBottom={7}>
                <Card sx={cardStyle}>
                    <Grid container spacing={0} padding={3} direction={'row'} alignItems={'center'}>
                        {/* Column for Image */}
                        {!oss && <Grid item xs={12} sm={6} >
                            <img
                                style={{ maxWidth: '130%', height: '30vw' }}
                                alt={phoneJson.name}
                                src={phoneJson.image}
                            />
                        </Grid>}

                        <Grid item xs={12} sm={6} sx={{ textAlign: 'left' }}>
                            <Typography variant="h6" color="text.primary" padding={1}>
                                {phoneJson.brand.name}
                            </Typography>
                            <Typography variant="h6" color="text.primary" padding={1}>
                                {phoneJson.availability} {stock}
                            </Typography>
                            <Typography variant="h3" component="div" padding={1}>
                                {phoneJson.name}
                            </Typography>
                            {oss && <Grid item xs={12} sm={5}>
                                <img
                                    style={{ maxWidth: '130%', height: '60vw' }}
                                    alt={phoneJson.name}
                                    src={phoneJson.image}
                                />
                            </Grid>}
                            <SpecList specs={[phoneJson.screenSpecs, phoneJson.cameraSpecs, phoneJson.memorySpecs]} />
                        </Grid>

                    </Grid>

                    <CardContent>
                        <CommentArea setRating={setReviewRating} setText={setReviewText} postReview={postReview} />
                    </CardContent>
                </Card>
            </Stack>
        </>
    );
}

const cardStyle = {
    width: "80vw",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    borderRadius: "15px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    alignSelf: "center",
};

const SpecList = ({ specs }) => {
    return (
        <List>
            {specs.map((spec, index) => (
                <ListItem key={index} sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }}>
                    <ListItemIcon>
                        <CheckIcon />
                    </ListItemIcon>
                    <Typography variant="h6" color="text.secondary">
                        {spec}
                    </Typography>
                </ListItem>
            ))}
        </List>
    );
};

SpecList.propTypes = {
    specs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const PublishReviewButton = ({ text, postReview }) => {
    return (
        <Button
            style={{
                borderRadius: 20,
                padding: "5px 20px",
                backgroundColor: COLORS.primary,
                fontSize: "18px",
                textTransform: "none",
                color: "white",
            }}
            variant="contained"
            onClick={postReview}
        >
            {text}
        </Button>
    );
};

PublishReviewButton.propTypes = {
    text: PropTypes.string.isRequired,
    postReview: PropTypes.func.isRequired,
};

const CommentArea = ({ setRating, setText, postReview }) => {
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const intl = useIntl();
    const tellOp = intl.formatMessage({ id: 'Review_TellOpinion' });
    const btt = intl.formatMessage({ id: 'Review_publichBttn' });
    const inputFil = intl.formatMessage({ id: 'Review_InputFiller' });

    const handleText = (event) => {
        setText(event.target.value);
    };

    return (
        <FormControl>
            <Stack spacing={1.3}>
                <FormLabel
                    sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontSize: '24px',
                        lineHeight: '22px',
                        color: '#202020',
                    }}
                >
                    {tellOp}
                </FormLabel>
                <RatingStars setRevrating={setRating} />
                <Textarea
                    placeholder={inputFil}
                    onChange={handleText}
                    minRows={3}
                    endDecorator={
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 'var(--Textarea-paddingBlock)',
                                pt: 'var(--Textarea-paddingBlock)',
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                flex: 'auto',
                                padding: '16px',
                            }}
                        >
                            <IconButton
                                variant="plain"
                                color="neutral"
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                            >
                                <FormatBold />
                                <KeyboardArrowDown fontSize="md" />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                size="sm"
                                placement="bottom-start"
                                sx={{ '--ListItemDecorator-size': '24px' }}
                            >
                                {['200', 'normal', 'bold'].map((weight) => (
                                    <MenuItem
                                        key={weight}
                                        selected={fontWeight === weight}
                                        onClick={() => {
                                            setFontWeight(weight);
                                            setAnchorEl(null);
                                        }}
                                        sx={{ fontWeight: weight }}
                                    >
                                        <ListItemDecorator>
                                            {fontWeight === weight && <Check fontSize="sm" />}
                                        </ListItemDecorator>
                                        {weight === '200' ? 'lighter' : weight}
                                    </MenuItem>
                                ))}
                            </Menu>
                            <PublishReviewButton text={btt} postReview={postReview} />
                        </Box>
                    }
                    sx={{
                        minWidth: 300,
                        fontWeight,
                    }}
                />
            </Stack>
        </FormControl>
    );
};

CommentArea.propTypes = {
    setRating: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
    postReview: PropTypes.func.isRequired,
};
