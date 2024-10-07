import * as THREE from 'three';

export const createPlayer = (position: THREE.Vector3, health: number, weapon: any) => {
  const geometry = new THREE.SphereGeometry(1, 32, 32); // Character as a sphere
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color for player
  const playerMesh = new THREE.Mesh(geometry, material);

  playerMesh.position.copy(position);

  // Attach weapon (represented as a simple line)
  const weaponGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(2, 0, 0)]);
  const weaponMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff }); // Light-blue weapon color
  const weaponLine = new THREE.Line(weaponGeometry, weaponMaterial);
  
  weaponLine.position.set(0, 0.5, 0); // Position weapon relative to the player
  playerMesh.add(weaponLine);

  return {
    mesh: playerMesh,
    health,
    weapon,
    position: playerMesh.position,
  };
};
