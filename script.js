// App State
const appState = {
    currentTask: 1,
    totalTasks: 0,
    score: 0,
    answers: [],
    tasks: [],
    moneyData: [],
    speechEnabled: true,
    currentVoice: null
};

// DOM Elements
const elements = {
    taskCounter: document.getElementById('taskCounter'),
    progressFill: document.getElementById('progressFill'),
    taskTitle: document.getElementById('taskTitle'),
    taskQuestion: document.getElementById('taskQuestion'),
    taskImage: document.getElementById('taskImage'),
    taskOptions: document.getElementById('taskOptions'),
    taskFeedback: document.getElementById('taskFeedback'),
    nextBtn: document.getElementById('nextBtn'),
    prevBtn: document.getElementById('prevBtn'),
    scoreValue: document.getElementById('scoreValue'),
    totalScore: document.getElementById('totalScore'),
    scoreDisplay: document.getElementById('scoreDisplay'),
    reportBtn: document.getElementById('reportBtn'),
    moneyGallery: document.getElementById('moneyGallery'),
    interactiveMoney: document.getElementById('interactiveMoney'),
    moneyInfo: document.getElementById('moneyInfo'),
    lessonAudioBtn: document.getElementById('lessonAudioBtn'),
    repeatQuestionBtn: document.getElementById('repeatQuestionBtn'),
    readOptionsBtn: document.getElementById('readOptionsBtn')
};

// Base64 encoded images for Haitian money (will work everywhere)
const moneyImages = {
    "10gourdes": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDI1MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMwMDIwOWYiLz48dGV4dCB4PSIxMjUiIHk9IjYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+MTAgR09VUkRFUzwvdGV4dD48L3N2Zz4=",
    "25gourdes": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDI1MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMwMDIwOWYiLz48dGV4dCB4PSIxMjUiIHk9IjYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+MjUgR09VUkRFUzwvdGV4dD48L3N2Zz4=",
    "50gourdes": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDI1MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMwMDIwOWYiLz48dGV4dCB4PSIxMjUiIHk9IjYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+NjAgR09VUkRFUzwvdGV4dD48L3N2Zz4=",
    "100gourdes": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDI1MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNjMDAiLz48dGV4dCB4PSIxMjUiIHk9IjYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+MTAwIEdPVVJERVM8L3RleHQ+PC9zdmc+",
    "250gourdes": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDI1MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNjMDAiLz48dGV4dCB4PSIxMjUiIHk9IjYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+MjUwIEdPVVJERVM8L3RleHQ+PC9zdmc+",
    "500gourdes": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDI1MCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiMwMDgwMDAiLz48dGV4dCB4PSIxMjUiIHk9IjYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXdlaWdodD0iYm9sZCI+NTAwIEdPVVJERVM8L3RleHQ+PC9zdmc+"
};

// Money data
const moneyData = [
    { id: 1, value: 10, name: "Dix gourdes", color: "#00209f", image: "10gourdes", type: "billet" },
    { id: 2, value: 25, name: "Vingt-cinq gourdes", color: "#00209f", image: "25gourdes", type: "billet" },
    { id: 3, value: 50, name: "Cinquante gourdes", color: "#00209f", image: "50gourdes", type: "billet" },
    { id: 4, value: 100, name: "Cent gourdes", color: "#c00", image: "100gourdes", type: "billet" },
    { id: 5, value: 250, name: "Deux cent cinquante gourdes", color: "#c00", image: "250gourdes", type: "billet" },
    { id: 6, value: 500, name: "Cinq cents gourdes", color: "#008000", image: "500gourdes", type: "billet" },
    { id: 7, value: 1, name: "Une gourde", color: "#6c757d", image: "", type: "pièce" },
    { id: 8, value: 5, name: "Cinq gourdes", color: "#6c757d", image: "", type: "pièce" },
    { id: 9, value: 10, name: "Dix centimes", color: "#6c757d", image: "", type: "pièce" },
    { id: 10, value: 20, name: "Vingt centimes", color: "#6c757d", image: "", type: "pièce" },
    { id: 11, value: 50, name: "Cinquante centimes", color: "#6c757d", image: "", type: "pièce" }
];

// Initialize the app
async function initApp() {
    try {
        // Initialize speech synthesis
        initSpeech();
        
        // Load money data
        appState.moneyData = moneyData;
        
        // Initialize tasks
        initializeTasks();
        
        // Setup UI
        setupMoneyGallery();
        setupInteractiveMoney();
        loadTask(appState.currentTask);
        updateProgress();
        updateScore();
        
        // Setup event listeners
        setupEventListeners();
        
        // Welcome message
        setTimeout(() => {
            speakFrench("Bienvenue dans l'application d'apprentissage de la monnaie haïtienne.");
        }, 1000);
        
    } catch (error) {
        console.error("Error initializing app:", error);
        alert("Erreur lors du chargement de l'application. Veuillez rafraîchir la page.");
    }
}

// Initialize speech synthesis
function initSpeech() {
    if ('speechSynthesis' in window) {
        // Wait for voices to load
        window.speechSynthesis.onvoiceschanged = () => {
            const voices = window.speechSynthesis.getVoices();
            // Try to find a French voice
            const frenchVoice = voices.find(voice => 
                voice.lang.startsWith('fr') || 
                voice.name.includes('French') ||
                voice.name.includes('fr')
            );
            
            if (frenchVoice) {
                appState.currentVoice = frenchVoice;
                console.log("French voice found:", frenchVoice.name);
            } else if (voices.length > 0) {
                appState.currentVoice = voices[0];
                console.log("Using default voice:", voices[0].name);
            }
        };
        
        // Force voices to load
        window.speechSynthesis.getVoices();
    } else {
        console.warn("Speech synthesis not supported");
        appState.speechEnabled = false;
    }
}

// Speak text in French
function speakFrench(text, rate = 0.9) {
    if (!appState.speechEnabled || !appState.currentVoice) return;
    
    try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = rate;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        if (appState.currentVoice) {
            utterance.voice = appState.currentVoice;
        }
        
        // Handle speech events
        utterance.onstart = () => {
            console.log("Speaking:", text);
        };
        
        utterance.onerror = (event) => {
            console.error("Speech error:", event);
        };
        
        window.speechSynthesis.speak(utterance);
    } catch (error) {
        console.error("Error in speakFrench:", error);
    }
}

// Initialize tasks
function initializeTasks() {
    const tasks = [];
    
    // Task types
    const taskTypes = {
        IDENTIFICATION: 'identification',
        CONVERSION: 'conversion',
        COUNTING: 'counting',
        COMPARISON: 'comparison',
        CALCULATION: 'calculation'
    };
    
    // Generate 50 tasks
    for (let i = 1; i <= 50; i++) {
        let task = {
            id: i,
            type: getRandomTaskType(i),
            question: '',
            image: '',
            options: [],
            correct: 0,
            explanation: ''
        };
        
        switch (task.type) {
            case taskTypes.IDENTIFICATION:
                createIdentificationTask(task, i);
                break;
            case taskTypes.CONVERSION:
                createConversionTask(task, i);
                break;
            case taskTypes.COUNTING:
                createCountingTask(task, i);
                break;
            case taskTypes.COMPARISON:
                createComparisonTask(task, i);
                break;
            case taskTypes.CALCULATION:
                createCalculationTask(task, i);
                break;
        }
        
        tasks.push(task);
    }
    
    appState.tasks = tasks;
    appState.totalTasks = tasks.length;
    appState.answers = new Array(tasks.length).fill(null);
}

// Helper function to get random task type with some pattern
function getRandomTaskType(index) {
    const types = ['identification', 'conversion', 'counting', 'comparison', 'calculation'];
    return types[index % 5];
}

// Create identification task
function createIdentificationTask(task, index) {
    const moneyItems = moneyData.filter(item => item.type === 'billet');
    const randomItem = moneyItems[Math.floor(Math.random() * moneyItems.length)];
    
    task.question = `Quelle est la valeur de ce billet haïtien?`;
    task.image = moneyImages[randomItem.image];
    task.options = [
        `${randomItem.value} gourdes`,
        `${randomItem.value * 2} gourdes`,
        `${randomItem.value / 2} gourdes`,
        `${randomItem.value + 10} gourdes`
    ];
    task.correct = 0;
    task.explanation = `Ce billet représente ${randomItem.value} gourdes haïtiennes (HTG ${randomItem.value}). C'est le billet de ${randomItem.name}.`;
}

// Create conversion task
function createConversionTask(task, index) {
    const conversions = [
        { from: 100, unit: "gourdes", to: 100 },
        { from: 250, unit: "gourdes", to: 250 },
        { from: 50, unit: "centimes", to: 0.5 },
        { from: 100, unit: "centimes", to: 1 },
        { from: 500, unit: "centimes", to: 5 }
    ];
    const conversion = conversions[index % conversions.length];
    
    task.question = `Combien de gourdes font ${conversion.from} ${conversion.unit}?`;
    task.image = moneyImages[conversion.from === 100 ? "100gourdes" : conversion.from === 250 ? "250gourdes" : "10gourdes"];
    task.options = [
        `${conversion.to} gourde${conversion.to !== 1 ? 's' : ''}`,
        `${conversion.to * 2} gourdes`,
        `${conversion.to * 10} gourdes`,
        `${conversion.to / 2} gourde${conversion.to/2 !== 1 ? 's' : ''}`
    ];
    task.correct = 0;
    task.explanation = `${conversion.from} ${conversion.unit} = ${conversion.to} gourde${conversion.to !== 1 ? 's' : ''}. 1 gourde = 100 centimes.`;
}

// Create counting task
function createCountingTask(task, index) {
    const bills = [
        { ten: 2, fifty: 1, total: 70 },
        { ten: 3, fifty: 0, total: 30 },
        { ten: 0, fifty: 2, total: 100 },
        { ten: 1, fifty: 3, total: 160 },
        { ten: 4, fifty: 2, total: 140 }
    ];
    const billCombo = bills[index % bills.length];
    
    task.question = `Si vous avez ${billCombo.ten} billet(s) de 10 gourdes et ${billCombo.fifty} billet(s) de 50 gourdes, combien d'argent avez-vous en total?`;
    task.image = moneyImages["10gourdes"];
    task.options = [
        `${billCombo.total} gourdes`,
        `${billCombo.total + 20} gourdes`,
        `${billCombo.total - 20} gourdes`,
        `${billCombo.total * 2} gourdes`
    ];
    task.correct = 0;
    task.explanation = `(${billCombo.ten} × 10) + (${billCombo.fifty} × 50) = ${billCombo.ten * 10} + ${billCombo.fifty * 50} = ${billCombo.total} gourdes.`;
}

// Create comparison task
function createComparisonTask(task, index) {
    const comparisons = [
        { a: 50, b: 500, larger: 500 },
        { a: 100, b: 1, larger: 100 },
        { a: 25, b: 250, larger: 250 },
        { a: 10, b: 0.1, larger: 10 },
        { a: 5, b: 500, larger: 500 }
    ];
    const comparison = comparisons[index % comparisons.length];
    
    task.question = `Lequel a la plus grande valeur: ${comparison.a} gourdes ou ${comparison.b} ${comparison.b < 1 ? 'centime' : 'gourdes'}?`;
    task.image = moneyImages[comparison.a === 50 ? "50gourdes" : comparison.a === 100 ? "100gourdes" : "10gourdes"];
    task.options = [
        `${comparison.larger} ${comparison.larger < 1 ? 'centime' : 'gourdes'}`,
        `${comparison.a === comparison.larger ? comparison.b : comparison.a} ${comparison.a === comparison.larger ? (comparison.b < 1 ? 'centimes' : 'gourdes') : (comparison.a < 1 ? 'centimes' : 'gourdes')}`,
        "Ils ont la même valeur",
        "Impossible de comparer"
    ];
    task.correct = 0;
    task.explanation = `${comparison.larger} ${comparison.larger < 1 ? 'centime' : 'gourdes'} est plus grand que ${comparison.a === comparison.larger ? comparison.b : comparison.a} ${comparison.a === comparison.larger ? (comparison.b < 1 ? 'centimes' : 'gourdes') : (comparison.a < 1 ? 'centimes' : 'gourdes')}.`;
}

// Create calculation task
function createCalculationTask(task, index) {
    const calculations = [
        { price: 75, paid: 100, change: 25 },
        { price: 150, paid: 200, change: 50 },
        { price: 45, paid: 50, change: 5 },
        { price: 180, paid: 200, change: 20 },
        { price: 95, paid: 100, change: 5 }
    ];
    const calc = calculations[index % calculations.length];
    
    task.question = `Si un produit coûte ${calc.price} gourdes et vous payez avec un billet de ${calc.paid} gourdes, combien de monnaie recevez-vous?`;
    task.image = moneyImages[calc.paid === 100 ? "100gourdes" : "250gourdes"];
    task.options = [
        `${calc.change} gourdes`,
        `${calc.change + 10} gourdes`,
        `${calc.change - 5} gourdes`,
        `${calc.price} gourdes`
    ];
    task.correct = 0;
    task.explanation = `Monnaie = ${calc.paid} - ${calc.price} = ${calc.change} gourdes.`;
}

// Setup money gallery
function setupMoneyGallery() {
    elements.moneyGallery.innerHTML = '';
    
    moneyData.filter(item => item.type === 'billet').forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${moneyImages[item.image]}" alt="${item.name}" class="gallery-img">
            <div class="gallery-label">${item.value} G</div>
        `;
        
        galleryItem.addEventListener('click', () => {
            speakFrench(`${item.name}, ${item.value} gourdes`);
            elements.moneyInfo.textContent = `${item.name} - ${item.value} gourdes`;
        });
        
        elements.moneyGallery.appendChild(galleryItem);
    });
}

// Setup interactive money
function setupInteractiveMoney() {
    elements.interactiveMoney.innerHTML = '';
    
    moneyData.filter(item => item.type === 'billet').slice(0, 4).forEach(item => {
        const moneyItem = document.createElement('div');
        moneyItem.className = 'money-item';
        moneyItem.dataset.value = item.value;
        moneyItem.dataset.name = item.name;
        
        moneyItem.innerHTML = `
            <img src="${moneyImages[item.image]}" alt="${item.name}" class="money-img">
            <div class="money-name">${item.name}</div>
            <div class="money-value">HTG ${item.value}</div>
        `;
        
        moneyItem.addEventListener('click', () => {
            // Highlight selected item
            document.querySelectorAll('.money-item').forEach(el => {
                el.style.borderColor = 'transparent';
                el.style.backgroundColor = '#f8f9fa';
            });
            
            moneyItem.style.borderColor = '#00209f';
            moneyItem.style.backgroundColor = '#e6f0ff';
            
            // Speak the value
            speakFrench(`${item.name}, ${item.value} gourdes haïtiennes`);
            
            // Show info
            elements.moneyInfo.textContent = `${item.name} - Valeur: ${item.value} gourdes (HTG ${item.value})`;
            
            // Play sound effect
            playSound('click');
        });
        
        elements.interactiveMoney.appendChild(moneyItem);
    });
}

// Load a task
function loadTask(taskNumber) {
    const task = appState.tasks[taskNumber - 1];
    
    // Update UI
    elements.taskTitle.textContent = `Tâche ${taskNumber}: Identification de la monnaie`;
    elements.taskQuestion.textContent = task.question;
    elements.taskImage.src = task.image;
    elements.taskImage.alt = "Image de billet haïtien";
    elements.taskCounter.textContent = `Tâche ${taskNumber}/${appState.totalTasks}`;
    
    // Clear options
    elements.taskOptions.innerHTML = '';
    elements.taskFeedback.textContent = '';
    elements.taskFeedback.className = 'task-feedback';
    
    // Create options
    task.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        // Check if already answered
        if (appState.answers[taskNumber - 1] !== null && appState.answers[taskNumber - 1] === index) {
            optionElement.classList.add('selected');
            if (index === task.correct) {
                optionElement.classList.add('correct');
            } else {
                optionElement.classList.add('incorrect');
            }
        }
        
        optionElement.addEventListener('click', () => handleOptionClick(taskNumber, index, task));
        elements.taskOptions.appendChild(optionElement);
    });
    
    // Update button states
    elements.prevBtn.disabled = taskNumber === 1;
    elements.nextBtn.textContent = taskNumber === appState.totalTasks ? 'Terminer' : 'Suivant';
    
    // Update progress
    updateProgress();
    
    // Speak the question
    speakFrench(`Tâche ${taskNumber}. ${task.question}`);
}

// Handle option click
function handleOptionClick(taskNumber, optionIndex, task) {
    if (appState.answers[taskNumber - 1] !== null) return;
    
    // Store answer
    appState.answers[taskNumber - 1] = optionIndex;
    
    // Check if correct
    const isCorrect = optionIndex === task.correct;
    
    // Update score
    if (isCorrect) {
        appState.score++;
        updateScore();
    }
    
    // Update UI
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach(el => {
        const idx = parseInt(el.dataset.index);
        if (idx === optionIndex) {
            el.classList.add('selected');
            if (isCorrect) {
                el.classList.add('correct');
                playSound('correct');
                speakFrench("Correct! " + task.explanation);
            } else {
                el.classList.add('incorrect');
                playSound('incorrect');
                speakFrench("Incorrect. " + task.explanation);
            }
        }
        if (idx === task.correct && !isCorrect) {
            el.classList.add('correct');
        }
    });
    
    // Show feedback
    elements.taskFeedback.textContent = isCorrect 
        ? `✅ Correct! ${task.explanation}` 
        : `❌ Incorrect. ${task.explanation}`;
    elements.taskFeedback.className = `task-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
}

// Update progress bar
function updateProgress() {
    const progressPercent = (appState.currentTask / appState.totalTasks) * 100;
    elements.progressFill.style.width = `${progressPercent}%`;
}

// Update score display
function updateScore() {
    const answeredTasks = appState.answers.filter(answer => answer !== null).length;
    elements.scoreValue.textContent = appState.score;
    elements.totalScore.textContent = answeredTasks;
    
    if (answeredTasks > 0) {
        const percentage = Math.round((appState.score / answeredTasks) * 100);
        elements.scoreDisplay.title = `Taux de réussite: ${percentage}%`;
    }
}

// Play sound effect
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'correct') {
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } else if (type === 'incorrect') {
            oscillator.frequency.value = 300;
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } else if (type === 'click') {
            oscillator.frequency.value = 600;
            oscillator.type = 'triangle';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    } catch (e) {
        console.log("Web Audio API not supported");
    }
}

// Setup event listeners
function setupEventListeners() {
    // Next button
    elements.nextBtn.addEventListener('click', () => {
        if (appState.currentTask < appState.totalTasks) {
            appState.currentTask++;
            loadTask(appState.currentTask);
        } else {
            // Show completion message
            const percentage = Math.round((appState.score / appState.totalTasks) * 100);
            const message = `🎉 Félicitations! Vous avez terminé toutes les tâches.\n\nScore final: ${appState.score}/${appState.totalTasks} (${percentage}%)`;
            alert(message);
            speakFrench(`Félicitations! Vous avez terminé toutes les tâches. Score final: ${appState.score} sur ${appState.totalTasks}, soit ${percentage} pour cent.`);
        }
    });
    
    // Previous button
    elements.prevBtn.addEventListener('click', () => {
        if (appState.currentTask > 1) {
            appState.currentTask--;
            loadTask(appState.currentTask);
        }
    });
    
    // Report button
    elements.reportBtn.addEventListener('click', generatePDFReport);
    
    // Lesson audio button
    elements.lessonAudioBtn.addEventListener('click', () => {
        const lessonText = "La monnaie d'Haïti est la gourde. Elle est divisée en 100 centimes. Les billets courants sont de 10, 25, 50, 100, 250 et 500 gourdes. Les pièces sont de 5, 10, 20, 50 centimes, et de 1 et 5 gourdes. La gourde haïtienne s'abrège HTG.";
        speakFrench(lessonText);
        elements.moneyInfo.textContent = "Écoutez la leçon sur la monnaie haïtienne...";
    });
    
    // Repeat question button
    elements.repeatQuestionBtn.addEventListener('click', () => {
        const task = appState.tasks[appState.currentTask - 1];
        speakFrench(`Question: ${task.question}`);
    });
    
    // Read options button
    elements.readOptionsBtn.addEventListener('click', () => {
        const options = Array.from(elements.taskOptions.children);
        let optionsText = "Options: ";
        options.forEach((option, index) => {
            optionsText += `Option ${index + 1}: ${option.textContent}. `;
        });
        speakFrench(optionsText);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case ' ':
                if (appState.currentTask < appState.totalTasks) {
                    elements.nextBtn.click();
                }
                break;
            case 'ArrowLeft':
                if (appState.currentTask > 1) {
                    elements.prevBtn.click();
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                const optionIndex = parseInt(e.key) - 1;
                const options = elements.taskOptions.children;
                if (options[optionIndex]) {
                    options[optionIndex].click();
                }
                break;
            case 'r':
            case 'R':
                elements.repeatQuestionBtn.click();
                break;
            case 'o':
            case 'O':
                elements.readOptionsBtn.click();
                break;
        }
    });
}

// Generate PDF report
async function generatePDFReport() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(24);
        doc.setTextColor(0, 32, 159);
        doc.text("Rapport d'Apprentissage", 105, 20, { align: 'center' });
        
        doc.setFontSize(18);
        doc.setTextColor(192, 0, 0);
        doc.text("La Monaie Haïtienne", 105, 30, { align: 'center' });
        
        // Date
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const now = new Date();
        doc.text(`Date: ${now.toLocaleDateString('fr-FR')}`, 20, 50);
        
        // Score
        const answeredTasks = appState.answers.filter(answer => answer !== null).length;
        const percentage = answeredTasks > 0 ? Math.round((appState.score / answeredTasks) * 100) : 0;
        
        doc.text(`Score: ${appState.score}/${answeredTasks} (${percentage}%)`, 20, 60);
        doc.text(`Tâches complétées: ${answeredTasks}/${appState.totalTasks}`, 20, 70);
        
        // Progress bar
        doc.setFillColor(230, 230, 230);
        doc.rect(20, 80, 170, 10, 'F');
        
        doc.setFillColor(0, 32, 159);
        const progressWidth = (answeredTasks / appState.totalTasks) * 170;
        doc.rect(20, 80, progressWidth, 10, 'F');
        
        // Results by task type
        doc.setFontSize(14);
        doc.setTextColor(0, 32, 159);
        doc.text("Résultats détaillés:", 20, 110);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        const taskTypes = {};
        appState.tasks.forEach((task, index) => {
            if (!taskTypes[task.type]) {
                taskTypes[task.type] = { total: 0, correct: 0 };
            }
            taskTypes[task.type].total++;
            if (appState.answers[index] === task.correct) {
                taskTypes[task.type].correct++;
            }
        });
        
        let y = 125;
        Object.entries(taskTypes).forEach(([type, data]) => {
            const percent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            const typeName = getTaskTypeName(type);
            doc.text(`${typeName}: ${data.correct}/${data.total} (${percent}%)`, 30, y);
            y += 10;
        });
        
        // Recommendations
        doc.setFontSize(14);
        doc.setTextColor(192, 0, 0);
        doc.text("Recommandations:", 20, y + 10);
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        
        y += 25;
        const recommendations = [];
        
        if (percentage < 70 && answeredTasks > 0) {
            recommendations.push("• Continuez à pratiquer l'identification des billets");
            recommendations.push("• Revoyez les valeurs des billets haïtiens");
            recommendations.push("• Entraînez-vous aux conversions gourdes/centimes");
        } else if (answeredTasks > 0) {
            recommendations.push("• Excellent travail! Continuez à pratiquer");
            recommendations.push("• Essayez de reconnaître les billets rapidement");
            recommendations.push("• Pratiquez les calculs avec la monnaie haïtienne");
        } else {
            recommendations.push("• Commencez par compléter quelques tâches");
            recommendations.push("• Utilisez la galerie pour apprendre les billets");
            recommendations.push("• Cliquez sur les billets pour entendre leurs valeurs");
        }
        
        recommendations.forEach((rec, index) => {
            doc.text(rec, 30, y);
            y += 8;
        });
        
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Application éducative - La Monaie Haïtienne", 105, 280, { align: 'center' });
        
        // Save PDF
        doc.save(`rapport-monnaie-haitienne-${now.toISOString().split('T')[0]}.pdf`);
        
        // Speak confirmation
        speakFrench("Rapport PDF généré avec succès");
        
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Erreur lors de la génération du PDF");
    }
}

// Helper function to get task type name
function getTaskTypeName(type) {
    const names = {
        'identification': 'Identification',
        'conversion': 'Conversion',
        'counting': 'Calcul',
        'comparison': 'Comparaison',
        'calculation': 'Calcul de monnaie'
    };
    return names[type] || type;
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', initApp);