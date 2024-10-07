import * as THREE from 'three';

export const createEnemy = (position: THREE.Vector3, targetPosition: THREE.Vector3, health: number, weapon: any) => {
  const geometry = new THREE.SphereGeometry(1, 32, 32); // Character as a sphere
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue color for enemies
  const enemyMesh = new THREE.Mesh(geometry, material);

  enemyMesh.position.copy(position);

  // Attach weapon (represented as a simple line aiming at the player)
  const weaponGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 0, 0)]);
  const weaponMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff }); // Light-blue weapon color
  const weaponLine = new THREE.Line(weaponGeometry, weaponMaterial);

  weaponLine.position.set(0, 0.5, 0); // Position weapon relative to the enemy
  enemyMesh.add(weaponLine);

  return {
    mesh: enemyMesh,
    health,
    weapon,
    position: enemyMesh.position,
  };
};
