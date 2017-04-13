import tracery from 'tracery-grammar';

// const grammar = tracery.createGrammar({
//   animal: ['panda', 'fox', 'capybara', 'iguana'],
//   emotion: ['sad', 'happy', 'angry', 'jealous'],
//   origin: ['I am #emotion.a# #animal#.'],
// });

// grammar.addModifiers(tracery.baseEngModifiers);

function generateTimeGrammar({ salience, propagation }) {
  const midTime = [
    `is ${propagation} days from now.`,
    `is ${propagation} days from now.`,
  ];
  const highTime = [
    `will take place in ${propagation} days from now at noon.`,
    `will take place in ${propagation} days from now at dawn.`,
    `will be held after ${propagation} days, before the sunset.`,
  ];

  if (salience.time >= 0.75) {
    return highTime;
  } if (salience.time >= 0.5) {
    return midTime;
  }

  return [
    'is approaching.',
    'will take place later.',
  ];
}

function generateSocialGrammar({ agents, salience }) {
  const agentsDescription = agents.reduce((acc, agent) => {
    if (acc.length) {
      return `${acc}, ${agent.name.toLowerCase()}`;
    }

    return agent.name;
  }, '');

  const toBe = agents.length > 1 ? 'are' : 'is';
  const midSocial = [
    `The following people ${toBe} attending: ${agentsDescription}.`,
  ];
  const protagonist = [
    `You are called to attend this event, ${agentsDescription} ${toBe} attending.`,
    `You are the host of this event, the following people ${toBe} attending ${agentsDescription}.`,
    `You have been invited personally, ${agentsDescription} ${toBe} attending.`,
  ];

  if (salience.social >= 1.00) {
    return protagonist;
  } if (salience.social >= 0.5) {
    return midSocial;
  }

  return [];
}

function generateLocationGrammar({ location, salience }) {
  const midLocation = [`It will take place at ${location.name.toLowerCase()}.`];
  const highLocation = [
    `It will take place at ${location.name.toLowerCase()}, ${location.description.toLowerCase()}.`,
  ];

  if (salience.space >= 0.75) {
    return highLocation;
  } if (salience.space >= 0.5) {
    return midLocation;
  }

  return [];
}

function generateIntentionGrammar({ goal, salience }) {
  const intention = [
    `You will be able to find something out about your current goal: ${goal.name}.`,
    `You might be able to achieve your current goal: ${goal.name}.`,
  ];

  if (salience.intention >= 1.00) {
    return intention;
  }

  return [];
}

function generateCausationGrammar({ cause, salience }) {
  if (salience.causation >= 1.00) {
    // Redo this grammar
    const name = cause.name ? cause.name : 'test';
    return [
      `Attending this event will motivate you to ${name.toLowerCase()}.`,
      `It will push you to ${name.toLowerCase()}.`,
      `Attending will encorage you to ${name.toLowerCase()}.`,
    ];
  }

  return [];
}

export function generateGrammar(event) {
  const storyGrammar = tracery.createGrammar({
    time: generateTimeGrammar(event),
    social: generateSocialGrammar(event),
    location: generateLocationGrammar(event),
    intention: generateIntentionGrammar(event),
    causation: generateCausationGrammar(event),
    origin: [`The event ${event.name} #time# #social# #location# #intention# #causation#`],
  });

  return storyGrammar.flatten('#origin#');
}

export default { generateGrammar };
