var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var PitchClock = require('./pitchclock').PitchClock;

var pitchClock = null;

window.onload = function() {
  
}

window.$ = $;
window.Backbone = Backbone;
window.Marionette = Marionette;

window.PitchClock = PitchClock;
window.pitchClock = pitchClock;
window.scales = require('./constellations').scales;
window.chords = require('./constellations').chords;
window.libraries = require('./constellations').libraries;