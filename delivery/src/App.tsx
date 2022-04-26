import { useEffect, useState } from "react";
import "./App.css";
import { Tree, TreeBranch } from "./types/types";
import RecursiveTree from "./components/RecursiveTree";

function App() {
  const [treeItems, setTreeItem] = useState<Tree>([]);
  const [selectedNode, setSelectedNode] = useState("Nothing is selected");

  const onSelectNode = (value: TreeBranch) => {
    setSelectedNode(value.name);
    selectAllFalseExcept(value.id, treeItems);
    setTreeItem(treeItems);
  };
  const selectAllFalseExcept = (id: string, item: Tree) => {
    for (let index = 0; index < item.length; index++) {
      let element = item[index];
      if (element.id === id) {
        element.selected = true;
      } else {
        element.selected = false;
      }

      if (element.children && element.children?.length > 0) {
        selectAllFalseExcept(id, element.children);
      }
    }
  };

  useEffect(() => {
    fetch("https://61f5037b62f1e300173c3f8d.mockapi.io/node")
      .then((response) => response.json())
      .then((data) => setTreeItem(data));
  }, []);
  return (
    <div >
      <div className="header">My App!</div>
      <div className="maincontainer">
      <div className="sidebar" >
        <RecursiveTree
          listMeta={treeItems}
          onSelectNodeCallback={onSelectNode}
        />
      </div>
      <div className="main" >
        <div className="mainsection">
         {selectedNode}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
