const gl1 = new Glide('#g1', {
  type: "carousel",
  touchAngle: 45,
  focusAt: 1,
  startAt: 1,
  perView: 4.5,
  gap: 20,
  autoplay: 2000,
  peek: {
      before: 100,
      after: 50
  }
}).mount()

const gl2 = new Glide('#g2', {
  type: "carousel",
  touchAngle: 45,
  focusAt: 1,
  startAt: 1,
  perView: 4.5,
  gap: 20,
  autoplay: 2000,
  peek: {
      before: 100,
      after: 50
  }
}).mount()