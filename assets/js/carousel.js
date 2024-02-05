class Carousel {
  constructor(params) {
    const settings = { ...{
      containerClass: 'slider',
      slideClass: 'slider__slide',
      interval: 3000,
      isPlaying: true,
    }, ...params };
    this.container = document.querySelector(`.${settings.containerClass}`);
    this.slideItems = this.container.querySelectorAll(`.${settings.slideClass}`);
    this.interval = settings.interval;
    this.isPlaying = settings.isPlaying;
  }
  _initProps() {
    this.currentSlide = 0;
    this.timerId = null;

    this.SLIDES_COUNT = this.slideItems.length;
    this.ARROW_LEFT = 37;
    this.ARROW_RIGHT = 39;
    this.SPACE = 32;
  }
  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.classList.add('slider__indiсators');
    this.container.appendChild(indicators);
    let indItems = []

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('slider__indiсator');
      indicator.dataset.slideTo = `${i}`;
      indItems.push(indicator);
      indicators.appendChild(indicator);
    }

    indItems[0].classList.add('active');
    this.indicatorsContainer = this.container.querySelector('.slider__indiсators');
    this.indicatorItems = this.indicatorsContainer.querySelectorAll('.slider__indiсator');
  }
  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = '<span class="slider__btn slider__play-pause-btn"><i class="fa-regular fa-circle-pause"></i></span>';
    const PREV = '<span class="slider__btn slider__prev-btn"><i class="fa-solid fa-angles-left"></i></span>';
    const NEXT = '<span class="slider__btn slider__next-btn"><i class="fa-solid fa-angles-right"></i></span>';

    controls.classList.add('slider__controls');
    controls.innerHTML = PREV + PAUSE + NEXT;
    this.container.appendChild(controls);

    this.pLayPauseBtn = this.container.querySelector('.slider__play-pause-btn');
    this.prevBtn = this.container.querySelector('.slider__prev-btn');
    this.nextBtn = this.container.querySelector('.slider__next-btn');
  }
  _initListeners() {
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.pLayPauseBtn.addEventListener('click', this.pLayPause.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indiсateHandler.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }
  _gotoNth(n) {
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = ( n + this.SLIDES_COUNT ) % this.SLIDES_COUNT;
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
  }
  _gotoPrev() {
    this._gotoNth( this.currentSlide - 1 );
  }
  _gotoNext() {
    this._gotoNth( this.currentSlide + 1 );
  }
  _tick() {
    this.timerId = setInterval( this._gotoNext.bind(this), this.interval);
  }
  _indiсateHandler(e) {
    const {target} = e;
    if (target && target.classList.contains('slider__indiсator')) {
      this.pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  }
  _pressKey(e) { 
    e.preventDefault();
    if (e.keyCode == this.ARROW_LEFT) this.prev().bind(this);
    if (e.keyCode == this.ARROW_RIGHT)  this.next().bind(this);
    if (e.keyCode == this.SPACE) this.pLayPause().bind(this);
  }
  pause() {
    if (!this.isPlaying) return;
    clearInterval(this.timerId);
    this.pLayPauseBtn.innerHTML = '<i class="fa-regular fa-circle-play"></i>';
    this.isPlaying = false;
  }
  play() {
    this._tick();
    this.pLayPauseBtn.innerHTML = '<i class="fa-regular fa-circle-pause"></i>';
    this.isPlaying = true;
  }
  pLayPause() {
    this.isPlaying ? this.pause() : this.play();
  }
  prev() {
    this.pause();
    this._gotoPrev();
  }
  next() {
    this.pause();
    this._gotoNext();
  }
  init() {
    this._initProps();
    this._initIndicators();
    this._initControls();
    this._initListeners();
    this._tick();
  }
}

export default Carousel;