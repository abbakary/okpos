"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Phone, Mail, MapPin, Car, Calendar, DollarSign, FileText, Edit } from "lucide-react"

interface CustomerDetailsProps {
  customer: any
  onClose: () => void
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

export function CustomerDetails({ customer, onClose }: CustomerDetailsProps) {
  const [activeTab, setActiveTab] = useState("overview")

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="history">Service History</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
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
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
