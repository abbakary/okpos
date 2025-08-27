import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Badge } from "./ui/badge"
import { Plus, Trash2, ArrowLeft, ArrowRight, Save, User, Car, Wrench, FileText, Search } from "lucide-react"

interface MultiStepCustomerFormProps {
  onClose: () => void
  onSave: (data: any) => void
  customer?: any
}

interface Vehicle {
  plate_number: string
  make: string
  model: string
  year: string
  color: string
  vehicle_type: string
}

interface TireService {
  tire_size: string
  tire_brand: string
  quantity: number
  tire_type: string
  price_per_tire: number
}

interface CarService {
  service_types: string[]
  vehicle_id: string
  problem_description: string
  estimated_duration: number
  priority: string
}

interface InquiryDetails {
  inquiry_type: string
  questions: string
  contact_preference: string
  follow_up_date?: string
}

export function MultiStepCustomerForm({ onClose, onSave, customer }: MultiStepCustomerFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [savedCustomerId, setSavedCustomerId] = useState<string | null>(null)
  const [showExistingCustomerSearch, setShowExistingCustomerSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExistingCustomer, setSelectedExistingCustomer] = useState<any>(null)

  const [customerData, setCustomerData] = useState({
    name: customer?.name || "",
    phone: customer?.phone || "",
    email: customer?.email || "",
    address: customer?.address || "",
    notes: customer?.notes || "",
  })

  const [serviceIntent, setServiceIntent] = useState<"service" | "inquiry" | "">("")

  const [serviceType, setServiceType] = useState<"tire_sales" | "car_service" | "">("")

  const [customerType, setCustomerType] = useState("")
  const [businessInfo, setBusinessInfo] = useState({
    business_name: "",
    tax_number: "",
    is_owner: true,
  })

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      plate_number: "",
      make: "",
      model: "",
      year: "",
      color: "",
      vehicle_type: "",
    },
  ])

  // Service Details
  const [tireService, setTireService] = useState<TireService>({
    tire_size: "",
    tire_brand: "",
    quantity: 1,
    tire_type: "",
    price_per_tire: 0,
  })

  const [carService, setCarService] = useState<CarService>({
    service_types: [],
    vehicle_id: "",
    problem_description: "",
    estimated_duration: 60,
    priority: "medium",
  })

  const [inquiryDetails, setInquiryDetails] = useState<InquiryDetails>({
    inquiry_type: "",
    questions: "",
    contact_preference: "phone",
    follow_up_date: undefined,
  })

  const steps = [
    { id: 1, title: "Basic Info", icon: User },
    { id: 2, title: "Service Intent", icon: Car },
    { id: 3, title: "Service Type", icon: Wrench },
    { id: 4, title: "Details & Review", icon: FileText },
  ]

  const existingCustomers = [
    { id: 1, name: "John Doe", phone: "+255 123 456 789", customer_type: "personal", last_visit: "2024-01-15" },
    { id: 2, name: "ABC Company Ltd", phone: "+255 987 654 321", customer_type: "private", last_visit: "2024-01-10" },
    {
      id: 3,
      name: "Ministry of Health",
      phone: "+255 555 123 456",
      customer_type: "government",
      last_visit: "2024-01-08",
    },
  ]

  const filteredCustomers = existingCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || customer.phone.includes(searchQuery),
  )

  const selectExistingCustomer = (customer: any) => {
    setSelectedExistingCustomer(customer)
    setCustomerData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email || "",
      address: customer.address || "",
      notes: customer.notes || "",
    })
    setShowExistingCustomerSearch(false)
  }

  const saveCurrentStep = () => {
    const stepData = {
      step: currentStep,
      customerData,
      customerType,
      businessInfo,
      vehicles,
      serviceIntent,
      serviceType,
      tireService,
      carService,
      inquiryDetails,
      savedAt: new Date().toISOString(),
    }

    try {
      // Save to localStorage with a unique key
      const draftKey = `customer-draft-${customerData.phone || Date.now()}`
      localStorage.setItem(draftKey, JSON.stringify(stepData))

      // Show success feedback
      alert("Progress saved successfully! You can continue later.")
      console.log("Progress saved:", stepData)
    } catch (error) {
      console.error("Error saving progress:", error)
      alert("Failed to save progress. Please try again.")
    }
  }

  const handleCustomerInputChange = (field: string, value: string | boolean) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }))
  }

  const handleVehicleChange = (index: number, field: string, value: string) => {
    setVehicles((prev) => prev.map((vehicle, i) => (i === index ? { ...vehicle, [field]: value } : vehicle)))
  }

  const addVehicle = () => {
    setVehicles((prev) => [
      ...prev,
      {
        plate_number: "",
        make: "",
        model: "",
        year: "",
        color: "",
        vehicle_type: "",
      },
    ])
  }

  const removeVehicle = (index: number) => {
    setVehicles((prev) => prev.filter((_, i) => i !== index))
  }

  const saveCustomerOnly = () => {
    // Save customer data and get ID for later use
    const customerId = `CUST-${Date.now()}`
    setSavedCustomerId(customerId)
    // Here you would typically save to database
    console.log("[v0] Customer saved:", { ...customerData, vehicles, id: customerId })
  }

  const handleServiceTypeChange = (type: "tire_sales" | "car_service" | "inquiry") => {
    setServiceType(type)
    if (type === "inquiry") {
      setCustomerData((prev) => ({ ...prev, is_inquiry_only: true }))
    }
  }

  const handleTireServiceChange = (field: string, value: string | number) => {
    setTireService((prev) => ({ ...prev, [field]: value }))
  }

  const handleCarServiceChange = (field: string, value: any) => {
    setCarService((prev) => ({ ...prev, [field]: value }))
  }

  const handleInquiryChange = (field: string, value: string) => {
    setInquiryDetails((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinalSubmit = () => {
    const finalData = {
      customer: { ...customerData, vehicles },
      serviceType,
      serviceDetails:
        serviceType === "tire_sales" ? tireService : serviceType === "car_service" ? carService : inquiryDetails,
      orderId: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }

    onSave(finalData)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Selection</CardTitle>
                <CardDescription>Search for existing customer or create new</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowExistingCustomerSearch(!showExistingCustomerSearch)}
                    className="flex-1"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Existing Customer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedExistingCustomer(null)
                      setCustomerData({
                        name: "",
                        phone: "",
                        email: "",
                        address: "",
                        notes: "",
                      })
                    }}
                    className="flex-1"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Customer
                  </Button>
                </div>

                {showExistingCustomerSearch && (
                  <div className="border rounded-lg p-4 space-y-4">
                    <div>
                      <Label>Search by name or phone</Label>
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter customer name or phone number..."
                      />
                    </div>

                    {searchQuery && (
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {filteredCustomers.map((customer) => (
                          <div
                            key={customer.id}
                            className="p-3 border rounded cursor-pointer hover:bg-muted"
                            onClick={() => selectExistingCustomer(customer)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-muted-foreground">{customer.phone}</p>
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {customer.customer_type}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">Last visit: {customer.last_visit}</p>
                            </div>
                          </div>
                        ))}
                        {filteredCustomers.length === 0 && (
                          <p className="text-center text-muted-foreground py-4">
                            No customers found matching "{searchQuery}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {selectedExistingCustomer && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Selected: {selectedExistingCustomer.name}</p>
                    <p className="text-xs text-green-600">
                      You can proceed to service selection or modify customer details below.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Basic Customer Information</CardTitle>
                <CardDescription>Enter basic contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerData.name}
                    onChange={(e) => handleCustomerInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerData.phone}
                      onChange={(e) => handleCustomerInputChange("phone", e.target.value)}
                      placeholder="+255 xxx xxx xxx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) => handleCustomerInputChange("email", e.target.value)}
                      placeholder="customer@example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={customerData.address}
                    onChange={(e) => handleCustomerInputChange("address", e.target.value)}
                    placeholder="Enter customer address"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={customerData.notes}
                    onChange={(e) => handleCustomerInputChange("notes", e.target.value)}
                    placeholder="Any additional notes about the customer"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What brings you here today?</CardTitle>
                <CardDescription>Select the purpose of your visit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={serviceIntent === "service" ? "default" : "outline"}
                    onClick={() => {
                      setServiceIntent("service")
                      setCurrentStep(3) // Directly go to service type selection
                    }}
                    className="h-20 flex flex-col gap-2"
                  >
                    <Wrench className="h-6 w-6" />
                    <span>I need a service</span>
                  </Button>
                  <Button
                    type="button"
                    variant={serviceIntent === "inquiry" ? "default" : "outline"}
                    onClick={() => {
                      setServiceIntent("inquiry")
                      setServiceType("") // Clear service type since it's inquiry only
                      setCurrentStep(4) // Directly go to inquiry details
                    }}
                    className="h-20 flex flex-col gap-2"
                  >
                    <FileText className="h-6 w-6" />
                    <span>Just an inquiry</span>
                  </Button>
                </div>

                {serviceIntent && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {serviceIntent === "service"
                        ? "Great! We'll help you with your service needs. Click 'Next' to select the type of service."
                        : "No problem! We'll collect your inquiry details and get back to you soon."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            {serviceIntent === "service" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Service Type</CardTitle>
                  <CardDescription>What type of service do you need?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={serviceType === "tire_sales" ? "default" : "outline"}
                      onClick={() => {
                        setServiceType("tire_sales")
                        setCurrentStep(4) // Directly go to details form
                      }}
                      className="h-20 flex flex-col gap-2"
                    >
                      <Car className="h-6 w-6" />
                      <span>Tire Sales</span>
                    </Button>
                    <Button
                      type="button"
                      variant={serviceType === "car_service" ? "default" : "outline"}
                      onClick={() => {
                        setServiceType("car_service")
                        setCurrentStep(4) // Directly go to details form
                      }}
                      className="h-20 flex flex-col gap-2"
                    >
                      <Wrench className="h-6 w-6" />
                      <span>Car Service</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Inquiry Details</CardTitle>
                  <CardDescription>Tell us about your inquiry</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Inquiry Type</Label>
                    <Select
                      value={inquiryDetails.inquiry_type}
                      onValueChange={(value) => setInquiryDetails({ ...inquiryDetails, inquiry_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pricing">Pricing Information</SelectItem>
                        <SelectItem value="services">Available Services</SelectItem>
                        <SelectItem value="appointment">Appointment Booking</SelectItem>
                        <SelectItem value="general">General Question</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Your Questions</Label>
                    <Textarea
                      value={inquiryDetails.questions}
                      onChange={(e) => setInquiryDetails({ ...inquiryDetails, questions: e.target.value })}
                      placeholder="Please describe your inquiry in detail"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            {serviceIntent === "service" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Type</CardTitle>
                    <CardDescription>This helps us provide better service</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Customer Type</Label>
                      <Select value={customerType} onValueChange={setCustomerType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select customer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="ngo">NGO</SelectItem>
                          <SelectItem value="private">Private Company</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="bodaboda">Bodaboda</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Business fields for organizational customers */}
                    {(customerType === "government" || customerType === "ngo" || customerType === "private") && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Organization Name</Label>
                          <Input
                            value={businessInfo.business_name}
                            onChange={(e) => setBusinessInfo({ ...businessInfo, business_name: e.target.value })}
                            placeholder="Enter organization name"
                          />
                        </div>
                        <div>
                          <Label>Tax Number</Label>
                          <Input
                            value={businessInfo.tax_number}
                            onChange={(e) => setBusinessInfo({ ...businessInfo, tax_number: e.target.value })}
                            placeholder="Enter tax number"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Vehicle information for car services */}
                {serviceType === "car_service" && (
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Vehicle Information</CardTitle>
                      <Button type="button" onClick={addVehicle} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vehicle
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {vehicles.map((vehicle, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Vehicle {index + 1}</h4>
                            {vehicles.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeVehicle(index)}
                                variant="ghost"
                                size="sm"
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label>Plate Number</Label>
                              <Input
                                value={vehicle.plate_number}
                                onChange={(e) => handleVehicleChange(index, "plate_number", e.target.value)}
                                placeholder="T123ABC"
                              />
                            </div>
                            <div>
                              <Label>Make</Label>
                              <Input
                                value={vehicle.make}
                                onChange={(e) => handleVehicleChange(index, "make", e.target.value)}
                                placeholder="Toyota"
                              />
                            </div>
                            <div>
                              <Label>Model</Label>
                              <Input
                                value={vehicle.model}
                                onChange={(e) => handleVehicleChange(index, "model", e.target.value)}
                                placeholder="Corolla"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label>Year</Label>
                              <Input
                                value={vehicle.year}
                                onChange={(e) => handleVehicleChange(index, "year", e.target.value)}
                                placeholder="2020"
                              />
                            </div>
                            <div>
                              <Label>Color</Label>
                              <Input
                                value={vehicle.color}
                                onChange={(e) => handleVehicleChange(index, "color", e.target.value)}
                                placeholder="White"
                              />
                            </div>
                            <div>
                              <Label>Vehicle Type</Label>
                              <Select
                                value={vehicle.vehicle_type}
                                onChange={(value) => handleVehicleChange(index, "vehicle_type", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="car">Car</SelectItem>
                                  <SelectItem value="truck">Truck</SelectItem>
                                  <SelectItem value="motorcycle">Motorcycle</SelectItem>
                                  <SelectItem value="bus">Bus</SelectItem>
                                  <SelectItem value="van">Van</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Service details based on type */}
                {serviceType === "tire_sales" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Tire Service Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Tire Size *</Label>
                          <Input
                            value={tireService.tire_size}
                            onChange={(e) => handleTireServiceChange("tire_size", e.target.value)}
                            placeholder="e.g., 205/55R16"
                          />
                        </div>
                        <div>
                          <Label>Tire Brand *</Label>
                          <Select
                            value={tireService.tire_brand}
                            onValueChange={(value) => handleTireServiceChange("tire_brand", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="michelin">Michelin</SelectItem>
                              <SelectItem value="bridgestone">Bridgestone</SelectItem>
                              <SelectItem value="continental">Continental</SelectItem>
                              <SelectItem value="pirelli">Pirelli</SelectItem>
                              <SelectItem value="goodyear">Goodyear</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Quantity *</Label>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            value={tireService.quantity}
                            onChange={(e) => handleTireServiceChange("quantity", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Tire Type</Label>
                          <Select
                            value={tireService.tire_type}
                            onValueChange={(value) => handleTireServiceChange("tire_type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="summer">Summer</SelectItem>
                              <SelectItem value="winter">Winter</SelectItem>
                              <SelectItem value="all-season">All Season</SelectItem>
                              <SelectItem value="performance">Performance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Price per Tire (TSH)</Label>
                          <Input
                            type="number"
                            min="0"
                            value={tireService.price_per_tire}
                            onChange={(e) =>
                              handleTireServiceChange("price_per_tire", Number.parseFloat(e.target.value))
                            }
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Order Summary</h4>
                        <p>Quantity: {tireService.quantity} tire(s)</p>
                        <p>Total: TSH {(tireService.quantity * tireService.price_per_tire).toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {serviceType === "car_service" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Car Service Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Select Vehicle</Label>
                        <Select
                          value={carService.vehicle_id}
                          onValueChange={(value) => handleCarServiceChange("vehicle_id", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose vehicle" />
                          </SelectTrigger>
                          <SelectContent>
                            {vehicles.map((vehicle, index) => (
                              <SelectItem key={index} value={`vehicle-${index}`}>
                                {vehicle.plate_number} - {vehicle.make} {vehicle.model}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Service Types</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {[
                            "Oil Change",
                            "Brake Service",
                            "Engine Diagnostic",
                            "Transmission Service",
                            "Air Conditioning",
                            "Battery Service",
                            "Tire Rotation",
                            "General Maintenance",
                          ].map((service) => (
                            <div key={service} className="flex items-center space-x-2">
                              <Checkbox
                                id={service}
                                checked={carService.service_types.includes(service)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    handleCarServiceChange("service_types", [...carService.service_types, service])
                                  } else {
                                    handleCarServiceChange(
                                      "service_types",
                                      carService.service_types.filter((s) => s !== service),
                                    )
                                  }
                                }}
                              />
                              <Label htmlFor={service} className="text-sm">
                                {service}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Problem Description</Label>
                        <Textarea
                          value={carService.problem_description}
                          onChange={(e) => handleCarServiceChange("problem_description", e.target.value)}
                          placeholder="Describe the issue or service needed..."
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Estimated Duration (minutes)</Label>
                          <Input
                            type="number"
                            min="30"
                            max="480"
                            value={carService.estimated_duration}
                            onChange={(e) =>
                              handleCarServiceChange("estimated_duration", Number.parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label>Priority</Label>
                          <Select
                            value={carService.priority}
                            onValueChange={(value) => handleCarServiceChange("priority", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* Review section */}
            <Card>
              <CardHeader>
                <CardTitle>Review & Create Order</CardTitle>
                <CardDescription>Please review the information before creating the order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Customer: {customerData.name}</h4>
                    <p className="text-sm text-muted-foreground">{customerData.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">
                      Service Intent: {serviceIntent === "service" ? "Service Request" : "Inquiry Only"}
                    </h4>
                    {serviceType && (
                      <p className="text-sm text-muted-foreground">
                        Type: {serviceType.replace("_", " ").toUpperCase()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto w-[95vw] lg:w-auto">
        <DialogHeader>
          <DialogTitle>Customer Registration & Order Creation</DialogTitle>
          <DialogDescription>Complete customer registration and service order in organized steps</DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground bg-background"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-2">
                  <p className={`text-sm font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${isCompleted ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">{renderStepContent()}</div>

        {/* Navigation */}
        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button type="button" onClick={nextStep}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="button" onClick={handleFinalSubmit} className="bg-primary hover:bg-primary/90">
                Create Order
                <FileText className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={saveCurrentStep}>
              <Save className="h-4 w-4 mr-2" />
              Save Progress
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
