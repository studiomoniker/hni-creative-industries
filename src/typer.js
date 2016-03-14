class Typer {
  constructor (param) {
    this.element = param.element;
    this.sentences = param.sentences.slice();
    this.typeSpeed = param.typeSpeed || 100;
    this.removeSpeed = param.removeSpeed || 30;
    this.backDelay = param.backDelay || 0;
    this.startDelay = param.startDelay || 0;
  }

  start(callback) {
    setTimeout(
      () => this.typeSentences(() => {
        if (callback)
          callback();
      }),
      this.startDelay
    );
  }

  getCurrentCharacter() {
    return this.sentence[this.characterIndex];
  }

  character(speed, change, doneCount, callback) {
    setTimeout(() => {
      this.characterIndex += change;
      this.string = this.sentence.substr(0, this.characterIndex);
      this.updateElement();
      if (this.characterIndex === doneCount) {
        callback();
      } else {
        this.character(...arguments);
      }
    }, speed + (Math.random() * 30));
  }

  addCharacter(callback) {
    this.character(this.typeSpeed, 1, this.sentence.length, callback);
  }

  removeCharacter(callback) {
    this.character(this.typeSpeed * 0.5, -1, 0, callback);
  }

  updateElement() {
    window.requestAnimationFrame(() => {
      this.element.innerHTML = this.string.replace(/\n/g, '<br>');
    });
  }

  typeSentences(callback) {
    let onTypedSentence = () => {
      // If there is another sentence recurse:
      if (this.sentences.length) {
        this.typeSentence(onTypedSentence);
      } else {
        // If we are done, call back:
        callback();
      }
    };
    this.typeSentence(onTypedSentence);
  }

  typeSentence(callback) {
    this.sentence = this.sentences.shift();
    this.characterIndex = 0;
    this.addCharacter(() => {
      setTimeout(
        () => this.removeCharacter(() => {
          setTimeout(callback, this.startDelay);
        }),
        this.backDelay
      );
    });
  }
}

export default (param, callback) => {
  new Typer(param).start(callback);
};
