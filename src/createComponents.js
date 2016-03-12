import _ from 'lodash';
import jobs from './jobs';
import artJobs from './art-jobs';

var components = [[],[],[]];
var artComponents = [[], [], []];

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

artJobs.forEach((job) => {
  let words = job.split(' ');
  if (words.length === 3) {
    words.forEach((word, index) => {
      artComponents[index].push(word);
    });
  }
  if (words.length === 2) {
    artComponents[0].push(words[0]);
    artComponents[2].push(words[1]);
  }
  if (words.length == 1)
    artComponents[2].push(words[0]);
});

components = components.map(_.uniq);
artComponents = artComponents.map(_.uniq);

console.log(JSON.stringify(artComponents));