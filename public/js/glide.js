const gl1 = new Glide('#g1', {
  type: "carousel",
  touchAngle: 45,
  focusAt: 1,
  startAt: 1,
  perView: 5.5,
  keyboard: true,
  gap: 30,
  autoplay: 1000,
  peek: {
      before: 100,
      after: 50
  }
}).mount()

const gl2 = new Glide('#g2', {
  perView: 3,
  autoplay: 1000,
  gap: 20
}).mount()