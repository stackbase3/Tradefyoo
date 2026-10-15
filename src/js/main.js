/**
 * ==============================================================================
 * JARVIS — AI TRADING ASSISTANT
 * Main Application Orchestrator & Entry Point
 * ==============================================================================
 */

// Core Modules
import { CONFIG } from './config.js';
import { initNavigation } from './navigation.js';
import { enforceAbsoluteMute } from './mute-audio-guard.js';
import { initVideoManager } from './video-manager.js';
import { initAuth } from './auth.js';
import { initAnimations } from './animations.js';

// Three.js 3D Visual Engines
import { initHeroScene } from './three/hero-scene.js';
import { initWireframeLandscape } from './three/wireframe-scene.js';

/**
 * WebGL Capability Check
 * Checks if the user's browser/hardware supports WebGL before booting 3D scenes.
 */
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * Smooth Scroll Handler for Anchor Links
 * Ensures consistent smooth scrolling across older browsers.
 */
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Dynamic Footer Year Updater
 */
function updateCopyrightYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/**
 * Main Application Bootstrap
 */
function initJarvisApp() {
  console.log(
    `%c[${CONFIG.BRAND.name}]%c Initializing ${CONFIG.BRAND.category}...`,
    'color: #ffffff; background: #0c0c0c; font-weight: bold; padding: 2px 6px; border-radius: 4px; border: 1px solid #333;',
    'color: #a3a3a3; font-weight: normal;'
  );

  // 1. Audio Mute Guard: Sabse pehle run karein taaki video music ka 1 second bhi na baje
  try {
    enforceAbsoluteMute();
  } catch (error) {
    console.warn('[AudioGuard] Fallback triggered:', error);
  }

  // 2. Navigation bar scroll effects aur mobile hamburger menu
  initNavigation();

  // 3. Video autoplay & viewport observer (IntersectionObserver)
  initVideoManager();

  // 4. Authentication modal (Sign In / Sign Up / Reset Password)
  initAuth();

  // 5. Accordion animations (FAQ) & Demo Walkthrough Modal
  initAnimations();

  // 6. Smooth anchor scrolling
  setupSmoothScrolling();

  // 7. Dynamic copyright year in footer
  updateCopyrightYear();

  // 8. Three.js Procedural Scenes Initialization
  if (isWebGLAvailable()) {
    try {
      // Hero ambient particle field
      initHeroScene();

      // Procedural 3D wireframe mesh with floating spheres (Performance Section)
      initWireframeLandscape();

      console.log('[ThreeJS] 3D procedural engines initialized successfully.');
    } catch (threeError) {
      console.warn('[ThreeJS] 3D initialization warning:', threeError);
    }
  } else {
    console.info('[ThreeJS] WebGL not supported on this device. Fallback CSS visuals active.');
  }
}

// Ensure execution happens after DOM is fully parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initJarvisApp);
} else {
  initJarvisApp();
}
