var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var PitchClock = require('./pitchclock').PitchClock;

var pitchClock = new PitchClock();
pitchClock.initialize('spinner');
pitchClock.addControl(2*261.63);
pitchClock.addControl(2*329.63);
pitchClock.addControl(2*391.5); // 392 is equal temperament, but this is perfect fifth


window.$ = $;
window.Backbone = Backbone;
window.Marionette = Marionette;

window.PitchClock = PitchClock;
window.pitchClock = pitchClock;
window.scales = require('./constellations').scales;
window.chords = require('./constellations').chords;
