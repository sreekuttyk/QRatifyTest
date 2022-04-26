import { Tree, TreeBranch } from "../types/types";
import { useState } from "react";
export interface RecursiveTreeProps {
  readonly listMeta: Tree;
  readonly onSelectNodeCallback: (value: TreeBranch) => void;
}
const RecursiveTree = ({
  listMeta,
  onSelectNodeCallback,
}: RecursiveTreeProps) => {
  const [displayChildren, setDisplayChildren] = useState<any>({});

  const getClassNameForNode = (item: TreeBranch) => {
    let baseClass =
      item.children && item.children.length > 0
        ? displayChildren[item.id]
          ? "caret caret-down"
          : "caret"
        : "ring";

    return baseClass;
  };
  return (
    <ul>
      {listMeta.map((item) => {
        return (
          <li style={{ position: "relative" }} key={item.id}>
            <span className={getClassNameForNode(item)}>
              {" "}
              <span className={item.selected ? "selectedNodeColor" : ""}>
                {item.name}
              </span>
            </span>

            <button
              className="itemBtn"
              onClick={() => {
                if (item.children && item.children.length > 0) {
                  setDisplayChildren({
                    ...displayChildren,
                    [item.id]: !displayChildren[item.id],
                  });
                }

                onSelectNodeCallback(item);
              }}
            ></button>

            {displayChildren[item.id] && item.children && (
              <RecursiveTree
                listMeta={item.children}
                onSelectNodeCallback={onSelectNodeCallback}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default RecursiveTree;
