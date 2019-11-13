export function addEvent(dom: Element, events){
  if(events){
    for (const key in events) {
      if (events.hasOwnProperty(key)) {
        dom.addEventListener(key, events[key], false)
      }
    }
  }
}