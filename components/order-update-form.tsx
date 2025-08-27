"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, User, Car, FileText, CheckCircle, AlertTriangle, Save, X, Upload, Shield } from "lucide-react"
import { CustomerAttachments } from "@/components/customer-attachments"
import type { Order } from "@/lib/types"

interface OrderUpdateFormProps {
  order: Order
  onClose: () => void
  onUpdate: (order: Order) => void
  userRole?: "admin" | "manager" | "user" // Add user role for attachment permissions
}

interface TechnicalUpdate {
  work_performed: string
  parts_used: string
  technician_notes: string
  quality_check_notes: string
  customer_feedback: string
  additional_work_needed: string
}

export function OrderUpdateForm({ order, onClose, onUpdate }: OrderUpdateFormProps) {
  const [status, setStatus] = useState(order.status)
  const [priority, setPriority] = useState(order.priority)
  const [assignedTo, setAssignedTo] = useState(order.assigned_to?.toString() || "")
  const [description, setDescription] = useState(order.description || "")
  const [totalAmount, setTotalAmount] = useState(order.total_amount.toString())
  const [discountAmount, setDiscountAmount] = useState(order.discount_amount.toString())
  const [taxAmount, setTaxAmount] = useState(order.tax_amount.toString())
  const [managerNotes, setManagerNotes] = useState("")
  
  // Technical update fields for car service
  const [technicalUpdate, setTechnicalUpdate] = useState<TechnicalUpdate>({
    work_performed: "",
    parts_used: "",
    technician_notes: "",
    quality_check_notes: "",
    customer_feedback: "",
    additional_work_needed: "",
  })

  // Tire sales specific fields
  const [tiresInstalled, setTiresInstalled] = useState("")
  const [installationNotes, setInstallationNotes] = useState("")

  const handleTechnicalChange = (field: keyof TechnicalUpdate, value: string) => {
    setTechnicalUpdate(prev => ({ ...prev, [field]: value }))
  }

  const calculateFinalAmount = () => {
    const total = parseFloat(totalAmount) || 0
    const discount = parseFloat(discountAmount) || 0
    const tax = parseFloat(taxAmount) || 0
    return total - discount + tax
  }

  const handleSave = () => {
    const updatedOrder: Order = {
      ...order,
      status: status as Order["status"],
      priority: priority as Order["priority"],
      assigned_to: assignedTo ? parseInt(assignedTo) : undefined,
      description,
      total_amount: parseFloat(totalAmount) || 0,
      discount_amount: parseFloat(discountAmount) || 0,
      tax_amount: parseFloat(taxAmount) || 0,
      final_amount: calculateFinalAmount(),
      updated_at: new Date().toISOString(),
      // Set completion time if status is completed
      actual_completion: status === "completed" ? new Date().toISOString() : order.actual_completion,
    }

    // Log technical updates for audit trail
    if (order.order_type === "service" && Object.values(technicalUpdate).some(v => v.trim())) {
      console.log("Technical update for order:", order.order_number, technicalUpdate)
    }

    if (order.order_type === "sales" && (tiresInstalled || installationNotes)) {
      console.log("Tire installation update for order:", order.order_number, {
        tiresInstalled,
        installationNotes
      })
    }

    onUpdate(updatedOrder)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "created": return "bg-yellow-100 text-yellow-800"
      case "assigned": return "bg-blue-100 text-blue-800"
      case "in_progress": return "bg-purple-100 text-purple-800"
      case "completed": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTechnicians = () => [
    { id: "1", name: "Peter Mwangi" },
    { id: "2", name: "James Kimani" },
    { id: "3", name: "Samuel Ochieng" },
    { id: "4", name: "Grace Wanjiku" },
  ]

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Update Order - {order.order_number}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Order Details */}
          <div className="space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
                <CardDescription>Basic order details and current status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Order Number</Label>
                    <Input value={order.order_number} disabled />
                  </div>
                  <div>
                    <Label>Order Type</Label>
                    <Input value={order.order_type} disabled className="capitalize" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Status</Label>
                    <div className="mt-2">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace("_", " ")}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label>New Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="created">Created</SelectItem>
                        <SelectItem value="assigned">Assigned</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Priority</Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Assigned Technician</Label>
                    <Select value={assignedTo} onValueChange={setAssignedTo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select technician" />
                      </SelectTrigger>
                      <SelectContent>
                        {getTechnicians().map((tech) => (
                          <SelectItem key={tech.id} value={tech.id}>
                            {tech.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Order description..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Financial Details */}
            <Card>
              <CardHeader>
                <CardTitle>Financial Details</CardTitle>
                <CardDescription>Update pricing and amounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Total Amount (TSH)</Label>
                    <Input
                      type="number"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label>Discount Amount (TSH)</Label>
                    <Input
                      type="number"
                      value={discountAmount}
                      onChange={(e) => setDiscountAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tax Amount (TSH)</Label>
                    <Input
                      type="number"
                      value={taxAmount}
                      onChange={(e) => setTaxAmount(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label>Final Amount (TSH)</Label>
                    <Input value={calculateFinalAmount().toLocaleString()} disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Service Specific Updates */}
          <div className="space-y-6">
            {/* Service Type Specific Forms */}
            {order.order_type === "service" && (
              <Card>
                <CardHeader>
                  <CardTitle>Car Service Updates</CardTitle>
                  <CardDescription>Technical details from technician</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Work Performed</Label>
                    <Textarea
                      value={technicalUpdate.work_performed}
                      onChange={(e) => handleTechnicalChange("work_performed", e.target.value)}
                      placeholder="Describe work completed..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Parts Used</Label>
                    <Textarea
                      value={technicalUpdate.parts_used}
                      onChange={(e) => handleTechnicalChange("parts_used", e.target.value)}
                      placeholder="List parts used..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Technician Notes</Label>
                    <Textarea
                      value={technicalUpdate.technician_notes}
                      onChange={(e) => handleTechnicalChange("technician_notes", e.target.value)}
                      placeholder="Technical observations..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Quality Check Notes</Label>
                    <Textarea
                      value={technicalUpdate.quality_check_notes}
                      onChange={(e) => handleTechnicalChange("quality_check_notes", e.target.value)}
                      placeholder="Quality inspection results..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Customer Feedback</Label>
                    <Textarea
                      value={technicalUpdate.customer_feedback}
                      onChange={(e) => handleTechnicalChange("customer_feedback", e.target.value)}
                      placeholder="Customer comments..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Additional Work Needed</Label>
                    <Textarea
                      value={technicalUpdate.additional_work_needed}
                      onChange={(e) => handleTechnicalChange("additional_work_needed", e.target.value)}
                      placeholder="Future recommendations..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {order.order_type === "sales" && (
              <Card>
                <CardHeader>
                  <CardTitle>Tire Sales Updates</CardTitle>
                  <CardDescription>Installation and sales details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Tires Installed</Label>
                    <Input
                      value={tiresInstalled}
                      onChange={(e) => setTiresInstalled(e.target.value)}
                      placeholder="e.g., 4x Michelin 205/55R16"
                    />
                  </div>

                  <div>
                    <Label>Installation Notes</Label>
                    <Textarea
                      value={installationNotes}
                      onChange={(e) => setInstallationNotes(e.target.value)}
                      placeholder="Installation details, balancing, alignment notes..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {order.order_type === "consultation" && (
              <Card>
                <CardHeader>
                  <CardTitle>Inquiry Follow-up</CardTitle>
                  <CardDescription>Customer inquiry resolution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Information Provided</Label>
                    <Textarea
                      value={managerNotes}
                      onChange={(e) => setManagerNotes(e.target.value)}
                      placeholder="Information shared with customer..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Follow-up Action</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select follow-up action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quote_sent">Quote Sent</SelectItem>
                        <SelectItem value="appointment_scheduled">Appointment Scheduled</SelectItem>
                        <SelectItem value="no_action">No Further Action</SelectItem>
                        <SelectItem value="call_back">Call Back Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Completion Alert */}
            {status === "completed" && order.status !== "completed" && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Order Completion - Auto Generation</h4>
                      <p className="text-sm mb-2">
                        Completing this order will automatically generate:
                      </p>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        <li><strong>Job Card:</strong> JC-{new Date().getFullYear()}-XXX for work tracking</li>
                        <li><strong>Invoice:</strong> INV-{new Date().getFullYear()}-XXX for TSH {calculateFinalAmount().toLocaleString()}</li>
                        <li><strong>Completion Time:</strong> {new Date().toLocaleString()}</li>
                      </ul>
                      <p className="text-sm mt-2 font-medium">
                        Both documents will be ready for immediate processing and customer delivery.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Status Change Alert for In Progress */}
            {status === "in_progress" && order.status !== "in_progress" && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Clock className="h-5 w-5" />
                    <div>
                      <h4 className="font-medium">Work Started</h4>
                      <p className="text-sm">
                        Changing status to "In Progress" will start time tracking for this order.
                        Start time: {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Manager Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Manager Notes</CardTitle>
                <CardDescription>Internal notes and observations</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={managerNotes}
                  onChange={(e) => setManagerNotes(e.target.value)}
                  placeholder="Manager observations, special instructions..."
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Update Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
