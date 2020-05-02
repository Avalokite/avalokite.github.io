   //🔥🔥  RESET    🔥 🔥🔥 🔥   RESET  🔥🔥   🔥🔥 🔥🔥🔥  RESET       🔥🔥  🔥🔥🔥🔥  🔥🔥🔥 🔥 

   document.addEventListener("DOMContentLoaded", () => {
    const reset = document.getElementById('reset')
    const buttons = document.getElementsByTagName('button')
    const playerboards = document.getElementsByClassName('playerboard')
    reset.onclick = e => {
      alert('reset')
      firebase.database().ref('log1').set({
        'txt': ''
      })
      firebase.database().ref('log2').set({
        'txt': ''
      })
      for (elmnt of playerboards) {
        firebase.database().ref(`${elmnt.id}`).set({'txt':elmnt.value})
      }
      for (elmnt of buttons) {
        firebase.database().ref(`${elmnt.id}`).set({
          'y': elmnt.style.top,
          'x': elmnt.style.left,
          'txt': elmnt.innerHTML,
          'title': elmnt.title,
          'z': elmnt.style.zIndex,
          's': 'false',
          'r': 'false',
          'rr': 'false',
          'tg': 'false'
        })
      }
    }
    const shuffle = document.getElementById('shuffle')
    shuffle.onclick = e => {
      const vcards = document.getElementsByClassName('v')
      alert('shuffled')
      for (elmnt of vcards) {
        elmnt.style.zIndex = 100 + Math.floor(200 * Math.random())
        firebase.database().ref(`${elmnt.id}`).update({
          'z': elmnt.style.zIndex,
          'r': 'true'
        })
      }
    }
  })