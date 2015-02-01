var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

window.onload = function() {
  
}

window.$ = $;
window.Backbone = Backbone;
window.Marionette = Marionette;
window.scales = require('./constellations').scales;
window.chords = require('./constellations').chords;
window.libraries = require('./constellations').libraries;