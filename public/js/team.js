(function () {
    const teamGroups = document.querySelectorAll('.team-group');
    const teamGroupIds = Array.from(teamGroups).map(group => group.id);
    fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            const employees = data.employees;
            teamGroups.forEach(group => {
                const teamName = group.id.replace('-div', '');
                const teamEmployees = employees.filter(employee => employee.department.toLowerCase() === teamName.toLowerCase());
                teamEmployees.forEach(employee => {
                    const htmlString = `
                    <article class="member-card"><img src="${employee.imageUrl}" alt="Temporary profile for ${employee.name}">
                                <div><strong>${employee.name}</strong><span>${employee.position}</span><span>${employee.shortBio}</span></div>
                            </article>`;
                    group.querySelector('.member-grid').insertAdjacentHTML('beforeend', htmlString);

                    if(employee.boardMember){
                        const boardElement = document.getElementById("board-div").querySelector(".member-grid")
                        boardElement.insertAdjacentHTML("beforeend", htmlString)
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching employees:', error));

    fetch('/api/openings')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            data.openings.forEach(opening => {
                const div = document.createElement('div');
                div.className = 'member-line open-role';

                div.innerHTML = `
                <strong>${opening.title}</strong>
                <span>Open position</span>
                <span>${opening.description}</span>
            `;

                const openingDiv = document.getElementById(`${opening.department}-div`);
                const joinButton = openingDiv.querySelector('a[href="/apply"]');
                console.log(openingDiv, joinButton);

                if (joinButton) {
                    joinButton.insertAdjacentElement('beforebegin', div);
                } else {
                    const memberGrid = openingDiv.querySelector('.member-grid');
                    memberGrid.classList.add('hiring');
                    openingDiv.querySelector('.hiring-tag').style.visibility = 'visible';
                    memberGrid.insertAdjacentElement('afterend', div);

                    const newJoinButton = document.createElement('a');
                    newJoinButton.href = '/apply';
                    newJoinButton.textContent = 'Join this team';

                    div.insertAdjacentElement('afterend', newJoinButton);
                }
            });
        })
        .catch(error => console.error('Error fetching openings:', error));
})();