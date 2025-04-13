
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const recentInvoices = [
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
  }
];

export const RecentInvoices = () => {
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
    <div className="overflow-hidden rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Invoice</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Due Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentInvoices.map((invoice) => (
              <tr key={invoice.id} className="bg-card hover:bg-muted/50 transition-colors">
                <td className="px-4 py-4 text-sm font-medium">{invoice.id}</td>
                <td className="px-4 py-4 text-sm">{invoice.client}</td>
                <td className="px-4 py-4 text-sm">${invoice.amount.toFixed(2)}</td>
                <td className="px-4 py-4 text-sm">{new Date(invoice.date).toLocaleDateString()}</td>
                <td className="px-4 py-4 text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                <td className="px-4 py-4 text-sm">
                  <span className={cn("invoice-status", getStatusClasses(invoice.status))}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-right">
                  <Link to={`/invoice/${invoice.id}`}>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
