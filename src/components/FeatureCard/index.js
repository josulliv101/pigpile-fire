import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardActions, CardContent, CardHeader, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
// import logoImg from './logo-bw.png'
import Pigtail from '../../icons/Pigtail'

const styleSheet = theme => ({
  avatar: {
    color: theme.palette.grey[500],
    height: 42,
    width: 42,
  },
  card: {
    // maxWidth: 345,
    borderTop: `2px ${theme.palette.primary[500]} solid`,
    backgroundColor: '#fafafa',
  },
  header: {
    span: {
      lineHeight: '18px',
    },
  },
  btn: {
    // background: theme.palette.primary[500],
    // color: theme.palette.getContrastText(theme.palette.primary[500]),
    height: 40,
    margin: 0,
    padding: 0,
  },
  body2: {
    fontWeight: 100,
    textTransform: 'uppercase',
  },
  media: {
    height: 180,
    [theme.breakpoints.up('lg')]: {
      height: 200,
    },
  },
  accent: {
    // color: theme.palette.accent[500],
  },
})

function SimpleMediaCard(props) {
  const classes = props.classes
  const {disable, title, description, id, imageUrl, map} = props

  const style = {}
  if (map) style.border = 'none'
  console.log('img', imageUrl)
  return (
    <Card className={classes.card} style={style}>
      {
        !map &&
        <CardHeader
          className={classes.header}
          title={title}
          subheader={disable ? 'This pigpile is not yet active.' : 'Join 24 people'}
          avatar={<Pigtail className={classes.avatar} />}
        />
      }
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography type="body2" component="h2" className={classNames(classes.body2, classes.accent)}>
          autism, animals, boston
        </Typography>
        <Typography component="p" noWrap={true}>
          {description}
        </Typography>
      </CardContent>
      <CardActions style={{padding: '0 16px 16px'}}>
        {
          !map &&
          <Button component={Link} to={`/${id}`} className={classes.btn} raised color="primary" style={{width: '100%', boxShadow: 'none'}}>
            {disable ? 'Pigpile not Yet Active' : 'View Fundraiser'}
          </Button>
        }
        {
          map &&
          <Button  >
            {'Make Suggestion'}
          </Button>
        }
        {
          map &&
          <Button  >
            {'More Details'}
          </Button>
        }

      </CardActions>
    </Card>
  )
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(SimpleMediaCard)
