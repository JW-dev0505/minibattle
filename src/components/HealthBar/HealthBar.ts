import * as THREE from 'three';

interface HealthBarProps {
  position: THREE.Vector3;
  maxHealth: number;
  currentHealth: number;
}

export const createHealthBar = (position: THREE.Vector3, maxHealth: number, currentHealth: number) => {
  const healthBarGroup = new THREE.Group();

  // Bar background (Red - for empty health)
  const backgroundGeometry = new THREE.PlaneGeometry(1, 0.1);
  const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red for background
  const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
  background.position.set(0, 0.6, 0); // Position above character's head
  healthBarGroup.add(background);

  // Health bar (Green - for current health)
  const healthGeometry = new THREE.PlaneGeometry(1 * (currentHealth / maxHealth), 0.1);
  const healthMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green for current health
  const health = new THREE.Mesh(healthGeometry, healthMaterial);
  health.position.set((1 - (currentHealth / maxHealth)) / -2, 0.6, 0); // Offset the health bar to the left as it decreases
  healthBarGroup.add(health);

  // Set the health bar position above the character's head
  healthBarGroup.position.copy(position);

  return healthBarGroup;
};
