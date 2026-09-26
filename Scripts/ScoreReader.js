fetch('Data/scores.json')
    .then(response => response.json())
    .then(data => {
        const scoresContainer = document.getElementById('scores-container');

        for (const [arrayName, scores] of Object.entries(data)) {

            const sectionHeading = document.createElement('h2');
            sectionHeading.textContent = arrayName;
            scoresContainer.appendChild(sectionHeading);

            scores.forEach(item => {
                const itemBox = document.createElement('div');

                if (item.snap === 'right') itemBox.classList.add('snap-right');
                else if (item.snap === 'left') itemBox.classList.add('snap-left');
            
                for (const [key, value] of Object.entries(item)) {
                    if (key === 'snap') continue;

                    if (key.toLowerCase() === 'picture') {
                        const img = document.createElement('img');
                        img.src = value;
                        img.alt = 'there is supposed to be a picture here';
                        img.style.maxWidth = '200px';
                        itemBox.appendChild(img);
                    } else if (key.toLowerCase() === 'name') {
                        const nameHeading = document.createElement('h3');
                        nameHeading.textContent = value;
                        itemBox.appendChild(nameHeading);
                    } else if (key.toLowerCase() === 'instruments') {
                        const instrumentsHeading = document.createElement('h4');
                        instrumentsHeading.textContent = "Instruments: " + value;
                        itemBox.appendChild(instrumentsHeading);
                    } else if (key.toLowerCase() === 'bio') {
                        const bioParagraph = document.createElement('p');
                        bioParagraph.textContent = value;
                        itemBox.appendChild(bioParagraph);
                    } else if (Array.isArray(value)) {
                        const heading = document.createElement('h3');
                        heading.textContent = key.charAt(0).toUpperCase() + key.slice(1);
                        itemBox.appendChild(heading);

                        const ul = document.createElement('ul');

                        value.forEach(subItem => {
                        const li = document.createElement('li');

                        if (typeof subItem === 'object' && subItem !== null) {
                            const innerUI = document.createElement('ul');
                            for (const [subKey, subValue] of Object.entries(subItem)) {
                                const innerLI = document.createElement('li');
                                innerLI.innerHTML = `<strong>${subKey}:</strong> ${subValue}`;
                                innerUI.appendChild(innerLI);
                            }
                            li.appendChild(innerUI);
                        }
                        else {
                            li.textContent = subItem;
                        }
                        ul.appendChild(li);
                        });
                    itemBox.appendChild(ul);
                    } else {
                        const p = document.createElement('p');
                        p.innerHTML = '<strong>${key}:</strong> ${value}';
                        itemBox.appendChild(p);
                    }
                }
                membersContainer.appendChild(itemBox);
            });

            const clearDiv = document.createElement('div');
            clearDiv.style.clear = 'both';
            membersContainer.appendChild(clearDiv);
        }
    })
    .catch(error => console.error('Error fetching scores data:', error));