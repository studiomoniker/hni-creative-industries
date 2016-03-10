import './lib/message';
import Foswig from 'foswig';
import jobs from './jobs';

var components = [[],[],[]];

jobs.forEach((job) => {
  let words = job.split(' ');
  if (words.length === 3) {
    words.forEach((word, index) => {
      components[index].push(word);
    });
  }
  if (words.length === 2) {
    components[0].push(words[0]);
    components[2].push(words[1]);
  }
  if (words.length == 1)
    components[2].push(words[0]);
});

console.log(components);

function pick(array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
}

var element = document.querySelector('h1');
var counter = 0;
setInterval(function() {
  counter++;
  element.innerHTML = counter === 1 
    ? 'I am a'
    : counter % 2 === 1
    ? 'slash'
    : Math.random() > 0.6
      ? `${pick(components[0])}<br>${pick(components[1])}<br>${pick(components[2])}`
      : `${pick(components[0])}<br>${pick(components[2])}`;
}, 1500);
