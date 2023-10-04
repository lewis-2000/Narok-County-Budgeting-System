const tabs = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const selectElement = document.querySelectorAll(".selectNumber");

tabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        sections.forEach(section => {
            section.style.display = 'none';
        });
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        targetSection.style.display = 'block';
        targetSection.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when a tab is active
    });
});

selectElement.forEach((select) => {
    for (let i = 1; i <= 100; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i +  "%";
        select.appendChild(option);
    }
});