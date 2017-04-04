import tracery from 'tracery-grammar';

const grammar = tracery.createGrammar({
  animal: ['panda', 'fox', 'capybara', 'iguana'],
  emotion: ['sad', 'happy', 'angry', 'jealous'],
  origin: ['I am #emotion.a# #animal#.'],
});

const host = ['You are called to attend #name#', 'The #social# requires you in #name#'];
const lowPlace = ['#place.a#'];
const midPlace = ['#place.a#'];
const highPlace = ['#place.a#, #description.a#'];

grammar.addModifiers(tracery.baseEngModifiers);

export const generateGrammar = (event) => {
  return grammar.flatten('#origin#');
};

export default { generateGrammar };
