import {
  FolderIcon,
  DocumentIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { useState, type KeyboardEvent } from "react";
import "./styles.css";

type Node = {
  name: string;
  nodes?: Node[];
};

const nodes: Node[] = [
  {
    name: "Home",
    nodes: [
      {
        name: "Code",
        nodes: [
          {
            name: "Work",
            nodes: [{ name: "resume.pdf" }, { name: "cover-letter.pdf" }],
          },
          { name: "Personal", nodes: [] },
        ],
      },
      {
        name: "Pictures",
        nodes: [
          {
            name: "Vacations",
            nodes: [
              {
                name: "Bali",
                nodes: [
                  {
                    name: "Day-1",
                    nodes: [
                      { name: "DSC92348.jpg" },
                      { name: "DSC92248.jpg" },
                      { name: "DSC92368.jpg" },
                      { name: "DSC92318.jpg" },
                    ],
                  },
                ],
              },
              {
                name: "Hong Kong",
                nodes: [
                  { name: "DSC32348.jpg" },
                  { name: "DSC32248.jpg" },
                  { name: "DSC32368.jpg" },
                  { name: "DSC32318.jpg" },
                ],
              },
              {
                name: "Malaysia",
                nodes: [
                  { name: "DSC22348.jpg" },
                  { name: "DSC22248.jpg" },
                  { name: "DSC22368.jpg" },
                  { name: "DSC22318.jpg" },
                ],
              },
            ],
          },
          { name: "Personal", nodes: [] },
          { name: "Edits", nodes: [] },
        ],
      },
      { name: "Videos", nodes: [{ name: "am-wedding.mp4" }] },
    ],
  },
];

export default function FileExplorer() {
  return (
    <div className="App">
      <h1>File Explorer</h1>

      <ul role="tree">
        {nodes.map((node) => (
          <FileSystemItem
            node={node}
            key={node.name}
            path={node.name}
            level={1}
          />
        ))}
      </ul>
    </div>
  );
}

function FileSystemItem({
  node,
  level,
  path,
}: {
  node: Node;
  level: number;
  path: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const isFolder = Array.isArray(node?.nodes);
  const hasChildNodes = Array.isArray(node.nodes) && node.nodes.length > 0;

  const handleOnKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const key = event.key;

    console.log(event.target);

    switch (key) {
      case "ArrowRight": {
        if (hasChildNodes && !isOpen) {
          setIsOpen(true);
        }
        break;
      }

      case "ArrowLeft": {
        if (hasChildNodes && isOpen) {
          setIsOpen(false);
        }
        break;
      }

      default:
        break;
    }
  };

  return (
    <li aria-expanded={isOpen} aria-level={level} role="treeitem">
      <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
        {isFolder ? (
          <button
            aria-label="Toggles to show or hide file system items"
            className="button"
            onKeyDown={handleOnKeyDown}
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
          >
            <ChevronRightIcon
              className={`chevron-right-icon ${
                isOpen ? "chevron-right-icon--active" : ""
              }`}
            />
          </button>
        ) : null}

        {!isFolder && !hasChildNodes ? (
          <span className="node-placeholder"></span>
        ) : null}

        {isFolder ? (
          <FolderIcon className="folder-icon-blue" />
        ) : (
          <DocumentIcon className="document-icon-grey" />
        )}

        {node.name}
      </span>

      {isOpen && node.nodes && hasChildNodes ? (
        <ul role="group">
          {node.nodes.map((childNode) => (
            <FileSystemItem
              node={childNode}
              key={`${path}/${childNode.name}`}
              level={level + 1}
              path={`${path}/${childNode.name}`}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
