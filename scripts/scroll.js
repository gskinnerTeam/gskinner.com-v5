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
// Anytime item is scrolled into view
function updateImages(currentItem) {
  $(".expertise_item").removeClass("active");
  currentItem.addClass("active");
}

$(".expertise_item").each(function (index) {
// EXPERTISE-IMAGE ANIMATION - will update the images as the user scrolls down.
  let triggerElement = $(this);
  gsap.timeline({
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
