/**
 * Mute Audio Guard
 * Yeh file kisi bhi video element ka audio hardware level par mute aur disable kar deti hai.
 * Video me kitna bhi tez music ho, browser use play hi nahi hone dega.
 */
export function enforceAbsoluteMute() {
  const videos = document.querySelectorAll('video');

  videos.forEach((video) => {
    // 1. Native HTML5 mute properties enforce karein
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    // 2. Agar user kisi tarah un-mute karne ki koshish kare, toh foran dobara mute karein
    video.addEventListener('volumechange', () => {
      if (!video.muted || video.volume > 0) {
        video.muted = true;
        video.volume = 0;
      }
    });

    // 3. Browser ke AudioTracks API se saare audio channels disable karein (Chrome / Safari / Edge)
    if (video.audioTracks) {
      for (let i = 0; i < video.audioTracks.length; i++) {
        video.audioTracks[i].enabled = false;
      }
    }

    // 4. Web Audio API Guard (Fail-safe: Gain Node ko Zero par lock karein)
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(video);
        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime); // Sound level = 0
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
      }
    } catch (e) {
      // Audio node already attached or restricted by browser policy
    }
  });
}
