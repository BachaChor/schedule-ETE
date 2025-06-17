const subjectMap = {
    "Advance Web Technology": {
        day: "30-June-2025",
        time: "10:00am - 01:30pm",
    },
    "Computer Networks": {
        day: "02-July-2025",
        time: "10:00am - 01:00pm",
    },
    "Machine Learning": {
        day: "04-July-2025",
        time: "10:00am - 01:00pm",
    },
    "Understanding India": {
        day: "07-July-2025",
        time: "10:00am - 01:00pm",
    },
    "Cryptography": {
        day: "19-May-2025",
        time: "10:00am - 01:00pm"
    },
};

const subjects = ["Advance Web Technology", "Computer Networks", "Machine Learning", "Understanding India", "Cryptography"];
const containerElement = document.querySelector(".subjects-container");

// Create subject cards
const makeSubjectCards = () => {
    subjects.forEach((subject) => {
        const subjectCard = document.createElement("div");
        subjectCard.classList.add("subject-card");
        
        const currentObj = subjectMap[subject];
        if (currentObj) {
            subjectCard.innerHTML = `
                <div class="subject-name">${subject}</div> <hr>
                <div class="subject-info">
                    <div class="info-item">
                        <span class="info-label">Date</span> 
                        <span class="info-value">${currentObj.day}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Time</span>
                        <span class="info-value">${currentObj.time}</span>
                    </div>
                </div>
            `;
            containerElement.appendChild(subjectCard);
        }
    });
};

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or use default
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    }
});

// Initialize the page
makeSubjectCards();
