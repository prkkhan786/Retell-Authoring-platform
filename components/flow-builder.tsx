"use client"

import { useCallback, useState } from "react"
import ReactFlow, {
  addEdge,
  Background,
  type Connection,
  Controls,
  useEdgesState,
  useNodesState,
  type Node,
} from "reactflow"
import "reactflow/dist/style.css"
import { NodePalette } from "./sidebar/node-palette"
import { NodeSettings } from "./sidebar/node-settings"
import { ConversationNode } from "./nodes/conversation-node"
import { FunctionNode } from "./nodes/function-node"
import { CallTransferNode } from "./nodes/call-transfer-node"
import { PressDigitNode } from "./nodes/press-digit-node"
import { EndingNode } from "./nodes/ending-node"
import type { FlowNode, NodeType } from "@/types/flow"
import { v4 as uuidv4 } from "uuid"

const nodeTypes = {
  conversation: ConversationNode,
  function: FunctionNode,
  callTransfer: CallTransferNode,
  pressDigit: PressDigitNode,
  ending: EndingNode,
}

export function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null)

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const handleAddNode = useCallback(
    (type: NodeType) => {
      const newNode: FlowNode = {
        id: uuidv4(),
        type,
        position: { x: 100, y: 100 },
        data: { label: `New ${type} Node`, instruction: "" },
      }
      setNodes((nds) => [...nds, newNode])
    },
    [setNodes],
  )

  const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as FlowNode)
  }, [])

  const handleSettingsChange = useCallback(
    (nodeId: string, updates: Partial<FlowNode["data"]>) => {
      setNodes((nds) =>
        nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, ...updates } } : node)),
      )
      setSelectedNode((prevNode) =>
        prevNode && prevNode.id === nodeId ? { ...prevNode, data: { ...prevNode.data, ...updates } } : prevNode,
      )
    },
    [setNodes],
  )

  return (
    <div className="flex h-screen">
      <NodePalette onAddNode={handleAddNode} />
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <NodeSettings node={selectedNode} onSettingsChange={handleSettingsChange} />
    </div>
  )
}

