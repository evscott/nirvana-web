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

const useStyles = makeStyles({
    list: {
        width: 275,
    },
});

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
      <div>

      </div>
    );

    const itemsList = () => (
        <div className={clsx(classes.list)} role="presentation">
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                {shoppingCartSummaryData.collapsedItems.map((item, index) => (
                    <Grid item key={index}>
                        {/*Add the card here*/}
                        {item.name},
                        {item.denomination},
                        {item.quantity},
                        {item.cost},
                        {item.subtotal}
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
                <StyledBadge badgeContent={4} color="secondary">
                    <ShoppingCartIcon/>
                </StyledBadge>
            </IconButton>
            <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
                {itemsList()}
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
