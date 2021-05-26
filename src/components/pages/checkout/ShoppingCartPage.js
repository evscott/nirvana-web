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
import ButtonGroup from "@material-ui/core/ButtonGroup";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import {
    addToShoppingCart,
    reduceFromShoppingCart,
    removeFromShoppingCart
} from "../../../redux/actions/shoppingCartActions";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {DASHBOARD_ROUTE, SHIPPING_PAGE} from "../../../routes";


/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        mainTitle: {
            fontFamily: "Montserrat-Black",
        },
        table: {
            minWidth: 100,
        },
        empty: {
            marginTop: 50,
        },
        shop: {
            width: 250,
        },
        content: {
            width: 500,
        },
        summaryData: {
            width: 280,
            marginRight: 10
        }
    };
});

/**
 * This is the dashboard page.
 * */
function ShoppingCartPage(props) {
    const classes = useStyles();
    const history = useHistory();

    const shoppingCartSummaryData = getSummaryData(props.items)

    const empty = () => {
        return (
            <div className={classes.empty}>
                <Grid container direction={'column'} justify="center" alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography variant={'h5'} color={'textSecondary'}>
                            Your cart is empty
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Divider orientation="vertical" flexItem style={{width:100, height: 2}} />
                    </Grid>
                    <Grid item>
                        <Button variant={'outlined'} color={'primary'} className={classes.shop} onClick={() => history.push('/shrooms')}>
                            shop mushrooms
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant={'outlined'} color={'primary'} className={classes.shop} onClick={() => history.push('/acid')}>
                            shop acid
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const cartTable = () => {
        return (
            <TableContainer>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell></TableCell>
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
                                                />
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
                                    <ButtonGroup disableElevation variant="outlined" size={'small'}>
                                        <Button onClick={() => props.reduce(item)}>
                                            -
                                        </Button>
                                        <Button disabled style={{maxWidth: 40, minWidth: 40}}>
                                            <Typography variant="body2" color={'textPrimary'}>
                                                {item.quantity}
                                            </Typography>
                                        </Button>
                                        <Button onClick={() => props.add(item)}>
                                            +
                                        </Button>
                                    </ButtonGroup>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant={'body2'}>
                                        ${item.subtotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => props.remove(item)}>
                                        <CancelIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    const summaryDataAndCheckout = () => {
        return (
            <div className={classes.content}>
                <Grid
                    item
                    container
                    direction={'column'}
                    justify={'flex-end'}
                    alignItems={'flex-end'}
                    spacing={2}
                >
                    <Grid
                        item
                        container
                        direction={'column'}
                        justify={'flex-end'}
                        alignItems={'flex-end'}
                        spacing={0}
                    >
                        <Grid item>
                            <div className={classes.summaryData}>
                                <Grid container direction={'row'} justify={'space-between'} alignItems={'center'}>
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
                            </div>
                        </Grid>
                        <Grid item>
                            <div className={classes.summaryData}>
                                <Grid container direction={'row'} justify={'space-between'} alignItems={'center'}>
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
                            </div>
                        </Grid>
                        <Grid item>
                            <div className={classes.summaryData}>
                                <Grid container direction={'row'} justify={'space-between'} alignItems={'center'}>
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
                    </Grid>
                    <Grid item>
                        <Button variant={'contained'} color={'primary'} size={'large'} style={{width: 300}} onClick={() => history.push(SHIPPING_PAGE)}>
                            Proceed to shipping
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

    return (
        <div>
            <div style={{top: 10, left: 10, position: 'relative'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="textSecondary" href={DASHBOARD_ROUTE}>
                        Nirvana Home
                    </Link>
                    <Typography color="textPrimary">Shopping cart</Typography>
                    <Typography color="textSecondary">Shipping</Typography>
                    <Typography color="textSecondary">Review order</Typography>
                </Breadcrumbs>
            </div>
            <Grid
                container
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
                spacing={4}
                style={{marginTop: 30, marginBottom: 10}}
            >
                <Grid item>
                    <Typography variant={'h5'} align={'center'}>
                        Review your shopping cart
                    </Typography>
                </Grid>
                <Grid item>
                    {props.items.length === 0 ? empty() : cartTable()}
                </Grid>
                <Grid item/>
                <Grid item>
                    {props.items.length === 0 ? '' : summaryDataAndCheckout()}
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
        remove: (item) => {
            dispatch(removeFromShoppingCart(item))
        },
        reduce: (item) => {
            dispatch(reduceFromShoppingCart(item))
        },
        add: (item) => {
            dispatch(addToShoppingCart(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartPage);