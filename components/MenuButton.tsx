const MenuButton = (props: {
  menuVisible: boolean
  toggleMenu: () => void
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: 0,
        margin: '20px',

        zIndex: 1000,
      }}
    >
      <button
        type="button"
        onClick={() => {
          props.toggleMenu()
        }}
        style={{
          color: 'white',
          backgroundColor: 'transparent',
          outline: 'none',
          border: 'none',
        }}
      >
        {props.menuVisible ? 'close' : 'open'}
      </button>
    </div>
  )
}

export default MenuButton
