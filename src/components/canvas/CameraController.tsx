import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

interface CameraControllerProps {
  selectedPosition: [number, number, number] | null
  resetTrigger: number
}

const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 4, 14)
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0)

export function CameraController({
  selectedPosition,
  resetTrigger,
}: CameraControllerProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { camera } = useThree()

  const targetLookAt = useRef(DEFAULT_TARGET.clone())
  const targetCamPos = useRef(DEFAULT_CAMERA_POS.clone())
  const isInterpolating = useRef(false)

  // Trigger camera reset to overview
  useEffect(() => {
    if (resetTrigger > 0) {
      targetLookAt.current.copy(DEFAULT_TARGET)
      targetCamPos.current.copy(DEFAULT_CAMERA_POS)
      isInterpolating.current = true
    }
  }, [resetTrigger])

  // Move camera smoothly toward selected node
  useEffect(() => {
    if (selectedPosition) {
      const nodePos = new THREE.Vector3(...selectedPosition)
      targetLookAt.current.copy(nodePos)

      // Position camera at a polite distance aligned with the view direction
      const currentDir = new THREE.Vector3()
        .subVectors(camera.position, controlsRef.current?.target || DEFAULT_TARGET)
        .normalize()

      // Keep comfortable viewing distance (e.g., 6.5 units away)
      const newPos = nodePos.clone().add(currentDir.multiplyScalar(6.5))
      // Ensure vertical clearance
      if (newPos.y < nodePos.y + 1.2) {
        newPos.y = nodePos.y + 1.8
      }
      targetCamPos.current.copy(newPos)
      isInterpolating.current = true
    }
  }, [selectedPosition, camera])

  useFrame((_, delta) => {
    if (!controlsRef.current) return

    if (isInterpolating.current) {
      const controls = controlsRef.current

      // Lerp camera position
      camera.position.lerp(targetCamPos.current, delta * 3.5)
      // Lerp orbit target
      controls.target.lerp(targetLookAt.current, delta * 3.5)
      controls.update()

      // Stop interpolating when close enough
      const posDist = camera.position.distanceTo(targetCamPos.current)
      const targetDist = controls.target.distanceTo(targetLookAt.current)

      if (posDist < 0.05 && targetDist < 0.05) {
        isInterpolating.current = false
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      minDistance={3.5}
      maxDistance={35}
      maxPolarAngle={Math.PI / 2 + 0.3} // Prevent going too far underneath
      onStart={() => {
        // User manually interacted, pause auto-lerping
        isInterpolating.current = false
      }}
    />
  )
}
