import ToggleButton from './ToggleButton'

const Menu = (props: { visible: boolean }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,

        zIndex: 1,

        width: '100vw',
        height: '100vh',

        display: props.visible ? 'flex' : 'none',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'transparent',
        color: 'white',
      }}
    >
      <ToggleButton
        style={{
          position: 'relative',
          width: '100px',
          height: '50px',
        }}
        leftText="immersive"
        rightText="glance"
      />
      <div
        style={{
          width: '300px',
          padding: '30px',

          textAlign: 'center',
        }}
      >
        <h2>Work</h2>
        <h2>Project</h2>
        <h2>About Me</h2>
      </div>
    </div>
  )
}

export default Menu
