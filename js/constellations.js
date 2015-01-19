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
//Csus, Csus2, 
//C6, C6/9, 
//Cm, Cm6, Cdim, 
//C+, CM7, CM9, 
//Cadd9, C7, C7b5, C7#5, 
//C9, C7b9, C7#9, 
//C13th, Cm7, Cm7b5, Cm7#5, Cm9, Cm7b9, Cdim7


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
new Constellation('Augmented', [0, 4, 8, 10]);
new Constellation('Dominant', [0, 4, 7, 10]);
new Constellation('Major', [0, 4, 7, 11]);
new Constellation('Augmented Minor', [0, 4, 8, 11]);