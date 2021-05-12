import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
    },
    input: {
        height: 38,
    }
}));

export default function ProductCard(props) {
    const classes = useStyles();

    const [quantity, setQuantity] = React.useState(1);
    const [cost, setCost] = React.useState(props.denominations[0].price);
    const [denomination, setDenomination] = React.useState(props.denominations[0].type);

    const getDenominationCost = (denomination) => {
        for (let i = 0; i < props.denominations.length; i++)
            if (props.denominations[i].type === denomination)
                return props.denominations[i].price;
    }
    const getDenominationAmount = (denomination) => {
        for (let i = 0; i < props.denominations.length; i++)
            if (props.denominations[i].type === denomination)
                return props.denominations[i].amount;
    }

    const handleQuantityChange = (quantityChange) => {
        setQuantity(quantity+quantityChange);
        // Cost must be recalculated upon quantity change
        setCost((cost+quantityChange*getDenominationCost(denomination)))
    };

    const handleDenominationChange = (event) => {
        setDenomination(event.target.value);
        // Quantity and cost must be reset upon denomination change
        setQuantity(1);
        setCost(getDenominationCost(event.target.value))
    };

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image="/images/confused-mushroom-4-md.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {props.name}
                    </Typography>
                    <Typography color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Grid container alignItems={"center"} spacing={1} justify={'space-between'}>
                    <Grid item>
                        <FormControl variant="outlined" size={'small'} style={{minWidth: 120}}>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={denomination}
                                onChange={handleDenominationChange}
                                className={classes.input}
                            >
                                {
                                    props.denominations.map(d => (
                                        <MenuItem value={d.type} key={d.type}>
                                            <Typography variant="body2" color={'textPrimary'}>
                                                {d.type}
                                            </Typography>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Typography variant="button" color={'textSecondary'} className={classes.input}>
                            Quantity
                        </Typography>
                    </Grid>
                    <Grid item>
                        <ButtonGroup disableElevation variant="outlined">
                            <Button
                                onClick={() => handleQuantityChange(-1)}
                                className={classes.input}
                                disabled={quantity === 1}
                            >
                                -
                            </Button>
                            <Button disabled
                                    style={{maxWidth: 40, minWidth: 40}}
                                    className={classes.input}>
                                <Typography variant="body2" color={'textPrimary'}>
                                    {quantity}
                                </Typography>
                            </Button>
                            <Button
                                onClick={() => handleQuantityChange(1)}
                                className={classes.input}
                                disabled={getDenominationAmount(denomination) === quantity}
                            >
                                +
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item container md={12} lg={12} spacing={1} direction={"column"} alignItems={'flex-end'}>
                        <Grid item container spacing={1} direction={'row'} justify={'flex-end'} alignItems={"center"}>
                            <Grid item>
                                <Typography variant="subtitle1" color={'textSecondary'} align={'right'} hidden={quantity === 1}>
                                    ${getDenominationCost(denomination).toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color={'textPrimary'} align={'right'}>
                                    ${cost.toFixed(2)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Button disableElevation variant={'contained'} color={'primary'} style={{minWidth: 170, marginBottom: 5}}>
                                Add to cart
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}

ProductCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    denominations: PropTypes.array.isRequired,
};