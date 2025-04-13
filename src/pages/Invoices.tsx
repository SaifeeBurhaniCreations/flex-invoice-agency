
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Filter, Eye, Download, Edit, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// Mock invoice data
const invoiceData = [
  {
    id: "INV-001",
    client: "Acme Co",
    amount: 1250.00,
    date: "2024-04-10",
    dueDate: "2024-04-25",
    status: "unpaid"
  },
  {
    id: "INV-002",
    client: "Globex Corp",
    amount: 850.00,
    date: "2024-04-05",
    dueDate: "2024-04-20",
    status: "paid"
  },
  {
    id: "INV-003",
    client: "Wayne Enterprises",
    amount: 3200.00,
    date: "2024-04-02",
    dueDate: "2024-04-17",
    status: "paid"
  },
  {
    id: "INV-004",
    client: "Stark Industries",
    amount: 2100.00,
    date: "2024-03-28",
    dueDate: "2024-04-12",
    status: "overdue"
  },
  {
    id: "INV-005",
    client: "Initech",
    amount: 750.00,
    date: "2024-03-25",
    dueDate: "2024-04-09",
    status: "draft"
  },
  {
    id: "INV-006",
    client: "Umbrella Corp",
    amount: 1800.00,
    date: "2024-03-20",
    dueDate: "2024-04-04",
    status: "overdue"
  },
  {
    id: "INV-007",
    client: "Acme Co",
    amount: 1600.00,
    date: "2024-03-15",
    dueDate: "2024-03-30",
    status: "paid"
  },
  {
    id: "INV-008",
    client: "Globex Corp",
    amount: 920.00,
    date: "2024-03-10",
    dueDate: "2024-03-25",
    status: "paid"
  }
];

const Invoices = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
  
  const filteredInvoices = invoiceData.filter((invoice) => {
    // Filter by search term
    const matchesSearch = 
      invoice.id.toLowerCase().includes(search.toLowerCase()) ||
      invoice.client.toLowerCase().includes(search.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'paid':
        return 'invoice-status-paid';
      case 'unpaid':
        return 'invoice-status-unpaid';
      case 'overdue':
        return 'invoice-status-overdue';
      case 'draft':
      default:
        return 'invoice-status-draft';
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
        <Button onClick={() => navigate('/invoice/create')}>
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
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
            <SelectItem value="all">All Invoices</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium">Invoice ID</th>
                  <th className="pb-3 text-left font-medium">Client</th>
                  <th className="pb-3 text-left font-medium">Amount</th>
                  <th className="pb-3 text-left font-medium">Created</th>
                  <th className="pb-3 text-left font-medium">Due Date</th>
                  <th className="pb-3 text-left font-medium">Status</th>
                  <th className="pb-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b">
                    <td className="py-4 font-medium">{invoice.id}</td>
                    <td className="py-4">{invoice.client}</td>
                    <td className="py-4">${invoice.amount.toFixed(2)}</td>
                    <td className="py-4">{new Date(invoice.date).toLocaleDateString()}</td>
                    <td className="py-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className="py-4">
                      <span className={cn("invoice-status", getStatusClasses(invoice.status))}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
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

export default Invoices;
