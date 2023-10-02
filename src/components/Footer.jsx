import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { COLORS } from "../styles/colors";
import { useIntl } from "react-intl";


export default function Footer() {

    const intl = useIntl();

    const title1 = intl.formatMessage({ id: 'Footer_General_Title' });
    const items1 = [intl.formatMessage({ id: 'Footer_General_AboutUs' }), intl.formatMessage({ id: 'Footer_General_OurBuisness' })];

    const title2 = intl.formatMessage({ id: 'Footer_VirtualStore_Title' });
    const items2 = [intl.formatMessage({ id: 'Footer_VirtualStore_DeliveryInfo' }), intl.formatMessage({ id: 'Footer_VirtualStore_Returns' })];

    const title3 = intl.formatMessage({ id: 'Footer_Legal_Title' });
    const items3 = [intl.formatMessage({ id: 'Footer_Legal_UseTerms' }), intl.formatMessage({ id: 'Footer_Legal_RentTerms' }), intl.formatMessage({ id: 'Footer_Legal_PrivacyTerms' })];

    const title4 = intl.formatMessage({ id: 'Footer_Contact_Title' });
    const items4 = ["Facebook", "Twitter", "Instagram", "Youtube"];

    return (
        <Box
            component="footer"
            sx={boxStyle}
        >
            <Container>
                <Grid container spacing={4}>
                    <FooterColumn title={title1} items={items1} />
                    <FooterColumn title={title2} items={items2} />
                    <FooterColumn title={title3} items={items3} />
                    <FooterColumn title={title4} items={items4} />
                </Grid>
                <Copyright />
            </Container>
        </Box>
    );
}


const boxStyle = {
    backgroundColor: COLORS.dark,
    bottom: 0,
    width: '100%',
    zIndex: 1,
    right: "0px",
    left: "0px",
}


const FooterColumn = ({ title, items }) =>
    <Grid item xs={12} sm={3}>
        <Title title={title} />
        {items.map((item, index) => (
            <Item text={item} key={index} />
        ))}
    </Grid>


const Title = ({ title }) =>
    <Typography variant="h6" gutterBottom sx={{
        color: "white",
    }}>
        {title}
    </Typography>


const Item = ({ text }) =>
    <Typography variant="body2" sx={{
        color: "white",
        fontWeight: "lighter",
        paddingBottom: "15px",
    }}>
        {text}
    </Typography>


const Copyright = () =>
    <Box sx={{
        paddingBottom: "20px",
    }}>
        <Typography variant="body2" align="center"
            sx={{
                color: "white",
            }}>
            {"Copyright © "}
            <Link href="https://celualquilo.com/">
                CeluAlquilo
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    </Box>