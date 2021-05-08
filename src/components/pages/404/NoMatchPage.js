import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import NavBar from "../../reusable/NavBar";

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        confusedShroomImg: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    };
});

/**
 * This is the about page.
 * */
function NoMatchPage() {
    const classes = useStyles();
    return (
        <div>
            <NavBar/>
            <div className={classes.confusedShroomImg}>
                <img src='/images/confused-mushroom-4-md.png' />
            </div>
        </div>
    );
}

// Gets props from the redux store
const mapStateToProps = state => {
    const products = state.inventory.products
    return {
        products
    };
};

export default connect(mapStateToProps)(NoMatchPage);