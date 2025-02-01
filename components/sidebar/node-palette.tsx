"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, TypeIcon as FunctionIcon, PhoneForwarded, Hash, Square } from "lucide-react"
import type { NodeType } from "@/types/flow"

interface NodePaletteProps {
  onAddNode: (type: NodeType) => void
}

export function NodePalette({ onAddNode }: NodePaletteProps) {
  const nodeTypes = [
    { type: "conversation", icon: MessageCircle, label: "Conversation" },
    { type: "function", icon: FunctionIcon, label: "Function" },
    { type: "callTransfer", icon: PhoneForwarded, label: "Call Transfer" },
    { type: "pressDigit", icon: Hash, label: "Press Digit" },
    { type: "ending", icon: Square, label: "Ending" },
  ] as const

  return (
    <div className="w-60 border-r p-4 flex flex-col gap-2">
      <h2 className="font-semibold mb-4">ADD NEW NODE</h2>
      {nodeTypes.map(({ type, icon: Icon, label }) => (
        <Button key={type} variant="ghost" className="justify-start gap-2 w-full" onClick={() => onAddNode(type)}>
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Button>
      ))}
    </div>
  )
}

