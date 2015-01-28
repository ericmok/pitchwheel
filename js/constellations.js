var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

var Chord = Backbone.Model.extend({
  defaults: {
    name: '-',
    semitones: [0],
    longName: '-',
    temperament: 12
  },
  initialize: function(name, semitones, longName, temperament) {
    this.name = name;
    this.semitones = semitones;
    this.longName = name || longName;
    this.temperament = temperament || 12;
  }
});


var Constellations = Backbone.Collection.extend({
  model: Chord,
  url: '/'
});

Constellations = new Constellations();

//function Constellation(name, semitones, longName) {
//}
//

function Library(name) {
  this.name = name;
  this.constellations = [];
}

Library.prototype.add = function(name, semitones, longName, temperament) {
  this.constellations.push({name: name, 
                            semitones: semitones, 
                            longName: longName || name, 
                            temperament: temperament || 12});
  
//  var chord = new Chord({
//    name: name, 
//    semitones: semitones, 
//    longName: longName || name, 
//    temperament: temperament || 12
//  })
  
//  console.log(Constellations);
  Constellations.add({
    name: name,
    semitones: semitones,
    longName: longName || name,
    temperament: temperament || 12
  });
  
//  this.constellations.push(new Chord({
//    name: name, 
//    semitones: semitones, 
//    longName: longName || name, 
//    temperament: temperament || 12
//  }));
};

var libraries = [];

var scales = new Library('Scales');
//scales.add('Major Scale', [0, 2, 4, 5, 7, 9, 11]);

scales.add('Major Scale', [0, 2, 4, 5, 7, 9, 11], 'Major Scale');
scales.add('Minor Scale', [0, 2, 3, 5, 7, 8, 10], 'Minor Scale');

scales.add('Ionian Mode', [0, 2, 4, 5, 7, 9, 11], 'Ionian Mode');
scales.add('Dorian Mode', [0, 2, 3, 5, 7, 9, 10], 'Dorian Mode');
scales.add('Phrygian Mode', [0, 1, 3, 5, 7, 8, 10], 'Phrygian Mode');
scales.add('Lydian Mode', [0, 2, 4, 6, 7, 9, 11], 'Lydian Mode');
scales.add('Mixolydian Mode', [0, 2, 4, 5, 7, 9, 10], 'Mixolydian Mode');
scales.add('Aeolian Mode', [0, 2, 3, 5, 7, 8, 10], 'Aeolian Mode');
scales.add('Locrian Mode', [0, 1, 3, 5, 6, 8, 10], 'Locrian Mode');

scales.add('Whole Tone Scale', [0, 2, 4, 6, 8, 10], 'Whole Tone Scale');
scales.add('Pentatonic Scale', [0, 2, 4, 7, 9], 'Pentatonic Scale');
scales.add('6 Note Blues Scale', [0, 3, 5, 6, 7, 10], '6 Note Blues Scale');
scales.add('Octotonic', [0, 2, 4, 5, 6, 8, 9, 11], '6 Note Blues Scale');

var chords = new Library('Chords');
              
//var chords = [];
//chords.push(new Chord('C', [0,4,7], 'C Major'));
//chords.push(new Chord('Csus', [0, 5,7], 'C Suspeneded'));
//C, 
//Csus, [0, 5, 7] 
//Csus2, [0, 2, 7]
//C6, [0, 4, 7, 9] (optional 5th)
//C6/9, [0, 4, 9, 14]
//Cm
//Cm6, [0, 3, 9] //optional 5th
//Cdim, [0, 3, 6], C Diminished
//C+, [0, 4, 8], C Augmented
//CM7, [0, 4, 7, 11] (optional 5th)
//C7, [0, 4, 7, 10], C Dominant 7th, (optional 5th)
//C7b5, [0, 4, 6, 10], C Seven Flat Five
//C7#5,  [0, 4, 8, 10], C Seven Sharp Five
//Cm7, [0, 3, 7, 10], C Minor 7th (optional 5th)
//Cm7b5, Cm7#5, 
//CM9, [0, 4, 7, 11, 14], C Major 9th, (optional 5th)
//Cadd9, [0, 4, 7, 14]
//C9, [0, 4, 10, 14]
//C7b9, [0, 4, 10, 13], C 7 Flat Nine
//C7#9, [0, 4, 10, 15], C 7 Sharp Nine
//C13th, [0, 10, 16, 21], C 13th Chord
//Cm9, [0, 3, 10, 14], C Minor 9th
//Cm7b9, [0, 3, 10, 13], C Minor 7th Flat Nine
//Cdim7, [0, 3, 6, 9], C Diminished 7th, Optional Flat 5th

//Csus4, [0, 5, 7]
//Cdim7, [0, 3, 6, 9]
//C7sus4, [0, 5, 6, 10]
//C9sus4, [2, 5, 7, 10]
//Cadd9 sus4, [0, 2, 5 ,7]
// http://en.wikipedia.org/wiki/Ninth_chord

// Triads
chords.add('maj', [0, 4, 7], 'Major');
chords.add('m', [0, 3, 7], 'Minor');
chords.add('+', [0, 4, 8], 'Augmented');
chords.add('dim', [0, 3, 6], 'Diminished');

chords.add('Sus', [0, 5, 7]);
chords.add('Sus2', [0, 2, 7]);
chords.add('6', [0, 4, 7, 9], 'Optional 5th');
chords.add('6/9', [0, 4, 9, 14]);
chords.add('m6', [0, 3, 9]); //optional 5th

chords.add('M7', [0, 4, 7, 11], 'Major 7th (optional 5th)');
chords.add('M7#5', [0, 4, 8, 11], 'Augmented major 7th');

chords.add('dim7', [0, 3, 6, 9], 'Diminished 7th, Optional Flat 5th');

chords.add('7', [0, 4, 7, 10], 'Dominant 7th, (optional 5th)');
chords.add('7b5', [0, 4, 6, 10], '7th Flat Five');
chords.add('7#5',  [0, 4, 8, 10], '7th Sharp Five / Augmented  7th');
chords.add('7b9', [0, 4, 10, 13], '7 Flat Nine');
chords.add('7#9', [0, 4, 10, 15], '7 Sharp Nine');

chords.add('m7', [0, 3, 7, 10], 'Minor 7th (optional 5th)');
chords.add('mM7', [0, 3, 7, 11], 'Minor Major 7th');
chords.add('m7b5', [0, 3, 6, 10], 'Half Diminished 7th / Minor 7 Flat Five');
chords.add('m7#5', [0, 3, 8, 10], 'Minor 7th Sharp Five');
chords.add('m7b9', [0, 3, 10, 13], 'Minor 7th Flat Nine');

chords.add('9', [0, 4, 10, 14]);
chords.add('m9', [0, 3, 10, 14], 'Minor 9th');
chords.add('M9', [0, 4, 7, 11, 14], 'Major 9th, (optional 5th)');

chords.add('add9', [0, 4, 7, 14]);

chords.add('13th', [0, 10, 16, 21], '13th Chord');

// Seventh
//chords.add('dim7', [0, 3, 6, 9]); // Redundant
//chords.add('m7b5', [0, 3, 6, 10], 'Half Diminished 7th / Minor 7 Flat Five'); // Redundant
//chords.add('Minor', [0, 3, 7, 10]);  // Redundant
//chords.add('ø Minor 7 Major', [0, 3, 7, 11]);
//chords.add('M7', [0, 4, 7, 11], 'Major 7th'); // Redundant
//chords.add('Dominant', [0, 4, 7, 10]); // Redundant
//chords.add('Augmented', [0, 4, 8, 10]); // Redundant
//chords.add('7 Augmented Minor', [0, 4, 8, 11], 'Augmented major 7th');

libraries.push(chords, scales);

module.exports = {
  scales: scales,
  chords: chords,
  libraries: libraries,
  Constellations: Constellations
  //constellations: constellations,
  //Chord: Chord
};