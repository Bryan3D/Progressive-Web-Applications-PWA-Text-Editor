const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

  console.log('🤖 - beforeinstallprompt event fired - 📡')  ;
  console.log('🤖 - event - 📡', event);  
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Update UI notify the user they can install the PWA
  butInstall.removeAttribute('hidden');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  } 
  // Show the install prompt.
  promptEvent.prompt();

  //  Reset the deferred prompt variable, since a new one can be shown.
  window.deferredPrompt = null;
  // Hide the mini-infobar.
  butInstall.setAttribute('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('🤖 - appinstalled event fired - 📡')  ;
  window.deferredPrompt = null;
  
});
