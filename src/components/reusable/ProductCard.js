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

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
    },
    input: {
        height: 38,
    }
}));

export default function ProductCard() {
    const classes = useStyles();

    const [amount, setAmount] = React.useState(3.5);
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const [quantity, setQuantity] = React.useState(1);
    const handleQuantityChange = (event) => {
        setQuantity(quantity+event);
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
                        Raw B.C. Mushrooms
                    </Typography>
                    <Typography color="textSecondary" component="p">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
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
                                value={amount}
                                onChange={handleAmountChange}
                                className={classes.input}
                            >
                                <MenuItem value={3.5}>
                                    <Typography variant="body2" color={'textPrimary'}>
                                        3.5 grams
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={7}>
                                    <Typography variant="body2" color={'textPrimary'}>
                                        7 grams
                                    </Typography>
                                </MenuItem>
                                <MenuItem value={1}>
                                    <Typography variant="body2" color={'textPrimary'}>
                                        1 ounce
                                    </Typography>
                                </MenuItem>
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
                            <Button onClick={() => handleQuantityChange(-1)} className={classes.input}>-</Button>
                            <Button disabled style={{maxWidth: 40, minWidth: 40}} className={classes.input}>
                                <Typography variant="body2" color={'textPrimary'}>
                                    {quantity}
                                </Typography>
                            </Button>
                            <Button onClick={() => handleQuantityChange(1)} className={classes.input}>+</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item container md={12} lg={12} spacing={1} direction="column" alignItems={'flex-end'}>
                        <Grid item md={12} lg={12}>
                            <Typography variant="body1" color={'textPrimary'} align={'right'}>
                                $25.00
                            </Typography>
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