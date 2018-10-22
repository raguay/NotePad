//
// Clear out all data. I want the application to get the most
// recent information locally from the build in server. Don't
// rely on cache information as it will change.
//
nw.App.clearCache();
window.chrome.browsingData.remove({
    since: 0
}, {
    appcache: true,
    cache: true,
    cookies: true,
    downloads: true,
    fileSystems: true,
    formData: true,
    history: true,
    indexedDB: true,
    localStorage: true,
    pluginData: true,
    passwords: true,
    serverBoundCertificates: true,
    serviceWorkers: true,
    webSQL: true
});

//
// Create the tray icon.
//
var tray = new nw.Tray({ icon: 'notepad/trayicon-16.icns', tooltip: 'NotePad' });

//
// Setup some variables in use.
//
var showing = false;

//
// Create the window.
//
nw.notewin = null;
nw.Window.open("http://localhost:9900/np", {
    "id": "notepadwin",
    "height": 475,
    "min_height": 475,
    "max_height": 475,
    "width": 500,
    "min_width": 500,
    "max_width": 500,
    "position": "mouse",
    "show_in_taskbar": false,
    "frame": false,
    "transparent": true,
    "show": false
}, function(new_win) {
    //
    // Save the new window variable.
    //
    nw.notewin = new_win;
});

//
// Set the tray onclick function for showing and hiding the window.
//
tray.on('click', function(event) {
    if (showing) {
        nw.notewin.hide();
        showing = false;
    } else {
        //
        // Center the window on the position of the tray icon.
        //
        nw.notewin.x = event.x - 238;
        nw.notewin.y = event.y;
        nw.notewin.show();
        nw.notewin.focus();
        showing = true;
        nw.notewin.on('blur', function() {
            nw.notewin.hide();
            showing = false;
        })
    }
});