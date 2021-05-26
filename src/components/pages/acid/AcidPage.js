import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import NavBar from "../../reusable/NavBar";
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import ProductCard from "../../reusable/ProductCard";

/**
 * The styles for the React component.
 */
const useStyles = makeStyles(theme => {
    return {
        mainTitle: {
            fontFamily: "Montserrat-Black",
        },
        content: {
            marginTop: 50
        }
    };
});

/**
 * This is the shrooms marketplace page.
 * */
function AcidPage(props) {
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
                        {props.denominations.length === 0 ? undefined :
                            <ProductCard name={"Acid Tabs"}
                                         description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."}
                                         denominations={props.denominations}
                                         soldOut={true}
                            />
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

// Gets props from the redux store
const mapStateToProps = state => {
    const denominations = state.inventory.products.acid.denominations
    return {
        denominations
    };
};

export default connect(mapStateToProps)(AcidPage);