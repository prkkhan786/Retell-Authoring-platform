"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { FlowNode } from "@/types/flow"

interface NodeSettingsProps {
  node: FlowNode | null
  onSettingsChange: (nodeId: string, updates: Partial<FlowNode["data"]>) => void
}

export function NodeSettings({ node, onSettingsChange }: NodeSettingsProps) {
  const [localNode, setLocalNode] = useState<FlowNode | null>(null)

  useEffect(() => {
    setLocalNode(node)
  }, [node])

  if (!localNode) {
    return null
  }

  const handleChange = (key: string, value: any) => {
    const newData = { ...localNode.data, [key]: value }
    setLocalNode({ ...localNode, data: newData })
    onSettingsChange(localNode.id, { [key]: value })
  }

  return (
    <div className="w-80 border-l p-4">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Node Settings</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={localNode.data.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
                placeholder="Enter label..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instruction">Instruction</Label>
              <Textarea
                id="instruction"
                value={localNode.data.instruction || ""}
                onChange={(e) => handleChange("instruction", e.target.value)}
                placeholder="Enter instruction..."
              />
            </div>
            {localNode.type === "pressDigit" && (
              <div className="space-y-2">
                <Label htmlFor="pauseDelay">Pause Detection Delay (milliseconds)</Label>
                <Input
                  id="pauseDelay"
                  type="number"
                  value={localNode.data.pauseDelay || 1000}
                  onChange={(e) => handleChange("pauseDelay", Number(e.target.value))}
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <Label htmlFor="global">Global Node</Label>
              <Switch
                id="global"
                checked={localNode.data.isGlobal || false}
                onCheckedChange={(checked) => handleChange("isGlobal", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="llm">Custom LLM</Label>
              <Switch
                id="llm"
                checked={localNode.data.customLLM || false}
                onCheckedChange={(checked) => handleChange("customLLM", checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

