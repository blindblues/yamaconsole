// Gestione dropdown insegnanti
function toggleInstructorsDropdown() {
    const dropdown = document.getElementById('instructorsDropdown');
    const header = document.querySelector('.dropdown-header');
    
    if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
        header.classList.remove('active');
    } else {
        dropdown.classList.add('show');
        header.classList.add('active');
    }
}

// Gestione espansione anteprima corso - Identica a classes.html
function toggleCoursePreview() {
    const preview = document.getElementById('coursePreview');
    const isExpanded = preview.classList.contains('expanded');
    let overlay = document.querySelector('.class-overlay');
    
    console.log('toggleCoursePreview called, isExpanded:', isExpanded, 'overlay:', overlay);
    
    if (isExpanded) {
        // Chiudi la scheda
        preview.classList.remove('expanded');
        
        // Rimuovi il pulsante di chiusura
        const closeBtn = preview.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.remove();
        }
        
        // Nascondi l'overlay
        if (overlay) {
            overlay.classList.remove('active');
            // Rimuovi l'event listener per evitare duplicazioni
            if (overlay._clickHandler) {
                overlay.removeEventListener('click', overlay._clickHandler);
                overlay._clickHandler = null;
            }
        }
        
        // Ripristina lo scroll del body
        document.body.style.overflow = '';
        
        // Rimuovi il placeholder se esiste
        if (preview._placeholder) {
            preview._placeholder.remove();
            preview._placeholder = null;
        }
        
        // Riposiziona la scheda nella sua posizione originale
        restoreOriginalPosition(preview);
        
    } else {
        // Crea o mostra l'overlay
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'class-overlay';
            document.body.appendChild(overlay);
            console.log('Overlay created:', overlay);
        }
        overlay.classList.add('active');
        console.log('Overlay activated');
        
        // Crea un placeholder per mantenere lo spazio
        const placeholder = document.createElement('div');
        placeholder.className = 'class-card expanded-placeholder';
        placeholder.style.height = preview.offsetHeight + 'px';
        // Salva il riferimento al placeholder nella scheda
        preview._placeholder = placeholder;
        preview.parentNode.insertBefore(placeholder, preview);
        
        // Salva la posizione originale prima di spostare
        preview._originalParent = preview.parentNode;
        preview._originalNextSibling = preview.nextSibling;
        
        // Sposta la scheda nel body per garantire posizionamento corretto
        document.body.appendChild(preview);
        
        // Aggiungi la classe expanded dopo aver spostato la scheda
        preview.classList.add('expanded');
        
        // Aggiungi pulsante di chiusura
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Chiudi');
        preview.appendChild(closeBtn);
        
        // Blocca lo scroll del body
        document.body.style.overflow = 'hidden';
        
        // Event listener per il pulsante di chiusura
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCoursePreview();
        });
        
        // Chiudi la scheda con il tasto ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                toggleCoursePreview();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        // Chiudi la scheda cliccando sull'overlay
        const overlayClickHandler = function(e) {
            console.log('Overlay clicked, target:', e.target, 'overlay:', overlay);
            // Verifica che il click sia effettivamente sull'overlay e non sulla scheda
            if (e.target === overlay) {
                console.log('Closing preview via overlay click');
                toggleCoursePreview();
            }
        };
        overlay.addEventListener('click', overlayClickHandler);
        
        // Salva il riferimento al handler per rimuoverlo dopo
        overlay._clickHandler = overlayClickHandler;
    }
}

// Funzione per riposizionare una card nella sua posizione originale
function restoreOriginalPosition(card) {
    // Usa la posizione originale salvata
    const originalParent = card._originalParent;
    const originalNextSibling = card._originalNextSibling;
    
    if (originalParent && !originalParent.contains(card)) {
        // Inserisci la card nella sua posizione esatta
        if (originalNextSibling && originalNextSibling.parentNode === originalParent) {
            originalParent.insertBefore(card, originalNextSibling);
        } else {
            originalParent.appendChild(card);
        }
        console.log('Card riposizionata nella posizione originale');
        
        // Pulisci i riferimenti
        card._originalParent = null;
        card._originalNextSibling = null;
    }
}

// Chiudi l'anteprima espansa con il pulsante close (deprecato - usa toggleCoursePreview)
function closeCoursePreview() {
    const preview = document.getElementById('coursePreview');
    if (preview.classList.contains('expanded')) {
        toggleCoursePreview();
    }
}

// Chiudi il dropdown quando si clicca fuori
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('instructorsDropdown');
    const header = document.querySelector('.dropdown-header');
    
    if (!e.target.closest('.instructors-dropdown')) {
        dropdown.classList.remove('show');
        header.classList.remove('active');
    }
});

// Aggiorna il testo degli insegnanti selezionati
function updateSelectedInstructors() {
    const checkboxes = document.querySelectorAll('#instructorsDropdown input[type="checkbox"]');
    const selectedText = document.getElementById('selectedInstructorsText');
    const hiddenInput = document.getElementById('courseInstructors');
    
    const selected = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    if (selected.length === 0) {
        selectedText.textContent = 'Seleziona insegnanti...';
        hiddenInput.value = '';
    } else if (selected.length === 1) {
        selectedText.textContent = selected[0];
        hiddenInput.value = selected[0];
    } else {
        selectedText.textContent = `${selected.length} insegnanti selezionati`;
        hiddenInput.value = selected.join(' / ');
    }
}

// Aggiungi event listeners per i checkbox
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners per i checkbox degli insegnanti
    const checkboxes = document.querySelectorAll('#instructorsDropdown input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedInstructors);
    });
    
    // Previeni la chiusura del dropdown quando si clicca su un checkbox
    const dropdown = document.getElementById('instructorsDropdown');
    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Funzione per aggiornare l'anteprima in tempo reale
function updateCoursePreview() {
    const courseName = document.getElementById('courseName').value;
    const courseCategory = document.getElementById('courseCategory').value;
    const courseDescription = document.getElementById('courseDescription').value;
    const courseInstructors = document.getElementById('courseInstructors').value;
    const imagePreview = document.querySelector('#imagePreview img');
    
    // Aggiorna versione chiusa
    updatePreviewCard('#coursePreview', courseName, courseCategory, courseDescription, courseInstructors, imagePreview);
    
    // Aggiorna versione espansa
    updatePreviewCard('#coursePreviewExpanded', courseName, courseCategory, courseDescription, courseInstructors, imagePreview);
    
    // Aggiorna orari per entrambe le versioni
    updatePreviewSchedule();
}

// Funzione helper per aggiornare una singola scheda di anteprima
function updatePreviewCard(selector, courseName, courseCategory, courseDescription, courseInstructors, imagePreview) {
    // Aggiorna titolo
    const previewTitle = document.querySelector(`${selector} .class-title`);
    if (previewTitle) {
        previewTitle.textContent = courseName || 'Nome Corso';
    }
    
    // Aggiorna categoria
    const previewCategory = document.querySelector(`${selector} .course-category`);
    if (previewCategory) {
        previewCategory.value = courseCategory;
    }
    
    // Aggiorna descrizione
    const previewDescription = document.querySelector(`${selector} .class-description`);
    if (previewDescription) {
        previewDescription.textContent = courseDescription || 'Descrizione del corso apparirà qui...';
    }
    
    // Aggiorna immagine
    const previewImage = document.querySelector(`${selector} .class-image img`);
    if (previewImage) {
        if (imagePreview && imagePreview.src) {
            previewImage.src = imagePreview.src;
            previewImage.style.display = 'block';
        } else {
            previewImage.style.display = 'none';
        }
    }
    
    // Aggiorna insegnanti
    const instructorContainer = document.querySelector(`${selector} .class-instructor`);
    if (instructorContainer) {
        if (courseInstructors) {
            // Crea link cliccabili con separatori come su classes.html
            const instructorNames = courseInstructors.split(' / ').map(name => name.trim());
            let linksHTML = '<span class="instructor-label">Insegnanti:</span> ';
            
            instructorNames.forEach((instructor, index) => {
                // Aggiungi link dell'insegnante
                linksHTML += `<a href="#" class="instructor-link" onclick="return false;">${instructor}</a>`;
                
                // Aggiungi separatore se non è l'ultimo
                if (index < instructorNames.length - 1) {
                    linksHTML += `<span class="course-separator">/</span> `;
                }
            });
            
            instructorContainer.innerHTML = linksHTML;
        } else {
            instructorContainer.innerHTML = '<span class="instructor-label">Insegnanti:</span> <span class="instructor-names">-</span>';
        }
    }
}

// Funzione per aggiornare gli orari nell'anteprima
function updatePreviewSchedule() {
    const scheduleItems = document.querySelectorAll('#scheduleContainer .schedule-item');
    
    // Aggiorna sia versione chiusa che espansa
    updateScheduleInCard('#coursePreview', scheduleItems);
    updateScheduleInCard('#coursePreviewExpanded', scheduleItems);
}

// Funzione helper per aggiornare gli orari in una singola scheda
function updateScheduleInCard(selector, scheduleItems) {
    const previewScheduleItems = document.querySelector(`${selector} .schedule-items`);
    
    if (!previewScheduleItems) return;
    
    if (scheduleItems.length === 0) {
        previewScheduleItems.innerHTML = `
            <div class="schedule-item">
                <span class="schedule-day">-</span>
                <span class="schedule-time">-</span>
            </div>
        `;
        return;
    }
    
    let scheduleHTML = '';
    scheduleItems.forEach(item => {
        const day = item.querySelector('.day-select').value;
        const startTime = item.querySelector('.time-start').value;
        const endTime = item.querySelector('.time-end').value;
        
        if (day && startTime && endTime) {
            scheduleHTML += `
                <div class="schedule-item">
                    <span class="schedule-day">${day}</span>
                    <span class="schedule-time">${startTime} - ${endTime}</span>
                </div>
            `;
        }
    });
    
    if (scheduleHTML) {
        previewScheduleItems.innerHTML = scheduleHTML;
    } else {
        previewScheduleItems.innerHTML = `
            <div class="schedule-item">
                <span class="schedule-day">-</span>
                <span class="schedule-time">-</span>
            </div>
        `;
    }
}

// Inizializzazione globale del CourseLibraryManager
let courseManager;

// Console JavaScript - Yamakasi Fight Academy
document.addEventListener('DOMContentLoaded', function() {
    console.log('Console Yamakasi Fight Academy caricata');
    
    // Inizializzazione gestione corsi
    initCourseManager();
    
    // Inizializza il CourseLibraryManager
    if (typeof CourseLibraryManager !== 'undefined') {
        courseManager = new CourseLibraryManager();
        console.log('CourseLibraryManager inizializzato');
    } else {
        console.error('CourseLibraryManager non disponibile');
    }
    
    // Carica i corsi esistenti
    loadCourses();
    
    // Aggiungi event listeners per l'anteprima in tempo reale
    setupPreviewListeners();
    
    // Attiva l'animazione delle anteprime
    setTimeout(() => {
        document.querySelectorAll('.animate-up').forEach(element => {
            element.classList.add('visible');
        });
    }, 100);
    
    // Event listeners per i checkbox degli insegnanti
    const checkboxes = document.querySelectorAll('#instructorsDropdown input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedInstructors);
    });
    
    // Previeni la chiusura del dropdown quando si clicca su un checkbox
    const dropdown = document.getElementById('instructorsDropdown');
    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Imposta gli event listeners per l'anteprima
function setupPreviewListeners() {
    // Listener per i campi del form
    const courseNameInput = document.getElementById('courseName');
    
    // Listener unificato per il nome corso: trasforma in maiuscolo e aggiorna anteprima
    courseNameInput.addEventListener('input', function(e) {
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        const oldValue = e.target.value;
        const newValue = oldValue.toUpperCase();
        
        if (oldValue !== newValue) {
            e.target.value = newValue;
            e.target.setSelectionRange(start, end);
        }
        
        updateCoursePreview();
    });
    
    document.getElementById('courseCategory').addEventListener('change', updateCoursePreview);
    document.getElementById('courseDescription').addEventListener('input', updateCoursePreview);
    
    // Listener per il dropdown degli insegnanti
    const checkboxes = document.querySelectorAll('#instructorsDropdown input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectedInstructors();
            updateCoursePreview();
        });
    });
    
    // Listener per il container degli orari (event delegation)
    document.getElementById('scheduleContainer').addEventListener('change', function(e) {
        if (e.target.classList.contains('day-select') || 
            e.target.classList.contains('time-start') || 
            e.target.classList.contains('time-end')) {
            updatePreviewSchedule();
        }
    });
    
    // Listener per aggiungere/rimuovere orari
    document.getElementById('addSchedule').addEventListener('click', function() {
        // Aspetta un momento perché l'elemento venga aggiunto al DOM
        setTimeout(updatePreviewSchedule, 10);
    });
    
    document.getElementById('scheduleContainer').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-schedule')) {
            // Aspetta un momento perché l'elemento venga rimosso dal DOM
            setTimeout(updatePreviewSchedule, 10);
        }
    });
    
    // Listener per l'espansione dell'anteprima
    const coursePreview = document.getElementById('coursePreview');
    coursePreview.addEventListener('click', function(e) {
        // Non espandere se si clicca su link, input o altri elementi interattivi
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) {
            return;
        }
        toggleCoursePreview();
    });
    
    // Listener per il pulsante close
    const closeBtn = coursePreview.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeCoursePreview();
        });
    }
    document.getElementById('addSchedule').addEventListener('click', function() {
        // Aspetta un momento perché l'elemento venga aggiunto al DOM
        setTimeout(updatePreviewSchedule, 10);
    });
    
    document.getElementById('scheduleContainer').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-schedule')) {
            // Aspetta un momento perché l'elemento venga rimosso dal DOM
            setTimeout(updatePreviewSchedule, 10);
        }
    });
}

// Gestione corsi
function initCourseManager() {
    const form = document.getElementById('courseForm');
    const addScheduleBtn = document.getElementById('addSchedule');
    const scheduleContainer = document.getElementById('scheduleContainer');
    const imageUpload = document.getElementById('courseImageUpload');
    
    // Event listener per il form
    if (form) {
        form.addEventListener('submit', handleCourseSubmit);
        form.addEventListener('reset', function() {
            // Pulisci lo stato di modifica quando il form viene resettato
            sessionStorage.removeItem('editingCourseId');
            console.log('Stato di modifica rimosso dal form reset');
        });
    }
    
    // Event listener per aggiungere orari
    if (addScheduleBtn) {
        addScheduleBtn.addEventListener('click', addScheduleItem);
    }
    
    // Event listener per rimuovere orari (delegation)
    if (scheduleContainer) {
        scheduleContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('remove-schedule')) {
                e.target.parentElement.remove();
            }
        });
    }
    
    // Event listener per il caricamento immagini
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }
}

function addScheduleItem() {
    const scheduleContainer = document.getElementById('scheduleContainer');
    const scheduleItem = document.createElement('div');
    scheduleItem.className = 'schedule-item';
    scheduleItem.innerHTML = `
        <select name="day[]" class="day-select">
            <option value="Lunedì" selected>Lunedì</option>
            <option value="Martedì">Martedì</option>
            <option value="Mercoledì">Mercoledì</option>
            <option value="Giovedì">Giovedì</option>
            <option value="Venerdì">Venerdì</option>
            <option value="Sabato">Sabato</option>
            <option value="Domenica">Domenica</option>
        </select>
        <input type="time" name="startTime[]" class="time-start" placeholder="Inizio">
        <input type="time" name="endTime[]" class="time-end" placeholder="Fine">
        <button type="button" class="remove-schedule">Rimuovi</button>
    `;
    scheduleContainer.appendChild(scheduleItem);
}

async function handleCourseSubmit(e) {
    e.preventDefault();
    
    console.log('=== HANDLECOURSESUBMIT START ===');
    
    const formData = new FormData(e.target);
    const imageUpload = document.getElementById('courseImageUpload');
    
    // Controlla se siamo in modalità modifica
    const editingCourseId = sessionStorage.getItem('editingCourseId');
    
    // Estrai i dati dal form
    const courseData = {
        name: formData.get('courseName'),
        category: formData.get('courseCategory'),
        description: formData.get('courseDescription'),
        instructors: formData.get('courseInstructors'),
        schedule: extractScheduleFromForm(),
        level: '',
        duration: '',
        price: ''
    };
    
    // Gestione immagine
    if (imageUpload.files.length > 0) {
        const file = imageUpload.files[0];
        try {
            courseData.image = await saveUploadedImage(file, courseData.category);
        } catch (error) {
            console.error('Errore nel salvataggio dell\'immagine:', error);
            showNotification('Errore nel caricamento dell\'immagine', 'error');
            return;
        }
    }
    
    try {
        // Usa sempre il CourseLibraryManager
        if (!courseManager) {
            throw new Error('CourseLibraryManager non inizializzato');
        }
        
        if (editingCourseId) {
            // Modalità modifica
            console.log('Modifica corso esistente:', editingCourseId);
            await courseManager.updateCourse(editingCourseId, courseData);
            showNotification('Corso aggiornato con successo!');
            sessionStorage.removeItem('editingCourseId');
        } else {
            // Modalità aggiunta
            console.log('Aggiunta nuovo corso');
            await courseManager.addCourse(courseData);
            showNotification('Corso aggiunto con successo!');
        }
        
        // Resetta il form
        e.target.reset();
        resetImagePreview();
        updateCoursePreview();
        
        // Ricarica i corsi
        await loadCourses();
        
        // Auto-scroll al corso aggiunto
        if (!editingCourseId) {
            scrollToNewlyAddedCourse(courseData.category, courseData.name);
        }
        
        console.log('=== HANDLECOURSESUBMIT END ===');
        
    } catch (error) {
        console.error('Errore nel salvataggio del corso:', error);
        showNotification('Errore nel salvataggio del corso. Riprova più tardi.', 'error');
    }
}

// Funzione di supporto per estrarre gli orari dal form
function extractScheduleFromForm() {
    const scheduleItems = document.querySelectorAll('#scheduleContainer .schedule-item');
    const schedule = [];
    
    scheduleItems.forEach(item => {
        const day = item.querySelector('.day-select').value;
        const startTime = item.querySelector('.time-start').value;
        const endTime = item.querySelector('.time-end').value;
        
        if (day && startTime && endTime) {
            schedule.push({
                day: day,
                startTime: startTime,
                endTime: endTime,
                time: `${startTime} - ${endTime}`
            });
        }
    });
    
    return schedule;
}

// Funzione per gestire il cambio di categoria
function showCategory(category) {
    console.log('showCategory called with:', category);
        
    // Rimuovi la classe active da tutti i tab e sezioni
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.category-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Aggiungi la classe active al tab e sezione selezionati
    const activeTab = document.querySelector(`.category-tab[data-category="${category}"]`);
    const activeSection = document.getElementById(`${category}Courses`);
    
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    console.log(`Switched to category: ${category}`);
}

// Funzione per caricare e visualizzare i corsi
async function loadCourses(forceRefresh = false) {
    console.log('=== LOADCOURSES START ===', 'forceRefresh:', forceRefresh);
    
    try {
        // Usa sempre il CourseLibraryManager
        if (!courseManager) {
            throw new Error('CourseLibraryManager non inizializzato');
        }
        
        console.log('Caricamento corsi da CourseLibraryManager...');
        const courses = await courseManager.loadAllCourses(forceRefresh);
        console.log('Corsi caricati da JSON:', courses.length);
        
        // Ottieni i container delle categorie
        const adultiCoursesList = document.getElementById('adultiCoursesList');
        const ragazziCoursesList = document.getElementById('ragazziCoursesList');
        
        if (!adultiCoursesList || !ragazziCoursesList) {
            console.error('Course list elements not found!');
            return;
        }
        
        // Svuota tutte le liste
        adultiCoursesList.innerHTML = '';
        ragazziCoursesList.innerHTML = '';
        console.log('Liste corsi svuotate');
        
        // Filtra i corsi per categoria
        const adultiCourses = courses.filter(c => c.category === 'adulti' || c.categoria === 'adulti');
        const ragazziCourses = courses.filter(c => c.category === 'ragazzi' || c.categoria === 'ragazzi');
        
        // Ordina i corsi per data di creazione (più recenti prima)
        const sortedAdulti = [...adultiCourses].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
        });
        const sortedRagazzi = [...ragazziCourses].sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
        });
        
        console.log(`Corsi adulti: ${adultiCourses.length}, Corsi ragazzi: ${ragazziCourses.length}`);
        
        // Mostra corsi adulti nella sezione adulti
        sortedAdulti.forEach((course, index) => {
            try {
                const courseCard = createCourseCard(course);
                adultiCoursesList.appendChild(courseCard);
                
                setTimeout(() => {
                    courseCard.classList.add('visible');
                }, 50 * index);
                
                console.log('Card appended to adulti courses DOM');
            } catch (cardError) {
                console.error(`Error creating card for adult course ${course.name}:`, cardError);
            }
        });
        
        // Mostra corsi ragazzi nella sezione ragazzi
        sortedRagazzi.forEach((course, index) => {
            try {
                const courseCard = createCourseCard(course);
                ragazziCoursesList.appendChild(courseCard);
                
                setTimeout(() => {
                    courseCard.classList.add('visible');
                }, 50 * index);
                
                console.log('Card appended to ragazzi courses DOM');
            } catch (cardError) {
                console.error(`Error creating card for youth course ${course.name}:`, cardError);
            }
        });
        
        // Mostra messaggi se non ci sono corsi
        if (adultiCourses.length === 0) {
            adultiCoursesList.innerHTML = '<p>Nessun corso per adulti salvato.</p>';
        }
        
        if (ragazziCourses.length === 0) {
            ragazziCoursesList.innerHTML = '<p>Nessun corso per ragazzi salvato.</p>';
        }
        
        console.log('loadCourses completed successfully');
    } catch (error) {
        console.error('Error in loadCourses:', error);
    }
    
    console.log('=== LOADCOURSES END ===');
}

// Funzione per creare una card corso per la lista
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'class-card animate-up';
    card.dataset.courseId = course.id;
    card.dataset.category = course.category;
    
    // Ottieni l'URL dell'immagine
    const imageUrl = getUploadedImageUrl(course.image);
    
    // Crea gli HTML degli insegnanti come link cliccabili
    let instructorsHTML = '';
    if (course.instructors && typeof course.instructors === 'string') {
        const instructorNames = course.instructors.split(' / ').map(name => name.trim());
        instructorsHTML = '<span class="instructor-label">Insegnanti:</span> ';
        
        instructorNames.forEach((instructor, index) => {
            instructorsHTML += `<a href="#" class="instructor-link" onclick="return false;">${instructor}</a>`;
            
            if (index < instructorNames.length - 1) {
                instructorsHTML += `<span class="course-separator">/</span> `;
            }
        });
    } else {
        instructorsHTML = '<span class="instructor-label">Insegnanti:</span> <span class="instructor-names">-</span>';
    }
    
    // Formatta gli orari
    let scheduleHTML = '';
    if (course.schedule && course.schedule.length > 0) {
        scheduleHTML = course.schedule.map(item => `
            <div class="schedule-item">
                <span class="schedule-day">${item.day}</span>
                <span class="schedule-time">${item.time || `${item.startTime} - ${item.endTime}`}</span>
            </div>
        `).join('');
    } else {
        scheduleHTML = '<div class="schedule-item"><span class="schedule-day">-</span><span class="schedule-time">-</span></div>';
    }
    
    card.innerHTML = `
        <input type="hidden" class="course-category" value="${course.category}">
        <div class="class-image">
            ${imageUrl ? `<img src="${imageUrl}" alt="${course.name}">` : ''}
        </div>
        <div class="class-content">
            <h3 class="class-title">${course.name.toUpperCase()}</h3>
            <p class="class-description">${course.description}</p>
            <div class="class-info">
            </div>
            <div class="class-instructor">
                ${instructorsHTML}
            </div>
            <div class="class-schedule">
                <h4 class="schedule-title">Giorni e Orari</h4>
                <div class="schedule-items">
                    ${scheduleHTML}
                </div>
            </div>
            <div class="course-actions">
                <button class="edit-btn" onclick="editCourse('${course.id}')">Modifica</button>
                <button class="delete-btn" onclick="deleteCourse('${course.id}')">Elimina</button>
            </div>
        </div>
    `;
    
    // Aggiungi event listener per l'espansione della card
    card.addEventListener('click', function(e) {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input') || e.target.closest('.course-actions')) {
            return;
        }
        toggleCourseCard(card);
    });
    
    return card;
}

// Funzione per espandere/chiudere una card corso
function toggleCourseCard(card) {
    const isExpanded = card.classList.contains('expanded');
    let overlay = document.querySelector('.class-overlay');
    
    if (isExpanded) {
        // Chiudi la scheda
        card.classList.remove('expanded');
        
        const closeBtn = card.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.remove();
        }
        
        if (overlay) {
            overlay.classList.remove('active');
            if (overlay._clickHandler) {
                overlay.removeEventListener('click', overlay._clickHandler);
                overlay._clickHandler = null;
            }
        }
        
        document.body.style.overflow = '';
        
        if (card._placeholder) {
            card._placeholder.remove();
            card._placeholder = null;
        }
        
        restoreOriginalCardPosition(card);
        
    } else {
        // Chiudi altre schede espanse
        document.querySelectorAll('.class-card.expanded').forEach(otherCard => {
            if (otherCard !== card) {
                toggleCourseCard(otherCard);
            }
        });
        
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'class-overlay';
            document.body.appendChild(overlay);
        }
        overlay.classList.add('active');
        
        const placeholder = document.createElement('div');
        placeholder.className = 'class-card expanded-placeholder';
        placeholder.style.height = card.offsetHeight + 'px';
        card._placeholder = placeholder;
        card.parentNode.insertBefore(placeholder, card);
        
        card._originalParent = card.parentNode;
        card._originalNextSibling = card.nextSibling;
        
        document.body.appendChild(card);
        card.classList.add('expanded');
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Chiudi');
        card.appendChild(closeBtn);
        
        document.body.style.overflow = 'hidden';
        
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCourseCard(card);
        });
        
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                toggleCourseCard(card);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
        
        const overlayClickHandler = function(e) {
            if (e.target === overlay) {
                toggleCourseCard(card);
            }
        };
        overlay.addEventListener('click', overlayClickHandler);
        overlay._clickHandler = overlayClickHandler;
    }
}

// Funzione per riposizionare una card nella sua posizione originale
function restoreOriginalCardPosition(card) {
    const originalParent = card._originalParent;
    const originalNextSibling = card._originalNextSibling;
    
    if (originalParent && !originalParent.contains(card)) {
        if (originalNextSibling && originalNextSibling.parentNode === originalParent) {
            originalParent.insertBefore(card, originalNextSibling);
        } else {
            originalParent.appendChild(card);
        }
        console.log('Card riposizionata nella posizione originale');
        
        card._originalParent = null;
        card._originalNextSibling = null;
    }
}

// Funzione per modificare un corso
async function editCourse(courseId) {
    console.log('editCourse chiamata con ID:', courseId);
    
    // Salva l'ID del corso in fase di modifica
    sessionStorage.setItem('editingCourseId', courseId);
    console.log('Impostato stato di modifica per il corso:', courseId);
    
    // Usa sempre il CourseLibraryManager
    if (!courseManager) {
        throw new Error('CourseLibraryManager non inizializzato');
    }
    
    const course = await courseManager.findCourseById(courseId);
    
    if (!course) {
        console.error('Corso non trovato con ID:', courseId);
        showNotification('Corso non trovato!');
        return;
    }
    
    console.log('Corso trovato:', course);
    
    // Popola il form con i dati del corso
    document.getElementById('courseName').value = course.name;
    document.getElementById('courseCategory').value = course.category;
    document.getElementById('courseDescription').value = course.description;
    
    // Gestione insegnanti multipli
    if (course.instructors && typeof course.instructors === 'string') {
        const instructorNames = course.instructors.split(' / ').map(name => name.trim());
        
        const checkboxes = document.querySelectorAll('#instructorsDropdown input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        instructorNames.forEach(name => {
            const checkbox = Array.from(checkboxes).find(cb => cb.value === name);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
        
        updateSelectedInstructors();
    }
    
    // Carica l'immagine esistente nel preview
    if (course.image) {
        const imageUrl = getUploadedImageUrl(course.image);
        if (imageUrl) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${imageUrl}" alt="Anteprima immagine corso">`;
            preview.style.display = 'block';
            updateCoursePreview();
        }
    }
    
    // Carica gli orari esistenti
    const scheduleContainer = document.getElementById('scheduleContainer');
    scheduleContainer.innerHTML = '';
    
    course.schedule.forEach(item => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'schedule-item';
        
        const timeParts = item.time ? item.time.split(' - ') : ['', ''];
        const startTime = item.startTime || timeParts[0] || '';
        const endTime = item.endTime || timeParts[1] || '';
        
        scheduleItem.innerHTML = `
            <select name="day[]" class="day-select">
                <option value="Lunedì" ${item.day === 'Lunedì' ? 'selected' : ''}>Lunedì</option>
                <option value="Martedì" ${item.day === 'Martedì' ? 'selected' : ''}>Martedì</option>
                <option value="Mercoledì" ${item.day === 'Mercoledì' ? 'selected' : ''}>Mercoledì</option>
                <option value="Giovedì" ${item.day === 'Giovedì' ? 'selected' : ''}>Giovedì</option>
                <option value="Venerdì" ${item.day === 'Venerdì' ? 'selected' : ''}>Venerdì</option>
                <option value="Sabato" ${item.day === 'Sabato' ? 'selected' : ''}>Sabato</option>
                <option value="Domenica" ${item.day === 'Domenica' ? 'selected' : ''}>Domenica</option>
            </select>
            <input type="time" name="startTime[]" class="time-start" value="${startTime}">
            <input type="time" name="endTime[]" class="time-end" value="${endTime}">
            <button type="button" class="remove-schedule">Rimuovi</button>
        `;
        scheduleContainer.appendChild(scheduleItem);
    });

    // Scroll al form con evidenziazione
    setTimeout(() => {
        const formSection = document.querySelector('.course-form-section');
        if (formSection) {
            formSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
            });
            
            const originalStyle = formSection.getAttribute('style') || '';
            formSection.style.cssText = originalStyle + `
                border: 4px solid #fab53b !important;
                background: rgba(250, 181, 59, 0.15) !important;
                box-shadow: 0 0 40px rgba(250, 181, 59, 0.6) !important;
                border-radius: 20px !important;
                padding: 2rem !important;
                margin: 1rem 0 !important;
                transform: scale(1.03) !important;
                transition: all 0.5s ease !important;
                position: relative !important;
                z-index: 100 !important;
            `;
            
            setTimeout(() => {
                formSection.style.cssText = originalStyle;
            }, 4000);
        }
    }, 100);

    showNotification('Modifica il corso e clicca "Salva Corso" per aggiornarlo');
}

// Funzione per eliminare un corso
async function deleteCourse(courseId, showConfirm = true) {
    if (showConfirm && !confirm('Sei sicuro di voler eliminare questo corso?')) {
        return;
    }
    
    try {
        // Usa sempre il CourseLibraryManager
        if (!courseManager) {
            throw new Error('CourseLibraryManager non inizializzato');
        }
        
        await courseManager.deleteCourse(courseId);
        console.log('Corso eliminato tramite CourseLibraryManager:', courseId);
        
        // Ricarica la lista
        await loadCourses();
        
        if (showConfirm) {
            showNotification('Corso eliminato con successo!');
        }
        
    } catch (error) {
        console.error('Errore nell\'eliminazione del corso:', error);
        showNotification('Errore nell\'eliminazione del corso. Riprova più tardi.', 'error');
    }
}

// Funzione per mostrare notifiche
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const bgColor = type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#4CAF50';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        font-family: 'Funnel Display', sans-serif;
    `;
        
    document.body.appendChild(notification);
        
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Funzione per refresh manuale dei dati
async function refreshCoursesData() {
    console.log('=== REFRESH CORSI START ===');
    
    try {
        if (!courseManager) {
            throw new Error('CourseLibraryManager non inizializzato');
        }
        
        showNotification('Ricaricamento dati dai file JSON...', 'info');
        
        // Forza il ricaricamento dei dati
        await courseManager.refreshData();
        
        // Ricarica la visualizzazione
        await loadCourses(true);
        
        showNotification('Dati aggiornati con successo!', 'success');
        console.log('=== REFRESH CORSI END ===');
        
    } catch (error) {
        console.error('Errore nel refresh dei dati:', error);
        showNotification('Errore nel ricaricamento dei dati', 'error');
    }
}

// Funzioni per gestione immagini
function handleImageUpload(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Anteprima immagine">`;
            preview.style.display = 'block';
            updateCoursePreview();
        };
        reader.readAsDataURL(file);
    } else {
        resetImagePreview();
        updateCoursePreview();
    }
}

function resetImagePreview() {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    preview.style.display = 'none';
}

function saveUploadedImage(file, category) {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${sanitizeFileName(file.name)}`;
    const categoryFolder = category === 'ragazzi' ? 'ragazzi' : 'adulti';
    const imagePath = `img/corsi/${categoryFolder}/${fileName}`;
    
    const isOnline = window.location.protocol !== 'file:';
    
    if (isOnline) {
        return uploadImageToServer(file, imagePath, category);
    } else {
        return saveImageLocally(file, imagePath, fileName, categoryFolder);
    }
}

function uploadImageToServer(file, imagePath, category) {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);
    formData.append('imagePath', imagePath);
    
    const attemptUpload = async (retryCount = 0, maxRetries = 3) => {
        try {
            showUploadProgress('Caricamento immagine sul server...');
            
            const response = await fetch('../api/upload-image.php', {
                method: 'POST',
                body: formData,
                signal: AbortSignal.timeout(30000)
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                console.log('Immagine caricata sul server:', data.path);
                showNotification('Immagine salvata automaticamente sul server!', 'success');
                hideUploadProgress();
                return data.path;
            } else {
                throw new Error(data.error || 'Errore nel caricamento');
            }
            
        } catch (error) {
            console.error(`Tentativo ${retryCount + 1} fallito:`, error);
            
            if ((error.name === 'AbortError' || error.name === 'TypeError') && retryCount < maxRetries) {
                showNotification(`Tentativo ${retryCount + 1} fallito. Riprovo... (${retryCount + 2}/${maxRetries + 1})`, 'warning');
                
                const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
                await new Promise(resolve => setTimeout(resolve, delay));
                
                return attemptUpload(retryCount + 1, maxRetries);
            }
            
            hideUploadProgress();
            showNotification('Errore nel salvataggio dell\'immagine: ' + error.message, 'error');
            
            console.log('Fallback al salvataggio locale');
            return saveImageLocally(file, imagePath, file.name, category);
        }
    };
    
    return attemptUpload();
}

function saveImageLocally(file, imagePath, fileName, categoryFolder) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = {
            path: imagePath,
            dataUrl: e.target.result,
            originalName: file.name,
            category: categoryFolder,
            uploadedAt: new Date().toISOString()
        };
        
        let uploadedImages = JSON.parse(localStorage.getItem('yamakasi_uploaded_images') || '{}');
        uploadedImages[imagePath] = imageData;
        localStorage.setItem('yamakasi_uploaded_images', JSON.stringify(uploadedImages));
        
        console.log('Immagine salvata nel localStorage:', imagePath);
        
        // Mostra solo una notifica di successo senza finestra di download
        showNotification('Immagine salvata con successo nella cache locale!', 'success');
    };
    reader.readAsDataURL(file);
    
    return imagePath;
}

function sanitizeFileName(fileName) {
    return fileName
        .replace(/[^a-zA-Z0-9.-]/g, '_')
        .replace(/_{2,}/g, '_')
        .toLowerCase();
}

function getUploadedImageUrl(imagePath) {
    if (!imagePath) return null;
    
    const uploadedImages = JSON.parse(localStorage.getItem('yamakasi_uploaded_images') || '{}');
    const uploadedImageData = uploadedImages[imagePath];
    
    if (uploadedImageData) {
        return uploadedImageData.dataUrl;
    }
    
    const courseImages = JSON.parse(localStorage.getItem('yamakasi_course_images') || '{}');
    
    for (const [fileName, imageData] of Object.entries(courseImages)) {
        if (imagePath.includes(fileName) || fileName.includes(imagePath.split('/').pop())) {
            return imageData.data;
        }
    }
    
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
        return imagePath;
    }
    
    if (imagePath.startsWith('img/')) {
        return '../' + imagePath;
    }
    
    return null;
}

function showUploadProgress(message) {
    hideUploadProgress();
    
    const progressIndicator = document.createElement('div');
    progressIndicator.id = 'uploadProgressIndicator';
    progressIndicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(30, 0, 0, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #fab53b;
        z-index: 10000;
        font-family: 'Funnel Display', sans-serif;
        font-size: 0.9rem;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: slideInRight 0.3s ease-out;
    `;
    
    progressIndicator.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <div style="width: 16px; height: 16px; border: 2px solid #fab53b; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <span>${message}</span>
        </div>
    `;
    
    if (!document.querySelector('#uploadProgressAnimations')) {
        const style = document.createElement('style');
        style.id = 'uploadProgressAnimations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(progressIndicator);
}

function hideUploadProgress() {
    const progressIndicator = document.getElementById('uploadProgressIndicator');
    if (progressIndicator) {
        progressIndicator.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            if (progressIndicator.parentNode) {
                progressIndicator.parentNode.removeChild(progressIndicator);
            }
        }, 300);
    }
}

// Funzione per auto-scroll al corso appena aggiunto
function scrollToNewlyAddedCourse(category, courseName) {
    console.log('Auto-scroll al corso aggiunto:', category, courseName);
    
    // Attiva la categoria corretta
    showCategory(category);
    
    // Aspetta che le card siano state renderizzate
    setTimeout(() => {
        const coursesList = document.getElementById(`${category}CoursesList`);
        if (!coursesList) {
            console.error('Lista corsi non trovata per categoria:', category);
            return;
        }
        
        // Trova la card del corso appena aggiunto (è la prima nella lista dato che sono ordinati per data)
        const courseCards = coursesList.querySelectorAll('.class-card');
        if (courseCards.length > 0) {
            const newCourseCard = courseCards[0]; // Il primo elemento è il più recente
            
            // Evidenzia temporaneamente la card
            const originalStyle = newCourseCard.getAttribute('style') || '';
            newCourseCard.style.cssText = originalStyle + `
                border: 3px solid #fab53b !important;
                background: rgba(250, 181, 59, 0.1) !important;
                box-shadow: 0 0 30px rgba(250, 181, 59, 0.5) !important;
                transform: scale(1.02) !important;
                transition: all 0.3s ease !important;
            `;
            
            // Scroll alla card con animazione fluida
            newCourseCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
            });
            
            // Rimuovi l'evidenziazione dopo qualche secondo
            setTimeout(() => {
                newCourseCard.style.cssText = originalStyle;
            }, 3000);
            
            console.log('Scroll completato al corso:', courseName);
        } else {
            console.warn('Nessuna card trovata per il corso:', courseName);
        }
    }, 500); // Aspetta il rendering delle card
}