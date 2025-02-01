"use client"

import { Handle, Position } from "reactflow"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Hash } from "lucide-react"

interface PressDigitNodeProps {
  data: {
    label: string
    instruction?: string
    pauseDelay?: number
    isGlobal?: boolean
    customLLM?: boolean
  }
  selected: boolean
}

export function PressDigitNode({ data, selected }: PressDigitNodeProps) {
  return (
    <Card className={`w-64 shadow-md ${selected ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="flex flex-row items-center gap-2 p-4">
        <Hash className="h-4 w-4" />
        <span className="text-sm font-medium">{data.label}</span>
        {data.isGlobal && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Global</span>}
        {data.customLLM && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Custom LLM</span>}
      </CardHeader>
      {data.instruction && (
        <CardContent className="p-4 pt-0 text-xs text-muted-foreground">
          {data.instruction}
          {data.pauseDelay && <div>Pause Delay: {data.pauseDelay}ms</div>}
        </CardContent>
      )}
      <Handle type="target" position={Position.Left} className="!bg-primary" />
      <Handle type="source" position={Position.Right} className="!bg-primary" />
    </Card>
  )
}

