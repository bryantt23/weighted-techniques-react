
export function weightedRandomSamplingUntilEmpty(items) {
    let results = [];
    let totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

    while (items.length > 0) {
        let threshold = Math.random() * totalWeight;
        let cumulativeWeight = 0;

        for (let i = 0; i < items.length; i++) {
            cumulativeWeight += items[i].weight;
            if (cumulativeWeight >= threshold) {
                results.push(items[i]);
                totalWeight -= items[i].weight;
                items.splice(i, 1); // Remove the item from the array
                break;
            }
        }
    }

    return results;
}