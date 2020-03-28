export function pickRandom<T>(arr: T[]): T {
    return arr[randInt(0, arr.length)];
}

export function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export function randDouble(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function randBoolean(): boolean {
    return Math.random() >= 0.5;
}

export function anyMatch<T>(arr: T[], target: T): boolean {
    for (const elem of arr) {
        if (elem === target) {
            return true;
        }
    }
    return false;
}

export function remove<T>(arr: T[], elem: T): boolean {
    const index: number = arr.indexOf(elem);
    if (index === -1) {
        return false;
    } else {
        arr.splice(index, 1);
        return true;
    }
}

export function getOrDefault<T>(value: T | undefined | null, defaultValue: T): T {
    return value !== undefined && value !== null ? value : defaultValue;
}

export function shuffle<T>(array: T[]): T[] {
    let counter: number = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        const index: number = randInt(0, counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        const temp: T = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}
