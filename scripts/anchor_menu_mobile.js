// Move anchor menu up to the navbar
// Ref for gsap params: https://gsap.com/docs/v3/GSAP/CorePlugins/CSS

const anchorMenuMover = $(".anchor-menu-mobile-mover");
const ease = 'power2.inOut';
const startPos = 'top top+=400';
const endPos = 'top';
const duration = 1000;
const scrub = true;
const markers = false;

// The reason these are in reverse order is because the "from" parameter proactively sets the element to 
// that to start with, so we start with 0% as the start.

gsap.fromTo(anchorMenuMover, { yPercent: -60, }, {
  // Projects - Expertise
  yPercent: -80,
  ease: ease,
  scrollTrigger: {
    trigger: $(".expertise__section"),
    start: startPos,                      // Top of element hits middle of screen
    end: endPos,                           // Top of element hits top of screen
    duration: duration,
    scrub: scrub,
    markers: false,
  }
});
gsap.fromTo(anchorMenuMover, { yPercent: -40, }, {
  // Ethos - Projects
  yPercent: -60, 
  ease: ease,
  scrollTrigger: {
    trigger: $(".projects__section"),
    start: startPos,                      // Top of element hits middle of screen
    end: endPos,                           // Top of element hits top of screen
    duration: duration,
    scrub: scrub,
    markers: false,
  }
});
gsap.fromTo(anchorMenuMover, { yPercent: -20, }, {
  // Clients - Ethos
  yPercent: -40,
  ease: ease,
  scrollTrigger: {
    trigger: $(".core__content-wrapper"),
    start: startPos,                      // Top of element hits middle of screen
    end: endPos,                           // Top of element hits top of screen
    duration: duration,
    scrub: scrub,
    markers: false,
  }
});
gsap.fromTo(anchorMenuMover, { yPercent: 0, }, {
  // Welcome - Clients
  yPercent: -20,
  ease: ease,
  scrollTrigger: {
    trigger: $(".clients__content"),
    start: startPos,                      // Top of element hits middle of screen
    end: endPos,                           // Top of element hits top of screen
    duration: duration,
    scrub: scrub,
    markers: false,
  }
});