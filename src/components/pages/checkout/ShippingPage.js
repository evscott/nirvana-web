import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import TextField from '@material-ui/core/TextField';
import {DASHBOARD_ROUTE, REVIEW_ORDER_ROUTE, SHOPPING_CART_ROUTE} from "../../../routes";

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        root: {
            maxWidth: 500,
            marginLeft: 10,
            marginRight: 10,
        },
        mainTitle: {
            fontFamily: "Montserrat-Black",
        },
        mediumWidth: {
            width: 300,
        }
    };
});

/**
 * This is the dashboard page.
 * */
function ShippingPage(props) {
    const classes = useStyles();
    const history = useHistory();

    const [values, setValues] = React.useState({
        firstName: null,
        lastName: null,
        streetAddress: null,
        cityTown: null,
        province: null,
        postalCode: null,
        email: null,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    if (props.location.state === undefined) {
        history.push(SHOPPING_CART_ROUTE);
        return <div/>
    }

    return (
        <div style={{overflowX: 'hidden'}}>
            <div style={{top: 10, left: 10, position: 'relative'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="textSecondary" href={DASHBOARD_ROUTE}>
                        Nirvana Home
                    </Link>
                    <Link color="textSecondary" href={SHOPPING_CART_ROUTE}>
                        Shopping cart
                    </Link>
                    <Typography color="textPrimary">Shipping</Typography>
                    <Typography color="textSecondary">Review order</Typography>
                </Breadcrumbs>
            </div>
            <Grid
                container
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
                spacing={4}
                style={{marginTop: 30}}
            >
                <Grid item>
                    <Typography variant={'h5'} align={'center'}>
                        Enter shipping information
                    </Typography>
                </Grid>
                <Grid item>
                    <form className={classes.root} noValidate>
                        <Grid container direction={'row'} spacing={2}>
                            <Grid item xs={6} md={6} lg={6}>
                                <TextField
                                    id="outlined-helperText"
                                    label="First name"
                                    placeholder="John"
                                    variant="outlined"
                                    autoComplete={'given-name'}
                                    onChange={handleChange('firstName')}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <TextField
                                    id="outlined-helperText"
                                    label="Last name"
                                    placeholder="Doe"
                                    variant="outlined"
                                    autoComplete={'family-name'}
                                    onChange={handleChange('lastName')}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-helperText"
                                    label="Street address"
                                    placeholder="1100 Fake Avenue"
                                    variant="outlined"
                                    autoComplete={'shipping street-address'}
                                    onChange={handleChange('streetAddress')}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-helperText"
                                    label="Province"
                                    placeholder="British Columba"
                                    variant="outlined"
                                    autoComplete={'shipping address-level1'}
                                    onChange={handleChange('province')}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-helperText"
                                    label="Town/City"
                                    placeholder="Vancouver"
                                    variant="outlined"
                                    autoComplete={'shipping address-level2'}
                                    onChange={handleChange('cityTown')}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-helperText"
                                    label="Postal code"
                                    placeholder="V1A 2RA"
                                    variant="outlined"
                                    autoComplete={'shipping postal-code'}
                                    onChange={handleChange('postalCode')}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <TextField
                                    id="outlined-helperText"
                                    label="Email address"
                                    placeholder="johndoe@email.com"
                                    variant="outlined"
                                    onChange={handleChange('email')}
                                    required
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item container direction={'row'} justify={'flex-end'} style={{width: 500}}>
                    <Grid item>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            size={'large'}
                            style={{width: 260}}
                            onClick={() => history.push({
                                pathname: REVIEW_ORDER_ROUTE,
                                state: {
                                    firstName: values["firstName"],
                                    lastName: values["lastName"],
                                    streetAddress: values["streetAddress"],
                                    province: values["province"],
                                    cityTown: values["cityTown"],
                                    postalCode: values["postalCode"],
                                    email: values["email"]
                                }
                            })}
                        >
                            Proceed to review order
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

// Gets props from the redux store
const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingPage);