import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import NavBar from "../../reusable/NavBar";
import SeeMoreShroomsCard from "./SeeMoreShroomsCard";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import SeeMoreLSDCard from "./SeeMoreLSDCard";

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        mainTitle: {
            fontFamily: "Montserrat-Black",
        },
        content: {
            marginTop: 75
        }
    };
});

/**
 * This is the dashboard page.
 * */
function DashboardPage() {
    const classes = useStyles();
    return (
        <div>
            <NavBar/>
            <Container className={classes.content}>
                <Grid
                    container
                    justify={'center'}
                    alignItems={'center'}
                    spacing={3}
                >
                    <Grid item>
                        <SeeMoreShroomsCard/>
                    </Grid>
                    <Grid item>
                        <SeeMoreLSDCard/>
                    </Grid>
                </Grid>
            </Container>
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