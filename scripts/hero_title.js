// Move anchor menu up to the navbar
const duration = 0.5;
let titleTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: $("body"),
    start: 'top top',                         // Start animation on scroll start
    end: '300px top',                         // Stop moving after 300px scroll
    scrub: false,                             // We want it to animate vs. scrub
    //markers: true,                            // Add markers to debug
    toggleActions: 'play none none reverse',
  }
});

titleTimeline
  .from(
    $(".anchor-menu-wrapper"), 
    {
      y: () => 0,       // static offset that lines up for now. navbar.offsetHeight
      duration: duration,
      ease: 'power2.inOut',
    }, 
    0
  ).to(
    $(".anchor-menu-wrapper"),
    {
      y: () => -(window.innerHeight - 150),       // static offset that lines up for now. navbar.offsetHeight
      duration: duration,
      ease: 'power2.inOut',
    },
    duration
  ).from(
    $(".logo_gskinner"), 
    {
      opacity: 1,
      duration: duration,
      ease: 'power2.out',
    },
    0
  ).to(
    $(".logo_gskinner"), 
    {
      opacity: 0,
      duration: duration,
      ease: 'power2.out',
    },
    duration
  )
;