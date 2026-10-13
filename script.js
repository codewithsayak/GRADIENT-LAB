/**
 * Gradient Lab - Premium CSS Gradient Generator
 * by Code With Sayak
 */

(function() {
    'use strict';

    // =========================================================================
    // STATE & CONFIG
    // =========================================================================
    const CONFIG = {
        maxStops: 10,
        minStops: 2,
        brand: 'Gradient Lab by Code With Sayak',
        storageKey: 'gradient_lab_saved',
        themeKey: 'gradient_lab_theme'
    };

    let state = {
        type: 'linear', // linear, radial, conic
        angle: 135,
        radialShape: 'circle',
        posX: 50,
        posY: 50,
        conicAngle: 0,
        stops: [
            { id: 1, color: '#6366f1', position: 0 },
            { id: 2, color: '#a855f7', position: 50 },
            { id: 3, color: '#ec4899', position: 100 }
        ]
    };

    let savedGradients = [];

    // =========================================================================
    // PRESETS LIBRARY
    // =========================================================================
    const PRESETS = [
        { name: 'Midnight Aurora', category: 'dark', type: 'linear', angle: 135, stops: [{c:'#0f2027',p:0},{c:'#203a43',p:50},{c:'#2c5364',p:100}] },
        { name: 'Electric Ocean', category: 'popular', type: 'linear', angle: 90, stops: [{c:'#4facfe',p:0},{c:'#00f2fe',p:100}] },
        { name: 'Peach Sunset', category: 'sunset', type: 'linear', angle: 120, stops: [{c:'#ff9a9e',p:0},{c:'#fecfef',p:99},{c:'#fecfef',p:100}] },
        { name: 'Cyber Violet', category: 'neon', type: 'linear', angle: 135, stops: [{c:'#f43b47',p:0},{c:'#453a94',p:100}] },
        { name: 'Mint Dream', category: 'popular', type: 'linear', angle: 45, stops: [{c:'#00b09b',p:0},{c:'#96c93d',p:100}] },
        { name: 'Crimson Night', category: 'dark', type: 'radial', radialShape: 'circle', posX:50, posY:50, stops: [{c:'#870000',p:0},{c:'#190a05',p:100}] },
        { name: 'Golden Horizon', category: 'sunset', type: 'linear', angle: 180, stops: [{c:'#f6d365',p:0},{c:'#fda085',p:100}] },
        { name: 'Cosmic Bloom', category: 'neon', type: 'conic', conicAngle: 0, posX:50, posY:50, stops: [{c:'#ff0844',p:0},{c:'#ffb199',p:100}] },
        { name: 'Deep Space', category: 'dark', type: 'linear', angle: 135, stops: [{c:'#000000',p:0},{c:'#434343',p:100}] },
        { name: 'Neon Glow', category: 'neon', type: 'linear', angle: 90, stops: [{c:'#00c6ff',p:0},{c:'#0072ff',p:100}] },
        { name: 'Summer Dog', category: 'sunset', type: 'linear', angle: 45, stops: [{c:'#a8edea',p:0},{c:'#fed6e3',p:100}] },
        { name: 'Emerald Pulse', category: 'popular', type: 'radial', radialShape: 'circle', posX:50, posY:50, stops: [{c:'#348f50',p:0},{c:'#56b4d3',p:100}] },
        { name: 'Rose Water', category: 'popular', type: 'linear', angle: 135, stops: [{c:'#e55d87',p:0},{c:'#5fc3e4',p:100}] },
        { name: 'Lava Pool', category: 'sunset', type: 'linear', angle: 135, stops: [{c:'#ff4b1f',p:0},{c:'#ff9068',p:100}] },
        { name: 'Night Sky', category: 'dark', type: 'radial', radialShape: 'ellipse', posX:50, posY:50, stops: [{c:'#1e1366',p:0},{c:'#2a0845',p:100}] },
        { name: 'Candy', category: 'neon', type: 'linear', angle: 135, stops: [{c:'#d3959b',p:0},{c:'#bfe6ba',p:100}] },
        { name: 'Ocean Depth', category: 'dark', type: 'linear', angle: 180, stops: [{c:'#1cb5e0',p:0},{c:'#000046',p:100}] },
        { name: 'Firewatch', category: 'sunset', type: 'conic', conicAngle: 90, posX:50, posY:50, stops: [{c:'#f12711',p:0},{c:'#f5af19',p:100}] },
        { name: 'Amethyst', category: 'popular', type: 'linear', angle: 135, stops: [{c:'#9d50bb',p:0},{c:'#6e48aa',p:100}] },
        { name: 'Frost', category: 'popular', type: 'linear', angle: 45, stops: [{c:'#000428',p:0},{c:'#004e92',p:100}] },
        { name: 'Vaporwave', category: 'neon', type: 'linear', angle: 135, stops: [{c:'#f857a6',p:0},{c:'#ff5858',p:100}] },
        { name: 'Evening', category: 'sunset', type: 'linear', angle: 135, stops: [{c:'#2b5876',p:0},{c:'#4e4376',p:100}] },
        { name: 'Forest', category: 'dark', type: 'linear', angle: 135, stops: [{c:'#134e5e',p:0},{c:'#71b280',p:100}] },
        { name: 'Radar', category: 'neon', type: 'conic', conicAngle: 0, posX:50, posY:50, stops: [{c:'#00c6ff',p:0},{c:'#0072ff',p:50},{c:'#00c6ff',p:100}] }
    ];

    // =========================================================================
    // DOM ELEMENTS
    // =========================================================================
    const DOM = {
        preview: document.getElementById('live-preview'),
        cssOutput: document.getElementById('css-output'),
        cssFormat: document.getElementById('css-format'),
        stopsContainer: document.getElementById('color-stops-container'),
        btnAddStop: document.getElementById('btn-add-stop'),
        
        typeSelector: document.getElementById('type-selector'),
        controlsLinear: document.getElementById('controls-linear'),
        controlsRadial: document.getElementById('controls-radial'),
        controlsConic: document.getElementById('controls-conic'),
        
        linearAngleNum: document.getElementById('linear-angle-num'),
        linearAngleSlider: document.getElementById('linear-angle-slider'),
        
        radialShape: document.getElementById('radial-shape'),
        radialX: document.getElementById('radial-x'),
        radialY: document.getElementById('radial-y'),
        
        conicAngleNum: document.getElementById('conic-angle-num'),
        conicAngleSlider: document.getElementById('conic-angle-slider'),
        conicX: document.getElementById('conic-x'),
        conicY: document.getElementById('conic-y'),
        
        presetsGrid: document.getElementById('presets-grid'),
        savedList: document.getElementById('saved-list'),
        
        toast: document.getElementById('toast'),
        themeBtn: document.getElementById('btn-theme')
    };

    // =========================================================================
    // INITIALIZATION
    // =========================================================================
    function init() {
        loadTheme();
        loadSavedGradients();
        checkURLParams();
        setupEventListeners();
        renderPresets();
        updateUI();
    }

    // =========================================================================
    // CORE RENDERING & CSS GENERATION
    // =========================================================================
    function getSortedStops() {
        return [...state.stops].sort((a, b) => a.position - b.position);
    }

    function generateGradientString() {
        const stops = getSortedStops();
        const stopsString = stops.map(s => `${s.color} ${s.position}%`).join(', ');
        
        if (state.type === 'linear') {
            return `linear-gradient(${state.angle}deg, ${stopsString})`;
        } else if (state.type === 'radial') {
            return `radial-gradient(${state.radialShape} at ${state.posX}% ${state.posY}%, ${stopsString})`;
        } else if (state.type === 'conic') {
            return `conic-gradient(from ${state.conicAngle}deg at ${state.posX}% ${state.posY}%, ${stopsString})`;
        }
    }

    function generateFormattedCSS() {
        const gradientStr = generateGradientString();
        const format = DOM.cssFormat.value;
        const formattedGradient = gradientStr.replace(/, /g, ',\n  ').replace(/\(/, '(\n  ').replace(/\)$/, '\n)');
        
        switch(format) {
            case 'class':
                return `.gradient-background {\n  background: ${formattedGradient};\n}`;
            case 'variable':
                return `:root {\n  --custom-gradient: ${formattedGradient};\n}`;
            case 'inline':
                return `<div style="background: ${gradientStr};"></div>`;
            case 'background':
            default:
                return `background: ${formattedGradient};`;
        }
    }

    function updatePreviewAndCode() {
        const gradientStr = generateGradientString();
        DOM.preview.style.background = gradientStr;
        DOM.cssOutput.textContent = generateFormattedCSS();
    }

    function updateUI() {
        // Sync Type Segments
        document.querySelectorAll('.segment').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === state.type);
        });

        // Show/Hide Control Sections
        DOM.controlsLinear.classList.toggle('active', state.type === 'linear');
        DOM.controlsRadial.classList.toggle('active', state.type === 'radial');
        DOM.controlsConic.classList.toggle('active', state.type === 'conic');

        // Sync Linear
        DOM.linearAngleNum.value = state.angle;
        DOM.linearAngleSlider.value = state.angle;

        // Sync Radial
        DOM.radialShape.value = state.radialShape;
        DOM.radialX.value = state.posX;
        DOM.radialY.value = state.posY;

        // Sync Conic
        DOM.conicAngleNum.value = state.conicAngle;
        DOM.conicAngleSlider.value = state.conicAngle;
        DOM.conicX.value = state.posX;
        DOM.conicY.value = state.posY;

        renderStopsEditor();
        updatePreviewAndCode();
    }

    // =========================================================================
    // STOPS EDITOR
    // =========================================================================
    function renderStopsEditor() {
        DOM.stopsContainer.innerHTML = '';
        
        state.stops.forEach((stop, index) => {
            const row = document.createElement('div');
            row.className = 'color-stop-row';
            
            row.innerHTML = `
                <input type="color" class="stop-color-picker" data-id="${stop.id}" value="${stop.color}">
                <input type="text" class="input-field stop-hex" data-id="${stop.id}" value="${stop.color.toUpperCase()}">
                <input type="range" class="slider" data-id="${stop.id}" min="0" max="100" value="${stop.position}">
                <input type="number" class="input-field stop-pos" data-id="${stop.id}" min="0" max="100" value="${stop.position}">
                <button class="btn-remove-stop" data-id="${stop.id}" ${state.stops.length <= CONFIG.minStops ? 'disabled' : ''}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            `;
            
            DOM.stopsContainer.appendChild(row);
        });
    }

    function handleStopChange(e) {
        if (!e.target.dataset.id) return;
        const id = parseInt(e.target.dataset.id);
        const stop = state.stops.find(s => s.id === id);
        if (!stop) return;

        if (e.target.classList.contains('stop-color-picker') || e.target.classList.contains('stop-hex')) {
            let val = e.target.value;
            if (/^#[0-9A-F]{6}$/i.test(val)) {
                stop.color = val;
                if(e.target.type === 'text') {
                    e.target.previousElementSibling.value = val; // Update color picker
                } else {
                    e.target.nextElementSibling.value = val.toUpperCase(); // Update text
                }
            }
        }
        
        if (e.target.type === 'range' || e.target.type === 'number') {
            let val = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
            stop.position = val;
            if(e.target.type === 'range') {
                e.target.nextElementSibling.value = val;
            } else {
                e.target.previousElementSibling.value = val;
            }
        }
        
        updatePreviewAndCode();
    }

    function addStop() {
        if (state.stops.length >= CONFIG.maxStops) {
            showToast('Maximum 10 stops allowed');
            return;
        }
        const newId = Math.max(...state.stops.map(s => s.id)) + 1;
        state.stops.push({ id: newId, color: '#ffffff', position: 100 });
        updateUI();
    }

    function removeStop(id) {
        if (state.stops.length <= CONFIG.minStops) return;
        state.stops = state.stops.filter(s => s.id !== id);
        updateUI();
    }

    // =========================================================================
    // EVENT LISTENERS
    // =========================================================================
    function setupEventListeners() {
        // Tab Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(e.target.dataset.tab).classList.add('active');
            });
        });

        // Type Selector
        document.querySelectorAll('.segment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                state.type = e.target.dataset.type;
                updateUI();
            });
        });

        // Stops Events
        DOM.stopsContainer.addEventListener('input', handleStopChange);
        DOM.stopsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-remove-stop');
            if (btn) removeStop(parseInt(btn.dataset.id));
        });
        DOM.btnAddStop.addEventListener('click', addStop);

        // Linear Controls
        const syncAngle = (val) => { state.angle = val; updateUI(); };
        DOM.linearAngleNum.addEventListener('input', e => syncAngle(e.target.value));
        DOM.linearAngleSlider.addEventListener('input', e => syncAngle(e.target.value));
        document.querySelectorAll('.angle-presets button').forEach(btn => {
            btn.addEventListener('click', (e) => syncAngle(e.target.dataset.angle));
        });

        // Radial Controls
        DOM.radialShape.addEventListener('change', e => { state.radialShape = e.target.value; updateUI(); });
        DOM.radialX.addEventListener('input', e => { state.posX = e.target.value; updateUI(); });
        DOM.radialY.addEventListener('input', e => { state.posY = e.target.value; updateUI(); });

        // Conic Controls
        const syncConicAngle = (val) => { state.conicAngle = val; updateUI(); };
        DOM.conicAngleNum.addEventListener('input', e => syncConicAngle(e.target.value));
        DOM.conicAngleSlider.addEventListener('input', e => syncConicAngle(e.target.value));
        DOM.conicX.addEventListener('input', e => { state.posX = e.target.value; updateUI(); });
        DOM.conicY.addEventListener('input', e => { state.posY = e.target.value; updateUI(); });

        // Actions
        DOM.cssFormat.addEventListener('change', updatePreviewAndCode);
        document.getElementById('btn-copy-css').addEventListener('click', copyCSS);
        document.getElementById('btn-random').addEventListener('click', generateRandom);
        document.getElementById('btn-share').addEventListener('click', shareURL);
        
        // Preview Controls
        document.getElementById('btn-toggle-bg').addEventListener('click', () => {
            DOM.preview.parentElement.classList.toggle('checkerboard');
        });
        document.getElementById('btn-fullscreen').addEventListener('click', () => {
            DOM.preview.parentElement.classList.toggle('fullscreen');
        });

        // Download Modal
        const dlModal = document.getElementById('modal-download');
        document.getElementById('btn-download-modal').addEventListener('click', () => dlModal.classList.remove('hidden'));
        document.querySelector('.btn-close-modal').addEventListener('click', () => dlModal.classList.add('hidden'));
        document.getElementById('download-size').addEventListener('change', (e) => {
            document.getElementById('custom-size-inputs').classList.toggle('hidden', e.target.value !== 'custom');
        });
        document.getElementById('btn-confirm-download').addEventListener('click', downloadWallpaper);

        // Save
        document.getElementById('btn-save-current').addEventListener('click', saveCurrentGradient);

        // Color Tools
        setupColorTools();

        // Theme
        DOM.themeBtn.addEventListener('click', toggleTheme);
    }

    // =========================================================================
    // PRESETS & RANDOM
    // =========================================================================
    function renderPresets(filter = 'all') {
        DOM.presetsGrid.innerHTML = '';
        const filtered = filter === 'all' ? PRESETS : PRESETS.filter(p => p.category === filter);
        
        filtered.forEach(preset => {
            const card = document.createElement('div');
            card.className = 'preset-card';
            
            // Generate mock CSS for preview box
            const stopsStr = preset.stops.map(s => `${s.c} ${s.p}%`).join(', ');
            let bg = '';
            if(preset.type === 'linear') bg = `linear-gradient(${preset.angle}deg, ${stopsStr})`;
            if(preset.type === 'radial') bg = `radial-gradient(circle at 50% 50%, ${stopsStr})`;
            if(preset.type === 'conic') bg = `conic-gradient(from ${preset.conicAngle}deg at 50% 50%, ${stopsStr})`;

            card.innerHTML = `
                <div class="preset-preview" style="background: ${bg}"></div>
                <div class="preset-info">${preset.name}</div>
            `;
            
            card.addEventListener('click', () => {
                state.type = preset.type;
                if(preset.angle !== undefined) state.angle = preset.angle;
                if(preset.conicAngle !== undefined) state.conicAngle = preset.conicAngle;
                if(preset.radialShape) state.radialShape = preset.radialShape;
                state.posX = preset.posX || 50;
                state.posY = preset.posY || 50;
                state.stops = preset.stops.map((s, i) => ({ id: i+1, color: s.c, position: s.p }));
                updateUI();
                showToast('Loaded Preset');
            });
            DOM.presetsGrid.appendChild(card);
        });

        // Filter events
        document.querySelectorAll('.preset-filters .filter-btn').forEach(btn => {
            btn.onclick = (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderPresets(e.target.dataset.filter);
            };
        });
    }

    function generateRandom() {
        const types = ['linear', 'radial', 'conic'];
        state.type = types[Math.floor(Math.random() * types.length)];
        state.angle = Math.floor(Math.random() * 360);
        state.conicAngle = Math.floor(Math.random() * 360);
        state.posX = Math.floor(Math.random() * 100);
        state.posY = Math.floor(Math.random() * 100);
        
        const numStops = Math.floor(Math.random() * 3) + 2; // 2 to 4 stops
        state.stops = [];
        for(let i=0; i<numStops; i++) {
            const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
            const pos = i === 0 ? 0 : i === numStops - 1 ? 100 : Math.floor(Math.random() * 100);
            state.stops.push({ id: i+1, color: randomColor, position: pos });
        }
        state.stops.sort((a,b) => a.position - b.position);
        updateUI();
    }

    // =========================================================================
    // SAVED GRADIENTS (LOCAL STORAGE)
    // =========================================================================
    function loadSavedGradients() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (saved) savedGradients = JSON.parse(saved);
        } catch (e) {
            console.error('Failed to load saved gradients', e);
        }
        renderSavedList();
    }

    function saveCurrentGradient() {
        const nameInput = document.getElementById('save-gradient-name');
        const name = nameInput.value.trim() || `Gradient ${savedGradients.length + 1}`;
        
        const toSave = JSON.parse(JSON.stringify(state)); // Deep copy
        toSave.name = name;
        toSave.id = Date.now();
        
        savedGradients.unshift(toSave);
        if (savedGradients.length > 50) savedGradients.pop(); // Limit to 50
        
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(savedGradients));
        nameInput.value = '';
        renderSavedList();
        showToast('Gradient Saved!');
    }

    function renderSavedList() {
        DOM.savedList.innerHTML = '';
        if (savedGradients.length === 0) {
            DOM.savedList.innerHTML = '<div class="empty-state">No saved gradients yet.</div>';
            return;
        }

        savedGradients.forEach(grad => {
            const item = document.createElement('div');
            item.className = 'saved-item';
            
            // Reconstruct background logic just for preview
            const stopsStr = grad.stops.map(s => `${s.color} ${s.position}%`).join(', ');
            let bg = `linear-gradient(90deg, ${stopsStr})`; // Simplify preview
            
            item.innerHTML = `
                <div class="saved-preview" style="background: ${bg}" title="Click to apply"></div>
                <div class="saved-actions">
                    <span class="saved-name">${grad.name}</span>
                    <button class="icon-btn text-danger btn-delete-saved" data-id="${grad.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;
            
            item.querySelector('.saved-preview').addEventListener('click', () => {
                Object.assign(state, JSON.parse(JSON.stringify(grad)));
                updateUI();
                showToast('Gradient Applied');
            });
            
            item.querySelector('.btn-delete-saved').addEventListener('click', (e) => {
                e.stopPropagation();
                savedGradients = savedGradients.filter(g => g.id !== grad.id);
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(savedGradients));
                renderSavedList();
            });
            
            DOM.savedList.appendChild(item);
        });
    }

    // =========================================================================
    // URL SHARING
    // =========================================================================
    function shareURL() {
        try {
            const data = btoa(JSON.stringify(state));
            const url = new URL(window.location);
            url.searchParams.set('g', data);
            
            navigator.clipboard.writeText(url.toString()).then(() => {
                showToast('Share link copied to clipboard!');
            }).catch(() => fallbackCopy(url.toString()));
        } catch(e) {
            showToast('Failed to generate link.');
        }
    }

    function checkURLParams() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('g')) {
            try {
                const loadedState = JSON.parse(atob(params.get('g')));
                if (loadedState && loadedState.type && loadedState.stops) {
                    state = loadedState;
                    showToast('Loaded shared gradient!');
                }
            } catch (e) {
                console.error('Invalid share URL', e);
            }
        }
    }

    // =========================================================================
    // UTILS & EXPORTS
    // =========================================================================
    function copyCSS() {
        const css = DOM.cssOutput.textContent;
        navigator.clipboard.writeText(css).then(() => {
            showToast('CSS copied to clipboard!');
        }).catch(() => fallbackCopy(css));
    }

    function fallbackCopy(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('Copied to clipboard!');
        } catch (err) {
            showToast('Copy failed.');
        }
        document.body.removeChild(textArea);
    }

    let toastTimeout;
    function showToast(msg) {
        DOM.toast.textContent = msg;
        DOM.toast.classList.remove('hidden');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            DOM.toast.classList.add('hidden');
        }, 3000);
    }

    // Theme Handling
    function loadTheme() {
        const savedTheme = localStorage.getItem(CONFIG.themeKey);
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    
    function toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || !document.documentElement.hasAttribute('data-theme');
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(CONFIG.themeKey, newTheme);
    }

    // =========================================================================
    // CANVAS EXPORT (WALLPAPER)
    // =========================================================================
    function downloadWallpaper() {
        const sizeSelect = document.getElementById('download-size').value;
        let width, height;
        if (sizeSelect === 'custom') {
            width = parseInt(document.getElementById('dl-width').value) || 1920;
            height = parseInt(document.getElementById('dl-height').value) || 1080;
        } else {
            [width, height] = sizeSelect.split('x').map(Number);
        }
        
        // Prevent crashes on massive dimensions
        width = Math.min(width, 4000);
        height = Math.min(height, 4000);

        const format = document.getElementById('download-format').value;
        const ext = format === 'image/jpeg' ? 'jpg' : 'png';
        const canvas = document.getElementById('export-canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Using SVG ForeignObject is the most robust way to export EXACT CSS gradients natively
        const cssBackground = generateGradientString();
        
        const svgString = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
                <foreignObject width="100%" height="100%">
                    <div xmlns="http://www.w3.org/1999/xhtml" style="width:${width}px; height:${height}px; background: ${cssBackground}; margin:0; padding:0;"></div>
                </foreignObject>
            </svg>
        `;
        
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(blob);
        
        const image = new Image();
        image.onload = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(image, 0, 0, width, height);
            
            // Trigger Download
            const dataUrl = canvas.toDataURL(format, 0.9);
            const link = document.createElement('a');
            link.download = `gradient-lab-wallpaper.${ext}`;
            link.href = dataUrl;
            link.click();
            
            URL.revokeObjectURL(blobURL);
            document.getElementById('modal-download').classList.add('hidden');
            showToast('Download started!');
        };
        image.onerror = () => {
            showToast('Error generating image.');
            URL.revokeObjectURL(blobURL);
        };
        image.src = blobURL;
    }

    // =========================================================================
    // COLOR TOOLS (CONVERTER, CONTRAST, EXTRACTOR)
    // =========================================================================
    function setupColorTools() {
        // Converter
        const hexIn = document.getElementById('hex-converter-in');
        const rgbOut = document.getElementById('rgb-out');
        const hslOut = document.getElementById('hsl-out');
        
        hexIn.addEventListener('input', (e) => {
            const hex = e.target.value;
            if (/^#[0-9A-F]{6}$/i.test(hex)) {
                const rgb = hexToRgb(hex);
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                rgbOut.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
                hslOut.textContent = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
            } else {
                rgbOut.textContent = 'Invalid HEX';
                hslOut.textContent = 'Invalid HEX';
            }
        });

        // Contrast Checker
        const bgIn = document.getElementById('contrast-bg');
        const fgIn = document.getElementById('contrast-fg');
        const contrastRatioEl = document.getElementById('contrast-ratio');
        const contrastStatusEl = document.getElementById('contrast-status');

        const updateContrast = () => {
            const rgb1 = hexToRgb(bgIn.value);
            const rgb2 = hexToRgb(fgIn.value);
            const ratio = getContrastRatio(rgb1, rgb2).toFixed(2);
            contrastRatioEl.textContent = `${ratio}:1`;
            
            if (ratio >= 7) contrastStatusEl.textContent = 'AAA Pass (Normal Text)';
            else if (ratio >= 4.5) contrastStatusEl.textContent = 'AA Pass (Normal Text)';
            else if (ratio >= 3) contrastStatusEl.textContent = 'AA Pass (Large Text)';
            else contrastStatusEl.textContent = 'Fail';
            
            contrastStatusEl.style.color = ratio >= 4.5 ? '#10b981' : (ratio >= 3 ? '#f59e0b' : '#ef4444');
        };
        bgIn.addEventListener('input', updateContrast);
        fgIn.addEventListener('input', updateContrast);
        updateContrast();

        // Palette Extractor
        const fileIn = document.getElementById('palette-file');
        const paletteGrid = document.getElementById('extracted-palette');
        
        fileIn.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 100; // Shrink for faster processing
                    canvas.height = 100 * (img.height / img.width);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    
                    const data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
                    const colors = new Set();
                    // Simple bucket extraction (take a pixel every few steps)
                    for (let i = 0; i < data.length; i += 400) { 
                        const hex = rgbToHex(data[i], data[i+1], data[i+2]);
                        if(colors.size < 10) colors.add(hex);
                    }
                    
                    paletteGrid.innerHTML = '';
                    colors.forEach(hex => {
                        const swatch = document.createElement('div');
                        swatch.className = 'palette-swatch';
                        swatch.style.backgroundColor = hex;
                        swatch.title = hex;
                        swatch.onclick = () => {
                            navigator.clipboard.writeText(hex);
                            showToast(`Copied ${hex}`);
                        };
                        paletteGrid.appendChild(swatch);
                    });
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // Color Math Helpers
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r:0, g:0, b:0 };
    }

    function rgbToHex(r, g, b) {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
    }

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) h = s = 0; 
        else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    function getLuminance(r, g, b) {
        const a = [r, g, b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function getContrastRatio(rgb1, rgb2) {
        const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
        const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }

    // Run
    init();

})();