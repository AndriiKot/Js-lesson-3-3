'use strict';

import { isCountLimit } from './utils.js';

const objDataJson = window.translations;
const arrArray = Object.entries(objDataJson);

class Card {
  constructor() {
    this.arrArrayPhrases = arrArray;

    this.numDefaultCount = 1;
    this.numCurrentCount = this.numDefaultCount;
    this.numMaxCount = arrArray.length;

    this.elLastCount = document.querySelector('#lastCount');
    this.elCurrentCount = document.querySelector('#currentCount');
    this.elNextBtn = document.querySelector('#next');
    this.elPrevBtn = document.querySelector('#prev');
    this.elShowBtn = document.querySelector('#show');
    this.elAddBtn = document.querySelector('#add');
    this.elRadioBtnEn = document.querySelector('#en');
    this.elRadioBtnRu = document.querySelector('#ru');
    this.elMainPhrase = document.querySelector('#main-phrase');
    this.elTranslationPhrase = document.querySelector('#translation-phrase');
    this.elRadioBtnEn.checked = true;

    this.#initialize();
  }

  #initialize() {
    this.elLastCount.textContent = this.numMaxCount;
    this.elCurrentCount.textContent = this.numCurrentCount;
    this.elPrevBtn.disabled = true;
    this.#updateDataCard();
  }

  #createTemplatePrase(strMainPhrase, strTranslation) {
    this.elMainPhrase.textContent = strMainPhrase;
    this.elTranslationPhrase.textContent = strTranslation;
  }

  #getPhrases() {
    let arrPhrases = this.arrArrayPhrases[this.numCurrentCount - 1];
    if (!Array.isArray(arrPhrases) || arrPhrases.length < 2) {
      arrPhrases = ['', ''];
    }
    const boolIsEn = this.elRadioBtnEn.checked;
    const boolIsRu = this.elRadioBtnRu.checked;

    return {
      strPhrase: arrPhrases[+boolIsEn],
      strTrans: arrPhrases[+boolIsRu],
    };
  }

  #updateDataCard() {
    this.elCurrentCount.textContent = `${this.numCurrentCount}`;
    const { strPhrase, strTrans } = this.#getPhrases();
    this.#createTemplatePrase(strPhrase, strTrans);
  }

  next() {
    if (!isCountLimit(this.numCurrentCount, this.numMaxCount)) {
      this.numCurrentCount++;
      this.elPrevBtn.disabled = false;
      this.#updateDataCard();
    }
    if (this.numCurrentCount === this.numMaxCount) {
      this.elNextBtn.disabled = true;
    }
  }

  prev() {
    if (this.numCurrentCount > 1) {
      this.elNextBtn.disabled = false;
      this.numCurrentCount--;
      this.#updateDataCard();
    } else {
      this.elPrevBtn.disabled = true;
    }
    if (this.numCurrentCount === 1) {
      this.elPrevBtn.disabled = true;
    }
  }

  add() {
    console.log('add');
  }

  show() {
    console.log('show');
  }

  en() {
    this.elRadioBtnEn.checked = true;
    this.#updateDataCard();
  }

  ru() {
    this.elRadioBtnRu.checked = true;
    this.#updateDataCard();
  }
}

const objCard = new Card();

document.body.addEventListener('click', (event) => {
  const elActiveBtn = event.target;
  const strActiveID = elActiveBtn.id;
  switch (strActiveID) {
    case 'next':
      objCard.next();
      break;
    case 'prev':
      objCard.prev();
      break;
    case 'add':
      objCard.add();
      break;
    case 'show':
      objCard.show();
      break;
    case 'en':
      objCard.en();
      break;
    case 'ru':
      objCard.ru();
      break;
    default:
      break;
  }
});
