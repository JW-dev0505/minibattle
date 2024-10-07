"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createPlayer, createEnemy, createProjectile } from '@/components';

const GameInterface: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  let player: any;
  const enemies: any[] = [];
  const projectiles: any[] = [];
  let keys: { [key: string]: boolean } = {};

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

   // Skybox
   const skyColor = new THREE.Color(0x87CEEB); // Light blue sky
   scene.background = skyColor;

   // Ground plane
   const groundGeometry = new THREE.PlaneGeometry(100, 100);
   const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 }); // Green for ground
   const ground = new THREE.Mesh(groundGeometry, groundMaterial);
   ground.rotation.x = -Math.PI / 2;
   scene.add(ground);

   // Stones and Woods as obstacles
   const createObstacle = (size: number, color: number, position: THREE.Vector3) => {
     const geometry = new THREE.BoxGeometry(size, size, size);
     const material = new THREE.MeshBasicMaterial({ color });
     const obstacle = new THREE.Mesh(geometry, material);
     obstacle.position.copy(position);
     return obstacle;
   };

   const stone = createObstacle(3, 0x808080, new THREE.Vector3(5, 1.5, 5)); // Stone obstacle
   const wood = createObstacle(2, 0x8B4513, new THREE.Vector3(-5, 1, -5)); // Wood obstacle
   scene.add(stone);
   scene.add(wood);

    // Create player
    const playerHealth = 100;
    const playerWeapon = { type: 'gun', power: 10 };
    player = createPlayer(new THREE.Vector3(0, 0, 0), playerHealth, playerWeapon);
    scene.add(player.mesh);

    // Add enemies
    const enemyHealth = 50;
    const enemyWeapon = { type: 'laser', power: 5 };
    const enemy1 = createEnemy(new THREE.Vector3(10, 0, 10), player.position, enemyHealth, enemyWeapon);
    const enemy2 = createEnemy(new THREE.Vector3(-10, 0, -10), player.position, enemyHealth, enemyWeapon);
    enemies.push(enemy1, enemy2);
    scene.add(enemy1.mesh);
    scene.add(enemy2.mesh);

    // Set camera for top-down view
    camera.position.set(0, 50, 50);
    camera.lookAt(0, 0, 0);

    // Handle player movement based on key events
    const movePlayer = () => {
      if (keys['ArrowUp']) player.mesh.position.z -= 0.2;
      if (keys['ArrowDown']) player.mesh.position.z += 0.2;
      if (keys['ArrowLeft']) player.mesh.position.x -= 0.2;
      if (keys['ArrowRight']) player.mesh.position.x += 0.2;
    };

    const shootProjectile = (origin: THREE.Vector3, direction: THREE.Vector3) => {
      const projectile = createProjectile(origin, direction.normalize(), 0.5); // Bullet with speed 0.5
      projectiles.push(projectile);
      scene.add(projectile.mesh);
    };

    // Animate function for rendering
    const animate = () => {
      requestAnimationFrame(animate);
      movePlayer();

      // Update projectiles
      projectiles.forEach((projectile, index) => {
        projectile.update();

        // Remove projectile if it goes off-screen
        if (projectile.mesh.position.length() > 50) {
          scene.remove(projectile.mesh);
          projectiles.splice(index, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Mouse aiming and shooting
    window.addEventListener('mousemove', (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      player.mesh.rotation.y = Math.atan2(mouseY, mouseX); // Aim the player in the direction of the mouse
    });

    window.addEventListener('click', () => {
      // Shoot when player clicks
      const direction = new THREE.Vector3(1, 0, 0).applyQuaternion(player.mesh.quaternion);
      shootProjectile(player.mesh.position.clone(), direction);
    });

    // Key events for movement
    window.addEventListener('keydown', (event) => {
      keys[event.key] = true;
    });

    window.addEventListener('keyup', (event) => {
      keys[event.key] = false;
    });

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', () => {});
      window.removeEventListener('click', () => {});
      window.removeEventListener('keydown', () => {});
      window.removeEventListener('keyup', () => {});
    };
  }, []);

  return <div ref={canvasRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default GameInterface;
