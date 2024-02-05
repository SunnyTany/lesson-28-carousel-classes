import SwipeCarousel from "./swipe-carousel.js";

const carousel = new SwipeCarousel({
  containerClass: 'slider', 
  slideClass: 'slider__slide', 
  interval: 2000, 
  isPlaying: true,
});

carousel.init();