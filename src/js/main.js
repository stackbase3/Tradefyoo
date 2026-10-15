import { initNavigation } from './navigation.js';
import { initVideoManager } from './video-manager.js';
import { initAuth } from './auth.js';
import { initAnimations } from './animations.js';
import { initWireframeLandscape } from './three/wireframe-scene.js';
import { initHeroScene } from './three/hero-scene.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initVideoManager();
  initAuth();
  initAnimations();

  // Three.js instances with WebGL fallback checks
  try {
    initHeroScene();
    initWireframeLandscape();
  } catch (err) {
    console.warn('WebGL is disabled or unsupported. Static fallback active.', err);
  }
});
