import { css, after, media, select as $ } from 'glamor'


let wrapper = css({
  transition: 'all .25s',
  padding: 20,
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  background: 'black'
})

let final = css({
  userSelect: 'none',
  position: 'relative',
  zIndex: 10,
  width: 500
})

let finalMenu = css(
  {
    border: '2px solid rgb(193,196,203)',
    borderRadius: 2,
    fontFamily: 'Source Code Pro',
    position: 'relative',
    boxShadow: 'inset 0 0 10px rgb(16,18,93)'
  },
  after({
    content: '""',
    position: 'absolute',
    borderRadius: 2,
    width: 'calc(100% + 2px)',
    height: 'calc(100% + 2px)',
    top: -2,
    left: -2,
    border: '1px solid rgb(125, 120, 124)'
  })
)

let finalInfo = css({
  position: 'absolute',
  right: 0,
  bottom: 20,
  width: 96,
  padding: '6px 4px',
  color: 'white',
  fontSize: '.8rem',
  '& strong': {
    fontWeight: 'strong'
  },
  '& .wrapper': {
    padding: '3px 0',
    display: 'flex',
    justifyContent: 'space-between'
  }
})

let blueGrad = css({
  background: 'linear-gradient(rgb(14,12,171) 0%, rgb(13,13,83) 100%)',
})

module.exports = {
  wrapper,
  final,
  finalMenu,
  finalInfo,
  blueGrad
}
