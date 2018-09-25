
/* type 1 */

let type1 = () => {
  let swiper = document.getElementById('swiper')

  var items = swiper.childNodes

  let swiper_items = []
  for (let i = 0; i < items.length; i++) {
    var item = items[i]
    if (item.className === 'swiper__item') {
      swiper_items.push(item)
    }
  }

  var startX = 0 //开始位置
  var stopX = 0 //结束位置
  var currX = 0 //当前位置
  var moveX = 0 //移动的X轴距离(startX - currX)
  var currIndex = 0 //当前显示下标

  for (let i = 0; i < swiper_items.length; i++) {
    let item = swiper_items[i]
    // let x = (i * 100) + '%'
    let x = (i * 360) + 'px'
    item.style.transform = 'translate3d(' + x + ', 0px, 0px)'
  }

  function getClientX (e) {
    return e.changedTouches[0].clientX
  }

  swiper.addEventListener('touchstart', (e) => {
    startX = getClientX(e)
    console.log('startX: ' + startX)
    console.log('touchstart')
    console.log(e)
    for (let i = 0; i < swiper_items.length; i++) {
      swiper_items[i]._transform = swiper_items[i].style.transform
    }
  })

  swiper.addEventListener('touchmove', (e) => {
    currX = getClientX(e)
    moveX = currX - startX
    console.log('currX: ' + currX)
    console.log('moveX: ' + moveX)
    for (let i = 0; i < swiper_items.length; i++) {
      let item = swiper_items[i]
      // 获取原本的参数
      let _transform = item._transform
      let _x = _transform.replace('translate3d(', '').replace(', 0px, 0px)', '').replace('px', '')
      console.log('_x: ' + _x)
      let x = parseInt(moveX) + parseInt(_x) + 'px'
      item.style.transform = 'translate3d(' + x + ', 0px, 0px)'
    }
  })

  swiper.addEventListener('touchend', (e) => {
    stopX = getClientX(e)
    console.log('stopX: ' + stopX)
    console.log('touchend')
    console.log(e)
  })
}

type1()

/* type 2 */

// let Swiper = function (opts) {
//   this.elem = opts.elem || null
//   this.comp = opts.comp || 'swiper'

//   this.startX = 0 //开始位置
//   this.stopX = 0 //结束位置
//   this.currX = 0 //当前位置
//   this.moveX = 0 //移动的X轴距离 startX - currX
//   this.currIndex = 0 //当前显示下标

//   this.init = () => {
//     this.swiper = document.getElementById(this.elem)

//     this.swiper.addEventListener('touchstart', (e) => {
//       startX = getClientX(e)
//       console.log('startX: ' + startX)
//       console.log('touchstart')
//       console.log(e)
//       for (let i = 0; i < swiper_items.length; i++) {
//         swiper_items[i]._transform = swiper_items[i].style.transform
//       }
//     })

//     this.swiper.addEventListener('touchmove', (e) => {
//       currX = getClientX(e)
//       moveX = this.currX - this.startX
//       console.log('currX: ' + currX)
//       console.log('moveX: ' + moveX)
//       for (let i = 0; i < swiper_items.length; i++) {
//         let item = swiper_items[i]
//         // 获取原本的参数
//         let _transform = item._transform
//         let _x = _transform.replace('translate3d(', '').replace(', 0px, 0px)', '').replace('px', '')
//         console.log('_x: ' + _x)
//         let x = parseInt(moveX) + parseInt(_x) + 'px'
//         item.style.transform = 'translate3d(' + x + ', 0px, 0px)'
//       }
//     })

//     this.swiper.addEventListener('touchend', (e) => {
//       stopX = this.getClientX(e)
//     })
//   }

//   this.getClientX = (e) => {
//     return e.changedTouches[0].clientX
//   }

//   this.init()
// }