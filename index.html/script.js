// GSAP initialization
gsap.registerPlugin(ScrollTrigger);

// Hero intro animation
gsap.from('.hero-content h1', { y: 50, opacity: 0, duration: 1, ease: 'power4.out' });
gsap.from('.hero-content p', { y: 30, opacity: 0, duration: 1, delay: 0.3 });
gsap.from('.cta-button', { scale: 0.8, opacity: 0, duration: 0.6, delay: 0.6 });

// Scroll animations for sections
document.querySelectorAll('.section').forEach(section => {
  gsap.from(section, {
    y: 60,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    },
  });
});

// Project cards animate-in
gsap.utils.toArray('.project-card').forEach((card, i) => {
  ScrollTrigger.create({
    trigger: card,
    start: 'top 85%',
    onEnter: () =>
      gsap.to(card, { y: 0, opacity: 1, duration: 0.8, delay: i * 0.2, ease: 'power2.out' }),
  });
});
const container = document.getElementById('three-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create a simple rotating geometry
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff, wireframe: true });
const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  knot.rotation.x += 0.005;
  knot.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
