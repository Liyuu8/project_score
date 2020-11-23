export const collectionName = {
  findings: 'findings',
  notes: 'notes',
  projects: 'projects',
  scores: 'scores',
  users: 'users',
  docCounters: 'docCounters',
} as const;

export const noteElement = {
  measure: { key: 'measure', name: '施策' },
  intermediateObjective: { key: 'intermediateObjective', name: '中間目標' },
  victoryCondition: { key: 'victoryCondition', name: '勝利条件' },
  acquisitionGoal: { key: 'acquisitionGoal', name: '獲得目標' },
  finding: { key: 'finding', name: '得られた知見' },
} as const;
