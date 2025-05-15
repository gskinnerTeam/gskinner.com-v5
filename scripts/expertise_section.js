// EXPERTISE-IMAGE ANIMATION - will update the images as the user scrolls down.
$(".expertise-sticky-wrap").each(function () {
  const triggerElement = $(this);
  const inactives = $(".expertise-inactive").children();
  const actives = $(".expertise-active").children();
  const images = $(".expertise-background-stack").children();

  const transitionDuration = 0.5;
  const transitionDelay = 1;
  const imageScroll = 100;

  const xOff = () => -50;
  const xOn = () => 0;

  const timeline = gsap.timeline({
    defaults: {
      duration: transitionDuration,
      ease: 'power2.inOut',
    },
    scrollTrigger: {
      trigger: triggerElement,
      start: "top top",
      end: "bottom bottom",
      toggleActions: "play none reverse none",
      scrub: transitionDuration,
      markers: true // For debugging
    },
  });

  // Set timelines on labels to item_1 -> item_6
  for (let i = 0; i < inactives.length+1; i++) {
    timeline.addLabel("item_"+(i+1), transitionDelay * i);
  }

  for (let i = 0; i < inactives.length; i++) {
    const labelPrev = 'item_'+(i);
    const labelNext = 'item_'+(i+1);

    // Initialize the opacities.
    if (i == 0) {
      // First element animation. Start active, no fade-in.
      timeline
        .fromTo(inactives[i], {opacity: 0, x: xOff}, {opacity: 1, x: xOn}, labelNext)
        .fromTo(actives[i],   {opacity: 1, x: xOn}, {opacity: 0, x: xOff}, "<");
    } else if (i == inactives.length - 1) {
      // Last element animation. No fade-out.
      timeline
        .fromTo(inactives[i], {opacity: 1, x: xOn}, {opacity: 0, x: xOff}, labelPrev)
        .fromTo(actives[i],   {opacity: 0, x: xOff}, {opacity: 1, x: xOn}, "<");
    } else {
      // In between.
      timeline
        .fromTo(inactives[i], {opacity: 1, x: xOn}, {opacity: 0, x: xOff}, labelPrev)
        .fromTo(actives[i],   {opacity: 0, x: xOff}, {opacity: 1, x: xOn}, "<")
        .fromTo(inactives[i], {opacity: 0, x: xOff}, {opacity: 1, x: xOn}, labelNext)
        .fromTo(actives[i],   {opacity: 1, x: xOn}, {opacity: 0, x: xOff}, "<");
    }

    // Each image gets a flyby too.
    if (i > 0) {
      timeline.fromTo(
        images[i], 
        {x: () => Math.cos(i * Math.PI/2) * imageScroll, y: () => Math.sin(i * Math.PI/2) * imageScroll, opacity: 0, duration: 0.3}, 
        {x: () => 0, y: () => 0, opacity: 0.4, duration: 0.3}, 
        labelPrev
      );
    }
    if (i < inactives.length) {
      timeline.fromTo(
        images[i], 
        {x: () => 0, y: () => 0, opacity: 0.4, duration: 0.3}, 
        {x: () => Math.cos(Math.PI + (i * Math.PI/2)) * imageScroll, y: () => Math.sin(Math.PI + (i * Math.PI/2)) * imageScroll, opacity: 0, duration: 0.3}, 
        labelNext
      );
    }
  }
});