import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import NavBar from "../../reusable/NavBar";
import {Button} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import {getSummaryData} from "../../../redux/helpers/shoppingCart";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {DASHBOARD_ROUTE, REVIEW_ORDER_PAGE, SHIPPING_PAGE, SHOPPING_CART_PAGE} from "../../../routes";

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
function ReviewOrderPage(props) {
    const classes = useStyles();
    const history = useHistory();
    const shoppingCartSummaryData = getSummaryData(props.items)

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
                            <Link underline='none' component={RouterLink} to={item.name === "Raw B.C. Mushrooms" ? "/shrooms" : "acid"}>
                                <Grid container direction={'row'} justify={'flex-start'} alignItems={'center'} spacing={1}>
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
        <Grid container direction={'row'} justify={'flex-end'} alignItems={'flex-end'} spacing={0} className={classes.root}>
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
                            ${(shoppingCartSummaryData.subtotal+8.99).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    )

    return (
        <div>
            <div style={{top: 10, left: 10, position: 'relative'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="textSecondary" href={DASHBOARD_ROUTE}>
                        Nirvana Home
                    </Link>
                    <Link color="textSecondary" href={SHOPPING_CART_PAGE}>
                        Shopping cart
                    </Link>
                    <Link color="textSecondary" href={SHIPPING_PAGE}>
                        Shipping
                    </Link>
                    <Typography color="textPrimary">Review order</Typography>
                </Breadcrumbs>
            </div>
            <Grid
                container
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
                spacing={3}
                style={{marginTop: 30}}
            >
                <Grid item>
                    <Typography variant={'h5'} align={'center'}>
                        Confirm order and shipping information
                    </Typography>
                </Grid>
                <Grid item>
                    {cartTable()}
                </Grid>
                <Grid item>
                    {summaryInformation()}
                </Grid>
                <Grid item>
                    <Divider orientation="vertical" flexItem style={{width:495, height: 1}} />
                </Grid>
                <Grid item>
                    {shippingInformation()}
                </Grid>
                <Grid item container direction={'row'} justify={'flex-end'} style={{width: 500, marginBottom: 10}}>
                    <Grid item>
                        <Button variant={'contained'} color={'primary'} size={'large'} style={{width: 300}}>
                            Place order
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

// Gets props from the redux store
const mapStateToProps = (state) => {
    const items = state.shoppingCart.items
    return {
        items
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrderPage);