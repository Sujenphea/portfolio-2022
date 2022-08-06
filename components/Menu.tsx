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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'transparent',
        color: 'white',
      }}
    >
      {/* immersive column */}
      <div
        style={{
          width: '300px',
          padding: '30px',

          textAlign: 'center',
        }}
      >
        <h1>Immersive</h1>
        <h3>Work</h3>
        <h3>Project</h3>
        <h3>About Me</h3>
      </div>
      {/* list column */}
      <div
        style={{
          width: '300px',
          padding: '30px',

          textAlign: 'center',
        }}
      >
        <h1>List</h1>
        <h3>Work</h3>
        <h3>Project</h3>
        <h3>About Me</h3>
      </div>
    </div>
  )
}

export default Menu
