export interface TreeBranch {
    readonly id: string
    readonly name: string
    children?: Tree
    selected?: boolean
}

export type Tree = ReadonlyArray<TreeBranch>