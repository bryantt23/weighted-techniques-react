
export function alternateWeightedSampling(items) {
    items.sort((a, b) => a.weight - b.weight)
    const length = items.length, half = Math.floor(length / 2);

    const lighterHalf = [...items.slice(0, half)]
    const heavierHalf = [...items.slice(half)]

    const results = []
    const maxIterations = Math.max(lighterHalf.length, heavierHalf.length)

    for (let i = 0; i < maxIterations; i++) {
        if (lighterHalf.length > 0) {
            results.push(weightedRandomSelectAndRemove(lighterHalf))
        }
        if (heavierHalf.length > 0) {
            results.push(weightedRandomSelectAndRemove(heavierHalf))
        }
    }

    return results
}

function weightedRandomSelectAndRemove(items) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
    const threshold = Math.random() * totalWeight;
    let cumulativeWeight = 0

    for (let i = 0; i < items.length; i++) {
        cumulativeWeight += items[i].weight
        if (cumulativeWeight >= threshold) {
            return items.splice(i, 1)[0]
        }
    }
}
