LOG_NORMALIZER = Math.log(2) - Math.log(1);
//TEMPERAMENT = 12;
//INVERSE_TEMPERAMENT = 1.0 / TEMPERAMENT;
//TEMPERAMENT_12_FREQ_STEP = Math.pow(2, 1.0/12);
//BASE_PITCH = 220;


function Voice(audioCtx) {
  this.ctx = audioCtx;
  
  this.oscillator = audioCtx.createOscillator();
  this.oscillator.frequency.value = 110;
  this.delay = audioCtx.createDelay(1);
  this.gain = audioCtx.createGain();
  this.gain.gain.value = 0;
  
  this.oscillator.connect(this.delay);
  this.delay.connect(this.gain);
}

Voice.prototype.connect = function(output) {
  this.oscillator.start();
  this.gain.connect(output);
};

Voice.prototype.disconnect = function() {
  this.oscillator.stop();
  this.gain.disconnect();
};


function PianoSound(audioCtx, options) {
  
  this.SONORITY_GAIN_MULTIPLIER = 0.8;
  this.SYMPATHETIC_GAIN_MULTIPLIER = 0.1;
  
  this.audioCtx = audioCtx;
  
  this.gain = audioCtx.createGain();
  this.gain.gain.value = 0;
  
  this.mainVoice = new Voice(audioCtx);
  this.sympatheticUpVoice = new Voice(audioCtx);
  this.sympatheticDownVoice = new Voice(audioCtx);
  this.sonorityVoice = new Voice(audioCtx);
  
  this.mainVoice.connect(this.gain);
  this.sympatheticUpVoice.connect(this.gain);
  this.sympatheticDownVoice.connect(this.gain);
  this.sonorityVoice.connect(this.gain);
  
  this.frequencyRatioPerTemperament = Math.pow(2, 1/12);
}

PianoSound.prototype.connect = function(audioNode) {
  this.gain.connect(audioNode);
};

PianoSound.prototype.disconnect = function() {
  this.gain.disconnect();
};

PianoSound.prototype.setNote = function(hz) {  
  this.mainVoice.oscillator.frequency.value = hz;
  this.sympatheticUpVoice.oscillator.frequency.value = (hz * this.frequencyRatioPerTemperament);
  this.sympatheticDownVoice.oscillator.frequency.value = (hz * (1 / this.frequencyRatioPerTemperament));
  this.sonorityVoice.oscillator.frequency.value = (hz / 2);
};

PianoSound.prototype.play = function(hz, delay) {
  this.setNote(hz);

//  // This gain function is arbitrary
//  // Ideally the gain is 0.5 at 2 * 880 and 1.0 at 220
//  //var gainScale = 1.75 - (3 * Math.log(hz) / Math.log(Math.pow(BASE_PITCH, this.NUMBER_OCTAVES + 1)));
//  var highestFreq = this.ctx.basePitch * Math.pow(2, this.NUMBER_OCTAVES);
//  //var gainScale = 2.40 - 2 * (1 * Math.log(hz) / Math.log(highestFreq));
//  var gainScale = (2*highestFreq - hz)/(2*highestFreq);
  
  var bandPass = 440;
  var gainScale = (2*880 - hz)/(2*880);
  console.log('gainScale [' + gainScale + ']');
    
  this.gain.gain.value = 0.8;
  //this.mainVoice.gain.gain.value = 0.8;
//  this.sympatheticUpVoice.gain.gain.value = 0.1;
//  this.sympatheticDownVoice.gain.gain.value = 0.1;
//  this.sonorityVoice.gain.gain.value = 0.2;
  
//  this.gain.gain.linearRampToValueAtTime(gainScale * 0.65, now + delay + 0.04);
//  this.gain.gain.linearRampToValueAtTime(gainScale * 0.5, now + delay + 0.09);
//  this.gain.gain.exponentialRampToValueAtTime(gainScale * 0.4, now + delay + 0.2);
//  this.gain.gain.linearRampToValueAtTime(gainScale * 0.3, now + delay + 0.6);
//  this.gain.gain.setTargetAtTime(0, now + delay + 0.9, 0.7);
    
  var now = this.audioCtx.currentTime;
  
  this.gain.gain.cancelScheduledValues(now + delay);
  this.gain.gain.setValueAtTime(this.gain.gain.value, now + delay);
  this.gain.gain.exponentialRampToValueAtTime(1, now + delay);
  this.gain.gain.setTargetAtTime(0, now + delay + 0.9, 2);
  
  this.mainVoice.gain.gain.cancelScheduledValues(now + delay/2);
  // So we don't interpolate from 0 to delay
  //this.mainVoice.gain.gain.setValueAtTime(this.mainVoice.gain.gain.value, now + delay);
  this.mainVoice.gain.gain.setValueAtTime(this.mainVoice.gain.gain.value, now + delay);
  this.mainVoice.gain.gain.linearRampToValueAtTime(gainScale * 0.8, now + delay + 0.02);
  this.mainVoice.gain.gain.exponentialRampToValueAtTime(gainScale * 0.75, now + delay + 0.04);
  this.mainVoice.gain.gain.exponentialRampToValueAtTime(gainScale * 0.55, now + delay + 0.7);
  this.mainVoice.gain.gain.setTargetAtTime(0, now + delay + 0.8, 0.6);
  
//  this.mainVoice.gain.gain.linearRampToValueAtTime(gainScale * 0.65, now + 0.04);
//  this.mainVoice.gain.gain.linearRampToValueAtTime(gainScale * 0.5, now + 0.09);
//  this.mainVoice.gain.gain.exponentialRampToValueAtTime(gainScale * 0.4, now + 0.2);
//  this.mainVoice.gain.gain.linearRampToValueAtTime(gainScale * 0.3, now + 0.6);
//  this.mainVoice.gain.gain.setTargetAtTime(0, now + 0.9, 0.7);
  
//  
//////  //this.sympatheticUpVoice.gain.gain.setValueAtTime(this.gain.gain.value, now + delay + 0.1);
  this.sympatheticUpVoice.gain.gain.cancelScheduledValues(now + delay/2);
  this.sympatheticUpVoice.gain.gain.setValueAtTime(this.sympatheticUpVoice.gain.gain.value / 2, now + delay);
  this.sympatheticUpVoice.gain.gain.linearRampToValueAtTime(gainScale * 0.07, now + delay + 0.01);
  this.sympatheticUpVoice.gain.gain.setTargetAtTime(0, now + delay + 0.5, 0.2);
//////  
//  //this.sympatheticDownVoice.gain.gain.setValueAtTime(this.gain.gain.value, now + delay + 0.1);
  this.sympatheticDownVoice.gain.gain.cancelScheduledValues(now + delay/2);
  this.sympatheticDownVoice.gain.gain.setValueAtTime(this.sympatheticDownVoice.gain.gain.value / 2, now + delay);
  this.sympatheticDownVoice.gain.gain.linearRampToValueAtTime(gainScale * 0.07, now + delay + 0.01);
  this.sympatheticDownVoice.gain.gain.setTargetAtTime(0, now + delay + 0.5, 0.2);
//////
  this.sonorityVoice.gain.gain.cancelScheduledValues(now + delay/2);
  this.sonorityVoice.gain.gain.setValueAtTime(this.sonorityVoice.gain.gain.value / 2, now + delay);
  this.sonorityVoice.gain.gain.linearRampToValueAtTime(gainScale * 0.8, now + delay + 0.02);
  this.sonorityVoice.gain.gain.linearRampToValueAtTime(gainScale * 0.5, now + delay + 0.05);
  //this.sonorityVoice.gain.gain.exponentialRampToValueAtTime(gainScale * 0.3, now + delay + 0.1);
  this.sonorityVoice.gain.gain.setTargetAtTime(0, now + delay + 0.6, 0.6);
};


function Control(ctx, pitchClass, options) {
  options = options || {};
  
  this.ctx = ctx;
  this.pitchClass = pitchClass;
  this.color = options.color || '#EA3131';
  
  this.NUMBER_OCTAVES = options.NUMBER_OCTAVES || 3;
  
  this.started = false;
  
  this.pianoSound = new PianoSound(this.ctx.audioCtx);
  this.basePitch = this.ctx.basePitch || options.basePitch || 220;
  this.frequency = pitchClass || this.ctx.basePitch || 220;
  this.subdivisions = options.subdivisions || 1;
  
  this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  this.line.setAttribute('stroke', this.color);
  this.line.setAttribute('stroke-width', '0.02');
  this.line.style.transition = 'all';
  this.line.setAttribute('x1', '0');
  this.line.setAttribute('y1', '0');
  
  this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  this.circle.setAttribute('stroke-width', '0.005');
  this.circle.setAttribute('cx', '0');
  this.circle.setAttribute('cy', '0');
  this.circle.setAttribute('r', '0.03');
  this.circle.setAttribute('fill', this.color);
  
  this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  this.text.setAttribute('text-rendering', 'geometricPrecision');
  this.text.setAttribute('alignment-baseline', 'baseline');
  this.text.setAttribute('text-anchor', 'middle');
  this.text.setAttribute('fill', '#AAAAAA');
  this.text.setAttribute('stroke-width', '0.005');
  this.text.setAttribute('font-size', '12');
  this.text.innerHTML = pitchClass + 'Hz';
  
  this.line.setAttribute('x1', '0');
  this.line.setAttribute('y1', '0');
  
  this.guides = [];
  this.guides.push({
    line: document.createElementNS('http://www.w3.org/2000/svg', 'line'),
    ratio: (3/2)
  });
  
  for (var i = 0; i < this.guides.length; i++) {
    this.guides[i].line.setAttribute('x1', '0');
    this.guides[i].line.setAttribute('y1', '0');
    this.guides[i].line.setAttribute('stroke', '#FF8888');
    this.guides[i].line.setAttribute('stroke-width', '0.006');
    this.element.appendChild(this.guides[i].line);
  }
  
  this.element.appendChild(this.line);
  this.element.appendChild(this.circle);
  this.element.appendChild(this.text);
  
  this.setNote(pitchClass);
};

Control.prototype.connect = function(audioNode) {
  this.pianoSound.connect(audioNode);
};

Control.prototype.disconnect = function() {
  this.pianoSound.disconnect();
};

/**
Take coordinate in the wheel and set the frequency from it.
*/
Control.prototype.pointToPitch = function(x, y) {
  console.log('point to: (' + x.toFixed(2) + ',' + y.toFixed(2) + ')');
  
  var norm = Math.sqrt(x * x + y * y);
  
  x = x / norm;
  y = y / norm;
  
  var angle = Math.acos(x);
  
  if (y <= 0) {
    angle = 2 * Math.PI - angle;
  }
  
  // From (0, 2 * PI) to (0, 1), but not including 1, we wind down
  var temperament01 = (angle / (2 * Math.PI));
  
  console.log('Temperament01 [' + temperament01 + ']');
  
  // Discretize by rounding to closest subdivision
  var subdivisionScale = Math.round((temperament01 * this.ctx.temperament * this.subdivisions) % (this.ctx.temperament * this.subdivisions));
  //temperament01 = Math.round(temperament01 * this.ctx.temperament * 5) / (this.ctx.temperament * 5);
  // Floored so 2 * base pitch doesn't wind up on lower octave
  //temperament01 = Math.round(temperament01 * this.ctx.temperament * 5) / (this.ctx.temperament * 5);
  temperament01 = subdivisionScale / (this.ctx.temperament * this.subdivisions);
  
  // But temp will never equal 1, so we should never have 2 pi!
  temperament01 = temperament01 % 1;
  
  console.log('Temperament to subdivision [' + (temperament01 * this.ctx.temperament) % this.ctx.temperament + ']');
  console.log('Temperament01 [' + temperament01 + ']');
  
  // 100% = 12 steps = 1 whole octave
  
  // If there are 12 keys, then 0.4 tells you what key
  // Also equivalent to dividing temperament01 by the 
  // fraction per key
  var keyInTemperament = temperament01 * this.ctx.temperament;
  
  console.log('Key In Temperament [' + keyInTemperament + ']');
  
  var frequency = Math.pow(this.ctx.frequencyRatioForTemperament, keyInTemperament) * this.ctx.basePitch;
  
  console.log('Pitch Class [' + frequency + ']');
  // Assume that the max normal is 1.0 and represents the highest octave
  // Norm is (0,1] -> 4 octaves
  // We round to the nearest octave (0,4]
  
  //var discretizedOctave = Math.ceil((norm / (1.0/4)));
  norm = Math.min(norm, 0.99);
  
  // Discretize (0,1) into subdivisions 
  // Example: (0,0.25), (0,0.5), (0, 0.75)
  console.log('Octave range [' + (norm * this.NUMBER_OCTAVES) + ']');
  // Octave range 1.0001 case -> It should be 0.9, 2.0001 -> It should be 1.9
  var discretizedOctave = Math.floor((norm * this.NUMBER_OCTAVES));
  //var discretizedOctave = Math.ceil((norm * this.NUMBER_OCTAVES));

  // TODO: debug
  //discretizedOctave = norm;
  //console.log('norm: ' + norm);
  console.log('discretizedOctave: ' + discretizedOctave);
  var octaveMultiplier = Math.pow(2, discretizedOctave);
  
  var frequency = frequency * octaveMultiplier;

  console.log('freq: ' + this.frequency);
  
  this.setNote(frequency);
};

/**
Set the oscillator frequency and gain.
Calculate svg element angle and magnitude
*/
Control.prototype.setNote = function(hz) {
  
  console.log('setNote[' + hz + ']');
     
  this.frequency = hz;
  
  // Set audio
//  this.oscillator.frequency.value = hz;
//  this.sonority.frequency.value = (hz / 2) + 1;
//  this.sympatheticUp.frequency.value = (hz * this.ctx.frequencyRatioForTemperament);
//  this.sympatheticDown.frequency.value = (hz * (1 / this.ctx.frequencyRatioForTemperament));
//  
  // This gain function is arbitrary
  // Ideally the gain is 0.5 at 2 * 880 and 1.0 at 220
  //var gainScale = 1.75 - (3 * Math.log(hz) / Math.log(Math.pow(BASE_PITCH, this.NUMBER_OCTAVES + 1)));
//  var highestFreq = this.ctx.basePitch * Math.pow(2, this.NUMBER_OCTAVES);
  //var gainScale = 2.40 - 2 * (1 * Math.log(hz) / Math.log(highestFreq));
//  var gainScale = (2*highestFreq - hz)/(2*highestFreq);
  
//  this.gain.gain.value = gainScale;
  
//  this.sympatheticUpGain.gain.value = gainScale * this.SYMPATHETIC_GAIN_MULTIPLIER;
//  this.sympatheticDownGain.gain.value = gainScale * this.SYMPATHETIC_GAIN_MULTIPLIER;
//  this.sonorityGain.gain.value = this.SONORITY_GAIN_MULTIPLIER;
  
  // Distance from hz to base pitch in log scale, but linearly normalized by log(2) - log(1)
  // Linear scale, each linear unit as the LOG_NORMALIZER
  // Each unit of LOG_NORMALIZER represents an octave on the log scale
//  var val = ((Math.log(this.oscillator.frequency.value) - Math.log(this.ctx.basePitch)) / LOG_NORMALIZER);
  // 1 unit in log_normalizer space = 1 octave
  // 0 = base pitch, 1 = 1st octave, 2 = 2nd octave
  // (0,1] = octave 0, (1,2] = octave 1, (2,3] = octave 3
  var val = ((Math.log(hz) - Math.log(this.basePitch)) / LOG_NORMALIZER);
  
  // Normalize to single octave (0,R) -> (0,2) -> (0,2*pi)
  // Normalize to single octave (0,R) -> (0,1) -> (0,2*pi)
  //var angle = (val % 2) * 2 * Math.PI;
  console.log('val % 1: ' + (val % 1));

  var angle = 0;
  
  if (approxEquals(val % 1, 1, 0.001)) {
    angle = 0;
  }
  else {
    angle = (val % 1) * 2 * Math.PI;
  }

  // 12 logNormalizer steps = 1 octave
  console.log('val (distance from base): ' + val);
  console.log('angle: ' + angle);
  //var magnitude = Math.floor(val % TEMPERAMENT) + 1;
  //console.log('val % TEMPERAMENT: ' + magnitude);

  
  //var magnitude = (approxEquals(val % 1, 0, 0.001)) ? Math.ceil(val) + 1 : Math.ceil(val);
  var magnitude = Math.ceil(val);
  
  console.log('mag: (to ceil)' + val);
  
  this.display(angle, magnitude, hz);
};

Control.prototype.play = function(delay) {
  this.pianoSound.play(this.frequency, delay);
//  var now = this.ctx.audioCtx.currentTime;
//  this.gain.gain.cancelScheduledValues(now);
//    
//  this.gain.gain.setValueAtTime(0.01, now + delay);
//  this.gain.gain.linearRampToValueAtTime(0.65, now + delay + 0.04);
//  this.gain.gain.linearRampToValueAtTime(0.5, now + delay + 0.09);
//  this.gain.gain.exponentialRampToValueAtTime(0.4, now + delay + 0.2);
//  this.gain.gain.linearRampToValueAtTime(0.3, now + delay + 0.6);
//  this.gain.gain.setTargetAtTime(0, now + delay + 0.9, 0.7);
};
    
function approxEquals(e1, e2, criteria) {
  return (Math.abs(e1 - e2) < (criteria / 2));
}

/**
Controls the line and circle
*/
Control.prototype.display = function(angle, magnitude, text) {

  var x = Math.cos(angle);// * (this.ctx.width / 8);
  var y = Math.sin(angle);// * (this.ctx.width / 8);

  console.log('angle [' + angle + '] magnitude [' + magnitude + ']');
  
  var spinnerRadius = this.ctx.spinnerRadius;
  //var spinnerRadius = 1.0;
  //spinnerRadius = spinnerRadius.substr(0, spinnerRadius.length - 1);
  
  // 25% length at 1 magnitude
  // But 25% length is half of 100% of the width of svg
  if (angle == 0) { // || approxEquals(angle, 2 * Math.PI, 0.001)) {
    magnitude += 0.7;
  }
  
  var mx = (1.0 / this.NUMBER_OCTAVES) * magnitude * spinnerRadius;
  var my = (1.0 / this.NUMBER_OCTAVES) * magnitude * spinnerRadius;
  
  var normalizedX = x;
  var normalizedY = y;
  
  x *= mx;
  y *= my;
  
  this.line.setAttribute('x2', (x));
  this.line.setAttribute('y2', (y));
  this.circle.setAttribute('cx', (x));
  this.circle.setAttribute('cy', (y));
  
  console.log('cx,cy [' + x + ',' + y + ']');
  
  var tx = 0.18 * normalizedX + x;
  var ty = 0.18 * normalizedY + y;
  if (ty > 0) {
    ty += 0.1;
  }
    
  this.text.setAttribute('x', tx);
  this.text.setAttribute('y', ty);
  
  var transformString = ' translate(' + 100*(tx) + ',' + 100*(ty) + ')';
  this.text.setAttribute('transform', 'scale(0.009)' + transformString);
                         
  //this.text.innerHTML = text.toFixed(2) + 'Hz' + ' (' + this.gain.gain.value.toFixed(2) + ')';
  this.text.innerHTML = text.toFixed(2) + 'Hz';

  this.guides.forEach(function(guide, index) {
      var guideVal = (((Math.log(guide.ratio * this.frequency) - Math.log(this.basePitch)) / LOG_NORMALIZER) % 2) * 2 * Math.PI;

      var gx = Math.cos(guideVal);
      var gy = Math.sin(guideVal);

      guide.line.setAttribute('x2', (mx*gx));
      guide.line.setAttribute('y2', (my*gy));
  }.bind(this));
};

function temperament(name, priority) {
  var priority = priority || 1;
  return { name: name, priority: priority };
}


function PitchClock(options) {
  var _this = this;
  
  options = options || {};
  //this.temperament = options.temperament || 12;
  this.basePitch = options.basePitch || 220;
  
  Object.defineProperty(this, 'frequencyRatioForTemperament', {
    get: function() {
      return Math.pow(2, 1 / _this.temperament);
    }
  });
  
  this.audioCtx = null;
  this.initialized = false;
  this.gain = null;
  this.controls = [];
  
  this.playing = false;
  
  /**
  Radius of the wheel. Currently parsed as a percentage.
  */
  this._SPINNER_RADIUS = 1;
  
  this.temperaments = [
    temperament('A'), 
    temperament(' ', 2), 
    temperament('A#'),
    temperament(' ', 2),
    temperament('B'), 
    temperament(' ', 2),
    temperament('C'), 
    temperament(' ', 2),
    temperament('C#'),
    temperament(' ', 2),
    temperament('D'), 
    temperament(' ', 2),
    temperament('D#'),
    temperament(' ', 2),
    temperament('E'), 
    temperament(' ', 2),
    temperament('F'), 
    temperament(' ', 2),
    temperament('F#'),
    temperament(' ', 2),
    temperament('G'), 
    temperament(' ', 2),
    temperament('G#'),
    temperament(' ', 2) ];
  
  Object.defineProperty(this, 'temperament', {
    get: function() {
      return _this.temperaments.length;
    }
  });
  
  this.mousemove = function(ev) {
    
    // Make sure mouse is down
    //if (ev.which !== 1) { return; }
    
    // TODO: use _this.width
    var boundingClientRect = ev.currentTarget.getBoundingClientRect();
    var x = ev.clientX - boundingClientRect.left - (boundingClientRect.width / 2);
    var y = ev.clientY - boundingClientRect.top - (boundingClientRect.height / 2);
    
    // Normalized (Radius = 1)
    var mx = x = x / (boundingClientRect.width / 2);
    var my = y = y / (boundingClientRect.height / 2);
    
    //console.log(x + ',' + y);
    
    var norm = Math.sqrt(x*x + y*y);
    x = x / norm;
    y = y / norm;    
    
    var closest = 100;
    var closestControl = null;
    
    _this.controls.forEach(function(control, index) {
      console.log('pc circle: ' + control.circle.getAttribute('cx') + ',' + control.circle.getAttribute('cy'));
      console.log('mouse: ' + x + ',' + y);

      var cx = control.circle.getAttribute('cx');
      var cy = control.circle.getAttribute('cy');
      
      var pcx = cx;
      var pcy = cy;
      var pcNorm = Math.sqrt(cx * cx + cy * cy);
      pcx = pcx / pcNorm;
      pcy = pcy / pcNorm;
      
      console.log('pcx - x: (', pcx + ') - (' + x + ') = ' + (pcx - x));
      console.log('pcy - y: (', pcy + ') - (' + y + ') = ' + (pcy - y));
      
      var distance = Math.sqrt(Math.pow(pcx - x, 2) + Math.pow(pcy - y, 2));
      console.log('distance: ' + distance);

      if (distance < closest) {
        closest = distance;
        closestControl = control;
      }
    }.bind(this));
    
    closestControl.pointToPitch(mx, my);
  };
  
  /**
  Initialize Audio Contexts
  */
  this.initialize = function(id) {
    
    if (!this.initialized) {
      this.audioCtx = new window.AudioContext();
      this.gain = this.audioCtx.createGain();
      this.gain.gain.value = 0;
      this.gain.connect(this.audioCtx.destination);

      this.element = document.getElementById(id);
      this.element.setAttribute('viewBox', '-1 -1 2 2');
      this.element.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      //this.element.setAttribute('text-rendering', 'geometricPrecision');
      this.spinner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      this.spinner.setAttribute('cx', '0');
      this.spinner.setAttribute('cy', '0');
      this.spinner.setAttribute('r', this._SPINNER_RADIUS);
      this.spinner.setAttribute('stroke', 'rgb(236,200,166)');
      this.spinner.setAttribute('stroke-width', '0.01');
      this.spinner.setAttribute('fill', '#EEEEEE');

      //this.spinner.addEventListener('mousedown', this.mousemove);
      //this.spinner.addEventListener('touchstart', this.mousemove);
      this.element.addEventListener('mousedown', this.mousemove);
      this.element.addEventListener('touchstart', this.mousemove);
      
      this.element.appendChild(this.spinner);
      console.log('initialized');
      console.log(this.element);
      console.log(this.spinner);
      
      var rect = this.element.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      
      this.renderTemperamentGuides();
    }
    
    this.initialized = true;
  };
  

  Object.defineProperty(this, 'spinnerRadius', {
    get: function() {
      return _this.spinner.getAttribute('r');
    },
    set: function(val) {
      _this._SPINNER_RADIUS = val;
      _this.spinner.setAttribute('r', val);
    }
  });
  
  this.play = function() {
    //var now = this.audioCtx.currentTime;
    //this.gain.gain.cancelScheduledValues(now);
    
    //var multiplier = 0.3;
    
    //this.gain.gain.setValueAtTime(this.gain.gain.value, now);
    //this.gain.gain.linearRampToValueAtTime(multiplier * 0.65, now + 0.04);
    //this.gain.gain.linearRampToValueAtTime(multiplier * 0.5, now + 0.09);
    //this.gain.gain.exponentialRampToValueAtTime(multiplier * 0.4, now + 0.2);
    //this.gain.gain.linearRampToValueAtTime(multiplier * 0.3, now + 0.6);
    //this.gain.gain.setTargetAtTime(0, now + 0.9, 0.7);
    this.gain.gain.value = 0.3;
    
    this.controls.forEach(function(control, index) {
      //control.play(index * 0.22);
      control.play(index * 0);
    }.bind(this));
    
    this.playing = true;
  };
  this.stop = function() {
    this.gain.gain.value = 0;
    this.playing = false;
  };
  
  this.toggle = function() {
//    this.playing = !this.playing;
//    if (this.playing) { 
//      this.play();
//    } else {
//      this.stop();
//    }
    this.play();
  };
  
  this.addControl = function(hz) {
    var control = new Control(this, hz);
    this.controls.push(control);
    //control.gain.connect(this.gain);
    control.connect(this.gain);
        
    this.element.appendChild(control.element);
  };
};


// Todo: Render perfect fifth guides
PitchClock.prototype.renderTemperamentGuides = function() {
  this.temperamentGuides = [];
  
  for (var i = 0; i < this.temperaments.length; i++) {
    var tempGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    var temp = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    temp.setAttribute('x1', '0');
    temp.setAttribute('y1', '0');
    var tempX = (Math.cos(i / this.temperaments.length * 2 * Math.PI));
    var tempY = (Math.sin(i / this.temperaments.length * 2 * Math.PI));
    
    //temp.setAttribute('x2', .618 * tempX);
    //temp.setAttribute('y2', .618 * tempY);
    var freqRatio = Math.pow(2, 1/(this.temperaments.length));
    temp.setAttribute('x2', Math.pow(freqRatio, i) * 0.5 * tempX);
    temp.setAttribute('y2', Math.pow(freqRatio, i) * 0.5 * tempY);
    //temp.setAttribute('stroke', '#AAAADF');
    if (this.temperaments[i].priority > 1) {
      temp.setAttribute('stroke', 'rgb(200,200,200)');
    }
    else {
      temp.setAttribute('stroke', 'rgb(120,173,165)');
    }
    temp.setAttribute('stroke-width', '0.005');
    
    var lowerLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lowerLine.setAttribute('x1', '0');
    lowerLine.setAttribute('y1', '0');
    var lowerLineX = (Math.cos(i / this.temperaments.length * 2 * Math.PI));
    var lowerLineY = (Math.sin(i / this.temperaments.length * 2 * Math.PI));
    
    lowerLine.setAttribute('x2', .33 * lowerLineX);
    lowerLine.setAttribute('y2', .33 * lowerLineY);
    lowerLine.setAttribute('stroke', 'rgb(53,113,141)');
    lowerLine.setAttribute('stroke-width', '0.005');
    
    var annotation = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    //annotation.setAttribute('x', (1.13 * (tempX)));
    //annotation.setAttribute('y', (1.13 * (tempY + 0.03)));
    annotation.setAttribute('text-rendering', 'geometricPrecision');
    
    var translationString = ' translate(' + 100 * (1.13 * tempX) + ',' + 100 * (1.13 * tempY) + ')';
        
    annotation.setAttribute('transform', 'scale(0.01)' + translationString);
    annotation.setAttribute('x', '0');
    annotation.setAttribute('y', '0');
    annotation.setAttribute('fill', 'rgb(188,190,168)');
    annotation.setAttribute('text-anchor', 'middle');
    annotation.setAttribute('alignment-baseline', 'central');
    annotation.setAttribute('font-size', '12');
    annotation.innerHTML = this.temperaments[i].name;

    tempGroup.appendChild(temp);
    tempGroup.appendChild(lowerLine);
    tempGroup.appendChild(annotation);
    this.element.appendChild(tempGroup);
  }
};


module.exports = {
  PitchClock: PitchClock
};

