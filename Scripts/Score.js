const params = new URLSearchParams(window.location.search);
const filePath = params.get('file');
const fileName = params.get('name');
if (fileName) {
    document.getElementById('score-title').textContent = fileName;
    document.getElementById('page-title').textContent = fileName;
}

if (filePath) {
    const mxlLink = document.getElementById('download-mxl');
    const msczLink = document.getElementById('download-mscz');

    mxlLink.href = filePath; // make sure this is the mxl file path, not the mscz file path
    msczLink.href = filePath.replace('.mxl', '.mscz');
} else {
    console.error('No file specified in the URL parameters.');
    // check the file path in the json, if thats correct, check the url parameters
}

if (filePath && (filePath.endsWith('.mxl'))) {
    const osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmd-container");
    osmd.load(filePath).then(() => {
        osmd.render();
    }).catch(error => { // these errors are mostly for debugging, they should never occur in normal usage
        console.error('Error loading score:', error);
        document.getElementById('osmd-container').innerHTML = '<p>Error loading score. Please try again later.</p>';
        // check the score path in the json if you get this error, that should be the only reason it would occur
    });
} else {
    document.getElementById('osmd-container').innerHTML = '<p>Preview only available for MusicXML files.</p>';
    // good luck if you get this error and the file is a musicxml file:)
}