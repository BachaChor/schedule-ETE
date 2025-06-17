const subjectMap = {
  "Advance Web Technology": {
    day: "30-June-2025",
    time: "10:00am - 01:00pm",
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
  Cryptography: {
    day: "09-July-2025",
    time: "10:00am - 01:00pm",
  },
};

        const subjects = ["Advance Web Technology", "Computer Networks", "Machine Learning", "Understanding India", "Cryptography"];
        const containerElement = document.querySelector(".subjects-container");

        // Status tracking using JavaScript objects (no localStorage)
        let examStatus = {};
        let prepStatus = {};

        // Initialize status for all subjects
        subjects.forEach(subject => {
            examStatus[subject] = false;
            prepStatus[subject] = false;
        });

        const getStatusIcon = (subject) => {
            if (examStatus[subject] && prepStatus[subject]) return "✅";
            if (examStatus[subject]) return "📝";
            if (prepStatus[subject]) return "📚";
            return "";
        };

        const getCardClass = (subject) => {
            if (examStatus[subject] && prepStatus[subject]) return "both-finished";
            if (examStatus[subject]) return "exam-finished";
            if (prepStatus[subject]) return "prep-finished";
            return "";
        };

        const updateCardStatus = (subject, card) => {
            // Remove all status classes
            card.className = "subject-card";
            
            // Add appropriate status class
            const statusClass = getCardClass(subject);
            if (statusClass) {
                card.classList.add(statusClass);
            }

            // Update status indicator
            const indicator = card.querySelector('.status-indicator');
            indicator.textContent = getStatusIcon(subject);

            // Update button states
            const prepBtn = card.querySelector('.prep-btn');
            const examBtn = card.querySelector('.exam-btn');
            
            prepBtn.classList.toggle('active', prepStatus[subject]);
            examBtn.classList.toggle('active', examStatus[subject]);
        };

        const makeSubjectCards = () => {
            subjects.forEach((subject) => {
                const subjectCard = document.createElement("div");
                subjectCard.classList.add("subject-card");
                
                const currentObj = subjectMap[subject];
                if (currentObj) {
                    subjectCard.innerHTML = `
                        <div class="status-indicator"></div>
                        <div class="subject-name">${subject}</div> 
                        <hr>
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
                        <div class="status-controls">
                            <button class="status-btn prep-btn">📚 Prep Done</button>
                            <button class="status-btn exam-btn">📝 Exam Done</button>
                        </div>
                    `;
                    
                    // Add event listeners for status buttons
                    const prepBtn = subjectCard.querySelector('.prep-btn');
                    const examBtn = subjectCard.querySelector('.exam-btn');
                    
                    prepBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        prepStatus[subject] = !prepStatus[subject];
                        updateCardStatus(subject, subjectCard);
                    });
                    
                    examBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        examStatus[subject] = !examStatus[subject];
                        updateCardStatus(subject, subjectCard);
                    });

                    // Initialize card status
                    updateCardStatus(subject, subjectCard);
                    
                    containerElement.appendChild(subjectCard);
                }
            });
        };

        // Theme toggle functionality
        const themeToggle = document.getElementById('themeToggle');

        // Simple theme preference (no localStorage)
        let currentTheme = 'dark';

        themeToggle.addEventListener('change', () => {
            if (themeToggle.checked) {
                document.body.classList.add('light-theme');
                currentTheme = 'light';
            } else {
                document.body.classList.remove('light-theme');
                currentTheme = 'dark';
            }
        });

        // Initialize the page
        makeSubjectCards();
