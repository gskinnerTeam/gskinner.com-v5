// EXPERTISE-IMAGE ANIMATION - will update the images as the user scrolls down.
$(".expertise-sticky-wrap").each(function () {
  const triggerElement = $(this);
  const titleContainer = $(".expertise-title-container");
  const inactives = $(".expertise-inactive").children();
  const actives = $(".expertise-active").children();
  const images = $(".expertise-background-stack").children();

  const titleHeightInRems = 6;
  const transitionDuration = 0.5;
  const transitionDelay = 1;
  const imageScrollDist = "10rem";
  const flybyDuration = 0.5;
  const flybyMaxOpacity = 0.5;

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
      markers: false // For debugging
    },
  });

  // Set timelines on labels to item_1 -> item_6
  for (let i = 0; i < inactives.length+1; i++) {
    timeline.addLabel("item_"+(i+1), transitionDelay * i);
  }

  // "From" sets the elements' initial parameters.
  for (let i = 0; i < inactives.length; i++) {
    const firstItem = (1 == 0);
    timeline
      .from(inactives[i], {opacity: firstItem ? 1 : 0, x: xOff}, 'item_'+(i+1))
      .from(actives[i], {opacity: firstItem ? 0 : 1, x: xOn},  'item_'+(i+1))
      .from(titleContainer, {y: '0rem'}, 'item_'+(i+1))
      .from(
        images[i], 
        {x: () => firstItem ? 0 : imageScrollDist}, 
        'item_'+(i+1)
      ).from(
        images[i], 
        {opacity: firstItem ? 1 : 0}, 
        'item_'+(i+1)
      );
  }

  for (let i = 0; i < inactives.length; i++) {
    const labelPrev = 'item_'+(i);
    const labelNext = 'item_'+(i+1);

    const titleStart = (i * -titleHeightInRems).toString() + "rem";
    const titleEnd = ((i+1) * -titleHeightInRems).toString() + "rem";

    // Initialize the opacities.
    if (i == 0) {
      // First element animation. Start active, no fade-in.
      timeline
        .to(inactives[i],   {opacity: 1, x: xOn}, labelNext)
        .to(actives[i],     {opacity: 0, x: xOff}, labelNext)
        .to(titleContainer, {y: titleEnd}, labelNext);
    } else if (i == inactives.length - 1) {
      // Last element animation. No fade-out.
      timeline
        .to(inactives[i],   {opacity: 0, x: xOff}, labelPrev)
        .to(actives[i],     {opacity: 1, x: xOn}, labelPrev);
    } else {
      // In between.
      timeline
        .to(inactives[i],   {opacity: 0, x: xOff}, labelPrev)
        .to(actives[i],     {opacity: 1, x: xOn}, labelPrev)
        .to(inactives[i],   {opacity: 1, x: xOn}, labelNext)
        .to(actives[i],     {opacity: 0, x: xOff}, labelNext)
        .to(titleContainer, {y: titleStart}, {y: titleEnd}, labelNext);
    }

    // Each image gets a flyby too.
    if (i > 0) {
      timeline
        .to(
          images[i], 
          {x: () => imageScrollDist}, 
          {x: () => 0, duration: flybyDuration, ease: "sine.out"}, 
          labelPrev
        ).to(
          images[i], 
          {opacity: 0}, 
          {opacity: flybyMaxOpacity, duration: flybyDuration}, 
          labelPrev
        );
    }
    if (i < inactives.length-1) {
      timeline
        .to(
          images[i], 
          {x: () => "-"+imageScrollDist, duration: flybyDuration, ease: "circ.out"}, 
          labelNext
        ).to(
          images[i], 
          {y: () => "-"+imageScrollDist, duration: flybyDuration, ease: "circ.in"}, 
          labelNext
        ).to(
          images[i], 
          {opacity: 0, duration: flybyDuration}, 
          labelNext
        );
    }
  }
});