
const actions = ['do ten push ups', 'do twenty five jumping jacks', 'do fifteen sit-ups',

  'do ten mintues of stretching', 'take two to three hours of nap ', 'do twenty push ups', 'eat a carrot', 'drink a glass of milk',

  'take a walk outside for thirty mintues', 'run for fifteen minutes', 'eat your vegtables', 'take one hour break to do something you enjoy',

  'do twenty five squats'
];


module.exports = {

  getAction() {
    let randomIndex = Math.floor(Math.random() * actions.length);
    return actions[randomIndex];
  }

};