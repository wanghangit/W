import { W } from '../../src/instance/W'

W.component('demo', {
  data: {
    child: 'i am a child'
  },
  template: `<div>i am a child</div>`
})

const w = new W({
  el: "#root",
  data: {

  },
  template: `<div>`+
   `<demo></demo>`+
  `</div>`,
})