import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import {connect} from "react-redux";
import {getSummaryData} from "../../redux/helpers/shoppingCart";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {Button} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CardActions from "@material-ui/core/CardActions";
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {
    removeFromShoppingCart,
    reduceFromShoppingCart,
    addToShoppingCart
} from "../../redux/actions/shoppingCartActions";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 400,
        height: 'calc(100% - 200px)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        marginTop: 10,
    },
    // Card styles
    root: {
        marginLeft: 20,
        marginRight: 20,
        display: 'flex',
        width: 360,
        height: 140,
        position: 'relative',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        width: 240,
    },
    cover: {
        width: 100,
        height: 80,
        marginTop: 40,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    actions: {
        width: 260,
    },
    cancel: {
        top: 0,
        right: 0,
        position: 'absolute'
    },
    close: {
        top: 0,
        left: 0,
        position: 'absolute'
    },
    summaryData: {
        position: 'fixed',
        width: 360,
        marginLeft: 20,
        marginRight: 20,
        bottom: 10,
    },
    checkout: {
        width: 355,
    },
    shop: {
        width: 250,
    },
    appBar: {
        width: 400,
    }
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

function ShoppingCart(props) {
    const classes = useStyles();

    const history = useHistory();

    const [state, setState] = React.useState(false);
    const shoppingCartSummaryData = getSummaryData(props.items);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const itemCard = (item) => (
        <Card className={classes.root} elevation={1}>
            <IconButton size={'small'} className={classes.cancel} onClick={() => props.remove(item)}>
                <CancelIcon/>
            </IconButton>
            <CardMedia
                className={classes.cover}
                image="/images/confused-mushroom-4-md.png"
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Grid container direction={'column'}>
                        <Grid item>
                            <Typography variant={"subtitle1"}>
                                {item.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'body2'} color={'textSecondary'}>
                                {item.denomination}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Grid container alignItems={"center"} justify="space-between">
                        <Grid item>
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
                        </Grid>
                        <Grid item>
                            <Typography variant={'body1'}>
                                ${item.cost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActions>
            </div>
        </Card>
    );

    const checkout = () => (
        <div>
            <Grid container className={classes.summaryData} direction={'column'} spacing={1}>
                <Grid container item direction={'row'} justify={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>
                            Subtotal:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle2'} color={'textPrimary'}>
                            ${shoppingCartSummaryData.subtotal.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item direction={'row'} justify={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Typography variant={'subtitle2'} color={'textSecondary'}>
                            Shipping:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'subtitle2'} color={'textPrimary'}>
                            FREE
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button variant={'contained'} color={'primary'} size={'large'} className={classes.checkout} onClick={() => history.push('/cart')}>
                        Go to checkout
                    </Button>
                </Grid>
            </Grid>
        </div>
    )

    const empty = () => (
        <div className={clsx(classes.list)} role="presentation">
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

    const itemsList = () => (
        <div className={clsx(classes.list)} role="presentation">
                <Grid container direction={"column"} justify={"center"} alignItems={"center"} spacing={2}>
                    {shoppingCartSummaryData.collapsedItems.map((item, index) => (
                        <Grid item key={index}>
                            {itemCard(item)}
                        </Grid>
                    ))}
                </Grid>
        </div>
    );

    return (
        <React.Fragment>
            <IconButton
                onClick={toggleDrawer(true)}
                edge="start"
                className={classes.cartButton}
                color="inherit"
                aria-label="cart"
            >
                <StyledBadge badgeContent={props.items.length} color="secondary" size={'small'}>
                    <ShoppingCartIcon/>
                </StyledBadge>
            </IconButton>
            <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
                <AppBar className={classes.appBar} color={'default'}>
                    <Toolbar>
                        <Grid container direction={'row'} justify={'space-between'} alignItems={'center'}>
                            <Grid item>
                                <IconButton size={'small'} onClick={toggleDrawer(false)}>
                                    <ArrowForwardIosIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6">
                                    {props.items.length === 0 ? '' : props.items.length + ' items'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Toolbar id="back-to-top-anchor" />
                {props.items.length === 0 ? empty() :itemsList()}
                {props.items.length === 0 ? null : checkout()}
            </Drawer>
        </React.Fragment>
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


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
