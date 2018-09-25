
/* type 1 */

let type1 = () => {
  let swiper = document.getElementById('swiper1')

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
    let x = (i * swiper.offsetWidth) + 'px'
    item.style.transform = 'translate3d(' + x + ', 0px, 0px)'
  }

  function getClientX (e) {
    return e.changedTouches[0].clientX
  }

  swiper.addEventListener('touchstart', (e) => {
    startX = getClientX(e)
    for (let i = 0; i < swiper_items.length; i++) {
      swiper_items[i]._transform = swiper_items[i].style.transform
    }
  })

  swiper.addEventListener('touchmove', (e) => {
    currX = getClientX(e)
    moveX = currX - startX
    for (let i = 0; i < swiper_items.length; i++) {
      let item = swiper_items[i]
      // 获取原本的参数
      let _transform = item._transform
      let _x = _transform.replace('translate3d(', '').replace(', 0px, 0px)', '').replace('px', '')
      let x = parseInt(moveX) + parseInt(_x) + 'px'
      item.style.transform = 'translate3d(' + x + ', 0px, 0px)'
    }
  })

  swiper.addEventListener('touchend', (e) => {
    stopX = getClientX(e)
  })
}

type1()

/* type 2 */

let Swiper = function (opts) {
  this.elem = opts.elem || null
  this.comp = opts.comp || 'swiper'


  this.swiper_items = [] //子项
  this.startX = 0 //开始位置
  this.stopX = 0 //结束位置
  this.currX = 0 //当前位置
  this.moveX = 0 //移动的X轴距离(startX - currX)
  this.currIndex = 0 //当前显示下标
  this.swiper = null //主元素
  this.swiper_items = [] //子项数组


  this.init = () => {

    this.swiper = document.getElementById(this.elem)

    if (this.swiper === null) return

    let items = this.swiper.childNodes

    //筛选子项
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      if (item.className === 'swiper__item') {
        this.swiper_items.push(item)
      }
    }

    //初始化子项位置
    for (let i = 0; i < this.swiper_items.length; i++) {
      let item = this.swiper_items[i]
      let x = (i * this.swiper.offsetWidth) + 'px'
      item.style.transform = 'translate3d(' + x + ', 0px, 0px)'
    }

    //触摸事件
    this.touchstart()
    this.touchmove()
    this.touchend()

  }

  //开始触摸
  this.touchstart = () => {
    this.swiper.addEventListener('touchstart', (e) => {
      this.startX = this.getClientX(e)
      for (let i = 0; i < this.swiper_items.length; i++) {
        this.swiper_items[i]._transform = this.swiper_items[i].style.transform
      }
    })
  }

  //触摸移动
  this.touchmove = () => {
    this.swiper.addEventListener('touchmove', (e) => {
      this.currX = this.getClientX(e)
      this.moveX = this.currX - this.startX
      for (let i = 0; i < this.swiper_items.length; i++) {
        let item = this.swiper_items[i]
        // 获取开始点击时参数
        let _transform = item._transform
        let _x = _transform.replace('translate3d(', '').replace(', 0px, 0px)', '').replace('px', '')
        let x = parseInt(this.moveX) + parseInt(_x) + 'px'
        item.style.transform = 'translate3d(' + x + ', 0px, 0px)'
      }
    })
  }

  //触摸结束
  this.touchend = () => {
    this.swiper.addEventListener('touchend', (e) => {
      this.stopX = this.getClientX(e)
    })
  }

  //取得当前X坐标
  this.getClientX = (e) => {
    return e.changedTouches[0].clientX
  }

  this.init()
}

let swiper = new Swiper({
  elem: 'swiper2'
})