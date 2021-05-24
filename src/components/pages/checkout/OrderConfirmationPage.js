import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import NavBar from "../../reusable/NavBar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import {getSummaryData} from "../../../redux/helpers/shoppingCart";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from '@material-ui/core/colors';
import {emptyShoppingCart} from "../../../redux/actions/shoppingCartActions";
import {DASHBOARD_ROUTE, SHOPPING_CART_PAGE, SHOPPING_CART_ROUTE} from "../../../routes";
import NoMatchPage from "../404/NoMatchPage";

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        root: {
            width: 500,
            marginLeft: 10,
            marginRight: 50,
        },
        mainTitle: {
            fontFamily: "Montserrat-Black",
        },
        mediumWidth: {
            width: 300,
        },
        summaryData: {
            width: 280,
        }
    };
});

/**
 * This is the dashboard page.
 * */
function OrderConfirmationPage(props) {
    const classes = useStyles();
    const history = useHistory();

    if (props.location.state === undefined) {
        history.push(SHOPPING_CART_ROUTE);
        return <div/>
    }

    const shoppingCartSummaryData = getSummaryData(props.location.state.items)
    props.emptyShoppingCartInStore()

    const cartTable = () => (
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {shoppingCartSummaryData.collapsedItems.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            <Link underline='none' component={RouterLink}
                                  to={item.name === "Raw B.C. Mushrooms" ? "/shrooms" : "acid"}>
                                <Grid container direction={'row'} justify={'flex-start'} alignItems={'center'}
                                      spacing={1}>
                                    <Grid item>
                                        <img
                                            src={"/images/confused-mushroom-4-md.png"}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                objectFit: 'contain'
                                            }}
                                            alt={"/images/confused-mushroom-4-md.png"}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant={'body1'} color={'textPrimary'}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant={'body2'} color={'textSecondary'}>
                                            {item.denomination}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Link>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={'body2'}>
                                ${item.cost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </Typography>
                        </TableCell>
                        <TableCell align={'right'}>
                            <Typography variant={'body2'}>
                                {item.quantity}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant={'body2'}>
                                ${item.subtotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

    const shippingInformation = () => (
        <Grid container direction={'row'} spacing={0} className={classes.root}>
            <Grid item xs={12} md={12} lg={12}>
                <Typography variant={'subtitle2'} align={'right'}>
                    {props.location.state.firstName} {props.location.state.lastName}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Typography variant={'subtitle2'} align={'right'}>
                    {props.location.state.streetAddress}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Typography variant={'subtitle2'} align={'right'}>
                    {props.location.state.cityTown}, {props.location.state.province}, {props.location.state.postalCode}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Typography variant={'subtitle2'} align={'right'}>
                    {props.location.state.email}
                </Typography>
            </Grid>
        </Grid>
    )

    const summaryInformation = () => (
        <Grid container direction={'row'} justify={'flex-end'} alignItems={'flex-end'} spacing={0}
              className={classes.root}>
            <div className={classes.summaryData}>
                <Grid item container direction={'row'} justify={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>
                            Subtotal:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle2'}>
                            ${shoppingCartSummaryData.subtotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container direction={'row'} justify={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>
                            Shipping:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle2'}>
                            $8.99
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container direction={'row'} justify={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>
                            Total:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle2'}>
                            ${(shoppingCartSummaryData.subtotal + 8.99).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )

    return (
        <div>
            <NavBar/>
            <Grid
                container
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
                spacing={2}
                style={{marginTop: 30}}
            >
                <Grid item>
                    <Typography variant={'h5'} align={'center'}>
                        We've received your order!
                    </Typography>
                </Grid>
                <Grid item>
                    <CheckCircleOutlineIcon style={{color: green[500], width: 50, height: 50}}/>
                </Grid>
                <Grid item>
                    <div style={{maxWidth: 500}}>
                        <Typography variant={'subtitle2'} align={'left'}>
                            Your order #{props.location.state.orderNumber} is almost ready to be delivered. First
                            you must complete the payment process. Please follow the instructions below to finish
                            your order.
                        </Typography>
                    </div>
                </Grid>
                <Grid item>
                    <div style={{maxWidth: 500}}>
                        <Typography variant={'subtitle2'} align={'left'}>
                            To complete your order send an interac e-transfer using the following information:
                        </Typography>
                    </div>
                </Grid>
                <Grid item
                      container
                      direction={'column'}
                      justify={'center'}
                      alignItems={'flex-start'}
                      spacing={1}
                      style={{maxWidth: 500}}
                >
                    <Grid item>
                        <Typography variant={'subtitle1'} align={'left'}>
                            Recipient name: Nirvana
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle1'} align={'left'}>
                            Recipient email: orders@nirvanabazaar.io
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle1'} align={'left'}>
                            Message/note: #{props.location.state.orderNumber}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle1'} align={'left'}>
                            Amount:
                            ${(shoppingCartSummaryData.subtotal + 8.99).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'caption'} align={'left'} color={'textSecondary'}>
                            If auto-deposit is enabled, skip the following steps.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle1'} align={'left'}>
                            Security question: What country?
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle1'} align={'left'}>
                            Security password: Canada
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <div style={{maxWidth: 500}}>
                        <Typography variant={'subtitle2'} align={'left'}>
                            Once your payment has been confirmed your order will be sent to dispatch to schedule
                            delivery.
                        </Typography>
                    </div>
                </Grid>
                <Grid item/>
                <Grid item>
                    <Typography variant={'h6'} align={'left'} color={'textSecondary'}>
                        Order information
                    </Typography>
                    {cartTable()}
                </Grid>
                <Grid item>
                    {summaryInformation()}
                </Grid>
                <Grid item>
                    <Divider orientation="vertical" flexItem style={{width: 495, height: 1}}/>
                </Grid>
                <Grid item>
                    {shippingInformation()}
                </Grid>
                <Grid item/>
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
        emptyShoppingCartInStore: () => dispatch(emptyShoppingCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmationPage);