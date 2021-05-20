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
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 400,
        marginTop: 60,
    },
    // Card styles
    root: {
        marginLeft: 20,
        marginRight: 20,
        display: 'flex',
        justifyContent: 'flex-start',
        width: 360,
        height: 160,
        position: 'relative'
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
        top: '0%',
        right: '0%',
        position: 'absolute'
    },
    close: {
        top: 5,
        left: 5,
        position: 'absolute'
    },
    summaryData: {
        position: 'absolute',
        width: 360,
        marginLeft: 20,
        bottom: 10,
    },
    checkout: {
        width: 360,
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
    const [state, setState] = React.useState(false);
    const shoppingCartSummaryData = getSummaryData(props.items);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const itemCard = () => (
        <Card className={classes.root} elevation={1}>
            <IconButton size={'small'} className={classes.cancel}>
                <CloseIcon/>
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
                                Raw B.C. Mushrooms
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={'body2'} color={'textSecondary'}>
                                3.5 grams
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Grid container alignItems={"center"} justify="space-between">
                        <Grid item>
                            <ButtonGroup disableElevation variant="outlined">
                                <Button size={'small'}>
                                    -
                                </Button>
                                <Button disabled style={{maxWidth: 40, minWidth: 40}}>
                                    <Typography variant="body2" color={'textPrimary'}>
                                        5
                                    </Typography>
                                </Button>
                                <Button>
                                    +
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item>
                            <Typography variant={'body1'}>
                                $120
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActions>
            </div>
        </Card>
    );

    const itemsList = () => (
        <div className={clsx(classes.list)} role="presentation">
            <Grid container direction={"column"} justify={"center"} alignItems={"center"} spacing={2}>
                {shoppingCartSummaryData.collapsedItems.map((item, index) => (
                    <Grid item key={index}>
                        {itemCard()}
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
                <StyledBadge badgeContent={props.items.length} color="secondary">
                    <ShoppingCartIcon/>
                </StyledBadge>
            </IconButton>
            <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
                <IconButton size={'large'} className={classes.close} onClick={toggleDrawer(false)}>
                    <ArrowForwardIosIcon/>
                </IconButton>
                {itemsList()}
                {/*  summary information  */}
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
                        <Button variant={'contained'} color={'primary'} size={'large'} className={classes.checkout}>
                            Go to checkout
                        </Button>
                    </Grid>
                </Grid>
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

export default connect(mapStateToProps)(ShoppingCart);
