"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Phone, Mail, MapPin, Car, Calendar, DollarSign, FileText, Edit, Upload, Shield } from "lucide-react"
import { CustomerAttachments } from "@/components/customer-attachments"

interface CustomerDetailsProps {
  customer: any
  onClose: () => void
  userRole?: "admin" | "manager" | "user" // Add user role for permissions
}

// Mock service history data
const mockServiceHistory = [
  {
    id: 1,
    date: "2024-01-15",
    service_type: "Oil Change",
    vehicle: "T123ABC - Toyota Corolla",
    amount: 45000,
    status: "completed",
    job_card: "JC001",
  },
  {
    id: 2,
    date: "2024-01-10",
    service_type: "Brake Service",
    vehicle: "T123ABC - Toyota Corolla",
    amount: 120000,
    status: "completed",
    job_card: "JC002",
  },
  {
    id: 3,
    date: "2023-12-20",
    service_type: "Tyre Installation",
    vehicle: "T123ABC - Toyota Corolla",
    amount: 180000,
    status: "completed",
    job_card: "JC003",
  },
]

const mockInvoices = [
  {
    id: 1,
    invoice_number: "INV001",
    date: "2024-01-15",
    amount: 45000,
    status: "paid",
    due_date: "2024-01-30",
  },
  {
    id: 2,
    invoice_number: "INV002",
    date: "2024-01-10",
    amount: 120000,
    status: "paid",
    due_date: "2024-01-25",
  },
]

const customerTypeColors = {
  government: "bg-blue-100 text-blue-800",
  ngo: "bg-purple-100 text-purple-800",
  private: "bg-green-100 text-green-800",
  personal: "bg-orange-100 text-orange-800",
  bodaboda: "bg-cyan-100 text-cyan-800",
}

const statusColors = {
  completed: "bg-green-100 text-green-800",
  in_progress: "bg-yellow-100 text-yellow-800",
  pending: "bg-gray-100 text-gray-800",
  paid: "bg-green-100 text-green-800",
  overdue: "bg-red-100 text-red-800",
}

export function CustomerDetails({ customer, onClose, userRole = "user" }: CustomerDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAttachments, setShowAttachments] = useState(false)

  // Check if user has manager permissions for attachments
  const canManageAttachments = userRole === "admin" || userRole === "manager"

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{customer.name}</DialogTitle>
              <p className="text-muted-foreground">Customer Code: {customer.customer_code}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={customerTypeColors[customer.customer_type as keyof typeof customerTypeColors]}>
                {customer.customer_type.charAt(0).toUpperCase() + customer.customer_type.slice(1)}
              </Badge>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="history">Service History</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="attachments" className="relative">
              Attachments
              {canManageAttachments && (
                <Shield className="h-3 w-3 ml-1 text-primary" title="Manager Access" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.phone}</span>
                  </div>
                  {customer.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{customer.email}</span>
                    </div>
                  )}
                  {customer.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <span>{customer.address}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customer Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Total Visits</span>
                    </div>
                    <span className="font-semibold">{customer.total_visits}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Total Spent</span>
                    </div>
                    <span className="font-semibold">TSH {customer.total_spent.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Last Visit</span>
                    </div>
                    <span className="font-semibold">{customer.last_visit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Vehicles</span>
                    </div>
                    <span className="font-semibold">{customer.vehicles.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Business Information (if applicable) */}
            {(customer.customer_type === "government" ||
              customer.customer_type === "ngo" ||
              customer.customer_type === "private") && (
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {customer.business_name && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Organization Name</label>
                      <p>{customer.business_name}</p>
                    </div>
                  )}
                  {customer.tax_number && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Tax Number</label>
                      <p>{customer.tax_number}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Notes */}
            {customer.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{customer.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-4">
            <div className="grid gap-4">
              {customer.vehicles.map((vehicle: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5" />
                      {vehicle.plate_number}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Make</label>
                        <p>{vehicle.make}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Model</label>
                        <p>{vehicle.model}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Year</label>
                        <p>{vehicle.year || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Color</label>
                        <p>{vehicle.color || "N/A"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Job Card</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockServiceHistory.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>{service.date}</TableCell>
                        <TableCell>{service.service_type}</TableCell>
                        <TableCell>{service.vehicle}</TableCell>
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto">
                            {service.job_card}
                          </Button>
                        </TableCell>
                        <TableCell>TSH {service.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[service.status as keyof typeof statusColors]}>
                            {service.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Invoice History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto">
                            {invoice.invoice_number}
                          </Button>
                        </TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>TSH {invoice.amount.toLocaleString()}</TableCell>
                        <TableCell>{invoice.due_date}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[invoice.status as keyof typeof statusColors]}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attachments" className="space-y-4">
            {canManageAttachments ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Customer Documents & Attachments
                    <Badge variant="secondary" className="ml-auto">
                      Manager Access
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      As a manager, you can upload and manage documents for this customer including:
                      ID documents, vehicle papers, service records, photos, and more.
                    </p>

                    <Button
                      onClick={() => setShowAttachments(true)}
                      className="w-full sm:w-auto"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Manage Customer Attachments
                    </Button>

                    {/* Quick stats for existing attachments */}
                    <div className="grid gap-4 md:grid-cols-3 mt-6">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-primary">12</div>
                          <p className="text-sm text-muted-foreground">Total Files</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-green-600">8.5 MB</div>
                          <p className="text-sm text-muted-foreground">Total Size</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-blue-600">5</div>
                          <p className="text-sm text-muted-foreground">Categories</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent attachments preview */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Recent Attachments</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">national_id.pdf</span>
                            <Badge variant="outline" className="text-xs">ID Documents</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">vehicle_registration.jpg</span>
                            <Badge variant="outline" className="text-xs">Vehicle Documents</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">1 week ago</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted rounded">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">service_invoice_jan2024.pdf</span>
                            <Badge variant="outline" className="text-xs">Invoices</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Manager Access Required</h3>
                  <p className="text-sm text-muted-foreground">
                    Only managers and administrators can view and manage customer attachments.
                    Please contact your supervisor if you need access to this section.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>

      {/* Customer Attachments Modal */}
      {showAttachments && (
        <CustomerAttachments
          customerId={customer.id}
          customerName={customer.name}
          onClose={() => setShowAttachments(false)}
        />
      )}
    </Dialog>
  )
}
