// import { OrbitControls } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function CameraControls() {
  const { camera, gl } = useThree()

  return (
    <OrbitControls
      args={[camera, gl.domElement]}
      enableZoom
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
      zoomSpeed={0.2}
      enableRotate
      maxPolarAngle={Math.PI * 0.75}
      minPolarAngle={Math.PI * 0.25}
      autoRotate
      autoRotateSpeed={-0.5}
      maxZoom={200}
      minZoom={1}
    />
  )
}

// default prop values
CameraControls.defaultProps = {
  zoomIn: false,
}

export default CameraControls
