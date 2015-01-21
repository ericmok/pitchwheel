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

window.PitchClock = PitchClock;
//window.constellations = require('./constellations').constellations;
//window.Chord = require('./constellations').Chord;
window.scales = require('./constellations').scales;
window.chords = require('./constellations').chords;
