import type { Themes } from "$lib/constants";

export const flatten = (o: {id: number, attributes: any}) => ({id: o.id, ...o.attributes});

export function getRandomTheme(enumObj: typeof Themes): Themes {
    const enumValues = Object.values(enumObj) as Themes[];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}