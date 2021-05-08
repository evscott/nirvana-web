import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import NavBar from "../reusable/NavBar";

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        mainTitle: {
            fontFamily: "Montserrat-Black",
        },
    };
});

/**
 * This is the dashboard page.
 * */
function DashboardPage(props) {
    const classes = useStyles();

    return (
        <div>
            <NavBar/>
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

export default connect(mapStateToProps)(DashboardPage);