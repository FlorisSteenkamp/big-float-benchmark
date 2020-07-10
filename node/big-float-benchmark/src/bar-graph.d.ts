/**
 * From https://github.com/jadeallencook/Bar-Graph
 * modified a bit
 * @param options
 * @param data
 */
declare function barGraph(options: {
    increment: number;
}, data: {
    title: string;
    value: number;
    color: string;
}[]): void;
export { barGraph };
