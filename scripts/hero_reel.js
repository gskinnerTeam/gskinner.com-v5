// REEL ANIMATION - expands screen as user scrolls down
$(".sticky-rectangle_wrap").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(".sticky-rectangle_element");

  // Sticky-rectangle_wrap height set to 300vh. That will be the scroll span.
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    }
  });
  // Start from 25em x 40em and grow to 100vw x 100vh. Also gradually remove border.
  tl.fromTo(
    targetElement,
    {
      width: "25em",
      height: "40em",
      borderRadius: "1em",
      duration: 1
    },
    {
      width: "100vw",
      height: "100vh",
      borderRadius: "0em",
      duration: 1
    }
  );
});