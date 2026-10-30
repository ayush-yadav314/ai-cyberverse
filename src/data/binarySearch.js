export const sampleArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]

// 91 is not special: pick a number that is not in the array (50) to see "not found"
export const targets = [12, 23, 72, 50]

export const javaCode = [
  'int binarySearch(int[] arr, int target) {',
  '    int lo = 0, hi = arr.length - 1;',
  '    while (lo <= hi) {',
  '        int mid = lo + (hi - lo) / 2;',
  '        if (arr[mid] == target) return mid;',
  '        if (arr[mid] < target) lo = mid + 1;',
  '        else hi = mid - 1;',
  '    }',
  '    return -1;',
  '}',
]

// Runs binary search once and records a snapshot of every step.
// "line" is the index of the Java line being executed (0 = first line).
export function buildSteps(arr, target) {
  const steps = []
  let lo = 0
  let hi = arr.length - 1

  steps.push({
    line: 1,
    lo,
    hi,
    mid: null,
    state: 'search',
    note: `Start with lo = ${lo} and hi = ${hi}.`,
  })

  while (true) {
    steps.push({
      line: 2,
      lo,
      hi,
      mid: null,
      state: 'search',
      note:
        lo <= hi
          ? `lo (${lo}) <= hi (${hi}), so keep searching.`
          : `lo (${lo}) is now bigger than hi (${hi}), so nothing is left to search.`,
    })

    if (lo > hi) break

    const mid = lo + Math.floor((hi - lo) / 2)
    steps.push({
      line: 3,
      lo,
      hi,
      mid,
      state: 'search',
      note: `mid = ${mid}, so look at arr[${mid}] = ${arr[mid]}.`,
    })

    if (arr[mid] === target) {
      steps.push({
        line: 4,
        lo,
        hi,
        mid,
        state: 'found',
        note: `arr[${mid}] equals ${target}. Found at index ${mid}.`,
      })
      return steps
    }

    if (arr[mid] < target) {
      lo = mid + 1
      steps.push({
        line: 5,
        lo,
        hi,
        mid,
        state: 'search',
        note: `${arr[mid]} < ${target}, so the target must be on the right. lo becomes ${lo}.`,
      })
    } else {
      hi = mid - 1
      steps.push({
        line: 6,
        lo,
        hi,
        mid,
        state: 'search',
        note: `${arr[mid]} > ${target}, so the target must be on the left. hi becomes ${hi}.`,
      })
    }
  }

  steps.push({
    line: 8,
    lo,
    hi,
    mid: null,
    state: 'missing',
    note: `${target} is not in the array, so the method returns -1.`,
  })
  return steps
}