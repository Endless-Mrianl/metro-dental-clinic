'use strict';



/**
 * addEvent on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler = document.querySelector("[data-nav-toggler]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  navbarToggler.classList.toggle("active");
}

addEventOnElem(navbarToggler, "click", toggleNav);

const closeNav = function () {
  navbar.classList.remove("active");
  navbarToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNav);



/**
 * header active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * video background functionality
 */

const heroVideo = document.querySelector("#hero-video");

if (heroVideo) {
  // Detect if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  // Detect iOS specifically
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  // Function to show fallback when video fails
  function showVideoFallback() {
    const videoContainer = heroVideo.parentElement;
    const fallbackImg = videoContainer.querySelector('.thumbnail-img');
    if (fallbackImg) {
      fallbackImg.style.display = 'block';
      heroVideo.style.display = 'none';
    }
  }
  
  // Function to attempt video playback
  function attemptVideoPlay() {
    if (heroVideo.paused) {
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(function(error) {
          console.log("Video play failed:", error);
          // On mobile, show fallback if autoplay is blocked
          if (isMobile) {
            showVideoFallback();
          }
        });
      }
    }
  }
  
  // iOS-specific video handling
  if (isIOS) {
    console.log("iOS device detected, applying iOS-specific video optimizations");
    
    // Set iOS-specific video attributes
    heroVideo.setAttribute('playsinline', 'true');
    heroVideo.setAttribute('webkit-playsinline', 'true');
    heroVideo.setAttribute('muted', 'true');
    heroVideo.setAttribute('autoplay', 'autoplay');
    heroVideo.setAttribute('loop', 'true');
    
    // iOS Safari requires user interaction for autoplay
    let userInteracted = false;
    
    // Track user interaction
    function markUserInteraction() {
      userInteracted = true;
      console.log("User interaction detected on iOS");
    }
    
    // Add event listeners for user interaction
    document.addEventListener('touchstart', markUserInteraction, { once: true });
    document.addEventListener('touchend', markUserInteraction, { once: true });
    document.addEventListener('click', markUserInteraction, { once: true });
    document.addEventListener('scroll', markUserInteraction, { once: true });
    
    // iOS-specific video event handling
    heroVideo.addEventListener("loadstart", function() {
      console.log("Video loadstart on iOS");
      if (userInteracted) {
        setTimeout(attemptVideoPlay, 100);
      }
    });
    
    heroVideo.addEventListener("loadedmetadata", function() {
      console.log("Video metadata loaded on iOS");
      if (userInteracted) {
        setTimeout(attemptVideoPlay, 200);
      }
    });
    
    heroVideo.addEventListener("loadeddata", function() {
      console.log("Video data loaded on iOS");
      if (userInteracted) {
        setTimeout(attemptVideoPlay, 300);
      }
    });
    
    // Handle touch events specifically for iOS
    heroVideo.addEventListener("touchstart", function(e) {
      console.log("Touch event on video (iOS)");
      markUserInteraction();
      attemptVideoPlay();
    });
    
    heroVideo.addEventListener("touchend", function(e) {
      console.log("Touch end on video (iOS)");
      markUserInteraction();
      attemptVideoPlay();
    });
    
    // Handle click events for iOS
    heroVideo.addEventListener("click", function() {
      console.log("Click event on video (iOS)");
      markUserInteraction();
      attemptVideoPlay();
    });
    
    // iOS-specific error handling
    heroVideo.addEventListener("error", function(e) {
      console.log("iOS video error:", e);
      showVideoFallback();
    });
    
    // iOS-specific stalled handling
    heroVideo.addEventListener("stalled", function() {
      console.log("Video stalled on iOS");
      if (userInteracted) {
        setTimeout(() => {
          heroVideo.load();
          setTimeout(attemptVideoPlay, 500);
        }, 1000);
      }
    });
    
    // Try to play after user interaction with delays
    setTimeout(() => {
      if (userInteracted) {
        attemptVideoPlay();
      }
    }, 2000);
    
    // Additional iOS optimization: try to play when page becomes visible
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden && userInteracted) {
        attemptVideoPlay();
      }
    });
    
  } else if (isMobile) {
    // Android mobile video handling
    console.log("Android mobile device detected, applying mobile video optimizations");
    
    // Set mobile-specific video attributes
    heroVideo.setAttribute('playsinline', 'true');
    heroVideo.setAttribute('webkit-playsinline', 'true');
    heroVideo.setAttribute('x5-playsinline', 'true');
    
    // Try to play video when it's loaded
    heroVideo.addEventListener("loadstart", function() {
      console.log("Video loadstart on mobile");
      setTimeout(attemptVideoPlay, 100);
    });
    
    // Try to play when metadata is loaded
    heroVideo.addEventListener("loadedmetadata", function() {
      console.log("Video metadata loaded on mobile");
      setTimeout(attemptVideoPlay, 200);
    });
    
    // Try to play when data is loaded
    heroVideo.addEventListener("loadeddata", function() {
      console.log("Video data loaded on mobile");
      setTimeout(attemptVideoPlay, 300);
    });
    
    // Handle touch events to start video
    heroVideo.addEventListener("touchstart", function() {
      console.log("Touch event on video");
      attemptVideoPlay();
    });
    
    // Handle click events (for some mobile browsers)
    heroVideo.addEventListener("click", function() {
      console.log("Click event on video");
      attemptVideoPlay();
    });
    
    // Handle mobile video errors more gracefully
    heroVideo.addEventListener("error", function(e) {
      console.log("Mobile video error:", e);
      showVideoFallback();
    });
    
    // Handle mobile video loading issues
    heroVideo.addEventListener("stalled", function() {
      console.log("Video stalled on mobile");
      // Try to reload the video
      setTimeout(() => {
        heroVideo.load();
        setTimeout(attemptVideoPlay, 500);
      }, 1000);
    });
    
    // Additional mobile optimization: try to play after a delay
    setTimeout(attemptVideoPlay, 1000);
    
  } else {
    // Desktop video handling
    console.log("Desktop device detected");
    
    // Wait for video to be loaded
    heroVideo.addEventListener("loadedmetadata", function() {
      // Set video to start from 20 seconds
      heroVideo.currentTime = 20;
    });

    // Fallback: if loadedmetadata doesn't fire, try on canplay
    heroVideo.addEventListener("canplay", function() {
      if (heroVideo.currentTime < 20) {
        heroVideo.currentTime = 20;
      }
    });

    // Ensure video starts from 20 seconds when it starts playing
    heroVideo.addEventListener("play", function() {
      if (heroVideo.currentTime < 20) {
        heroVideo.currentTime = 20;
      }
    });
  }
  
  // Handle video errors for all devices
  heroVideo.addEventListener("error", function() {
    console.log("Video error occurred");
    showVideoFallback();
  });
  
  // Handle video abort
  heroVideo.addEventListener("abort", function() {
    console.log("Video aborted");
    showVideoFallback();
  });
}



