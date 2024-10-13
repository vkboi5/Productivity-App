import React, { useCallback, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './MindMap.module.css';

const initialNodes = [{ id: '1', data: { label: 'Main Idea' }, position: { x: 250, y: 5 }, style: { backgroundColor: '#fff' } }];
const initialEdges = [];
const availableColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD433', '#6C63FF'];

const MindMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, nodeId: null });
  const [renameValue, setRenameValue] = useState('');

  const handleContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      nodeId: node.id,
    });
    setRenameValue(node.data.label);
  }, []);

  const handleRenameChange = (event) => setRenameValue(event.target.value);

  const handleRenameNode = useCallback(() => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === contextMenu.nodeId ? { ...n, data: { ...n.data, label: renameValue } } : n
      )
    );
  }, [contextMenu.nodeId, renameValue, setNodes]);

  const handleAddChild = useCallback(() => {
    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      data: { label: 'New Node' },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      style: { backgroundColor: '#fff' },
    };
    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      {
        id: `e${contextMenu.nodeId}-${newNodeId}`,
        source: contextMenu.nodeId,
        target: newNodeId,
        markerEnd: { type: 'arrowclosed' },
      },
    ]);
  }, [nodes, edges, contextMenu, setNodes, setEdges]);

  const handleDeleteNode = useCallback(() => {
    setNodes((nds) => nds.filter((n) => n.id !== contextMenu.nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== contextMenu.nodeId && e.target !== contextMenu.nodeId));
    setContextMenu({ visible: false });
  }, [contextMenu.nodeId, setNodes, setEdges]);

  const handleColorChange = (color) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === contextMenu.nodeId ? { ...n, style: { ...n.style, backgroundColor: color } } : n
      )
    );
  };

  const closeContextMenu = () => setContextMenu({ visible: false });

  const addInitialNode = () => {
    const newNode = {
      id: '1',
      data: { label: 'Main Idea' },
      position: { x: 250, y: 5 },
      style: { backgroundColor: '#fff' },
    };
    setNodes([newNode]);
  };

  return (
    <ReactFlowProvider>
      <div className={styles.mindmapContainer}>
        <div className={styles.instructions}>
          <p>Right-click on nodes for more options. Use the menu to rename, delete, or change color.</p>
        </div>

        {nodes.length === 0 && (
          <div className={styles.emptyState}>
            <p>No nodes available. Click the button below to create the first node.</p>
            <button onClick={addInitialNode}>Create Initial Node</button>
          </div>
        )}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
          onNodeContextMenu={handleContextMenu}
          fitView
        >
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>

        {contextMenu.visible && (
          <div
            className={styles.contextMenu}
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <button className={styles.closeButton} onClick={closeContextMenu}>
              ✖
            </button>
            <input
              type="text"
              value={renameValue}
              onChange={handleRenameChange}
              placeholder="Rename Node"
              className={styles.renameInput}
            />
            <button onClick={handleRenameNode}>Rename</button>
            <button onClick={handleAddChild}>Add Child Node</button>
            <button onClick={handleDeleteNode}>Delete Node</button>
            <div className={styles.colorOptions}>
              {availableColors.map((color) => (
                <div
                  key={color}
                  className={styles.colorBox}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </ReactFlowProvider>
  );
};

export default MindMap;
