
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, CreditCard, Eye, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Payment = {
  id: string;
  invoiceId: string;
  client: string;
  amount: number;
  amountPaid: number;
  paymentDate: string;
  paymentMethod: string;
  status: string;
  notes: string;
};

// Mock payment data
const initialPayments: Payment[] = [
  {
    id: "PAY-001",
    invoiceId: "INV-001",
    client: "Acme Co",
    amount: 1250.00,
    amountPaid: 1250.00,
    paymentDate: "2024-04-10",
    paymentMethod: "Credit Card",
    status: "paid",
    notes: "Payment received in full"
  },
  {
    id: "PAY-002",
    invoiceId: "INV-002",
    client: "Globex Corp",
    amount: 850.00,
    amountPaid: 850.00,
    paymentDate: "2024-04-08",
    paymentMethod: "Bank Transfer",
    status: "paid",
    notes: ""
  },
  {
    id: "PAY-003",
    invoiceId: "INV-003",
    client: "Wayne Enterprises",
    amount: 3200.00,
    amountPaid: 1600.00,
    paymentDate: "2024-04-05",
    paymentMethod: "Credit Card",
    status: "partial",
    notes: "50% payment received, remainder due by next month"
  },
  {
    id: "PAY-004",
    invoiceId: "INV-004",
    client: "Stark Industries",
    amount: 2100.00,
    amountPaid: 0,
    paymentDate: "",
    paymentMethod: "",
    status: "unpaid",
    notes: "Payment overdue"
  },
  {
    id: "PAY-005",
    invoiceId: "INV-005",
    client: "Initech",
    amount: 750.00,
    amountPaid: 0,
    paymentDate: "",
    paymentMethod: "",
    status: "unpaid",
    notes: "Invoice sent"
  }
];

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
  const [paymentNotes, setPaymentNotes] = useState<string>("");
  
  const filteredPayments = payments.filter((payment) => {
    // Filter by search term
    const matchesSearch = 
      payment.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
      payment.client.toLowerCase().includes(search.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "partial":
        return <Badge className="bg-yellow-500">Partial</Badge>;
      case "unpaid":
        return <Badge className="bg-red-500">Unpaid</Badge>;
      default:
        return <Badge className="bg-gray-500">{status}</Badge>;
    }
  };
  
  const handleAddPayment = () => {
    const selectedPayment = payments.find(p => p.invoiceId === selectedInvoice);
    
    if (!selectedPayment || !paymentAmount) return;
    
    const amountValue = parseFloat(paymentAmount);
    let newStatus = "unpaid";
    
    if (amountValue >= selectedPayment.amount) {
      newStatus = "paid";
    } else if (amountValue > 0) {
      newStatus = "partial";
    }
    
    const updatedPayments = payments.map(payment => {
      if (payment.invoiceId === selectedInvoice) {
        return {
          ...payment,
          amountPaid: amountValue,
          paymentDate: new Date().toISOString().split('T')[0],
          paymentMethod,
          status: newStatus,
          notes: paymentNotes
        };
      }
      return payment;
    });
    
    setPayments(updatedPayments);
    setOpen(false);
    resetForm();
  };
  
  const resetForm = () => {
    setSelectedInvoice("");
    setPaymentAmount("");
    setPaymentMethod("Credit Card");
    setPaymentNotes("");
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <CreditCard className="mr-2 h-4 w-4" /> Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
              <DialogDescription>
                Add a payment record for an existing invoice.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="invoice">Select Invoice</Label>
                <Select value={selectedInvoice} onValueChange={setSelectedInvoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an invoice" />
                  </SelectTrigger>
                  <SelectContent>
                    {payments.map(payment => (
                      <SelectItem key={payment.invoiceId} value={payment.invoiceId}>
                        {payment.invoiceId} - {payment.client} (${payment.amount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="PayPal">PayPal</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={paymentNotes}
                  onChange={(e) => setPaymentNotes(e.target.value)}
                  placeholder="Add payment notes here..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddPayment}>Record Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              <span>Filter Status</span>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium">Invoice ID</th>
                  <th className="pb-3 text-left font-medium">Client</th>
                  <th className="pb-3 text-left font-medium">Amount</th>
                  <th className="pb-3 text-left font-medium">Paid</th>
                  <th className="pb-3 text-left font-medium">Date</th>
                  <th className="pb-3 text-left font-medium">Method</th>
                  <th className="pb-3 text-left font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="py-3">{payment.invoiceId}</td>
                    <td className="py-3">{payment.client}</td>
                    <td className="py-3">${payment.amount.toFixed(2)}</td>
                    <td className="py-3">${payment.amountPaid.toFixed(2)}</td>
                    <td className="py-3">
                      {payment.paymentDate 
                        ? new Date(payment.paymentDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3">{payment.paymentMethod || "-"}</td>
                    <td className="py-3">{getStatusBadge(payment.status)}</td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
