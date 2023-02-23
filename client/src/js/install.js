const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event

// The code stores the "beforeinstallprompt" event in the "deferredPrompt" property of the "window" object, so that it can be used later to show the installation prompt.
window.addEventListener('beforeinstallprompt', (event) => {

    // Store the triggered Events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
// This code adds an event listener to the "butInstall" button, which listens for a "click" event. When the button is clicked, the code retrieves the "beforeinstallprompt" event that was stored in the "window.deferredPrompt" property in the previous code block.

butInstall.addEventListener('click', async () => {
    
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    }
  
    // Show prompt
    promptEvent.prompt();
});

// TODO: Add an handler for the `appinstalled` event
// This code adds an event listener to the "window" object, which listens for an "appinstalled" event. When the event is triggered, the code clears the "deferredPrompt" property of the "window" object, so that the installation prompt is not shown again.
window.addEventListener('appinstalled', (event) => {
      // Clear prompt
  window.deferredPrompt = null;
});
