import * as THREE from 'three';

interface ProjectileProps {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
}

export const createProjectile = (position: THREE.Vector3, direction: THREE.Vector3, speed: number) => {
  const geometry = new THREE.SphereGeometry(0.2, 8, 8); // Small sphere as a bullet
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red bullet
  const projectile = new THREE.Mesh(geometry, material);

  projectile.position.copy(position);

  return {
    mesh: projectile,
    direction,
    speed,
    update: () => {
      projectile.position.addScaledVector(direction, speed);
    },
  };
};
