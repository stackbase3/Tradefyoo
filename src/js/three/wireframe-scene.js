import * as THREE from 'three';

export function initWireframeLandscape() {
  const container = document.getElementById('three-wireframe-container');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050505);

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 5.5, 11);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  // Procedural curved wave wireframe plane matching reference
  const width = 16;
  const height = 16;
  const segments = 36;
  const planeGeometry = new THREE.PlaneGeometry(width, height, segments, segments);
  planeGeometry.rotateX(-Math.PI / 2);

  const pos = planeGeometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    // Smooth mathematical wave terrain
    const y = Math.sin(x * 0.45) * Math.cos(z * 0.45) * 1.2 + Math.sin(z * 0.3) * 0.6;
    pos.setY(i, y);
  }
  planeGeometry.computeVertexNormals();

  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x444444,
    wireframe: true,
    transparent: true,
    opacity: 0.38
  });
  const landscape = new THREE.Mesh(planeGeometry, wireframeMaterial);
  scene.add(landscape);

  // Spheres suspended above terrain with chrome/silver sheen
  const sphereGeom = new THREE.SphereGeometry(0.7, 32, 32);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.9,
    roughness: 0.15
  });

  const sphere1 = new THREE.Mesh(sphereGeom, sphereMat);
  sphere1.position.set(-2.8, 2.8, 1);
  scene.add(sphere1);

  const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.45, 32, 32), sphereMat);
  sphere2.position.set(2.2, 1.8, 2);
  scene.add(sphere2);

  const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), sphereMat);
  sphere3.position.set(-0.5, 3.8, -1.5);
  scene.add(sphere3);

  // Lighting
  const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
  dirLight.position.set(5, 12, 8);
  scene.add(dirLight);

  let isVisible = true;
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  observer.observe(container);

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;
    const t = clock.getElapsedTime();

    // Gentle hovering physics
    sphere1.position.y = 2.8 + Math.sin(t * 1.2) * 0.22;
    sphere2.position.y = 1.8 + Math.cos(t * 1.4) * 0.18;
    sphere3.position.y = 3.8 + Math.sin(t * 0.9) * 0.15;

    landscape.rotation.y = Math.sin(t * 0.1) * 0.04;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
