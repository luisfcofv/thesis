import tracery from 'tracery-grammar';

const grammar = tracery.createGrammar({
  animal: ['panda', 'fox', 'capybara', 'iguana'],
  emotion: ['sad', 'happy', 'angry', 'jealous'],
  origin: ['I am #emotion.a# #animal#.'],
});

grammar.addModifiers(tracery.baseEngModifiers);

export const generateGrammar = (event) => {
  return grammar.flatten('#origin#');
};

export default { generateGrammar };
