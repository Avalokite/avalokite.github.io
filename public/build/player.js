document.addEventListener("DOMContentLoaded", () => {
    const timer = document.getElementById('timer')
    const timerBorderTick = setInterval(toggleTimerBorder, 1000)

    function toggleTimerBorder() {
        timer.classList.toggle('tick')
    }

    firebase.database().ref('timer').child('p').on('value', snap => {
        if (snap.val() == 'p0') {
            timer.classList.remove('p1', 'p2', 'p3');
            timer.classList.add('p0');
            R.update({
                'p': 'p0'
            })
        }
        if (snap.val() == 'p1') {
            timer.classList.remove('p0', 'p2', 'p3');
            timer.classList.add('p1');
            R.update({
                'p': 'p1'
            })
        }
        if (snap.val() == 'p2') {
            timer.classList.remove('p0', 'p1', 'p3');
            timer.classList.add('p2');
            R.update({
                'p': 'p2'
            })
        }
        if (snap.val() == 'p3') {
            timer.classList.remove('p0', 'p1', 'p2');
            timer.classList.add('p3');
            R.update({
                'p': 'p3'
            })
        }
    })

    const log1 = document.getElementById('log1')
    const log2 = document.getElementById('log2')
    const roll1 = document.getElementById('roll1')
    const roll2 = document.getElementById('roll2')
    const clear1 = document.getElementById('clear1')
    const clear2 = document.getElementById('clear2')
    const playerboards = document.getElementsByClassName('playerboard')
    for (let elmnt of playerboards) {
        let R = firebase.database().ref(`${elmnt.id}`)
        elmnt.oninput = e => {
            R.update({
                'txt': elmnt.value
            })
        }
    }
    firebase.database().ref('log1').child('txt').on('value', snap => log1.innerHTML = `${snap.val()}`)
    firebase.database().ref('log2').child('txt').on('value', snap => log2.innerHTML = `${snap.val()}`)
    firebase.database().ref('playerboard0').child('txt').on('value', snap => playerboard0.value = `${snap.val()}`)
    firebase.database().ref('playerboard1').child('txt').on('value', snap => playerboard1.value = `${snap.val()}`)
    firebase.database().ref('playerboard2').child('txt').on('value', snap => playerboard2.value = `${snap.val()}`)
    firebase.database().ref('playerboard3').child('txt').on('value', snap => playerboard3.value = `${snap.val()}`)

    roll1.onclick = e => {
        log1.innerHTML = `${Math.floor(10*Math.random())}<br>${log1.innerHTML}`
        firebase.database().ref('log1').update({
            'txt': log1.innerHTML
        })
    }
    roll2.onclick = e => {
        log2.innerHTML = `${Math.floor(10*Math.random())}<br>${log2.innerHTML}`
        firebase.database().ref('log2').update({
            'txt': log2.innerHTML
        })
    }
    clear1.onclick = e => {
        log1.innerHTML = `<br>${log1.innerHTML}`
        firebase.database().ref('log1').update({
            'txt': log1.innerHTML
        })
    }
    clear2.onclick = e => {
        log2.innerHTML = `<br>${log2.innerHTML}`
        firebase.database().ref('log2').update({
            'txt': log2.innerHTML
        })
    }

    //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    let buttons = document.getElementsByTagName('button')
    for (elmnt of buttons) DRAG(elmnt)
    //🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    function DRAG(elmnt) {
        const R = firebase.database().ref(`${elmnt.id}`)
        const id = elmnt.id
        if (elmnt.classList.contains('card') == false || elmnt.classList.contains('CC') == false || elmnt.classList.contains('marker') == false) {
            R.child('txt').on('value', snap => {
                elmnt.innerHTML = `${snap.val()}`
            })
        }
        //guard clauses for non-moving components
        if (id != "roll1" && id != "roll2" && id != "clear1" && id != "clear2" && id != "shuffle") {

            R.child('x').on('value', snap => {
                elmnt.style.left =
                    `${snap.val()}`
            })
            R.child('y').on('value', snap => {
                elmnt.style.top =
                    `${snap.val()}`
            })
            R.child('z').on('value', snap => {
                elmnt.style.zIndex =
                    Number(`${snap.val()}`)
            })

            if (elmnt.classList.contains('card') || elmnt.classList.contains('strategycard')) {
                R.child('r').on('value', snap => {
                    if (snap.val() == 'true') {
                        elmnt.classList.add('r')
                        if (elmnt.classList.contains('v'))
                            elmnt.title = ''
                    }
                    if (snap.val() == 'false') {
                        elmnt.classList.remove('r')
                        if (elmnt.classList.contains('v'))
                            R.child('title').once('value', snap => elmnt.title = snap
                                .val())
                    }
                })
            }
            if (elmnt.classList.contains('ship')) {
                R.child('s').on('value', snap => {
                    if (snap.val() == 'true') elmnt.classList.add('s')
                    if (snap.val() == 'false') elmnt.classList.remove('s')
                })
            }
            if (elmnt.classList.contains('CC') || elmnt.classList.contains('marker')) {
                R.child('sm').on('value', snap => {
                    if (snap.val() == 'true') elmnt.classList.add('sm')
                    if (snap.val() == 'false') elmnt.classList.remove('sm')
                })
                R.child('rr').on('value', snap => {
                    if (snap.val() == 'true') elmnt.classList.add('rr')
                    if (snap.val() == 'false') elmnt.classList.remove('rr')
                })
            }
            if (elmnt.classList.contains('commodity')) {
                R.child('tg').on('value', snap => {
                    if (snap.val() == 'true') elmnt.classList.add('tg')
                    if (snap.val() == 'false') elmnt.classList.remove('tg')
                })
            }


            elmnt.onmousedown = e => {
                if (elmnt.classList.contains("playerboard") == false && elmnt.classList.contains("screen") == false) {
                    let cx = e.clientX
                    let cy = e.clientY
                    let shiftX = cx - elmnt.offsetLeft
                    let shiftY = cy - elmnt.offsetTop
                    window.onmouseup = e => {
                        window.onmousemove = null;
                        window.onkeydown = null
                    }
                    window.onkeydown = e => {

                        if (elmnt.classList.contains('timer')) {
                            if (e.key == 's') {
                                timer.innerHTML = 0;
                                R.update({
                                    'txt': 0
                                })
                            }
                            if (e.key == '1') {
                                timer.classList.remove('p1', 'p2', 'p3');
                                timer.classList.add('p0');
                                R.update({
                                    'p': 'p0'
                                })
                            }
                            if (e.key == '2') {
                                timer.classList.remove('p0', 'p2', 'p3');
                                timer.classList.add('p1');
                                R.update({
                                    'p': 'p1'
                                })
                            }
                            if (e.key == '3') {
                                timer.classList.remove('p0', 'p1', 'p3');
                                timer.classList.add('p2');
                                R.update({
                                    'p': 'p2'
                                })
                            }
                            if (e.key == '4') {
                                timer.classList.remove('p0', 'p1', 'p2');
                                timer.classList.add('p3');
                                R.update({
                                    'p': 'p3'
                                })
                            }

                        }

                        if (elmnt.classList.contains('commodity')) {
                            if (e.key == '$' && elmnt.innerHTML.length < 20) {
                                elmnt.innerHTML += '$'
                            }
                            if (e.key == 'Backspace' && elmnt.innerHTML.length > 1) {
                                e.preventDefault()
                                elmnt.innerHTML = elmnt.innerHTML.substring(0, elmnt.innerHTML.length - 1)
                            }
                            if (e.key == 'f') {
                                let tg = elmnt.classList.contains('tg')
                                if (tg == true) {
                                    elmnt.classList.remove('tg');
                                    R.update({
                                        'tg': 'false'
                                    })
                                }

                                if (tg == false) {
                                    elmnt.classList.add('tg');
                                    R.update({
                                        'tg': 'true'
                                    })
                                }
                            }
                            R.update({
                                'txt': elmnt.innerHTML
                            })
                        }

                        if (elmnt.classList.contains('card') || elmnt.classList.contains('strategycard')) {
                            if (e.key == 'f') {
                                let r = elmnt.classList.contains('r')
                                if (r == false) {
                                    elmnt.classList.add('r');
                                    if (elmnt.classList.contains('v')) {
                                        elmnt.title = ''
                                    }
                                    R.update({
                                        'r': 'true'
                                    })

                                }
                                if (r == true) {
                                    elmnt.classList.remove('r');
                                    if (elmnt.classList.contains('v')) {
                                        R.child('txt').once('value', snap => elmnt.title =
                                            snap.val())
                                    }
                                    R.update({
                                        'r': 'false'
                                    })

                                }
                            }
                        }


                        if (elmnt.classList.contains('CC') || elmnt.classList.contains('marker')) {
                            if (e.key == 's') {
                                let r = elmnt.classList.contains('sm')
                                if (r == true) {
                                    elmnt.classList.remove('sm');
                                    R.update({
                                        'sm': 'false'
                                    })
                                }
                                if (r == false) {
                                    elmnt.classList.add('sm');
                                    R.update({
                                        'sm': 'true'
                                    })
                                }
                            }
                            if (e.key == 'f') {
                                let r = elmnt.classList.contains('rr')
                                if (r == true) {
                                    elmnt.classList.remove('rr');
                                    R.update({
                                        'rr': 'false'
                                    })
                                }
                                if (r == false) {
                                    elmnt.classList.add('rr');
                                    R.update({
                                        'rr': 'true'
                                    })
                                }
                            }
                        }

                        if (elmnt.classList.contains('ship')) {
                            let lastchar = elmnt.innerHTML.substring(elmnt.innerHTML.length - 1, elmnt.innerHTML
                                .length)
                            if (e.key == 's') {
                                let s = elmnt.classList.contains('s')
                                if (s == true) {
                                    elmnt.classList.remove('s');
                                    R.update({
                                        's': 'false'
                                    })
                                }
                                if (s == false) {
                                    elmnt.classList.add('s');
                                    R.update({
                                        's': 'true'
                                    })
                                }
                            }
                            if (elmnt.innerHTML.includes(':') || lastchar == 'F' || lastchar == 'I') {
                                if (e.key == 'F' && elmnt.innerHTML.length < 20) {
                                    elmnt.innerHTML += 'F';
                                    R.update({
                                        'txt': elmnt.innerHTML
                                    })
                                }
                                if (e.key == 'I' && elmnt.innerHTML.length < 20) {
                                    elmnt.innerHTML += 'I';
                                    R.update({
                                        'txt': elmnt.innerHTML
                                    })
                                }
                                if (e.key == "Backspace" && lastchar != ':' && elmnt.innerHTML.length > 1) {
                                    e.preventDefault()
                                    elmnt.innerHTML = elmnt.innerHTML.substring(0, elmnt.innerHTML.length - 1);
                                    R.update({
                                        'txt': elmnt.innerHTML
                                    })
                                }

                            }
                        }
                    }

                    window.onmousemove = e => {
                        elmnt.style.left = `${Math.round(Math.max(0,Math.min(1900,e.clientX - shiftX))/10)*10}px`
                        elmnt.style.top = `${Math.round(Math.max(0,Math.min(1000,e.clientY - shiftY))/10)*10}px`
                        R.update({
                            'x': elmnt.style.left,
                            'y': elmnt.style.top
                        })
                    }
                }
            }
        }
    }
})