import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import NavBar from "../../reusable/NavBar";
import {Button, Container} from "@material-ui/core";
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


/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        mainTitle: {
            fontFamily: "Montserrat-Black",
        },
        tableContainer: {
            marginTop: 50,
        },
        table: {
            minWidth: 300,
        },
        empty: {
            marginTop: 50,
        },
        shop: {
            minWidth: 250,
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
                        <Typography variant={'h6'} color={'textSecondary'}>
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
            <TableContainer className={classes.tableContainer}>
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
                                            <Typography variant={'body1'}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant={'body2'} color={'textSecondary'}>
                                                {item.denomination}
                                            </Typography>
                                        </Grid>
                                    </Grid>
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
                                            FREE
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
                                            ${shoppingCartSummaryData.subtotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button variant={'contained'} color={'primary'} size={'large'} style={{width: 300}}>
                            Proceed to shipping
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

    return (
        <div>
            <NavBar/>
            <Grid
                container
                direction={'column'}
                justify={'center'}
                alignItems={'center'}
                spacing={10}
            >
                <Grid item>
                    {props.items.length === 0 ? empty() : cartTable()}
                </Grid>
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