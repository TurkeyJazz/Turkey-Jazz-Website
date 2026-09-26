let musicFiles = [];

fetch('Data/Scores.json')
    .then(response => response.json())
    .then(data => {
        musicFiles = data;
        displayList(musicFiles);
    })
    .catch(error => console.error('Error fetching music files:', error));

function displayList(files) {
    const list = document.getElementById('file-list');
    list.innerHTML = '';

    files.forEach(file => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = file.path;
        a.textContent = file.name;
        li.appendChild(a);
        list.appendChild(li);
    });
}

document.getElementById('search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredFiles = musicFiles.filter(file =>
        file.name.toLowerCase().includes(searchTerm)
    );
    displayList(filteredFiles);
});