import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import NavBar from "../../reusable/NavBar";
import Grid from "@material-ui/core/Grid";
import {Container, Typography} from "@material-ui/core";


/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        content: {
            marginTop: 75
        }
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
            <Container className={classes.content}>
                <Grid
                    container
                    justify={'center'}
                    alignItems={'center'}
                    spacing={3}
                >
                    <Grid item>
                        <img src='/images/confused-mushroom-4-md.png' />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}/>
                    <Grid item>
                        <Typography variant="h6" gutterBottom>
                            The page you requested does not exist
                        </Typography>
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

export default connect(mapStateToProps)(NoMatchPage);