// Move anchor menu up to the navbar
gsap.to($(".anchor-menu-wrapper"), {
  y: () => -(window.innerHeight - 150),       // static offset that lines up for now. navbar.offsetHeight
  ease: 'power2.inOut',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',                         // Start animation on scroll start
    end: '300px top',                         // Stop moving after 300px scroll
    scrub: false,                             // We want it to animate vs. scrub
    markers: true,                            // Add markers to debug
  }
});

// Fade out the logo as the menu rises
gsap.to($(".logo_gskinner"), {
  opacity: 0,                                 // Fade out the logo
  duration: 0.5,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: 'body',
    start: '150px top',                       // Start fading after scrolling 150px
    end: '300px top',                         // Fully fade out by 300px
    scrub: true,
    markers: true,
  }
});