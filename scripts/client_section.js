// Fade and slide the children up one at a time to create a ripple effect.
$(".step-fade-client-icons").each(function () {
  let triggerElement = $(this);

  const timeline = gsap.timeline({
    defaults: {duration: 1},
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "bottom bottom-=200",
      end: "top top+=200",
      scrub: 1
    }
  });

  const children = triggerElement.children();
  for (var i = 0; i < children.length; i++) {
    timeline.fromTo( 
      children[i], 
      { opacity: "0", y: 80 }, 
      { opacity: "1", y: 0}, 
      "<" + (i * 0.5) 
    );
  }
});