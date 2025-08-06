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
  
  // Mobile-specific video handling
  if (isMobile) {
    // For mobile devices, we need to handle autoplay differently
    heroVideo.addEventListener("loadstart", function() {
      // Try to play the video
      const playPromise = heroVideo.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(function(error) {
          console.log("Autoplay prevented:", error);
          // Show a play button or handle the fallback
          showVideoFallback();
        });
      }
    });
    
    // Handle touch events to start video
    heroVideo.addEventListener("touchstart", function() {
      if (heroVideo.paused) {
        heroVideo.play().catch(function(error) {
          console.log("Touch play failed:", error);
        });
      }
    });
    
    // Additional mobile video optimizations
    heroVideo.addEventListener("loadeddata", function() {
      // Video data is loaded, try to play
      if (heroVideo.paused) {
        heroVideo.play().catch(function(error) {
          console.log("Mobile video play failed:", error);
        });
      }
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
      heroVideo.load();
    });
    
  } else {
    // Desktop video handling
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
  
  // Handle video errors
  heroVideo.addEventListener("error", function() {
    console.log("Video error occurred");
    showVideoFallback();
  });
  
  // Function to show fallback when video fails
  function showVideoFallback() {
    const videoContainer = heroVideo.parentElement;
    const fallbackImg = videoContainer.querySelector('.thumbnail-img');
    if (fallbackImg) {
      fallbackImg.style.display = 'block';
      heroVideo.style.display = 'none';
    }
  }
  
  // Mobile-specific video loading optimization
  if (isMobile) {
    // Set video properties for better mobile performance
    heroVideo.setAttribute('webkit-playsinline', 'true');
    heroVideo.setAttribute('playsinline', 'true');
    heroVideo.setAttribute('muted', 'true');
    heroVideo.setAttribute('loop', 'true');
    
    // Try to load video with lower quality for mobile
    heroVideo.preload = 'metadata';
    
    // Handle mobile video loading timeout
    setTimeout(function() {
      if (heroVideo.readyState < 2) { // HAVE_CURRENT_DATA
        console.log("Mobile video loading timeout, showing fallback");
        showVideoFallback();
      }
    }, 5000); // 5 second timeout
  }
}



