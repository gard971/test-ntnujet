(() => {
  const root = document.querySelector('[data-brayton-cycle]');
  if (!root) return;
  const stations = [
    { station: 1, temperature: 288.0000, entropy: 0.000000, nameEn: 'Inlet', nameNo: 'Inntak', color: '#85b1ff', className: 'cycle-inlet' },
    { station: 2, temperature: 439.7094, entropy: 0.108331, nameEn: 'Compressor', nameNo: 'Kompressor', color: '#004fff', className: 'cycle-compressor' },
    { station: 3, temperature: 1000.0000, entropy: 0.999351, nameEn: 'Combustion', nameNo: 'Forbrenning', color: '#ff6700', className: 'cycle-combustion' },
    { station: 4, temperature: 861.8083, entropy: 1.061914, nameEn: 'Turbine', nameNo: 'Turbin', color: '#00ffbc', className: 'cycle-turbine' },
    { station: 5, temperature: 1300.0000, entropy: 1.552203, nameEn: 'Afterburner', nameNo: 'Etterbrenner', color: '#ff6700', className: 'cycle-combustion' },
    { station: 6, temperature: 1300.0000, entropy: 1.557649, nameEn: 'Nozzle', nameNo: 'Dyse', color: '#ff0000', className: 'cycle-nozzle' }
  ];
  const english = new URLSearchParams(window.location.search).get('lang') === 'en';
  const chart = { left: 92, right: 910, top: 48, bottom: 510 };
  const domain = { sMin: -0.08, sMax: 1.68, tMin: 200, tMax: 1380 };
  const x = (s) => chart.left + ((s - domain.sMin) / (domain.sMax - domain.sMin)) * (chart.right - chart.left);
  const y = (t) => chart.bottom - ((t - domain.tMin) / (domain.tMax - domain.tMin)) * (chart.bottom - chart.top);
  const points = stations.map((item) => ({ ...item, x: item.station === 6 ? 900 : x(item.entropy), y: item.station === 6 ? 52 : y(item.temperature) }));
  const svgNS = 'http://www.w3.org/2000/svg';
  const makeSvg = (name, attrs = {}) => { const element = document.createElementNS(svgNS, name); Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value)); return element; };
  const grid = root.querySelector('.brayton-grid');
  grid.textContent = '';
  [300, 500, 700, 900, 1100, 1300].forEach((value) => { const gridY = y(value); grid.append(makeSvg('line', { x1: chart.left, y1: gridY, x2: chart.right, y2: gridY })); const label = makeSvg('text', { x: chart.left - 14, y: gridY + 4, 'text-anchor': 'end' }); label.textContent = value; grid.append(label); });
  [0, 0.4, 0.8, 1.2, 1.6].forEach((value) => { const gridX = x(value); grid.append(makeSvg('line', { x1: gridX, y1: chart.top, x2: gridX, y2: chart.bottom })); const label = makeSvg('text', { x: gridX, y: chart.bottom + 25, 'text-anchor': 'middle' }); label.textContent = value.toFixed(1); grid.append(label); });
  root.querySelector('.brayton-path').setAttribute('points', points.map((point) => `${point.x},${point.y}`).join(' '));
  const stationGroup = root.querySelector('.brayton-stations');
  stationGroup.textContent = '';
  points.forEach((point) => { const group = makeSvg('g', { class: `brayton-station ${point.className}` }); group.append(makeSvg('circle', { cx: point.x, cy: point.y, r: 9 })); const number = makeSvg('text', { class: 'station-number', x: point.x, y: point.station >= 5 ? point.y + 28 : point.y - 26 }); number.textContent = String(point.station); group.append(number); const name = makeSvg('text', { class: 'station-name', x: point.x, y: point.station >= 5 ? point.y + 44 : point.y - 10 }); name.textContent = english ? point.nameEn : point.nameNo; group.append(name); stationGroup.append(group); });
  const slider = root.querySelector('#brayton-slider');
  const marker = root.querySelector('.brayton-marker');
  const halo = root.querySelector('.brayton-marker-halo');
  const stationOutput = root.querySelector('#brayton-station');
  const temperatureCOutput = root.querySelector('#brayton-temperature-c');
  const temperatureKOutput = root.querySelector('#brayton-temperature-k');
  const entropyOutput = root.querySelector('#brayton-entropy');
  const stationNameOutput = root.querySelector('#brayton-station-name');
  document.querySelector('#brayton-kicker').textContent = english ? 'Jotun cycle data' : 'Jotuns syklusdata';
  document.querySelector('#brayton-title').innerHTML = english ? 'Brayton cycle.<br><em>Station by station.</em>' : 'Brayton-syklus.<br><em>Stasjon for stasjon.</em>';
  document.querySelector('#brayton-station-label').textContent = english ? 'Station' : 'Stasjon';
  document.querySelector('#brayton-slider-copy').textContent = english ? 'Move through the cycle' : 'Beveg deg gjennom syklusen';
  const update = () => {
    const position = Number(slider.value); const lowerIndex = Math.min(Math.floor(position), points.length - 1); const upperIndex = Math.min(Math.ceil(position), points.length - 1); const fraction = position - lowerIndex; const start = points[lowerIndex]; const end = points[upperIndex];
    const current = { x: start.x + (end.x - start.x) * fraction, y: start.y + (end.y - start.y) * fraction, temperature: start.temperature + (end.temperature - start.temperature) * fraction, entropy: start.entropy + (end.entropy - start.entropy) * fraction };
    const nearest = points[Math.round(position)]; marker.setAttribute('cx', current.x); marker.setAttribute('cy', current.y); halo.setAttribute('cx', current.x); halo.setAttribute('cy', current.y); stationOutput.textContent = String(nearest.station); stationNameOutput.textContent = english ? nearest.nameEn : nearest.nameNo; temperatureCOutput.textContent = (current.temperature - 273.15).toFixed(2); temperatureKOutput.textContent = current.temperature.toFixed(2); entropyOutput.textContent = current.entropy.toFixed(3); root.style.setProperty('--station-color', nearest.color); slider.style.setProperty('--cycle-progress', `${(position / 5) * 100}%`); slider.setAttribute('aria-valuetext', `${english ? 'Station' : 'Stasjon'} ${nearest.station}, ${english ? nearest.nameEn : nearest.nameNo}, ${(current.temperature - 273.15).toFixed(2)} degrees Celsius, ${current.temperature.toFixed(2)} kelvin, ${current.entropy.toFixed(3)} kJ per kilogram kelvin`);
  };
  slider.addEventListener('input', update); update();
})();
