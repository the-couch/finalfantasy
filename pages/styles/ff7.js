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
    color: 'white',
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

let finalLocation = css({
  color: 'rgba(255,255,255,8)',
  padding: 8,
  textAlign: 'left',
  fontSize: '.9rem',
  width: 300,
  position: 'absolute',
  bottom: -14,
  right: 0
})

let finalUsers = css({
  fontSize: '.9rem',
  padding: '20px 40px',
  width: 440,
  '& .wrapper': {
    display: 'flex'
  }
})

let limit = css({
  paddingLeft: 6,
  fontSize: '.8rem',
  width: 110
})

let limitBlock = css({
  paddingBottom: 6
})

let limitBox = css(
  {
    background: 'linear-gradient(rgb(63,63,69) 0%, rgb(104,104,114))',
    border: '2px solid rgb(193,196,203)',
    borderRadius: 2,
    position: 'relative',
    height: 12,
    marginTop: 3,
    marginLeft: 20,
    boxShadow: 'inset 0 0 10px rgba(0,0,0)',
    '& span': {
      position: 'absolute',
      height: 8,
      left: 0,
      top: 0,
      background: '#97534c',
      background: 'linear-gradient(to bottom, #97534c 0%, #e3c5ca 33%,#c17ba6 100%)'
    }
  },
  after({
    position: 'absolute',
    content: '""',
    borderRadius: 2,
    width: 'calc(100% + 2px)',
    height: 'calc(100% + 2px)',
    top: -2,
    left: -2,
    border: '1px solid rgb(125, 120, 124)'
  })
)

let blueGrad = css({
  background: 'linear-gradient(rgb(14,12,171) 0%, rgb(13,13,83) 100%)',
})

module.exports = {
  wrapper,
  final,
  finalMenu,
  finalLocation,
  finalInfo,
  finalUsers,
  limit,
  limitBlock,
  limitBox,
  blueGrad
}
