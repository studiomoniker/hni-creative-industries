import './lib/message';
import Typed from './typed';
import components from './components';
import artComponents from './art-components';
import indefiniteArticle from 'indefinite-article';
import picker from './picker';

const pickers = components.map(picker);
const artPickers = artComponents.map(picker);
const wordsEl = document.querySelector('.words');

function pick(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

const careerInventors = [
  () => `${pickers[0]()} ${artPickers[2]()}`,
  () => `${artPickers[0]()} ${pickers[2]()}`,
  () => `${pickers[0]()} ${pickers[1]()} ${artPickers[2]()}`,
  () => `${artPickers[0]()} ${pickers[1]()} ${pickers[2]()}`
];

function inventCareer() {
  return pick(careerInventors)();
}

function addBreaks(sentence) {
  let words = sentence.split(' ');
  let count = 6; // I'm a
  for (let i = 0, l = words.length - 1; i < l; i++) {
    let word = words[i];
    count += word.length + 1; // 1 = space
    if (count + words[i + 1].length > 20) {
      words[i] = word + '<br>';
      count = 0;
    }
  }
  return words.join(' ');
}

function type() {
  const careers = [];
  for (let i = 0; i < 10; i++) {
    let career = inventCareer();
    career = addBreaks(career);
    careers.push(`${indefiniteArticle(career).replace(/a/, '')} ${career}`);
  }

  // End by removing text:
  careers.push('');

  new Typed(wordsEl, {
    strings: careers,
    typeSpeed: 100,
    backDelay: 2000,
    backSpeed: 50,
    startDelay: 1000,
    callback: type // Repeat when done
  });
}

type();
