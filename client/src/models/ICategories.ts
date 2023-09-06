export interface ICategories {
    title: string;
    key: string;
    children: {
        isLeaf: boolean,
        title: string,
        key: string
    }
}
