document.addEventListener("DOMContentLoaded", () => {
    const db = firebase.database()

    //Timer
    const timer = document.getElementById('timer')
    const timerBorderTick = setInterval(toggleTimerBorder, 1000)
    db.ref('timer').child('p').on('value', snap => toggleTimerColor(Number(snap.val())))
    function toggleTimerBorder() {
        timer.classList.toggle('tick')
        timer.style.transform = `scale(${Math.max(1,Number(timer.innerHTML)/30)})`
    }

    function toggleTimerColor(playerNum = 0) {
        let playerNums = [0, 1, 2, 3]
        let index = playerNums.indexOf(playerNum)
        if (index !== -1) playerNums.splice(index, 1)
        for (num of playerNums) timer.classList.remove(`p${num}`)
        timer.classList.add(`p${playerNum}`)
        db.ref('timer').child('p').set(`${playerNum}`)
    }

    //Playerboard
    const playerboards = document.getElementsByClassName('playerboard')
    for (let el of playerboards) {
        let R = db.ref(`${el.id}`)
        console.log(el.id)
        el.oninput = e => R.child('txt').set(el.value)
    }

    //Dice roll logs
    const log1 = document.getElementById('log1')
    const log2 = document.getElementById('log2')
    const roll1 = document.getElementById('roll1')
    const roll2 = document.getElementById('roll2')
    const clear1 = document.getElementById('clear1')
    const clear2 = document.getElementById('clear2')

    db.ref('log1').child('txt').on('value', snap => log1.innerHTML = `${snap.val()}`)
    db.ref('log2').child('txt').on('value', snap => log2.innerHTML = `${snap.val()}`)
    db.ref('playerboard0').child('txt').on('value', snap => playerboard0.value = `${snap.val()}`)
    db.ref('playerboard1').child('txt').on('value', snap => playerboard1.value = `${snap.val()}`)
    db.ref('playerboard2').child('txt').on('value', snap => playerboard2.value = `${snap.val()}`)
    db.ref('playerboard3').child('txt').on('value', snap => playerboard3.value = `${snap.val()}`)

    roll1.onclick = e => {
        log1.innerHTML = `${Math.floor(10*Math.random())}<br>${log1.innerHTML}`
        db.ref('log1').child('txt').set(log1.innerHTML)
    }
    clear1.onclick = e => {
        log1.innerHTML = `<br>${log1.innerHTML}`
        db.ref('log1').child('txt').set(log1.innerHTML)
    }
    roll2.onclick = e => {
        log2.innerHTML = `${Math.floor(10*Math.random())}<br>${log2.innerHTML}`
        db.ref('log2').child('txt').set(log2.innerHTML)
    }
    clear2.onclick = e => {
        log2.innerHTML = `<br>${log2.innerHTML}`
        db.ref('log2').child('txt').set(log2.innerHTML)
    }

    //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    let buttons = document.getElementsByTagName('button')
    for (el of buttons) DRAG(el)
    //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    function DRAG(el) {
        const R = db.ref(`${el.id}`)
        const id = el.id

        function has(checkClass) {
            return el.classList.contains(checkClass)
        }

        //guard non-moving components
        if (has('static')) return

        //listen to x y z
        R.child('x').on('value', snap => el.style.left = `${snap.val()}`)
        R.child('y').on('value', snap => el.style.top = `${snap.val()}`)
        R.child('z').on('value', snap => el.style.zIndex = Number(`${snap.val()}`))

        //listen to text
        if (!has('card') || !has('CC') || !has('marker')) {
            R.child('txt').on('value', snap => el.innerHTML = `${snap.val()}`)
        }

        //listen to rotation
        if (has('card') || has('strategycard') || has('CC')) {
            R.child('r').on('value', snap => {
                let cur = snap.val() == 'true'
                el.classList.toggle('r', cur)
                if (has('v') && cur) el.title = ''
                if (has('v') && !cur) R.child('title').once('value', snap => el.title = snap.val())
            })
        }

        //listen to size
        if (has('CC') || has('marker')) R.child('sm').on('value', snap => el.classList.toggle('sm', snap.val() == 'true'))

        //MOUSEDOWN
        el.onmousedown = e => {
            console.log(el.id)
            let cx = e.clientX
            let cy = e.clientY
            let shiftX = cx - el.offsetLeft
            let shiftY = cy - el.offsetTop
            //MOUSEUP
            window.onmouseup = e => {
                window.onmousemove = null
                window.onkeydown = null
            }
            //KEYDOWN
            window.onkeydown = e => {

                function toggleClass(cls = 'r') {
                    let cur = has(`${cls}`)
                    el.classList.toggle(`${cls}`, !cur)
                    R.child(`${cls}`).set(`${!cur}`)
                }

                function updateTxt(txt) {
                    R.child('txt').set(txt)
                }
                //timer
                if (has('timer')) {
                    if (e.key == 's') {
                        timer.innerHTML = 0
                        R.child('txt').set(0)
                    }
                    if ([1, 2, 3, 4].includes(Number(e.key))) toggleTimerColor(`${Number(e.key)-1}`)
                }
                //commodities
                if (has('commodity')) {
                    if (e.key == 'f') toggleClass('r')
                    if (e.key == '$' && el.innerHTML.length < 20) el.innerHTML += '$'
                    if (e.key == 'Backspace' && el.innerHTML.length > 1) {
                        e.preventDefault()
                        el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 1)
                    }
                    updateTxt(el.innerHTML)
                }
                //cards
                if (has('card') || has('strategycard')) {
                    if (e.key == 'f') toggleClass('r')
                    if (has('v') && has('r')) el.title = ''
                    if (!has('r')) R.child('txt').once('value', snap => el.title = snap.val())
                }
                //CC, marker
                if (has('CC') || has('marker')) {
                    if (e.key == 's') toggleClass('sm')
                    if (e.key == 'r') toggleClass('r')
                }
                //ship
                if (has('ship')) {
                    let lastchar = el.innerHTML.substring(el.innerHTML.length - 1, el.innerHTML.length)
                    if (e.key == 's') toggleClass('s')
                    if (el.innerHTML.includes(':') || lastchar == 'F' || lastchar == 'I') {
                        if (e.key == 'F' && el.innerHTML.length < 25) el.innerHTML += 'F'
                        if (e.key == 'I' && el.innerHTML.length < 25) el.innerHTML += 'I'
                        if (e.key == 'G' && el.innerHTML.length < 25) el.innerHTML += 'I'
                        if (e.key == "Backspace" && lastchar != ':' && el.innerHTML.length > 1) {
                            e.preventDefault()
                            el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 1)
                        }
                        updateTxt(el.innerHTML)
                    }
                }
            }
            //MOUSEMOVE
            window.onmousemove = e => {
                el.style.left = `${Math.round(Math.max(0,Math.min(1900,e.clientX - shiftX))/10)*10}px`
                el.style.top = `${Math.round(Math.max(0,Math.min(1000,e.clientY - shiftY))/10)*10}px`
                R.update({
                    'x': el.style.left,
                    'y': el.style.top
                })
            }

        }
    }
})