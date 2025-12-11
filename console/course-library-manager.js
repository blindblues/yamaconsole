// Course Library Manager - Integrazione con i file JSON nella cartella course-library
class CourseLibraryManager {
    constructor() {
        this.basePath = '../course-library';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minuti di cache
        
        // Verifica che siamo nella cartella console
        console.log('CourseLibraryManager inizializzato');
        console.log('Base path:', this.basePath);
        console.log('Location attuale:', window.location.href);
        
        // Dati di fallback inclusi direttamente nel codice
        this.fallbackData = {
            adulti: [
                {
                    "id": "course_69681c39",
                    "name": "TAKEMUSU AIKIDO",
                    "description": "Arte marziale giapponese basata sull'uso della forza dell'avversario per proiettarlo e controllarlo attraverso tecniche di leva e articolazioni.",
                    "category": "adulti",
                    "instructors": "Michel",
                    "schedule": [
                        {"day": "Lunedì", "time": "20:00 - 21:00", "startTime": "20:00", "endTime": "21:00"},
                        {"day": "Mercoledì", "time": "20:00 - 21:00", "startTime": "20:00", "endTime": "21:00"},
                        {"day": "Venerdì", "time": "20:00 - 21:00", "startTime": "20:00", "endTime": "21:00"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/adulti/aikido.jpg"
                },
                {
                    "id": "course_33d940a7",
                    "name": "DAITO RYU AIKI JUJUTSU",
                    "description": "Antica arte marziale giapponese che si concentra sulle tecniche di controllo delle articolazioni e sul neutralizzare l'avversario con minima forza.",
                    "category": "adulti",
                    "instructors": "Pietro",
                    "schedule": [
                        {"day": "Martedì", "time": "20:30 - 22:00", "startTime": "20:30", "endTime": "22:00"},
                        {"day": "Giovedì", "time": "20:30 - 22:00", "startTime": "20:30", "endTime": "22:00"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/adulti/jujutsu.jpg"
                },
                {
                    "id": "course_120454",
                    "name": "KARATE",
                    "description": "Arte marziale che sviluppa forza, flessibilità e disciplina attraverso tecniche di pugni, calci, parate e forme (kata).",
                    "category": "adulti",
                    "instructors": "Pietro",
                    "schedule": [
                        {"day": "Lunedì", "time": "19:00 - 20:00", "startTime": "19:00", "endTime": "20:00"},
                        {"day": "Mercoledì", "time": "19:00 - 20:00", "startTime": "19:00", "endTime": "20:00"},
                        {"day": "Venerdì", "time": "19:00 - 20:00", "startTime": "19:00", "endTime": "20:00"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/adulti/karate.jpg"
                },
                {
                    "id": "course_2598d188",
                    "name": "MUAY THAI",
                    "description": "Arte marziale thailandese conosciuta come \"l'arte delle otto armi\" che utilizza pugni, gomiti, ginocchia e calci.",
                    "category": "adulti",
                    "instructors": "Roberto / Andrea / Elia",
                    "schedule": [
                        {"day": "Lunedì", "time": "18:30 - 19:30", "startTime": "18:30", "endTime": "19:30"},
                        {"day": "Martedì", "time": "20:00 - 21:00", "startTime": "20:00", "endTime": "21:00"},
                        {"day": "Giovedì", "time": "20:00 - 21:00", "startTime": "20:00", "endTime": "21:00"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/adulti/muaythai.jpg"
                },
                {
                    "id": "course_28b7f1e",
                    "name": "KICK BOXING - K1",
                    "description": "Disciplina da combattimento che combina tecniche di pugilato e calci, con regole che permettono colpi potenti e spettacolari.",
                    "category": "adulti",
                    "instructors": "Roberto / Andrea / Elia",
                    "schedule": [
                        {"day": "Martedì", "time": "19:00 - 20:00", "startTime": "19:00", "endTime": "20:00"},
                        {"day": "Venerdì", "time": "19:00 - 20:00", "startTime": "19:00", "endTime": "20:00"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/adulti/kickboxe.jpg"
                },
                {
                    "id": "course_25ec33b8",
                    "name": "WONDER WOMEN",
                    "description": "Corso esclusivamente femminile che unisce difesa personale, preparazione fisica e crescita della fiducia in sé stesse.",
                    "category": "adulti",
                    "instructors": "Tatiana",
                    "schedule": [
                        {"day": "Martedì", "time": "18:30 - 19:15", "startTime": "18:30", "endTime": "19:15"},
                        {"day": "Giovedì", "time": "18:30 - 19:15", "startTime": "18:30", "endTime": "19:15"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/adulti/wonderwomen.jpg"
                },
                {
                    "id": "course_1f970c49",
                    "name": "BOXE",
                    "description": "Nobile arte del pugilato che migliora coordinazione, resistenza e forza attraverso tecniche di attacco e difesa con i pugni.",
                    "category": "adulti",
                    "instructors": "David",
                    "schedule": [
                        {"day": "Lunedì", "time": "20:00 - 21:00", "startTime": "20:00", "endTime": "21:00"},
                        {"day": "Mercoledì", "time": "20:00 - 21:00", "startTime": "20:00", "endTime": "21:00"},
                        {"day": "Venerdì", "time": "20:00 - 21:00", "startTime": "20:00", "endTime": "21:00"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/adulti/boxe.jpg"
                },
                {
                    "id": "course_63fee78d",
                    "name": "KOMBAT TRAINING",
                    "description": "Allenamento funzionale che combina tecniche di diverse arti marziali per una preparazione fisica completa ed efficace.",
                    "category": "adulti",
                    "instructors": "Tatiana",
                    "schedule": [
                        {"day": "Mercoledì", "time": "18:30 - 19:45", "startTime": "18:30", "endTime": "19:45"},
                        {"day": "Venerdì", "time": "18:30 - 19:45", "startTime": "18:30", "endTime": "19:45"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/adulti/kombattraining.jpg"
                },
                {
                    "id": "course_51aff05a",
                    "name": "BRAZILIAN JIUJITSU",
                    "description": "Arte marziale focalizzata sulla lotta a terra, leve articolari e strangolamenti, ideale per sconfiggere avversari più grandi.",
                    "category": "adulti",
                    "instructors": "Matteo",
                    "schedule": [
                        {"day": "Lunedì", "time": "21:00 - 22:00", "startTime": "21:00", "endTime": "22:00"},
                        {"day": "Giovedì", "time": "21:00 - 22:00", "startTime": "21:00", "endTime": "22:00"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/adulti/brazilianjiujitsu.jpg"
                },
                {
                    "id": "course_1fdf310c",
                    "name": "MMA",
                    "description": "Mixed Martial Arts - disciplina completa che integra tecniche di striking e grappling per il combattimento totale.",
                    "category": "adulti",
                    "instructors": "Ermanno / Elia",
                    "schedule": [
                        {"day": "Martedì", "time": "21:00 - 22:30", "startTime": "21:00", "endTime": "22:30"},
                        {"day": "Venerdì", "time": "21:00 - 22:30", "startTime": "21:00", "endTime": "22:30"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/adulti/mma.jpg"
                }
            ],
            ragazzi: [
                {
                    "id": "course_42e56b79",
                    "name": "MARTIAL KIDZ",
                    "description": "Questo indirizzo nasce con lo scopo di creare una base completa a 360 gradi dalla la crescita psicomotoria alla crescita sociale del bambino/a nel modo completo possibile",
                    "category": "ragazzi",
                    "instructors": "Giulia",
                    "schedule": [
                        {"day": "Martedì", "time": "17:30 - 18:15", "startTime": "17:30", "endTime": "18:15"},
                        {"day": "Giovedì", "time": "17:30 - 18:15", "startTime": "17:30", "endTime": "18:15"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/ragazzi/martialkidz.png"
                },
                {
                    "id": "course_5b6e7dd1",
                    "name": "MUAY THAI JUNIOR",
                    "description": "Corso base per bambini dalla prima alla quinta elementare. In questo corso vengono insegnati i principi base e le tecniche iniziali della Muay Thai",
                    "category": "ragazzi",
                    "instructors": "Tatiana / Elia",
                    "schedule": [
                        {"day": "Lunedì", "time": "17:30 - 18:20", "startTime": "17:30", "endTime": "18:20"},
                        {"day": "Venerdì", "time": "17:30 - 18:20", "startTime": "17:30", "endTime": "18:20"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/ragazzi/muaythaijunior.png"
                },
                {
                    "id": "course_4d81b6e8",
                    "name": "MUAY THAI YOUNG",
                    "description": "Il corso è adatto ai ragazzi che frequentano la Scuola Secondaria di primo grado",
                    "category": "ragazzi",
                    "instructors": "Tatiana / Elia",
                    "schedule": [
                        {"day": "Martedì", "time": "18:30 - 19:30", "startTime": "18:30", "endTime": "19:30"},
                        {"day": "Giovedì", "time": "18:30 - 19:30", "startTime": "18:30", "endTime": "19:30"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/ragazzi/muaythaiyoung.png"
                },
                {
                    "id": "course_23bb5f8b",
                    "name": "BJJ JUNIOR",
                    "description": "Adatto per i bimbi dalla prima elementare",
                    "category": "ragazzi",
                    "instructors": "Matteo",
                    "schedule": [
                        {"day": "Lunedì", "time": "17:30 - 18:20", "startTime": "17:30", "endTime": "18:20"},
                        {"day": "Giovedì", "time": "17:30 - 18:20", "startTime": "17:30", "endTime": "18:20"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/ragazzi/bjjjunior.png"
                },
                {
                    "id": "course_1c59a022",
                    "name": "MUAY THAI TEEN",
                    "description": "Adatto per ragazzi dalle prima alla terza superiore",
                    "category": "ragazzi",
                    "instructors": "Tatiana / Elia",
                    "schedule": [
                        {"day": "Martedì", "time": "19:45 - 20:45", "startTime": "19:45", "endTime": "20:45"},
                        {"day": "Giovedì", "time": "19:45 - 20:45", "startTime": "19:45", "endTime": "20:45"}
                    ],
                    "level": "",
                    "duration": "",
                    "price": "",
                    "image": "img/corsi/ragazzi/muaythaiteen.png"
                }
            ]
        };
    }

    // Funzione per caricare un file JSON con gestione cache
    async loadJSONFile(filePath, forceRefresh = false) {
        const cacheKey = filePath;
        const cached = this.cache.get(cacheKey);
        
        // Se abbiamo dati in cache non scaduti e non forziamo il ricaricamento, usali
        if (!forceRefresh && cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            console.log(`Usando cache per ${filePath}`);
            return cached.data;
        }

        try {
            console.log(`Caricamento fresco da ${filePath}`);
            const response = await fetch(filePath, { cache: 'no-cache' });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Salva in cache
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            console.log(`Dati caricati con successo da ${filePath}:`, data);
            return data;
        } catch (error) {
            console.error(`Errore nel caricamento del file ${filePath}:`, error);
            throw error;
        }
    }

    // Funzione per salvare un file JSON
    async saveJSONFile(filePath, data) {
        console.log(`Salvataggio richiesto per ${filePath}:`, data);
        
        // Estrai la categoria dal percorso del file
        const isImagesFile = filePath.includes('images.json');
        const category = filePath.includes('adulti') ? 'adulti' : 'ragazzi';
        
        try {
            // Determina se siamo online o locali
            const isOnline = window.location.protocol !== 'file:';
            
            if (isOnline) {
                // Prova a salvare sul server
                let apiUrl, payload;
                
                if (isImagesFile) {
                    // Usa l'API specifica per le immagini
                    apiUrl = '/sito%20yamakasi/api/save-images.php';
                    payload = data;
                } else {
                    // Usa l'API semplificata per debug
                    apiUrl = '/sito%20yamakasi/api/save-courses-simple.php';
                    payload = {
                        category: category,
                        courses: data.corsi || data
                    };
                }
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });
                
                console.log('API Response status:', response.status);
                console.log('API Response ok:', response.ok);
                
                if (!response.ok) {
                    console.error('API Response not OK:', response.status, response.statusText);
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const result = await response.json();
                console.log('API Response result:', result);
                
                if (result.success) {
                    console.log('Dati salvati con successo sul server:', result);
                    
                    // Aggiorna la cache
                    this.cache.set(filePath, {
                        data: data,
                        timestamp: Date.now()
                    });
                    
                    // Invalida anche la cache di caricamento forzando un refresh
                    const cacheKey = filePath;
                    if (this.cache.has(cacheKey)) {
                        this.cache.delete(cacheKey);
                        console.log('Cache invalidata per:', filePath);
                    }
                    
                    // Non mostrare notifica qui per evitare duplicazioni
                    // La notifica viene gestita dal chiamante (console.js)
                    console.log('Dati salvati con successo sul server:', result);
                } else {
                    console.error('API returned error:', result);
                    throw new Error(result.error || 'Errore nel salvataggio sul server');
                }
            } else {
                // Tentativo di salvataggio locale diretto
                const saveResult = await this.saveLocalFile(filePath, data);
                return saveResult;
            }
        } catch (error) {
            console.error('Errore nel salvataggio:', error);
            
            // Fallback: salva in cache e mostra istruzioni
            this.cache.set(filePath, {
                data: data,
                timestamp: Date.now()
            });
            
            this.showSaveInstructions(filePath, data);
            
            return { success: true, message: 'Dati preparati per il salvataggio manuale (fallback)' };
        }
    }

    // Nuovo metodo per salvataggio locale
    async saveLocalFile(filePath, data) {
        try {
            console.log('Salvataggio dati nella cache locale...');
            
            // Crea il Blob con i dati JSON
            const jsonString = JSON.stringify(data, null, 2);
            
            // Aggiorna la cache
            this.cache.set(filePath, {
                data: data,
                timestamp: Date.now()
            });
            
            // Non mostrare notifica qui per evitare duplicazioni
            // La notifica viene gestita dal chiamante (console.js)
            
            // Salva nel localStorage per persistenza immediata
            const fileName = filePath.split('/').pop();
            const category = filePath.includes('adulti') ? 'adulti' : 'ragazzi';
            localStorage.setItem(`course_library_${category}`, jsonString);
            
            console.log('Dati salvati nella cache e localStorage senza download');
            return { success: true, message: 'Dati salvati nella cache locale' };
            
        } catch (error) {
            console.error('Errore nel salvataggio locale:', error);
            throw error;
        }
    }

    // Mostra istruzioni per il salvataggio manuale
    showSaveInstructions(filePath, data) {
        const jsonString = JSON.stringify(data, null, 2);
        
        console.log('=== SALVATAGGIO FILE JSON ===');
        console.log(`File: ${filePath}`);
        console.log('Contenuto da salvare:');
        console.log(jsonString);
        console.log('=============================');
        
        // Mostra anche una notifica all'utente
        if (typeof showNotification === 'function') {
            showNotification('Dati salvati nella cache. Apri la console per vedere le istruzioni di salvataggio JSON.', 'info');
        }
        
        // Aggiorna il localStorage per persistenza immediata
        const fileName = filePath.split('/').pop();
        const category = filePath.includes('adulti') ? 'adulti' : 'ragazzi';
        localStorage.setItem(`course_library_${category}_backup`, jsonString);
    }

    // Carica tutti i corsi di una categoria
    async loadCourses(category, forceRefresh = false) {
        try {
            const filePath = `${this.basePath}/${category}/corsi.json`;
            console.log(`Tentativo di caricamento: ${filePath}, forceRefresh: ${forceRefresh}`);
            
            // Prima controlla il localStorage per i dati più recenti (soprattutto per ambiente locale)
            if (!forceRefresh) {
                const localData = localStorage.getItem(`course_library_${category}`);
                if (localData) {
                    try {
                        const parsedData = JSON.parse(localData);
                        console.log(`Dati caricati dal localStorage per ${category}:`, parsedData.corsi?.length || 0, 'corsi');
                        
                        // Confronta con i dati del file JSON se disponibili
                        try {
                            const fileData = await this.loadJSONFile(filePath, false);
                            if (fileData && fileData.corsi) {
                                // Se i dati locali sono più recenti, usa quelli
                                const localTimestamp = parsedData.lastUpdated || 0;
                                const fileTimestamp = fileData.lastUpdated || 0;
                                
                                if (new Date(localTimestamp) >= new Date(fileTimestamp)) {
                                    console.log(`Usando dati locali più recenti per ${category}`);
                                    return parsedData.corsi || [];
                                }
                            }
                        } catch (fileError) {
                            console.log(`File non disponibile, uso solo dati localStorage per ${category}`);
                        }
                        
                        return parsedData.corsi || [];
                    } catch (parseError) {
                        console.error('Errore nel parsing dei dati localStorage:', parseError);
                    }
                }
            }
            
            // Prova a caricare dal file JSON
            const data = await this.loadJSONFile(filePath, forceRefresh);
            console.log(`Dati caricati per ${category}:`, data);
            
            const courses = data.corsi || [];
            console.log(`Corsi estratti per ${category}:`, courses.length);
            
            return courses;
        } catch (error) {
            console.error(`Errore nel caricamento dei corsi ${category}:`, error);
            console.log(`Uso dei dati di fallback per ${category}`);
            
            // Usa i dati di fallback inclusi nel codice
            const fallbackCourses = this.fallbackData[category] || [];
            console.log(`Corsi di fallback caricati per ${category}:`, fallbackCourses.length);
            
            return fallbackCourses;
        }
    }

    // Carica tutti i corsi (entrambe le categorie)
    async loadAllCourses(forceRefresh = false) {
        try {
            const [adultiCourses, ragazziCourses] = await Promise.all([
                this.loadCourses('adulti', forceRefresh),
                this.loadCourses('ragazzi', forceRefresh)
            ]);
            
            return [...adultiCourses, ...ragazziCourses];
        } catch (error) {
            console.error('Errore nel caricamento di tutti i corsi:', error);
            return [];
        }
    }

    // Salva i corsi di una categoria
    async saveCourses(category, courses) {
        try {
            console.log(`saveCourses chiamato per categoria ${category} con ${courses.length} corsi`);
            const filePath = `${this.basePath}/${category}/corsi.json`;
            const data = {
                corsi: courses,
                lastUpdated: new Date().toISOString(),
                totalCourses: courses.length
            };
            
            console.log(`Salvataggio corsi per categoria ${category}:`, courses.length, 'corsi');
            console.log(`FilePath: ${filePath}`);
            const result = await this.saveJSONFile(filePath, data);
            console.log(`saveJSONFile ritornato:`, result);
            return result;
        } catch (error) {
            console.error(`Errore nel salvataggio dei corsi ${category}:`, error);
            throw error;
        }
    }

    // Aggiunge un nuovo corso
    async addCourse(courseData) {
        try {
            const category = courseData.category;
            const courses = await this.loadCourses(category);
            
            // Genera un ID univoco
            const newCourse = {
                id: `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: courseData.name,
                description: courseData.description,
                category: courseData.category,
                instructors: courseData.instructors || "",
                schedule: courseData.schedule || [],
                level: courseData.level || "",
                duration: courseData.duration || "",
                price: courseData.price || "",
                image: courseData.image || "",
                createdAt: new Date().toISOString()
            };
            
            courses.push(newCourse);
            console.log('Corso aggiunto alla lista. Totale corsi:', courses.length);
            
            // Salva usando il metodo aggiornato
            console.log('Tentativo salvataggio corsi per categoria:', category);
            try {
                const saveResult = await this.saveCourses(category, courses);
                console.log('Risultato salvataggio corsi:', saveResult);
            } catch (saveError) {
                console.error('ERRORE nel salvataggio dei corsi:', saveError);
                throw saveError;
            }
            
            // Aggiorna il file images.json se il corso ha un'immagine
            if (newCourse.image && newCourse.image.trim() !== '') {
                await this.updateImagesJson(newCourse);
            }
            
            // Forza il ricaricamento dei corsi per questa categoria
            const loadFilePath = `${this.basePath}/${category}/corsi.json`;
            if (this.cache.has(loadFilePath)) {
                this.cache.delete(loadFilePath);
                console.log('Cache di caricamento invalidata per:', loadFilePath);
            }
            
            console.log('Corso aggiunto con successo:', newCourse);
            return newCourse;
        } catch (error) {
            console.error('Errore nell\'aggiunta del corso:', error);
            throw error;
        }
    }

    // Aggiorna un corso esistente
    async updateCourse(courseId, courseData) {
        try {
            const courses = await this.loadAllCourses();
            const courseIndex = courses.findIndex(c => c.id === courseId);
            
            if (courseIndex === -1) {
                throw new Error('Corso non trovato');
            }
            
            const category = courseData.category || courses[courseIndex].category;
            const categoryCourses = await this.loadCourses(category);
            const categoryCourseIndex = categoryCourses.findIndex(c => c.id === courseId);
            
            if (categoryCourseIndex === -1) {
                throw new Error('Corso non trovato nella categoria specificata');
            }
            
            // Aggiorna il corso mantenendo i campi non specificati
            const updatedCourse = {
                ...categoryCourses[categoryCourseIndex],
                ...courseData,
                id: courseId // Mantieni l'ID originale
            };
            
            categoryCourses[categoryCourseIndex] = updatedCourse;
            await this.saveCourses(category, categoryCourses);
            
            // Aggiorna il file images.json se il corso ha un'immagine
            if (updatedCourse.image && updatedCourse.image.trim() !== '') {
                await this.updateImagesJson(updatedCourse);
            }
            
            return updatedCourse;
        } catch (error) {
            console.error('Errore nell\'aggiornamento del corso:', error);
            throw error;
        }
    }

    // Elimina un corso
    async deleteCourse(courseId) {
        try {
            const courses = await this.loadAllCourses();
            const course = courses.find(c => c.id === courseId);
            
            if (!course) {
                throw new Error('Corso non trovato');
            }
            
            const category = course.category;
            const categoryCourses = await this.loadCourses(category);
            const filteredCourses = categoryCourses.filter(c => c.id !== courseId);
            
            await this.saveCourses(category, filteredCourses);
            
            return true;
        } catch (error) {
            console.error('Errore nell\'eliminazione del corso:', error);
            throw error;
        }
    }

    // Trova un corso per ID
    async findCourseById(courseId) {
        try {
            const courses = await this.loadAllCourses();
            return courses.find(c => c.id === courseId) || null;
        } catch (error) {
            console.error('Errore nella ricerca del corso:', error);
            return null;
        }
    }

    // Svuota la cache
    clearCache() {
        this.cache.clear();
        console.log('Cache svuotata');
    }

    // Forza il ricaricamento dei dati freschi
    async refreshData() {
        console.log('Refresh dati forzato...');
        this.clearCache();
        const courses = await this.loadAllCourses(true);
        console.log('Dati aggiornati:', courses.length, 'corsi caricati');
        return courses;
    }

    // Ottieni statistiche sui corsi
    async getStats() {
        try {
            const adultiCourses = await this.loadCourses('adulti');
            const ragazziCourses = await this.loadCourses('ragazzi');
            
            return {
                total: adultiCourses.length + ragazziCourses.length,
                adulti: adultiCourses.length,
                ragazzi: ragazziCourses.length,
                lastUpdated: {
                    adulti: adultiCourses.length > 0 ? 'Caricati' : 'Nessun corso',
                    ragazzi: ragazziCourses.length > 0 ? 'Caricati' : 'Nessun corso'
                }
            };
        } catch (error) {
            console.error('Errore nel caricamento delle statistiche:', error);
            return {
                total: 0,
                adulti: 0,
                ragazzi: 0,
                lastUpdated: { error: 'Errore nel caricamento' }
            };
        }
    }

    // Metodo per sincronizzare i dati locali con i file JSON
    async syncLocalData() {
        try {
            console.log('Sincronizzazione dati locali con i file JSON...');
            
            const categories = ['adulti', 'ragazzi'];
            const syncResults = [];
            
            for (const category of categories) {
                const localData = localStorage.getItem(`course_library_${category}`);
                if (localData) {
                    try {
                        const parsedData = JSON.parse(localData);
                        if (parsedData.corsi && parsedData.corsi.length > 0) {
                            const filePath = `${this.basePath}/${category}/corsi.json`;
                            const saveResult = await this.saveJSONFile(filePath, parsedData);
                            syncResults.push({
                                category: category,
                                success: true,
                                courses: parsedData.corsi.length,
                                result: saveResult
                            });
                        }
                    } catch (error) {
                        console.error(`Errore nella sincronizzazione dei dati ${category}:`, error);
                        syncResults.push({
                            category: category,
                            success: false,
                            error: error.message
                        });
                    }
                }
            }
            
            console.log('Risultati sincronizzazione:', syncResults);
            return syncResults;
        } catch (error) {
            console.error('Errore generale nella sincronizzazione:', error);
            return [];
        }
    }

    // Metodo per aggiornare il file images.json
    async updateImagesJson(course) {
        try {
            console.log('Aggiornamento images.json per il corso:', course.id);
            
            // Carica il file images.json esistente
            const imagesJsonPath = `${this.basePath}/images/images.json`;
            let imagesData = { images: {}, lastUpdated: new Date().toISOString(), totalImages: 0 };
            
            try {
                imagesData = await this.loadJSONFile(imagesJsonPath);
            } catch (error) {
                console.log('File images.json non trovato, ne creo uno nuovo');
            }
            
            // Prepara l'oggetto immagine per questo corso
            const imageEntry = {
                courseId: course.id,
                courseName: course.name,
                category: course.category,
                imagePath: course.image,
                instructors: course.instructors || ""
            };
            
            // Aggiungi o aggiorna l'immagine nel dizionario
            imagesData.images[course.id] = imageEntry;
            imagesData.lastUpdated = new Date().toISOString();
            imagesData.totalImages = Object.keys(imagesData.images).length;
            
            // Salva il file images.json aggiornato
            await this.saveJSONFile(imagesJsonPath, imagesData);
            
            console.log('Images.json aggiornato con successo:', imageEntry);
            return true;
        } catch (error) {
            console.error('Errore nell\'aggiornamento del images.json:', error);
            // Non lanciare l'errore per non bloccare il salvataggio del corso
            return false;
        }
    }

    // Metodo per verificare se ci sono dati locali non sincronizzati
    hasUnsyncedLocalData() {
        const categories = ['adulti', 'ragazzi'];
        for (const category of categories) {
            const localData = localStorage.getItem(`course_library_${category}`);
            if (localData) {
                try {
                    const parsedData = JSON.parse(localData);
                    if (parsedData.corsi && parsedData.corsi.length > 0) {
                        return true;
                    }
                } catch (error) {
                    // Ignora errori di parsing
                }
            }
        }
        return false;
    }
}

// Esporta la classe per l'uso globale
window.CourseLibraryManager = CourseLibraryManager;
