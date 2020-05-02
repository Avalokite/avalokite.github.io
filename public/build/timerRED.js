document.addEventListener("DOMContentLoaded", () => {

    let timer = document.getElementById('timer')
    const timerId = setInterval(turnTimer, 1000)

    function turnTimer() {
        firebase.database().ref('timer').child('txt').once('value', snap => timer.innerHTML = Number(snap.val()) + 1)
        firebase.database().ref('timer').update({
            'txt': timer.innerHTML
        })
    }
})