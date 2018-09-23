let runBtn = document.getElementById('run')
let hideBtn = document.getElementById('hide')

let Dialog = function(opts) {

  this.elem = opts.elem || null
  this.comp = opts.comp || 'dialog'

  this.mask = opts.mask || document.createElement('div')
  this.body = opts.parent || document.body

  this.init = () => {
    if (this.elem != null) {
      this.elem = document.getElementById(this.elem)
      this.mask.addEventListener('click', (e) => {
        this.elem.className = this.comp
        this.mask.className = ''
      })
      this.body.appendChild(this.mask)
    }
  }

  this.run = () => {
    if (this.elem != null) {
      this.elem.className = this.comp + ' ' + this.comp + '__run'
      this.mask.className = 'mask'
    }
  }

  this.hide = () => {
    if (this.elem != null) {
      this.elem.className = this.comp
      this.mask.className = ''
    }
  }

  this.init()

}

var dlg = new Dialog({
  elem: 'dialog'
})

runBtn.addEventListener('click', (e) => {
  dlg.run()
})

hideBtn.addEventListener('click', (e) => {
  dlg.hide()
})