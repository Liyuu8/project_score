export const collectionName = {
  connections: 'connections',
  findings: 'findings',
  notes: 'notes',
  projects: 'projects',
  scores: 'scores',
  users: 'users',
} as const;

export const noteElements = {
  measure: { name: '施策', hasTarget: false, hasSourse: true },
  intermediateObjective: {
    name: '中間目標',
    hasTarget: true,
    hasSourse: true,
  },
  victoryCondition: { name: '勝利条件', hasTarget: true, hasSourse: false },
  acquisitionGoal: { name: '獲得目標', hasTarget: false, hasSourse: false },
  finding: { name: '得られた知見', hasTarget: false, hasSourse: false },
} as const;
