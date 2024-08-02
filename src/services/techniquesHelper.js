/**
 * This function sorts the input items by weight and then splits them into two halves.
 * It performs weighted random sampling from each half to ensure that both heavier and lighter weights
 * are represented in the final selection. This approach balances the selection, giving a fair chance to
 * items across the weight spectrum.
 */
export function dualGroupWeightedSampling(items) {
    items.sort((a, b) => a.weight - b.weight)
    const length = items.length, half = Number(Math.floor(length / 2));
    const firstHalf = weightedRandomSamplingUntilEmpty(items.slice(0, half))
    const secondHalf = weightedRandomSamplingUntilEmpty(items.slice(half))
    const bothHalves = [...firstHalf, ...secondHalf]
    const interleavedHalves = weightedRandomSamplingUntilEmpty(bothHalves)
    return interleavedHalves
}


function weightedRandomSamplingUntilEmpty(items) {
    // Create a copy of the input array to avoid modifying the original
    const itemsCopy = [...items]
    let results = [];
    let totalWeight = itemsCopy.reduce((sum, item) => sum + item.weight, 0);

    while (itemsCopy.length > 0) {
        let threshold = Math.random() * totalWeight;
        let cumulativeWeight = 0;

        for (let i = 0; i < itemsCopy.length; i++) {
            cumulativeWeight += itemsCopy[i].weight;
            if (cumulativeWeight >= threshold) {
                results.push(itemsCopy[i]);
                totalWeight -= itemsCopy[i].weight;
                itemsCopy.splice(i, 1); // Remove the item from the array
                break;
            }
        }
    }

    return results;
}