
export const startMatch = (matchInfo) => {
    return { type : 'NEW_MATCH', matchInfo}
}

export const newBowl = (bowl) => {
    return { type: 'NEW_BOWL', bowl}
}

export const matchPausedStatus = (status) => {
    return { type: 'PAUSED', status}
}

export const startInnings = (matchInfo) => {
    return { type: 'START_INNINGS', matchInfo }
}

export const setOvers = (overs) => {
    return { type: 'SET_OVERS', overs}
}

