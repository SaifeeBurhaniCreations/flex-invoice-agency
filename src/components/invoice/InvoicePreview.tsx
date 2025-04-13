
import React from "react";
import { Card } from "@/components/ui/card";

type LineItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

type InvoicePreviewProps = {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  clientName: string;
  lineItems: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string;
  terms: string;
};

export const InvoicePreview = ({
  invoiceNumber,
  issueDate,
  dueDate,
  clientName,
  lineItems,
  subtotal,
  taxRate,
  taxAmount,
  total,
  notes,
  terms,
}: InvoicePreviewProps) => {
  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="mb-8">
          <div className="text-2xl font-bold text-primary mb-1">FlexInvoice</div>
          <div className="text-sm text-gray-500">Your Company Name</div>
          <div className="text-sm text-gray-500">123 Business St</div>
          <div className="text-sm text-gray-500">City, State 12345</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold mb-2">INVOICE</div>
          <div className="text-sm text-gray-500 mb-1">{invoiceNumber}</div>
          <div className="text-sm text-gray-500 mb-1">
            Issue Date: {new Date(issueDate).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500">
            Due Date: {new Date(dueDate).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      <div className="mt-8 mb-8">
        <div className="font-semibold text-gray-700 mb-2">Bill To:</div>
        <div className="font-medium">{clientName}</div>
        <div className="text-sm text-gray-500">Client Address</div>
        <div className="text-sm text-gray-500">client@example.com</div>
      </div>
      
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 text-gray-600 text-sm font-medium">Description</th>
            <th className="text-right py-2 text-gray-600 text-sm font-medium">Qty</th>
            <th className="text-right py-2 text-gray-600 text-sm font-medium">Rate</th>
            <th className="text-right py-2 text-gray-600 text-sm font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-3 text-sm">
                {item.description || "Item description"}
              </td>
              <td className="py-3 text-sm text-right">{item.quantity}</td>
              <td className="py-3 text-sm text-right">${item.rate.toFixed(2)}</td>
              <td className="py-3 text-sm text-right">${item.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-1">
            <span className="text-sm text-gray-600">Subtotal:</span>
            <span className="text-sm">${subtotal.toFixed(2)}</span>
          </div>
          {taxRate > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-600">Tax ({taxRate}%):</span>
              <span className="text-sm">${taxAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between py-2 font-semibold border-t border-gray-200 mt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {notes && (
        <div className="mb-4">
          <div className="font-semibold text-gray-700 mb-1">Notes:</div>
          <div className="text-sm text-gray-600">{notes}</div>
        </div>
      )}
      
      <div className="mb-4">
        <div className="font-semibold text-gray-700 mb-1">Terms & Conditions:</div>
        <div className="text-sm text-gray-600">{terms}</div>
      </div>
      
      <div className="text-center mt-8 pt-4 border-t text-sm text-gray-500">
        Thank you for your business!
      </div>
    </div>
  );
};
