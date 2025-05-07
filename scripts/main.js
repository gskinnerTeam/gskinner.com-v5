// Lenis framework - used to create an ease effect during scroll release, similar to swiping on mobile.
let lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.7,
  gestureOrientation: "vertical",
  normalizeWheel: false,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

$("[data-lenis-start]").on("click", function () {
  lenis.start();
});

$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});

$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});


// SCROLL INTERACTION
gsap.registerPlugin(ScrollTrigger);

// Anytime item is scrolled into view
function updateImages(currentItem) {
  $(".expertise_item").removeClass("active");
  currentItem.addClass("active");
}


$(".expertise_item").each(function (index) {
// EXPERTISE-IMAGE ANIMATION - will update the images as the user scrolls down.
  let triggerElement = $(this);
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        updateImages(triggerElement);
      },
      onEnterBack: () => {
        updateImages(triggerElement);
      }
    },
  });
});


// PARAGRAPH-TEXT ANIMATION - will highlight each character as user scrolls.
gsap.registerPlugin(ScrollTrigger);

const splitTypes = document.querySelectorAll('.scroll-highlight');
splitTypes.forEach((char,i) => {
  const text = new SplitType(char, {types: ['chars','words']});
  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: char,
      start: 'top 80%',
      end: 'top 30%',
      scrub: true,
      markers: false
    },
    opacity: 0.2,
    stagger: 0.12,
  })
});


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

// Fade and slide the children in one at a time to create a ripple effect.
$(".step-fade-children").each(function () {
  let triggerElement = $(this);

  const timeline = gsap.timeline({
    defaults: {duration: 1},
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "bottom bottom-=100",
      end: "bottom bottom-=400",
      scrub: 1
    }
  });

  const children = triggerElement.children();
  for (var i = 0; i < children.length; i++) {
    timeline.fromTo( 
      children[i], 
      { opacity: "0", y: 100 }, 
      { opacity: "1", y: 0}, 
      "<" + (i * 0.5) 
    );
  }
});