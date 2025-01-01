window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('scheduleForm');
    const maxSubjectsInput = document.getElementById('maxSubjects');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const days = event.target.elements['days'].value;
        const maxSubjects = event.target.elements['maxSubjects'].value;
        const language = event.target.elements['language'].value;

        clearResultContainer();
        displayInputFields(days, maxSubjects, language);
        saveSettingsToLocalStorage(days, maxSubjects, language);
        clearScheduleFromLocalStorage();
    });

    maxSubjectsInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });

    function displayInputFields(days, maxSubjects, language) {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = `
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>${language === 'ru' ? 'День' : 'Day'}</th>
                        ${generateSubjectHeaders(maxSubjects, language)}
                    </tr>
                </thead>
                <tbody id="inputTableBody">
                    ${generateInputRows(days, maxSubjects, language)}
                </tbody>
            </table>
            <button id="saveButton">${language === 'ru' ? 'Сохранить расписание' : 'Save Schedule'}</button>`;

        document.getElementById('saveButton').addEventListener('click', function() {
            const schedule = generateScheduleFromInputs(days, maxSubjects);
            displaySchedule(schedule, language);
            saveScheduleToLocalStorage(schedule, language);
        });

        loadSavedSchedule(language);
    }

    function generateInputRows(days, maxSubjects, language) {
        let rows = '';
        for (let i = 0; i < days; i++) {
            let cells = `<td>${language === 'ru' ? 'День' : 'Day'} ${i + 1}</td>`;
            for (let j = 0; j < maxSubjects; j++) {
                cells += `<td><input type="text" placeholder="${language === 'ru' ? `Занятие ${j + 1}` : `Class ${j + 1}`}" name="day${i}-subject${j}" class="subject-input"></td>`;
            }
            rows += `<tr>${cells}</tr>`;
        }
        return rows;
    }

    function generateScheduleFromInputs(days, maxSubjects) {
        const schedule = [];
        for (let i = 0; i < days; i++) {
            const day = [];
            for (let j = 0; j < maxSubjects; j++) {
                const subject = document.querySelector(`input[name="day${i}-subject${j}"]`).value;
                day.push(subject);
            }
            schedule.push(day);
        }
        return schedule;
    }

    function displaySchedule(schedule, language) {
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = `
            <table class="schedule-table">
                <thead>
                    <tr>
                        <th>${language === 'ru' ? 'День' : 'Day'}</th>
                        ${generateSubjectHeaders(schedule[0].length, language)}
                    </tr>
                </thead>
                <tbody>
                    ${generateScheduleRows(schedule, language)}
                </tbody>
            </table>`;
    }

    function generateScheduleRows(schedule, language) {
        let rows = '';
        schedule.forEach((day, index) => {
            let cells = `<td>${language === 'ru' ? 'День' : 'Day'} ${index + 1}</td>`;
            day.forEach(subject => {
                cells += `<td>${subject}</td>`;
            });
            rows += `<tr>${cells}</tr>`;
        });
        return rows;
    }

    function generateSubjectHeaders(count, language) {
        let headers = '';
        for (let i = 1; i <= count; i++) {
            headers += `<th>${language === 'ru' ? `Занятие ${i}` : `Class ${i}`}</th>`;
        }
        return headers;
    }

    function saveSettingsToLocalStorage(days, maxSubjects, language) {
        localStorage.setItem('days', days);
        localStorage.setItem('maxSubjects', maxSubjects);
        localStorage.setItem('language', language);
    }

    function saveScheduleToLocalStorage(schedule, language) {
        localStorage.setItem('schedule', JSON.stringify(schedule));
        localStorage.setItem('scheduleLanguage', language);
    }

    function loadSavedSchedule(defaultLanguage) {
        const savedSchedule = JSON.parse(localStorage.getItem('schedule'));
        const savedLanguage = localStorage.getItem('scheduleLanguage') || defaultLanguage;
        if (savedSchedule) {
            displaySchedule(savedSchedule, savedLanguage);
        }
    }

    function clearScheduleFromLocalStorage() {
        localStorage.removeItem('schedule');
        localStorage.removeItem('scheduleLanguage');
    }

    function clearResultContainer() {
        document.getElementById('resultContainer').innerHTML = '';
    }

    window.addEventListener('load', function() {
        const settings = {
            days: localStorage.getItem('days'),
            maxSubjects: localStorage.getItem('maxSubjects'),
            language: localStorage.getItem('language')
        };

        if (settings.days && settings.maxSubjects && settings.language) {
            document.getElementById('days').value = settings.days;
            document.getElementById('maxSubjects').value = settings.maxSubjects;
            document.getElementById('language').value = settings.language;

            clearResultContainer();
            displayInputFields(settings.days, settings.maxSubjects, settings.language);
        }
    });
});
