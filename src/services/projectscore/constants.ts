export const collectionName = {
  connections: 'connections',
  findings: 'findings',
  notes: 'notes',
  projects: 'projects',
  scores: 'scores',
  users: 'users',
} as const;

export const noteElements = {
  measure: {
    name: '施策',
    hasTarget: false,
    hasSourse: true,
    posX: 50,
    posY: 250,
  },
  intermediateObjective: {
    name: '中間目標',
    hasTarget: true,
    hasSourse: true,
    posX: 450,
    posY: 250,
  },
  victoryCondition: {
    name: '勝利条件',
    hasTarget: true,
    hasSourse: false,
    posX: 850,
    posY: 250,
  },
  acquisitionGoal: {
    name: '獲得目標',
    hasTarget: false,
    hasSourse: false,
    posX: null,
    posY: null,
  },
  finding: {
    name: '得られた知見',
    hasTarget: false,
    hasSourse: false,
    posX: null,
    posY: null,
  },
} as const;
