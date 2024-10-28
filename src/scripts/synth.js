// import '../styles/synth.sass'

// inlined into html
// const waveforms = ["sine", "triangle", "square", "sawtooth"];
//
// let currentWaveform = waveforms[0];
//
// class Sound {
//     constructor(context) {
//         this.context = context;
//     }
//
//     init() {
//         this.oscillator = this.context.createOscillator();
//         this.gainNode = this.context.createGain();
//
//         this.oscillator.connect(this.gainNode);
//         this.gainNode.connect(this.context.destination);
//         this.oscillator.type = currentWaveform;
//     }
//
//     play(value) {
//         this.init();
//
//         const time = this.context.currentTime;
//
//         this.oscillator.frequency.setValueAtTime(value, this.context.currentTime);
//         this.gainNode.gain.setValueAtTime(3.5, this.context.currentTime);
//
//         this.oscillator.start(this.context.currentTime);
//         this.stop(time)
//     }
//
//     stop(time) {
//         this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
//         this.oscillator.stop(time + 1);
//     }
// }
//
// const notes = {
//     C: 261.63,
//     D: 293.66,
//     E: 329.63,
//     F: 349.23,
//     G: 392.00,
//     A: 440.00,
//     B: 493.88,
//     'C"': 523.26
// };
//
// const sharps = {
//     C: 277.18,
//     D: 311.13,
//     F: 369.99,
//     G: 415.30,
//     A: 466.16
// };
//
// const makeNotesOneOctaveLower = (notes) => {
//     Object.keys(notes).forEach(key => {
//         notes[key] = notes[key] / 2
//     })
// }
//
// makeNotesOneOctaveLower(notes);
// makeNotesOneOctaveLower(sharps);
//
//
// // notes are accessible from a keyboard
//
// // keyboard keys are pretty much the same as in Ableton:
// // C D E F G A B C (asdfghjkl)
// // C# D# F# G# A# (wetyu)
//
// //  we tyu
// // asdfghjk
//
// // https://schoolofsynthesis.com/playing-notes-from-your-computer-keyboard-in-ableton-live/
//
// // hope it helps
//
// const keyCodes = {
//     C: 65,
//     D: 83,
//     E: 68,
//     F: 70,
//     G: 71,
//     A: 72,
//     B: 74,
//     'C"': 75
// };
//
// const sharpKeyCodes = {
//     C: 87,
//     D: 69,
//     F: 84,
//     G: 89,
//     A: 85
// }
//
//
// const defineNames = (notesObj, sharpsObj) => {
//     const regularButtons = document.querySelectorAll(".regular .button");
//     const sharpButtons = document.querySelectorAll(".sharps .button");
//     const notes = Object.keys(notesObj);
//     const sharps = Object.keys(sharpsObj);
//
//     regularButtons.forEach((button, i) => {
//         if (notes[i]) button.innerText = notes[i];
//     });
//     sharpButtons.forEach((button, i) => {
//         if (sharps[i]) button.innerText = `${sharps[i]}#`;
//     });
// };
//
// defineNames(notes, sharps);
//
// const bindSoundAndButtons = (notesObj, sharpObj) => {
//     try {
//         const notesWrapper = document.querySelector(".notes");
//         const context = new AudioContext();
//         const sound = new Sound(context);
//         sound.init();
//         notesWrapper.addEventListener("click", event => {
//             const targetClass = event.target.classList[0];
//             if (targetClass === "button") {
//                 let currentNote = event.target.innerText;
//                 showPressedButton(activeButton, event.target)
//                 let frequency;
//                 if (currentNote.indexOf("#") === -1) {
//                     frequency = notesObj[currentNote];
//                 }
//                 if (currentNote.indexOf("#") !== -1) {
//                     currentNote = currentNote.replace("#", "");
//                     console.log(currentNote);
//                     frequency = sharpObj[currentNote];
//                 }
//                 sound.play(frequency);
//             }
//         });
//         const codes = Object.values(keyCodes);
//         const notes = Object.keys(notesObj);
//         const sharpCodes = Object.values(sharpKeyCodes)
//         const sharpNotes = Object.keys(sharpKeyCodes)
//
//         window.addEventListener("keydown", event => {
//             console.log(event.keyCode);
//             if (codes.indexOf(event.keyCode) >= 0) {
//                 const indexOfNote = codes.indexOf(event.keyCode);
//                 console.log(event.keyCode);
//                 const currentNote = notes[indexOfNote];
//                 const currentNode = findNode(false, indexOfNote)
//                 showPressedButton(activeButton, currentNode)
//                 const frequency = notesObj[currentNote];
//                 sound.play(frequency);
//             }
//             if (sharpCodes.indexOf(event.keyCode) >= 0) {
//                 const indexOfNote = sharpCodes.indexOf(event.keyCode);
//                 console.log(event.keyCode);
//                 const currentNote = sharpNotes[indexOfNote];
//                 const currentNode = findNode(true, indexOfNote)
//                 showPressedButton(activeButton, currentNode)
//                 const frequency = sharpObj[currentNote];
//                 sound.play(frequency);
//             }
//
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };
//
// bindSoundAndButtons(notes, sharps);
//
// const chooseWaveform = waveforms => {
//     const labels = document.querySelector(".waveform-labels");
//     const sineLabel = document.querySelector('.sine')
//     sineLabel.classList.add("activeWaveLabel")
//     let prevWaveform;
//     labels.addEventListener("click", event => {
//         const targetClass = event.target.classList[0];
//         if (waveforms.indexOf(targetClass) !== -1) {
//             resetLabelActivity();
//             event.target.classList.add("activeWaveLabel");
//             const newWaveform = targetClass;
//
//             switchWaveform(newWaveform)
//         }
//     });
// };
//
// chooseWaveform(waveforms);
//
// const switchWaveform = nextWave => {
//     const waveformNodeWrapper = document.querySelector(".sticks");
//     const waves = document.querySelectorAll(".waveform");
//     if (currentWaveform !== nextWave) {
//         const prevWaveformNode = Array.prototype.filter.call(waves, wave => {
//             const attr = wave.getAttribute("data-wave");
//             return attr === currentWaveform;
//         })[0];
//
//         const nextWaveformNode = Array.prototype.filter.call(waves, wave => {
//             const attr = wave.getAttribute("data-wave");
//             return attr === nextWave;
//         })[0];
//
//         const waveFormNodesBuffer = document.querySelector(".waveforms");
//         waveFormNodesBuffer.appendChild(prevWaveformNode);
//         waveformNodeWrapper.appendChild(nextWaveformNode);
//
//         currentWaveform = nextWave;
//     }
// };
//
// const resetLabelActivity = () => {
//     const waveLabels = document.querySelectorAll(".waveform-labels *");
//     waveLabels.forEach(label => label.classList.remove("activeWaveLabel"));
// };
//
// let activeButton;
//
// const showPressedButton = (prevButton, newPressedButton) => {
//     clearPressedButton(prevButton)
//     newPressedButton.classList.add('activeButton')
//     activeButton = newPressedButton
// }
//
// const clearPressedButton = (prevButton) => {
//     if (prevButton) {
//         prevButton.classList.remove('activeButton')
//     }
// }
//
// const findNode = (ifSharp, index) => {
//     if (ifSharp) {
//         const sharpNodes = document.querySelectorAll('.sharps .button')
//         return sharpNodes[index]
//     }
//     const regularNodes = document.querySelectorAll('.regular .button')
//     return regularNodes[index]
// }