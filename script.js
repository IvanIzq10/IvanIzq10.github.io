const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const planner = document.getElementById('planner');
const open = document.getElementById('open-planner');
const close = document.getElementById('close-planner');
if (open && planner) open.addEventListener('click', () => { planner.hidden = false; planner.scrollIntoView({behavior:'smooth', block:'center'}); document.getElementById('task-input').focus(); });
if (close && planner) close.addEventListener('click', () => { planner.hidden = true; });
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const clear = document.getElementById('clear-tasks');
let tasks = [];
try { tasks = JSON.parse(localStorage.getItem('zonaia-tasks') || '[]'); } catch { tasks = []; }
function save(){ try { localStorage.setItem('zonaia-tasks', JSON.stringify(tasks)); } catch {} render(); }
function render(){
  if (!list) return;
  list.replaceChildren();
  tasks.forEach((task, i) => {
    const li = document.createElement('li'); if(task.done) li.classList.add('done');
    const checkbox = document.createElement('input'); checkbox.type='checkbox'; checkbox.checked=task.done; checkbox.setAttribute('aria-label','Marcar tarea como completada'); checkbox.addEventListener('change',()=>{tasks[i].done=checkbox.checked;save();});
    const label = document.createElement('label'); label.textContent=task.text;
    const remove = document.createElement('button'); remove.type='button'; remove.textContent='Eliminar'; remove.addEventListener('click',()=>{tasks.splice(i,1);save();});
    li.append(checkbox,label,remove); list.append(li);
  });
}
if(form) form.addEventListener('submit',e=>{e.preventDefault(); const text=input.value.trim(); if(!text)return; tasks.push({text,done:false});input.value='';save();input.focus();});
if(clear) clear.addEventListener('click',()=>{tasks=[];save();});
render();

const percentButton = document.getElementById('calc-percent');
if (percentButton) percentButton.addEventListener('click', () => {
  const base = Number(document.getElementById('percent-base').value);
  const rate = Number(document.getElementById('percent-rate').value);
  const out = document.getElementById('percent-result');
  if (document.getElementById('percent-base').value === '' || document.getElementById('percent-rate').value === '' || !Number.isFinite(base) || !Number.isFinite(rate)) { out.textContent = 'Introduce una cantidad y un porcentaje válidos.'; return; }
  out.textContent = `${rate}% de ${base} = ${(base * rate / 100).toLocaleString('es-ES', {maximumFractionDigits: 6})}`;
});
const unitValue = document.getElementById('unit-value');
function convertUnits(kind) {
  const out = document.getElementById('unit-result');
  if (!unitValue || unitValue.value === '' || !Number.isFinite(Number(unitValue.value))) { out.textContent = 'Introduce una medida válida.'; return; }
  const n = Number(unitValue.value);
  out.textContent = kind === 'cm-in'
    ? `${n} cm = ${(n / 2.54).toLocaleString('es-ES', {maximumFractionDigits: 4})} pulgadas`
    : `${n} pulgadas = ${(n * 2.54).toLocaleString('es-ES', {maximumFractionDigits: 4})} cm`;
}
const cmIn = document.getElementById('cm-in'); if(cmIn) cmIn.addEventListener('click',()=>convertUnits('cm-in'));
const inCm = document.getElementById('in-cm'); if(inCm) inCm.addEventListener('click',()=>convertUnits('in-cm'));
