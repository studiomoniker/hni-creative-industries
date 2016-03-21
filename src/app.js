import './lib/message';
import type from './typer';
import components from './components';
import artComponents from './art-components';
import indefiniteArticle from 'indefinite-article';
import uniquePicker from './uniquePicker';

const pickers = components.map(uniquePicker);
const artPickers = artComponents.map(uniquePicker);

const careerInventors = [
  () => `${pickers[0]()} ${artPickers[2]()}`,
  () => `${artPickers[0]()} ${pickers[2]()}`,
  () => `${pickers[0]()} ${pickers[1]()} ${artPickers[2]()}`,
  () => `${artPickers[0]()} ${pickers[1]()} ${pickers[2]()}`
];

// Start with the introduction, then add careers:
typeIntroduction(typeCareers);

function pick(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function inventCareer() {
  return pick(careerInventors)();
}

function addBreaks(sentence) {
  const maxCharacters = 17;
  const br = '<br>';
  const words = sentence.split(' ');
  let count = 5; // I'm a 
  const firstWord = words[0];
  if (indefiniteArticle(firstWord) === 'an')
    count += 1;
  if (count + firstWord.length > maxCharacters) {
    words[0] = br + words[0];
    count = 0;
  }
  for (let i = 0, l = words.length - 1; i < l; i++) {
    let word = words[i];
    count += word.length + 1; // 1 = space
    if (count + words[i + 1].length + 1 > maxCharacters) {
      words[i] = word + br;
      count = 0;
    }
  }
  return words.join(' ').replace(/\<br\> /g, '<br>');
}

function typeCareers() {
  const careers = [];
  for (let i = 0; i < 10; i++) {
    let career = inventCareer();
    careers.push(`${indefiniteArticle(career).replace(/a/, '')} ${career}`);
  }
  type({
      element: document.querySelector('.words'), 
      sentences: careers,
      startDelay: 1000,
      onBeforeType: function() {
        this.string = addBreaks(this.string);
        if (/^n /.test(this.sentence)) {
          this.string = this.string
            .replace(/^n/, '<span class="iaman">n</span>');
        }
      }
    }, typeCareers);
}

function typeIntroduction(callback) {
  type({
      element: document.querySelector('.iam'), 
      sentences: ['I’m a'],
      removeAtEnd: false,
      startDelay: 1000
    }, callback);
}
