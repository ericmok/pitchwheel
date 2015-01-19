function Constellation(name, semitones, longName) {
}

function ConstellationStore() {
  this.constellations = [];
}

ConstellationStore.prototype.add = function(name, semitones, longName) {
  this.constellations.push({name: name, semitones: semitones, longName: longName});
};

var scales = new ConstellationStore();
scales.add('Major Scale', [0, 2, 4, 5, 7, 9, 11]);



              
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


new Constellation('Major Scale', [0, 2, 4, 5, 7, 9, 11], 'Major Scale');
new Constellation('Minor Scale', [0, 2, 3, 5, 7, 8, 10], 'Minor Scale');

new Constellation('Ionian Mode', [0, 2, 4, 5, 7, 9, 11], 'Ionian Mode');
new Constellation('Dorian Mode', [0, 2, 3, 5, 7, 9, 10], 'Dorian Mode');
new Constellation('Phrygian Mode', [0, 1, 3, 5, 7, 8, 10], 'Phrygian Mode');
new Constellation('Lydian Mode', [0, 2, 4, 6, 7, 9, 11], 'Lydian Mode');
new Constellation('Mixolydian Mode', [0, 2, 4, 5, 7, 9, 10], 'Mixolydian Mode');
new Constellation('Aeolian Mode', [0, 2, 3, 5, 7, 8, 10], 'Aeolian Mode');
new Constellation('Locrian Mode', [0, 1, 3, 5, 6, 8, 10], 'Locrian Mode');

new Constellation('Whole Tone Scale', [0, 2, 4, 6, 8, 10], 'Whole Tone Scale');
new Constellation('Pentatonic Scale', [0, 2, 4, 7, 9], 'Pentatonic Scale');
new Constellation('6 Note Blues Scale', [0, 3, 5, 6, 7, 10], '6 Note Blues Scale');
new Constellation('Octotonic', [0, 2, 4, 5, 6, 8, 9, 11], '6 Note Blues Scale');

// Triads
new Constellation('Augmented Triad', [0, 4, 8]);
new Constellation('Major Triad', [0, 4, 7]);
new Constellation('Minor Triad', [0, 3, 7]);
new Constellation('Diminished Triad', [0, 3, 6]);

// Seventh
new Constellation('Diminished', [0, 3, 6, 9]);
new Constellation('Half Diminished', [0, 3, 6, 10]);
new Constellation('Minor', [0, 3, 7, 10]);
new Constellation('Minor Major', [0, 3, 7, 11]);
new Constellation('Major', [0, 4, 7, 11]);
new Constellation('Dominant', [0, 4, 7, 10]);
new Constellation('Augmented', [0, 4, 8, 10]);
new Constellation('Augmented Minor', [0, 4, 8, 11]);