(function() {
    const teamGroups = document.querySelectorAll('.team-group');
    const teamGroupIds = Array.from(teamGroups).map(group => group.id);
    fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const employees = data.employees;
            teamGroups.forEach(group => {
                const teamName = group.id.replace('-div', '');
                console.log(teamName+" "+group.id)
                const teamEmployees = employees.filter(employee => employee.department.toLowerCase() === teamName.toLowerCase());
                console.log(teamEmployees)
                teamEmployees.forEach(employee => {
                    const htmlString = `
                    <article class="member-card"><img src="${employee.imageUrl}" alt="Temporary profile for ${employee.name}">
                                <div><strong>${employee.name}</strong><span>${employee.shortBio}</span></div>
                            </article>`;
                            console.log(group.querySelector('.member-grid'))
                            group.querySelector('.member-grid').insertAdjacentHTML('beforeend', htmlString);
                });
            });
        })
        .catch(error => console.error('Error fetching employees:', error));
})();