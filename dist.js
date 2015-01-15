(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
*/
//
//console.log('file index.js');
//
//var _ = require('lodash');
//var $ = require('jquery');
//var Backbone = require('backbone');
//Backbone.$ = $;
//var Marionette = require('backbone.marionette');
//
//var App = Marionette.Application.extend({
//  el: 'body',
//  initialize: function(options) {
//    console.log('Initialize');
//  }
//});
//
//
//var app = new App();
//
//app.on('start', function() {
//  Backbone.history.start({pushState: true});
//  
//  document.querySelector('.listening').style.display = 'none';
//  document.querySelector('.received').style.display = 'flex';
//
//});
//
//app.start();
//
//var audioCtx = null;
//var osc = null;
//var gain = null;
//var started = false;
//var initial = true;
//
//
//window.PitchClock = {
//  audioCtx: null,
//  osc: null,
//  gain: null,
//  started: false,
//  initial: true,
//  
//  /**
//  Initialize Audio Contexts
//  */
//  initialize: function() {
//    
//    if (this.initial) {
//      this.audioCtx = new window.AudioContext();
//      this.osc = this.audioCtx.createOscillator();
//      this.gain = this.audioCtx.createGain();
//      this.osc.frequency.value = 220;
//      this.gain.gain.value = 1;
//      this.osc.connect(this.gain);
//      this.gain.connect(this.audioCtx.destination);
//      this.osc.start();
//    }
//
//    this.started = !this.started;
//    if (!this.started) {
//      this.gain.gain.value = 0;
//    }
//    else {    
//      this.gain.gain.value = 0.25;
//    }
//
//    this.initial = false;
//  },
//  
//  input: function(x, y) {
//    
//  }
//};
//
//function doThis() {
//    
//  if (initial) {
//    audioCtx = new window.AudioContext();
//    osc = audioCtx.createOscillator();
//    gain = audioCtx.createGain();
//    osc.frequency.value = 220;
//    gain.gain.value = 1;
//    osc.connect(gain);
//    gain.connect(audioCtx.destination);
//    osc.start();
//  }
//
//  started = !started;
//  if (!started) {
//    gain.gain.value = 0;
//  }
//  else {    
//    gain.gain.value = 0.25;
//  }
//  
//  initial = false;
//}
//
//var pitchDisplay = document.getElementById('pitchDisplay');
//var pitchLine = document.getElementById('pitchLine');
//var pitchControl = document.getElementById('pitchControl');
//
//var logNormalizer = Math.log(440) - Math.log(220);
//
//var TEMPERAMENT = 12;
//
//function changePitch(ev) {
//  
//  console.log('change pitch');
//  
//  if (osc) {
//    
//    var prevFreq = osc.frequency.value;
//    osc.frequency.value *= Math.pow(2, 1.0/TEMPERAMENT);
//    pitchDisplay.innerHTML = osc.frequency.value;
//
//    // Linear scale, each linear unit as the logNormalizer
//    var val = ((Math.log(osc.frequency.value) - Math.log(220)) / logNormalizer);
//    
//    // Normalize to single octave
//    var angle = (val % 2) * 2 * Math.PI;
//        
//    // 12 logNormalizer steps = 1 octave
//    var magnitude = Math.floor(val % 12) + 1;
//    
//    changeSpinner(angle, magnitude);
//  }
//}
//
//
//function changeSpinner(angle, magnitude) {
//  //val = 10 * Math.cos(angle);
//  //valy = 10 * Math.sin(angle);
//  var val = 10 * Math.cos(angle);
//  var valy = 10 * Math.sin(angle);
//  
//  pitchLine.setAttribute('x2', (magnitude * val + 50) + '%');
//  pitchLine.setAttribute('y2', (magnitude * valy + 50) + '%');  
//  
//  pitchControl.setAttribute('cx', (magnitude * val + 50) + '%');
//  pitchControl.setAttribute('cy', (magnitude * valy + 50) + '%');
//}
//
//function pointToPitch(x, y) {
//  var norm = Math.sqrt(x * x + y * y);
//    
//  // norm might be zero!
//  x = x/norm;
//  y = y/norm;
//  
//  var angle = Math.acos(x);
//  
//  if (y <= 0) {
//    angle = 2 * Math.PI -angle;
//  }
//  
//  var temp = angle / (2 * Math.PI);
//  
//  //console.log('Scale: ' + temp);
//  //temp = Math.exp(220, temp * logNormalizer);
//
//  // At 100% = 12 steps = 1 whole octave
//  
//  var linearTemperamentStep = 1.0 / TEMPERAMENT;
//  var numberSteps = temp / linearTemperamentStep;
//  
//  var value = Math.pow(Math.pow(2, 1.0/TEMPERAMENT), numberSteps) * 220;
//  
//  console.log('val: ' + value);
//  console.log('norm: ' + norm);
//  value = value * Math.pow(2, Math.ceil((norm / (800/10))) - 1);
//  
//  osc.frequency.value = value;
//  
//    // Linear scale, each linear unit as the logNormalizer
//    var val = ((Math.log(osc.frequency.value) - Math.log(220)) / logNormalizer);
//    
//    // Normalize to single octave [0, 1) => [0,pi)
//    var angle = (val % 2) * 2 * Math.PI;
//        
//    // 12 logNormalizer steps = 1 octave
//    //var magnitude = Math.floor(val % 12) + 1;
//    var magnitude = Math.ceil(val % 12);
//    
//    changeSpinner(angle, magnitude);
//    pitchDisplay.innerHTML = '<h2>' + osc.frequency.value.toFixed(3) + 'Hz' + '</h2>';
//
//  //osc.frequency.value = temp;
//  //changeSpinner(temp, norm);
//}
//
//window.changeSpinner = changeSpinner;
//
////changeSpinner(0);
//
//changePitch();
//
//
//var spinner = document.getElementById('spinner');
////spinner.addEventListener('mousedown', changePitch);
////spinner.addEventListener('touchstart', changePitch);
//
//function control(ev) {
//  
//  // Make sure mouse is down
//  if (ev.which !== 1) { return; }
//  
//  var boundingClientRect = ev.currentTarget.getBoundingClientRect();
//  
//  pitchControl.setAttribute('cx', ev.clientX - boundingClientRect.left);
//  pitchControl.setAttribute('cy', ev.clientY - boundingClientRect.top);
//  
//  console.log((ev.clientX - boundingClientRect.left) + ',' + (ev.clientY - boundingClientRect.top));
//  
//  pointToPitch(ev.clientX - boundingClientRect.left - 400, ev.clientY - boundingClientRect.top - 400);  
//}
//
//spinner.addEventListener('mousedown', function(ev) {
//  control(ev);
//});
//
//spinner.addEventListener('touchstart', function(ev) {
//  control(ev);
//});
//
//spinner.addEventListener('mousemove', function(ev) {
//  control(ev);
//});
//
//
//console.log('test');
//
//window.app = app;
//window.$ = $;
//window.Backbone = Backbone;
//window.Marionette = Marionette;
//
//window.doThis = doThis;

var PitchClock = require('./pitchclock').PitchClock;

window.pc = new PitchClock();
pc.initialize('spinner');
//pc.addControl(220*(3/2)); // E4
//pc.addControl(277.18); // C#
//pc.addControl(220*(1)); // A3
pc.addControl(2*261.63);
pc.addControl(329.63);
pc.addControl(2*391.5); // 392 is equal temperament, but this is perfect fifth

console.log('index');
},{"./pitchclock":2}],2:[function(require,module,exports){
LOG_NORMALIZER = Math.log(2) - Math.log(1);
//TEMPERAMENT = 12;
//INVERSE_TEMPERAMENT = 1.0 / TEMPERAMENT;
//FREQUENCY_RATIO_FOR_TEMPERAMENT = Math.pow(2, 1.0/TEMPERAMENT);
//BASE_PITCH = 220;


function Control(ctx, pitchClass, options) {
  options = options || {};
  
  this.ctx = ctx;
  this.pitchClass = pitchClass;
  this.color = options.color || '#EA3131';
  
  this.NUMBER_OCTAVES = options.NUMBER_OCTAVES || 3;
  
  this.started = false;
  this.oscillator = ctx.audioCtx.createOscillator();
  this.sympatheticUp = ctx.audioCtx.createOscillator();
  this.sympatheticDown = ctx.audioCtx.createOscillator();
  this.sonority = ctx.audioCtx.createOscillator();
  
  this.SYMPATHETIC_GAIN_MULTIPLIER = 0.1;
  this.sympatheticUpGain = ctx.audioCtx.createGain();
  this.sympatheticDownGain = ctx.audioCtx.createGain();
  this.gain = ctx.audioCtx.createGain();
  
  this.sympatheticUp.connect(this.sympatheticUpGain);
  this.sympatheticDown.connect(this.sympatheticDownGain);
  this.sympatheticUpGain.gain.value = this.SYMPATHETIC_GAIN_MULTIPLIER;
  this.sympatheticDownGain.gain.value = this.SYMPATHETIC_GAIN_MULTIPLIER;
  this.gain.gain.value = 1;
  
  this.oscillator.frequency.value = pitchClass || this.ctx.basePitch;
  this.oscillator.connect(this.gain);
  this.oscillator.start();
  
  this.sonority.connect(this.gain);
  this.sonority.start();
  
  this.sympatheticUp.start();
  this.sympatheticUpGain.connect(this.gain);
  
  this.sympatheticDown.start();
  this.sympatheticDownGain.connect(this.gain);
  
  this.element = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  this.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  this.line.setAttribute('stroke', this.color);
  this.line.setAttribute('stroke-width', '0.02');
  
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
  this.guides[0].line.setAttribute('x1', '0');
  this.guides[0].line.setAttribute('y1', '0');
  this.guides[0].line.setAttribute('stroke', '#FF8888');
  this.guides[0].line.setAttribute('stroke-width', '0.006');
  
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
  console.log('point to: (' + x.toFixed(2) + ',' + y.toFixed(2) + ')');
  
  var norm = Math.sqrt(x * x + y * y);
  
  x = x / norm;
  y = y / norm;
  
  var angle = Math.acos(x);
  
  if (y <= 0) {
    angle = 2 * Math.PI - angle;
  }
  
  // From (0, 2 * PI) to (0, 1)
  var temperament01 = angle / (2 * Math.PI);
  
  // Subdivisions
  temperament01 = Math.round(temperament01 * this.ctx.temperament * 8) / (this.ctx.temperament * 8);
  
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
  norm = Math.min(norm, 0.99);
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
  this.sonority.frequency.value = (hz / 2) + 2;
  this.sympatheticUp.frequency.value = (hz * this.ctx.frequencyRatioForTemperament);
  this.sympatheticDown.frequency.value = (hz * (1 / this.ctx.frequencyRatioForTemperament));
  
  // This gain function is arbitrary
  // Ideally the gain is 0.5 at 2 * 880 and 1.0 at 220
  //var gainScale = 1.75 - (3 * Math.log(hz) / Math.log(Math.pow(BASE_PITCH, this.NUMBER_OCTAVES + 1)));
  var highestFreq = this.ctx.basePitch * Math.pow(2, this.NUMBER_OCTAVES);
  var gainScale = 2.40 - 2 * (1 * Math.log(hz) / Math.log(highestFreq));
  
  this.gain.gain.value = gainScale;
  
  this.sympatheticUpGain.gain.value = gainScale * this.SYMPATHETIC_GAIN_MULTIPLIER;
  this.sympatheticDownGain.gain.value = gainScale * this.SYMPATHETIC_GAIN_MULTIPLIER;
  
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
  //var spinnerRadius = 1.0;
  //spinnerRadius = spinnerRadius.substr(0, spinnerRadius.length - 1);
  
  // 25% length at 1 magnitude
  // But 25% length is half of 100% of the width of svg
  var mx = (1.0 / this.NUMBER_OCTAVES) * magnitude * spinnerRadius;
  var my = (1.0 / this.NUMBER_OCTAVES) * magnitude * spinnerRadius;

  var normalizedX = x;
  var normalizedY = y;
  
  x *= mx;
  y *= my;
  
  //console.log('draw fx: ' + (x + 50));
  //console.log('draw fy: ' + (y + 50));
  
  this.line.setAttribute('x2', (x));
  this.line.setAttribute('y2', (y));
  this.circle.setAttribute('cx', (x));
  this.circle.setAttribute('cy', (y));
  
  var tx = 0.18 * normalizedX + x;
  var ty = 0.18 * normalizedY + y;
  if (ty > 0) {
    ty += 0.1;
  }
    
  //this.text.setAttribute('x', (x + ((x > 0) ? 53 : 42)) + '%');
  //this.text.setAttribute('y', (y + ((x > 0) ? 53 : 57)) + '%');
  this.text.setAttribute('x', tx);
  this.text.setAttribute('y', ty);
  
  var transformString = ' translate(' + 100*(tx) + ',' + 100*(ty) + ')';
  this.text.setAttribute('transform', 'scale(0.009)' + transformString);
                         
  this.text.innerHTML = text.toFixed(2) + 'Hz'; // (' + this.gain.gain.value.toFixed(2) + ')';

  var guideVal = (((Math.log(this.guides[0].ratio*this.oscillator.frequency.value) - Math.log(this.ctx.basePitch)) / LOG_NORMALIZER) % 2) * 2 * Math.PI;
  
  var gx = Math.cos(guideVal);
  var gy = Math.sin(guideVal);

  this.guides[0].line.setAttribute('x2', (mx*gx));
  this.guides[0].line.setAttribute('y2', (my*gy));
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
  this._SPINNER_RADIUS = 1;
  
  this.temperamentNames = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  
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
      
      //var pcx = (cx.substr(0, cx.length - 1) - 50) / 100;
      //var pcy = (cy.substr(0, cy.length - 1) - 50) / 100;
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
    var now = this.audioCtx.currentTime;
    this.gain.gain.cancelScheduledValues(now);
    
    var multiplier = 0.3;
    
    this.gain.gain.setValueAtTime(this.gain.gain.value, now);
    this.gain.gain.linearRampToValueAtTime(multiplier * 0.65, now + 0.05);
    this.gain.gain.linearRampToValueAtTime(multiplier * 0.5, now + 0.1);
    this.gain.gain.exponentialRampToValueAtTime(multiplier * 0.4, now + 0.2);
    this.gain.gain.linearRampToValueAtTime(multiplier * 0.3, now + 0.6);
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
    temp.setAttribute('x1', '0');
    temp.setAttribute('y1', '0');
    var tempX = (Math.cos(i / this.temperament * 2 * Math.PI));
    var tempY = (Math.sin(i / this.temperament * 2 * Math.PI));
    
    temp.setAttribute('x2', .618 * tempX);
    temp.setAttribute('y2', .618 * tempY);
    //temp.setAttribute('stroke', '#AAAADF');
    temp.setAttribute('stroke', 'rgb(120,173,165)');
    temp.setAttribute('stroke-width', '0.005');
    
    var lowerLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lowerLine.setAttribute('x1', '0');
    lowerLine.setAttribute('y1', '0');
    var lowerLineX = (Math.cos(i / this.temperament * 2 * Math.PI));
    var lowerLineY = (Math.sin(i / this.temperament * 2 * Math.PI));
    
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
    annotation.innerHTML = this.temperamentNames[i];

    tempGroup.appendChild(temp);
    tempGroup.appendChild(lowerLine);
    tempGroup.appendChild(annotation);
    this.element.appendChild(tempGroup);
  }
};


module.exports = {
  PitchClock: PitchClock
};


},{}]},{},[1]);
