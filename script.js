const subjectMap = {
  "Advance Web Technology": {
    day: "30-May-2025",
    time: "10:00am - 01:00pm",
  },
  "Computer Networks": {
    day: "02-June-2025",
    time: "10:00am - 01:00pm",
  },
  "Machine Learning": {
    day: "04-June-2025",
    time: "10:00am - 01:00pm",
  },
  "Understanding India": {
    day: "07-June-2025",
    time: "10:00am - 01:00pm",
  },
  Cryptography: {
    day: "09-June-2025",
    time: "10:00am - 01:00pm",
  },
};


const subjects = ["Advance Web Technology", "Computer Networks", "Machine Learning", "Understanding India", "Cryptography"];
        const containerElement = document.querySelector(".subjects-container");

        // Status tracking with localStorage
        let examStatus = {};
        let prepStatus = {};

        // Load status from localStorage or initialize with defaults
        const loadStatus = () => {
            try {
                const savedExamStatus = localStorage.getItem('examStatus');
                const savedPrepStatus = localStorage.getItem('prepStatus');
                
                examStatus = savedExamStatus ? JSON.parse(savedExamStatus) : {};
                prepStatus = savedPrepStatus ? JSON.parse(savedPrepStatus) : {};
                
                // Initialize any missing subjects
                subjects.forEach(subject => {
                    if (examStatus[subject] === undefined) examStatus[subject] = false;
                    if (prepStatus[subject] === undefined) prepStatus[subject] = false;
                });
            } catch (error) {
                console.log('Error loading status from localStorage, using defaults');
                subjects.forEach(subject => {
                    examStatus[subject] = false;
                    prepStatus[subject] = false;
                });
            }
        };

        // Save status to localStorage
        const saveStatus = () => {
            try {
                localStorage.setItem('examStatus', JSON.stringify(examStatus));
                localStorage.setItem('prepStatus', JSON.stringify(prepStatus));
            } catch (error) {
                console.log('Error saving status to localStorage');
            }
        };

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
                        saveStatus(); // Save to localStorage
                        updateCardStatus(subject, subjectCard);
                    });
                    
                    examBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        examStatus[subject] = !examStatus[subject];
                        saveStatus(); // Save to localStorage
                        updateCardStatus(subject, subjectCard);
                    });

                    // Initialize card status
                    updateCardStatus(subject, subjectCard);
                    
                    containerElement.appendChild(subjectCard);
                }
            });
        };

        // Theme toggle functionality with localStorage
        const themeToggle = document.getElementById('themeToggle');

        // Load theme preference from localStorage
        const loadTheme = () => {
            try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                    document.body.classList.add('light-theme');
                    themeToggle.checked = true;
                }
            } catch (error) {
                console.log('Error loading theme from localStorage');
            }
        };

        themeToggle.addEventListener('change', () => {
            try {
                if (themeToggle.checked) {
                    document.body.classList.add('light-theme');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.body.classList.remove('light-theme');
                    localStorage.setItem('theme', 'dark');
                }
            } catch (error) {
                console.log('Error saving theme to localStorage');
            }
        });

        // Initialize the page
        loadStatus(); // Load saved status first
        loadTheme();  // Load saved theme
        makeSubjectCards();
