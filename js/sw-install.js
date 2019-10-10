window.onload = function(){
    'use strict'
    const toastElement = document.getElementById('snackbar')
    function showToast(toastMessage){
        toastElement.innerText = toastMessage
        toastElement.className = 'show'
    }
    function hideToast(){
        toastElement.className = ''
    }
    /* Trigger when app install successful */
    window.addEventListener('appinstalled', function(evt){
        hideToast()
    })

    window.addEventListener('beforeinstallprompt', function(e){
        e.preventDefault()
        showToast('Click to add WhatsApp Direct! to home screen')
        toastElement.addEventListener('click', function(e){
            hideToast()
            e.prompt();
            // Wait for the user to respond to the prompt
            e.userChoice
            .then(function(choiceResult){
                if (choiceResult.outcome !== 'accepted') {
                    showToast('Click to add WhatsApp Direct! to home screen')
                }
            })
            .catch(function(choiceResult){
                showToast('Click to add WhatsApp Direct! to home screen')
            })
        })
    })
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
        .then(function(registration) {
            registration.addEventListener('updatefound', function() {
                if (navigator.serviceWorker.controller) {
                  var installingSW = registration.installing
                  installingSW.onstatechange = function() {
                    switch(installingSW.state) {
                        case 'installed':
                            showToast('Update available. Click to reload.')
                            toastElement.addEventListener('click', function(){
                                window.location.reload()
                            })
                            break
                    }
                  }
                }
            })
        })
    }
}