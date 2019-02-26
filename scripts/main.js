let promptEvt;

window.addEventListener('beforeinstallprompt', evt => {
    evt.preventDefault();

    promtEvt = evt;
    console.log(promptEvt);
    setTimeout(showPrompt, 15000);

    return false;
});

function showPrompt() {
    promptEvt.prompt();

    promptEvt.userChoice.then(choice => {
        console.log(choice);
    });
}