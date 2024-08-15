//1. Bubble sort
const bubbleSort = (): number[] => {
  let arr: number[] = [64, 34, 25, 12, 22, 11, 90];
  let lenght: number = arr.length;
  for (let i = 0; i < lenght - 1; i++) {
    for (let j = 0; j < lenght - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};

//2. Selection Sort
const selectionSort = (): number[] => {
  let arr: number[] = [64, 34, 25, 12, 22, 11, 90];
  let n: number = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex: number = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      let temp: number = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }

  return arr;
};

//3. Insertion Sort
const insertionSort = (): number[] => {
  let arr: number[] = [64, 34, 25, 12, 22, 11, 90];
  let n: number = arr.length;
  for (let i = 1; i < n; i++) {
    let key: number = arr[i];
    let j: number = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
};

//4. Quick Sort
function quickSort(
  arr: number[],
  low: number = 0,
  high: number = arr.length - 1
): number[] {
  if (low < high) {
    let pi: number = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }

  return arr;
}

const partition = (arr: number[], low: number, high: number): number => {
  let pivot: number = arr[high];
  let i: number = low - 1;
  for (let j: number = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
};

//5. Merge Sort
const mergeSort = <T>(arr: T[], compareFn: (a: T, b: T) => number): T[] => {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(
    mergeSort(left, compareFn),
    mergeSort(right, compareFn),
    compareFn
  );
};

const merge = <T>(
  left: T[],
  right: T[],
  compareFn: (a: T, b: T) => number
): T[] => {
  let result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};

console.log(`Bubble ${bubbleSort()}`);
console.log(`Selection ${selectionSort()}`);
console.log(`Insertion ${insertionSort()}`);

let myArray: number[] = [64, 34, 25, 12, 22, 11, 90];
console.log(`Quick ${quickSort(myArray)}`);

const numberCompare = (a: number, b: number): number => a - b;

const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSort(numbers, numberCompare);
console.log(`Merge ${sortedNumbers}`);
