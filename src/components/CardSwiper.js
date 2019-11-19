import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: '100%',
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}));

function SwipeableTextMobileStepper(props) {
  const pokSprite = [
    {
      label: 'front_default',
      imgPath: props.sprites.front_default
    },
    {
      label: 'back_default',
      imgPath: props.sprites.back_default,
    },
    {
      label: 'front_shiny',
      imgPath: props.sprites.front_shiny
    },
    {
      label: 'front_female',
      imgPath: props.sprites.front_female
    },
    {
      label: 'front_shiny_female',
      imgPath: props.sprites.front_shiny_female
    },
    {
      label: 'back_female',
      imgPath: props.sprites.back_female,
    },
    {
      label: 'back_shiny',
      imgPath: props.sprites.back_shiny,
    },
    {
      label: 'back_shiny_female',
      imgPath: props.sprites.back_shiny_female,
    },
  ];
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = pokSprite.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };
  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{pokSprite[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {pokSprite.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 && step.imgPath!= null ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default SwipeableTextMobileStepper;