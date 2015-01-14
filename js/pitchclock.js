LOG_NORMALIZER = Math.log(2) - Math.log(1);
//TEMPERAMENT = 12;
//INVERSE_TEMPERAMENT = 1.0 / TEMPERAMENT;
//FREQUENCY_RATIO_FOR_TEMPERAMENT = Math.pow(2, 1.0/TEMPERAMENT);
//BASE_PITCH = 220;


function Control(ctx, pitchClass, options) {
  options = options || {};
  
  this.ctx = ctx;
  this.pitchClass = pitchClass;
  
  this.NUMBER_OCTAVES = options.NUMBER_OCTAVES || 3;
  
  this.started = false;
  this.oscillator = ctx.audioCtx.createOscillator();
  this.gain = ctx.audioCtx.createGain();
  
  this.gain.gain.value = 1;
  
  this.oscillator.frequency.value = pitchClass || this.ctx.basePitch;
  this.oscillator.connect(this.gain);
  this.oscillator.start();
  
  this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  this.line.setAttribute('stroke', '#DD2222');
  this.line.setAttribute('stroke-width', '4');
  
  this.line.setAttribute('x1', '50%');
  this.line.setAttribute('y1', '50%');
  
  this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  this.circle.setAttribute('stroke-width', '0');
  this.circle.setAttribute('cx', '50%');
  this.circle.setAttribute('cy', '50%');
  this.circle.setAttribute('r', '2.5%');
  this.circle.setAttribute('fill', '#FF3333');
  
  this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  this.text.setAttribute('stroke', '#888888');
  //this.text.setAttribute('font-size', '2%');
  this.text.innerHTML = pitchClass + 'Hz';
  
  
  this.guides = [];
  this.guides.push({
    line: document.createElementNS('http://www.w3.org/2000/svg', 'line'),
    ratio: (3/2)
  });
  this.guides[0].line.setAttribute('x1', '50%');
  this.guides[0].line.setAttribute('y1', '50%');
  this.guides[0].line.setAttribute('stroke', '#2222FF');
  this.guides[0].line.setAttribute('stroke-width', '1');
  
  this.line.setAttribute('x1', '50%');
  this.line.setAttribute('y1', '50%');
  
  this.element.appendChild(this.line);
  this.element.appendChild(this.circle);
  this.element.appendChild(this.guides[0].line);
  this.element.appendChild(this.text);
  
  this.setNote(pitchClass);
};

/**
Take coordinate in the wheel and set the frequency from it.
*/
Control.prototype.pointToPitch = function(x, y) {
  var norm = Math.sqrt(x * x + y * y);
  
  x = x / norm;
  y = y / norm;
  
  var angle = Math.acos(x);
  
  if (y <= 0) {
    angle = 2 * Math.PI - angle;
  }
  
  // From (0, 2 * PI) to (0, 1)
  var temperament01 = angle / (2 * Math.PI);
  
  // 100% = 12 steps = 1 whole octave
  
  // If there are 12 keys, then 0.4 tells you what key
  // Also equivalent to dividing temperament01 by the 
  // fraction per key
  var keyInTemperament = temperament01 * this.ctx.temperament;
  
  var frequency = Math.pow(this.ctx.frequencyRatioForTemperament, keyInTemperament) * this.ctx.basePitch;
  
  // Assume that the max normal is 1.0 and represents the highest octave
  // Norm is (0,1] -> 4 octaves
  // We round to the nearest octave (0,4]
  
  //var discretizedOctave = Math.ceil((norm / (1.0/4)));
  var discretizedOctave = Math.floor((norm * this.NUMBER_OCTAVES));
  // TODO: debug
  //discretizedOctave = norm;
  //console.log('norm: ' + norm);
  //console.log('octave: ' + discretizedOctave);
  var octaveMultiplier = Math.pow(2, discretizedOctave);
  
  frequency = frequency * octaveMultiplier;

  this.setNote(frequency);
};

/**
Set the oscillator frequency and gain.
Calculate svg element angle and magnitude
*/
Control.prototype.setNote = function(hz) {
  
  console.log('setNote ' + hz);
     
  // Set audio
  this.oscillator.frequency.value = hz;
  
  // This gain function is arbitrary
  // Ideally the gain is 0.5 at 2 * 880 and 1.0 at 220
  //var gainScale = 1.75 - (3 * Math.log(hz) / Math.log(Math.pow(BASE_PITCH, this.NUMBER_OCTAVES + 1)));
  var highestFreq = this.ctx.basePitch * Math.pow(2, this.NUMBER_OCTAVES);
  var gainScale = 2.40 - 2 * (1 * Math.log(hz) / Math.log(highestFreq));
  
  this.gain.gain.value = gainScale;
  
  // Distance from hz to base pitch in log scale, but linearly normalized by log(2) - log(1)
  // Linear scale, each linear unit as the LOG_NORMALIZER
  // Each unit of LOG_NORMALIZER represents an octave on the log scale
  var val = ((Math.log(this.oscillator.frequency.value) - Math.log(this.ctx.basePitch)) / LOG_NORMALIZER);

  // Normalize to single octave (0,R) -> (0,2) -> (0,2*pi)
  var angle = (val % 2) * 2 * Math.PI;

  // 12 logNormalizer steps = 1 octave
  //console.log('val: ' + val);
  //var magnitude = Math.floor(val % TEMPERAMENT) + 1;
  //console.log('val % TEMPERAMENT: ' + magnitude);
  var magnitude = Math.ceil(val);

  this.display(angle, magnitude, hz);
};

/**
Controls the line and circle
*/
Control.prototype.display = function(angle, magnitude, text) {

  var x = Math.cos(angle);// * (this.ctx.width / 8);
  var y = Math.sin(angle);// * (this.ctx.width / 8);
  
  //console.log('draw x: ' + x);
  //console.log('draw y: ' + y);
  
  var spinnerRadius = this.ctx.spinnerRadius;
  spinnerRadius = spinnerRadius.substr(0, spinnerRadius.length - 1);
  
  // 25% length at 1 magnitude
  // But 25% length is half of 100% of the width of svg
  var mx = (1.0 / this.NUMBER_OCTAVES) * magnitude * spinnerRadius;
  var my = (1.0 / this.NUMBER_OCTAVES) * magnitude * spinnerRadius;

  x *= mx;
  y *= my;
  
  //console.log('draw fx: ' + (x + 50));
  //console.log('draw fy: ' + (y + 50));
  
  this.line.setAttribute('x2', (x + 50) + '%');
  this.line.setAttribute('y2', (y + 50) + '%');
  this.circle.setAttribute('cx', (x + 50) + '%');
  this.circle.setAttribute('cy', (y + 50) + '%');
  
  this.text.setAttribute('x', (x + ((x > 0) ? 53 : 42)) + '%');
  this.text.setAttribute('y', (y + ((x > 0) ? 53 : 57)) + '%');
  this.text.innerHTML = text.toFixed(2) + 'Hz'; // (' + this.gain.gain.value.toFixed(2) + ')';

  var guideVal = (((Math.log(this.guides[0].ratio*this.oscillator.frequency.value) - Math.log(this.ctx.basePitch)) / LOG_NORMALIZER) % 2) * 2 * Math.PI;
  
  var gx = Math.cos(guideVal);
  var gy = Math.sin(guideVal);

  this.guides[0].line.setAttribute('x2', (mx*gx + 50) + '%');
  this.guides[0].line.setAttribute('y2', (my*gy + 50) + '%');
};


function PitchClock(options) {
  var _this = this;
  
  options = options || {};
  this.temperament = options.temperament || 12;
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
  this._SPINNER_RADIUS = '45%';
  
  this.temperamentNames = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  
  this.mousemove = function(ev) {
    
    // Make sure mouse is down
    //if (ev.which !== 1) { return; }
    
    // TODO: use _this.width
    var boundingClientRect = ev.currentTarget.getBoundingClientRect();
    var x = ev.clientX - boundingClientRect.left - (boundingClientRect.width / 2);
    var y = ev.clientY - boundingClientRect.top - (boundingClientRect.height / 2);
    
    // Normalized (Radius = 1)
    x = x / (boundingClientRect.width / 2);
    y = y / (boundingClientRect.height / 2);
    
    //console.log(x + ',' + y);
    
    var closest = 100;
    var closestControl = null;
    
    _this.controls.forEach(function(control, index) {
      console.log('pc circle: ' + control.circle.getAttribute('cx') + ',' + control.circle.getAttribute('cy'));
      console.log('mouse: ' + x + ',' + y);

      var cx = control.circle.getAttribute('cx');
      var cy = control.circle.getAttribute('cy');
      
      var pcx = (cx.substr(0, cx.length - 1) - 50) / 100;
      var pcy = (cy.substr(0, cy.length - 1) - 50) / 100;

      console.log('pcx - x: (', pcx + ') - (' + x + ') = ' + (pcx - x));
      console.log('pcy - y: (', pcy + ') - (' + y + ') = ' + (pcy - y));

      var circleSize = control.circle.getAttribute('r');
      console.log('circleSize: ' + circleSize);
      if (circleSize.indexOf('%')) {
        circleSize = circleSize.substr(0, circleSize.length - 1);
      }
      circleSize = circleSize / 100;

      console.log('circleSize: ' + circleSize);

      var distance = Math.sqrt(Math.pow(pcx - x, 2) + Math.pow(pcy - y, 2));
      console.log('distance: ' + distance);

      if (distance < closest) {
        closest = distance;
        closestControl = control;
      }
      //if (distance < 0.3) {
        //control.pointToPitch(x, y);
      //}
    }.bind(this));
    
    closestControl.pointToPitch(x, y);
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
      this.spinner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      this.spinner.setAttribute('cx', '50%');
      this.spinner.setAttribute('cy', '50%');
      this.spinner.setAttribute('r', this._SPINNER_RADIUS);
      this.spinner.setAttribute('stroke', '#777799');
      this.spinner.setAttribute('stroke-width', '2');
      this.spinner.setAttribute('fill', '#EEEEEE');

      //this.spinner.addEventListener('mousedown', this.mousemove);
      //this.spinner.addEventListener('touchstart', this.mousemove);
      this.element.addEventListener('mousedown', this.mousemove);
      this.element.addEventListener('touchstart', this.mousemove);
      
      this.element.appendChild(this.spinner);
      console.log('initialized');
      console.log(this.element);
      console.log(this.spinner);
      
      var spinnerRect = this.spinner.getBoundingClientRect();
      this.width = spinnerRect.width;
      this.height = spinnerRect.height;
      
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
    var now = this.audioCtx.currentTime;
    this.gain.gain.cancelScheduledValues(now);
    this.gain.gain.setValueAtTime(this.gain.gain.value, now);
    this.gain.gain.linearRampToValueAtTime(0.65, now + 0.05);
    this.gain.gain.linearRampToValueAtTime(0.5, now + 0.1);
    this.gain.gain.exponentialRampToValueAtTime(0.4, now + 0.2);
    this.gain.gain.linearRampToValueAtTime(0.3, now + 0.6);
    this.gain.gain.setTargetAtTime(0, now + 0.9, 0.7);
    //this.gain.gain.value = 0.4;
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
    control.gain.connect(this.gain);
        
    this.element.appendChild(control.element);
  };
};


// Todo: Render perfect fifth guides
PitchClock.prototype.renderTemperamentGuides = function() {
  this.temperamentGuides = [];
  
  for (var i = 0; i < this.temperament; i++) {
    var tempGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    var temp = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    temp.setAttribute('x1', '50%');
    temp.setAttribute('y1', '50%');
    var tempX = (40*Math.cos(i / this.temperament * 2 * Math.PI) + 50);
    var tempY = (40*Math.sin(i / this.temperament * 2 * Math.PI) + 50);
    temp.setAttribute('x2', tempX + '%');
    temp.setAttribute('y2', tempY + '%');
    temp.setAttribute('stroke', '#AAAADF');
    
    var annotation = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    annotation.setAttribute('x', (1.3*(tempX-50) + 50) + '%');
    annotation.setAttribute('y', (1.3*(tempY-50) + 50) + '%');
    annotation.setAttribute('text-anchor', 'middle');
    annotation.setAttribute('alignment-baseline', 'middle');
    annotation.setAttribute('font-size', '16');
    annotation.innerHTML = this.temperamentNames[i];

    tempGroup.appendChild(temp);
    tempGroup.appendChild(annotation);
    this.element.appendChild(tempGroup);
  }
};


module.exports = {
  PitchClock: PitchClock
};

