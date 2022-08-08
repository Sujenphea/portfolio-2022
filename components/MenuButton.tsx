const MenuButton = (props: {
  visible: boolean
  handleToggleMenu: () => void
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
          props.handleToggleMenu()
        }}
        style={{
          color: 'white',
        }}
      >
        {props.visible ? 'close' : 'open'}
      </button>
    </div>
  )
}

export default MenuButton
