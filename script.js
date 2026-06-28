/* Polygon Quiz Game (updated theme + floating background + connected-shape check)
   - Child-friendly colors
   - Floating shapes animation in background (pure CSS)
   - Ensures each question svg contains a single connected polygon (uses first polygon if multiple)
   - Convexity auto-check and duplicate-name prevention remain
*/

const SHAPES = [
  {id:1,  label:'Triangle (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><polygon points="100,20 30,170 170,170" fill="#7EE7C7" stroke="#042027" stroke-width="2"/></svg>`},
  {id:2, label:'Square (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="40,40 160,40 160,160 40,160" fill="#FF9AA2" stroke="#042027" stroke-width="2"/></svg>`},
  {id:3, label:'Regular pentagon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,20 140,60 120,120 80,120 60,60" fill="#C7B3FF" stroke="#042027" stroke-width="2"/></svg>`},
  {id:4, label:'Concave arrow (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,100 90,40 90,80 170,80 170,120 90,120 90,160" fill="#FFD97D" stroke="#042027" stroke-width="2"/></svg>`},
  {id:5, label:'Star-like concave (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,20 117,78 180,78 130,112 150,170 100,136 50,170 70,112 20,78 83,78" fill="#FF9AA2" stroke="#042027" stroke-width="2"/></svg>`},
  {id:6, label:'Hexagon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,20 150,60 150,120 100,160 50,120 50,60" fill="#7EE7C7" stroke="#042027" stroke-width="2"/></svg>`},
  {id:7, label:'Irregular convex (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="40,60 120,30 170,70 140,150 60,140" fill="#C7B3FF" stroke="#042027" stroke-width="2"/></svg>`},
  {id:8, label:'Crescent-like polygon (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="40,60 80,40 120,30 160,60 140,90 160,120 120,140 80,130 40,140 60,100" fill="#FFD97D" stroke="#042027" stroke-width="2"/></svg>`},
  {id:9, label:'Heptagon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,18 135,40 155,78 140,118 100,150 60,118 45,78 65,40" fill="#FF9AA2" stroke="#042027" stroke-width="2"/></svg>`},
  {id:10, label:'Concave notch (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,30 170,30 170,170 100,170 100,110 60,110 60,170 30,170" fill="#7EE7C7" stroke="#042027" stroke-width="2"/></svg>`},
  {id:11, label:'Octagon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="70,20 130,20 170,60 170,120 130,160 70,160 30,120 30,60" fill="#C7B3FF" stroke="#042027" stroke-width="2"/></svg>`},
  {id:12, label:'U-shaped polygon (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="40,30 160,30 160,120 140,140 120,150 100,150 80,150 60,140 40,120" fill="#FFD97D" stroke="#042027" stroke-width="2"/></svg>`},
  {id:13, label:'Nonagon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,12 130,28 150,58 160,92 140,122 110,150 80,132 50,100 60,60" fill="#7EE7C7" stroke="#042027" stroke-width="2"/></svg>`},
  {id:14, label:'Concave chevron (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,60 80,30 100,70 120,30 170,60 120,100 100,60 80,100" fill="#FF9AA2" stroke="#042027" stroke-width="2"/></svg>`},
  {id:15, label:'Decagon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,10 130,20 150,45 160,75 145,105 120,130 90,140 60,120 40,80 55,40" fill="#C7B3FF" stroke="#042027" stroke-width="2"/></svg>`},
  {id:16, label:'L-shape polygon (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,30 120,30 120,80 80,80 80,170 30,170" fill="#FFD97D" stroke="#042027" stroke-width="2"/></svg>`},
  {id:17, label:'Convex kite (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,20 150,100 100,180 50,100" fill="#7EE7C7" stroke="#042027" stroke-width="2"/></svg>`},
  {id:18, label:'Cross arm polygon (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="80,20 120,20 120,80 180,80 180,120 120,120 120,180 80,180 80,120 20,120 20,80 80,80" fill="#FF9AA2" stroke="#042027" stroke-width="2"/></svg>`},
  {id:19, label:'Trapezoid (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="40,140 160,140 140,40 60,40" fill="#C7B3FF" stroke="#042027" stroke-width="2"/></svg>`},
  {id:20, label:'Zigzag polygon (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="20,60 80,20 120,80 180,20 180,160 120,100 80,160 20,100" fill="#FFD97D" stroke="#042027" stroke-width="2"/></svg>`},
  {id:21, label:'Elongated hex (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="60,30 140,30 170,80 140,150 60,150 30,80" fill="#7EE7C7" stroke="#042027" stroke-width="2"/></svg>`},
  {id:22, label:'Notched polygon (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,30 170,30 170,90 110,90 110,60 90,60 90,90 30,90" fill="#FF9AA2" stroke="#042027" stroke-width="2"/></svg>`},
  {id:23, label:'House shape (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,20 170,80 170,160 30,160 30,80" fill="#C7B3FF" stroke="#042027" stroke-width="2"/></svg>`},
  {id:24, label:'Star concave (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,10 120,70 180,70 130,110 150,170 100,130 50,170 70,110 20,70 80,70" fill="#FFD97D" stroke="#042027" stroke-width="2"/></svg>`},
  {id:25, label:'Elongated pentagon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,10 160,60 130,150 70,150 40,60" fill="#7EE7C7" stroke="#042027" stroke-width="2"/></svg>`},
  {id:26, label:'Notch polygon (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,30 170,30 170,170 110,170 110,110 90,110 90,170 30,170" fill="#FF9AA2" stroke="#042027" stroke-width="2"/></svg>`},
  {id:27, label:'Rounded-look polygon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="60,40 140,40 160,70 140,100 120,110 80,110 60,100 40,70" fill="#C7B3FF" stroke="#042027" stroke-width="2"/></svg>`},
  {id:28, label:'Inward spike (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,30 170,30 100,90 170,150 30,150 100,90" fill="#FFD97D" stroke="#042027" stroke-width="2"/></svg>`},
  {id:29, label:'Rectangle (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="40,60 160,60 160,140 40,140" fill="#FF9AA2" stroke="#042027" stroke-width="2"/></svg>`},
  {id:30, label:'Double notch (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,30 170,30 170,80 120,80 120,120 170,120 170,170 30,170 30,120 80,120 80,80 30,80" fill="#7EE7C7" stroke="#042027" stroke-width="2"/></svg>`},
  {id:31, label:'Rounded-triangle polygon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,20 140,80 100,160 60,80" fill="#C7B3FF" stroke="#042027" stroke-width="2"/></svg>`},
  {id:32, label:'Notch 4 (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,30 170,30 170,170 100,170 120,110 80,110 100,170 30,170" fill="#FFD97D" stroke="#042027" stroke-width="2"/></svg>`},
  {id:33, label:'Convex polygon 11 (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,10 140,30 160,70 140,110 100,140 60,110 40,70 60,30" fill="#7EE7C7" stroke="#042027" stroke-width="2"/></svg>`},
  {id:34, label:'Spiral-like polygon (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="40,40 160,40 160,80 100,80 100,120 160,120 160,160 40,160 40,120 100,120 100,80 40,80" fill="#FF9AA2" stroke="#042027" stroke-width="2"/></svg>`},
  {id:35, label:'Rounded hex polygon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="60,30 140,30 160,70 140,110 60,110 40,70" fill="#C7B3FF" stroke="#042027" stroke-width="2"/></svg>`},
  {id:36, label:'Notch 5 (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,30 170,30 170,170 130,170 130,110 70,110 70,170 30,170" fill="#FFD97D" stroke="#042027" stroke-width="2"/></svg>`},
  {id:37, label:'Convex polygon 13 (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="100,20 150,60 130,120 70,120 50,60" fill="#7EE7C7" stroke="#042027" stroke-width="2"/></svg>`},
  {id:38, label:'Notch 6 (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,30 170,30 170,170 110,170 110,90 90,90 90,170 30,170" fill="#FF9AA2" stroke="#042027" stroke-width="2"/></svg>`},
  {id:39, label:'Rounded shape polygon (convex)', answer:'convex',
   svg:`<svg viewBox="0 0 200 200"><polygon points="50,60 90,40 130,40 150,60 150,100 130,140 90,160 50,140 30,100" fill="#C7B3FF" stroke="#042027" stroke-width="2"/></svg>`},
  {id:40, label:'Multi-notch (concave)', answer:'concave',
   svg:`<svg viewBox="0 0 200 200"><polygon points="30,30 170,30 170,70 120,70 120,110 170,110 170,150 30,150 30,110 80,110 80,70 30,70" fill="#FFD97D" stroke="#042027" stroke-width="2"/></svg>`}
];

const USED_KEY = 'polygon_quiz_used_shapes_v1';
const BOARD_KEY = 'polygon_quiz_leaderboard_v1';
const LAST_NAME_KEY = 'polygon_quiz_last_name_v1';

const QUESTIONS_PER_GAME = 10;
const TIMER_SECONDS = 5;

let state = {
  player: '',
  usedShapes: loadUsedShapes(),
  pool: [],
  roundShapes: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  totalTime: 0,
  timer: null,
  timerStart: null,
  timeLeft: TIMER_SECONDS,
  questionStartTime: null
};

// DOM refs
const startEl = document.getElementById('start');
const gameEl = document.getElementById('game');
const playerNameInput = document.getElementById('playerName');
const startBtn = document.getElementById('startBtn');
const resetUsedBtn = document.getElementById('resetUsed');
const playerLabel = document.getElementById('playerLabel');
const svgWrap = document.getElementById('svgWrap');
const btnConvex = document.getElementById('btnConvex');
const btnConcave = document.getElementById('btnConcave');
const timeNum = document.getElementById('timeNum');
const timerCircle = document.getElementById('timerCircle');
const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');
const scoreLabel = document.getElementById('scoreLabel');
const timeLabel = document.getElementById('timeLabel');
const streakLabel = document.getElementById('streakLabel');
const nextBtn = document.getElementById('nextBtn');
const quitBtn = document.getElementById('quitBtn');
const resultRow = document.getElementById('resultRow');
const resultText = document.getElementById('resultText');
const resultBadge = document.getElementById('resultBadge');
const boardTableBody = document.querySelector('#boardTable tbody');
const boardTableBodyGame = document.querySelector('#boardTableGame tbody');
const clearBoardBtn = document.getElementById('clearBoard');
const trackerDots = document.getElementById('trackerDots');

// small warning element for duplicate name (create dynamically)
let nameWarningEl = null;
function ensureNameWarningElement(){
  if(nameWarningEl) return;
  nameWarningEl = document.createElement('div');
  nameWarningEl.style.color = '#7a1f1f';
  nameWarningEl.style.background = 'rgba(239,68,68,0.08)';
  nameWarningEl.style.padding = '10px';
  nameWarningEl.style.borderRadius = '8px';
  nameWarningEl.style.marginTop = '10px';
  nameWarningEl.style.fontWeight = '700';
  nameWarningEl.style.display = 'none';
  nameWarningEl.textContent = 'Name already registered. Choose a different name to start.';
  const startLeft = document.querySelector('.start-left');
  if(startLeft) startLeft.insertBefore(nameWarningEl, startLeft.querySelector('label'));
}

// Events
startBtn.addEventListener('click', startGame);
btnConvex.addEventListener('click', ()=>submitAnswer('convex'));
btnConcave.addEventListener('click', ()=>submitAnswer('concave'));
nextBtn.addEventListener('click', nextQuestion);
quitBtn.addEventListener('click', endGame);
clearBoardBtn.addEventListener('click', clearLeaderboard);
resetUsedBtn.addEventListener('click', ()=>{ if(confirm('Reset used shapes so repeats can appear?')){ localStorage.removeItem(USED_KEY); state.usedShapes=[]; alert('Used shapes reset.'); }});

// Initialize: verify shapes and render leaderboard
(function init(){
  ensureNameWarningElement();
  sanitizeShapes();            // ensure single connected polygon per svg
  verifyAndFixShapeAnswers();  // compute convexity from polygon points
  renderLeaderboard();
  startEl.style.display = 'block';
  gameEl.style.display = 'none';
  const lastName = localStorage.getItem(LAST_NAME_KEY);
  if(lastName) playerNameInput.value = lastName;
})();

// ---------------------- sanitize shapes ----------------------
// Ensure each shape svg contains exactly one polygon element.
// If multiple shape tags exist, keep the first polygon only (prevents disconnected multi-shape svgs).
function sanitizeShapes(){
  SHAPES.forEach(shape=>{
    try{
      // find first <polygon ...>...</polygon> or self-closing <polygon .../>
      const polyMatch = shape.svg.match(/<polygon[^>]*points="[^"]+"[^>]*>/i);
      if(polyMatch){
        // build a minimal svg with only that polygon
        const polyTag = polyMatch[0];
        // ensure fill/stroke attributes exist; keep as-is
        shape.svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${polyTag}</svg>`;
      } else {
        // if no polygon found, attempt to find rect and convert to polygon
        const rectMatch = shape.svg.match(/<rect[^>]*>/i);
        if(rectMatch){
          const rect = rectMatch[0];
          // extract x,y,width,height
          const x = parseFloat((rect.match(/x="([^"]+)"/)||[])[1]||0);
          const y = parseFloat((rect.match(/y="([^"]+)"/)||[])[1]||0);
          const w = parseFloat((rect.match(/width="([^"]+)"/)||[])[1]||100);
          const h = parseFloat((rect.match(/height="([^"]+)"/)||[])[1]||100);
          const fill = (rect.match(/fill="([^"]+)"/)||[])[1]||'#7EE7C7';
          const stroke = (rect.match(/stroke="([^"]+)"/)||[])[1]||'#042027';
          const poly = `<polygon points="${x},${y} ${x+w},${y} ${x+w},${y+h} ${x},${y+h}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
          shape.svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${poly}</svg>`;
        } else {
          // fallback: leave as-is
        }
      }
    }catch(e){
      console.warn('sanitizeShapes failed for id', shape.id, e);
    }
  });
}

// ---------------------- shape verification ----------------------
// Parse polygon points from svg string and compute convexity
function verifyAndFixShapeAnswers(){
  SHAPES.forEach(shape=>{
    try{
      const m = shape.svg.match(/<polygon[^>]*points="([^"]+)"/i);
      if(!m) return; // skip if no polygon points
      const pts = parsePointsString(m[1]);
      if(pts.length < 3) return;
      const convex = isPolygonConvex(pts);
      const computed = convex ? 'convex' : 'concave';
      if(shape.answer !== computed){
        shape.answer = computed;
        console.log(`Shape id ${shape.id} label "${shape.label}" corrected to ${computed}`);
      }
    }catch(e){
      console.warn('verify shape failed', shape.id, e);
    }
  });
}

// parse "x1,y1 x2,y2 ..." into [[x,y],...]
function parsePointsString(s){
  return s.trim().split(/\s+/).map(pair=>{
    const [x,y] = pair.split(',').map(v=>parseFloat(v));
    return [x,y];
  }).filter(p=>p.length===2 && !isNaN(p[0]) && !isNaN(p[1]));
}

// returns true if polygon is convex (no change in cross product sign)
function isPolygonConvex(points){
  const n = points.length;
  if(n < 4) return true; // triangles are always convex
  let sign = 0;
  for(let i=0;i<n;i++){
    const p0 = points[i];
    const p1 = points[(i+1)%n];
    const p2 = points[(i+2)%n];
    const dx1 = p1[0] - p0[0];
    const dy1 = p1[1] - p0[1];
    const dx2 = p2[0] - p1[0];
    const dy2 = p2[1] - p1[1];
    const z = dx1*dy2 - dy1*dx2; // cross product z
    if(Math.abs(z) < 1e-6) continue; // colinear
    const s = z > 0 ? 1 : -1;
    if(sign === 0) sign = s;
    else if(sign !== s) return false;
  }
  return true;
}

// ---------------------- storage helpers ----------------------
function loadUsedShapes(){
  try{
    const raw = localStorage.getItem(USED_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}
function saveUsedShapes(){
  localStorage.setItem(USED_KEY, JSON.stringify(state.usedShapes));
}

// ---------------------- game flow ----------------------
function startGame(){
  ensureNameWarningElement();
  const name = (playerNameInput.value || 'Player').trim();
  if(!name){
    nameWarningEl.style.display = 'block';
    nameWarningEl.textContent = 'Please enter a name to start.';
    return;
  }

  // check if name already exists in leaderboard
  const existing = getLeaderboard();
  const nameExists = existing.some(r => r.player.toLowerCase() === name.toLowerCase());
  if(nameExists){
    nameWarningEl.style.display = 'block';
    nameWarningEl.textContent = 'Name already registered. Choose a different name to start.';
    return;
  } else {
    nameWarningEl.style.display = 'none';
  }

  state.player = name;
  playerLabel.textContent = name;
  localStorage.setItem(LAST_NAME_KEY, name);

  // Ensure enough unused shapes; if not, reset usedShapes
  const unused = SHAPES.filter(s => !state.usedShapes.includes(s.id));
  if(unused.length < QUESTIONS_PER_GAME){
    state.usedShapes = [];
    saveUsedShapes();
  }
  const pool = SHAPES.filter(s => !state.usedShapes.includes(s.id));
  state.pool = shuffle(pool.slice());
  state.roundShapes = state.pool.slice(0, QUESTIONS_PER_GAME);
  state.roundShapes.forEach(s => state.usedShapes.push(s.id));
  saveUsedShapes();

  state.currentIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.totalTime = 0;
  state.timeLeft = TIMER_SECONDS;

  startEl.style.display = 'none';
  gameEl.style.display = 'block';
  resultRow.style.display = 'none';
  nextBtn.style.display = 'none';
  nextBtn.classList.remove('highlight');
  updateScoreUI();
  buildTracker();
  showQuestion();
  renderLeaderboard();
}

function buildTracker(){
  trackerDots.innerHTML = '';
  for(let i=0;i<QUESTIONS_PER_GAME;i++){
    const dot = document.createElement('div');
    dot.style.width='18px'; dot.style.height='18px'; dot.style.borderRadius='50%';
    dot.style.background='rgba(11,18,32,0.04)'; dot.title = `Question ${i+1}`;
    trackerDots.appendChild(dot);
  }
}

function showQuestion(){
  const q = state.roundShapes[state.currentIndex];
  svgWrap.innerHTML = q.svg;
  // ensure svgWrap background is neutral for visibility
  progressLabel.textContent = `${state.currentIndex+1} / ${QUESTIONS_PER_GAME}`;
  progressBar.style.width = `${((state.currentIndex)/QUESTIONS_PER_GAME)*100}%`;
  resultRow.style.display = 'none';
  nextBtn.style.display = 'none';
  nextBtn.classList.remove('highlight');
  enableChoices(true);
  startTimer();
  state.questionStartTime = performance.now();
}

function startTimer(){
  stopTimer();
  state.timeLeft = TIMER_SECONDS;
  updateTimerUI();
  const totalDash = 2 * Math.PI * 44;
  timerCircle.style.strokeDasharray = totalDash;
  timerCircle.style.transition = 'none';
  timerCircle.style.strokeDashoffset = '0';
  state.timerStart = performance.now();
  state.timer = requestAnimationFrame(timerTick);
}

function timerTick(now){
  const elapsed = (now - state.timerStart)/1000;
  const left = Math.max(0, TIMER_SECONDS - elapsed);
  state.timeLeft = left;
  updateTimerUI();
  const totalDash = 2 * Math.PI * 44;
  const offset = totalDash * (1 - (left / TIMER_SECONDS));
  timerCircle.style.strokeDashoffset = offset;
  if(left <= 0.001){
    stopTimer();
    submitAnswer(null, true);
    return;
  }
  state.timer = requestAnimationFrame(timerTick);
}

function stopTimer(){
  if(state.timer) cancelAnimationFrame(state.timer);
  state.timer = null;
}

function updateTimerUI(){
  timeNum.textContent = Math.ceil(state.timeLeft);
  const pct = ((state.currentIndex)/QUESTIONS_PER_GAME)*100;
  progressBar.style.width = `${pct}%`;
}

function submitAnswer(choice, isTimeout=false){
  enableChoices(false);
  stopTimer();
  const q = state.roundShapes[state.currentIndex];
  const correct = q.answer;
  const timeTaken = (performance.now() - state.questionStartTime)/1000;
  state.totalTime += timeTaken;
  let correctFlag = false;
  if(isTimeout){
    resultText.textContent = 'Time up!';
    resultBadge.innerHTML = `<span class="badge bad">No answer</span>`;
    state.streak = 0;
  } else {
    if(choice === correct){
      correctFlag = true;
      state.score += 1;
      state.streak += 1;
      resultText.textContent = 'Correct';
      resultBadge.innerHTML = `<span class="badge good">+1</span>`;
    } else {
      state.streak = 0;
      resultText.textContent = `Wrong — correct: ${correct.toUpperCase()}`;
      resultBadge.innerHTML = `<span class="badge bad">0</span>`;
    }
  }
  const dot = trackerDots.children[state.currentIndex];
  if(dot){
    dot.style.background = correctFlag ? 'linear-gradient(90deg,#7EE7C7,#C7B3FF)' : 'rgba(11,18,32,0.06)';
    dot.title = correctFlag ? 'Correct' : 'Incorrect';
  }

  // Show result and highlight Next button
  resultRow.style.display = 'flex';
  nextBtn.style.display = 'inline-block';
  nextBtn.textContent = (state.currentIndex >= QUESTIONS_PER_GAME-1) ? 'Finish' : 'Next';
  nextBtn.classList.add('highlight');

  // Remove highlight when user clicks Next
  const removeHighlight = () => {
    nextBtn.classList.remove('highlight');
    nextBtn.removeEventListener('click', removeHighlight);
  };
  nextBtn.addEventListener('click', removeHighlight);

  updateScoreUI();
}

function nextQuestion(){
  // remove highlight immediately when moving on
  nextBtn.classList.remove('highlight');

  if(state.currentIndex < QUESTIONS_PER_GAME-1){
    state.currentIndex += 1;
    showQuestion();
  } else {
    endGame();
  }
}

function endGame(){
  stopTimer();
  const avgTime = state.totalTime.toFixed(2);
  const score = state.score;
  const player = state.player || 'Player';
  saveToLeaderboard({player, score, time: parseFloat(avgTime), date: new Date().toISOString()});
  renderLeaderboard();
  resultText.textContent = `Finished — Score ${score} / ${QUESTIONS_PER_GAME}`;
  resultBadge.innerHTML = `<span class="badge good">${state.totalTime.toFixed(1)}s</span>`;
  resultRow.style.display = 'flex';
  nextBtn.style.display = 'none';
  nextBtn.classList.remove('highlight');
  startEl.style.display = 'block';
  gameEl.style.display = 'none';
  playerNameInput.value = state.player;
}

function updateScoreUI(){
  scoreLabel.textContent = state.score;
  timeLabel.textContent = state.totalTime.toFixed(1);
  streakLabel.textContent = state.streak;
  progressLabel.textContent = `${state.currentIndex+1} / ${QUESTIONS_PER_GAME}`;
}

function enableChoices(enable){
  btnConvex.disabled = !enable;
  btnConcave.disabled = !enable;
  btnConvex.style.opacity = enable ? '1' : '0.6';
  btnConcave.style.opacity = enable ? '1' : '0.6';
}

// ---------------------- leaderboard ----------------------
function getLeaderboard(){
  const raw = localStorage.getItem(BOARD_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveToLeaderboard(entry){
  const list = getLeaderboard();
  list.push(entry);
  list.sort((a,b)=> {
    if(b.score !== a.score) return b.score - a.score;
    if(a.time !== b.time) return a.time - b.time;
    return new Date(b.date) - new Date(a.date);
  });
  localStorage.setItem(BOARD_KEY, JSON.stringify(list));
}

function renderLeaderboard(){
  const list = getLeaderboard();
  boardTableBody.innerHTML = '';
  list.forEach(r=>{
    const tr = document.createElement('tr');
    const td1 = document.createElement('td'); td1.textContent = r.player;
    const td2 = document.createElement('td'); td2.textContent = r.score;
    const td3 = document.createElement('td'); td3.textContent = `${r.time}`;
    tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
    boardTableBody.appendChild(tr);
  });
  boardTableBodyGame.innerHTML = '';
  list.forEach(r=>{
    const tr = document.createElement('tr');
    const td1 = document.createElement('td'); td1.textContent = r.player;
    const td2 = document.createElement('td'); td2.textContent = r.score;
    const td3 = document.createElement('td'); td3.textContent = `${r.time}`;
    tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);
    boardTableBodyGame.appendChild(tr);
  });
}

function clearLeaderboard(){
  if(confirm('Clear leaderboard? This will remove all stored plays.')){
    localStorage.removeItem(BOARD_KEY);
    renderLeaderboard();
  }
}

// ---------------------- utilities ----------------------
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}
