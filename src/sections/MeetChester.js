import React, {PureComponent} from 'react'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import {withStyles} from 'material-ui/styles'
import Star from 'material-ui-icons/FlashOn' // Cloud
//
import {Subheading, Title} from '../components/Text'

const styles = (theme) => ({
  root: {
    background: 'rgb(68, 79, 95)',
    color: theme.palette.common.white,
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
  },
  blurb: {
    marginBottom: theme.spacing.unit * 2,
    position: 'relative',
    top: -4,
  },
  chester: {
    background: 'rgb(110, 118, 129)', // rgb(106, 143, 138)', //  'rgb(94, 148, 188)', // 'rgb(158, 162, 169)',
    border: '14px rgba(69, 80, 96, 0.45) solid', // 14px rgba(75, 146, 214, 0.82) solid', //  '14px rgba(11, 77, 130, 0.15) solid', //  '14px rgb(104, 111, 122) solid',
    borderRadius: '50%',
    height: 240,
    margin: `0 auto ${theme.spacing.unit * 0}px`,
    overflow: 'hidden',
    position: 'relative',
    width: 240,
    '&>div': {
      backgroundImage: `url(${theme.components.img.chester})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      height: 136,
      opacity: .94,
      position: 'relative',
      transform: 'translate(38%,30%)',
      width: 136,
      zIndex: 1,
    },
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
    opacity: .6,
  },
  [theme.breakpoints.up(748)]: {

  },
  [theme.breakpoints.up(948)]: {

  },
})


class MeetChesterSection extends PureComponent {

  render() {
    const {classes: cls, className} = this.props;
  	return (
      <section className={classNames(cls.root, className)}>
        <main>
          <Grid alignItems="center" container>
            <Grid item xs={8}>
              <Title className={cls.title} heavy>Pigpile's the trusted source in online fundraising.</Title>
              <Subheading className={cls.blurb}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </Subheading>
              <Subheading className={cls.blurb}>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </Subheading>
            </Grid>
            <Grid item xs={4}>
              {/*<Title align="center" className={cls.tagline} xlheavy>
                Pigpile's the trusted source in online fundraising.
              </Title>*/}
              <div className={cls.chester}><div/><Star style={{transform: 'rotate(-154deg)', margin: '-50%',color: 'rgba(255, 255, 255, 0.1)', opacity: 1, zIndex: 0, position: 'absolute', top: 0, left: 0, height: '200%', width: '200%'}} /></div>
            </Grid>
          </Grid>
        </main>
      </section>
  	)
  }
}

export default compose(
  withStyles(styles),
)(MeetChesterSection);
