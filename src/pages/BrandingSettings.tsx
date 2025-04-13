
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HexColorPicker } from "react-colorful";
import { ChevronDown, ChevronUp, Save, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock line items for preview
const previewLineItems = [
  {
    id: "1",
    description: "Website Design",
    quantity: 1,
    rate: 1200,
    amount: 1200,
  },
  {
    id: "2",
    description: "Development Hours",
    quantity: 10,
    rate: 85,
    amount: 850,
  }
];

const fontOptions = [
  { value: "inter", label: "Inter (Sans-serif)" },
  { value: "roboto", label: "Roboto (Sans-serif)" },
  { value: "playfair", label: "Playfair Display (Serif)" },
  { value: "montserrat", label: "Montserrat (Sans-serif)" },
  { value: "lora", label: "Lora (Serif)" },
];

const BrandingSettings = () => {
  const [companyName, setCompanyName] = useState("Your Company Name");
  const [companyLogo, setCompanyLogo] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#0284c7");
  const [accentColor, setAccentColor] = useState("#10b981");
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);
  const [font, setFont] = useState("inter");
  const [footerText, setFooterText] = useState("Thank you for your business!");
  const [termsText, setTermsText] = useState("Payment due within 15 days of issue date. Please include the invoice number in your payment reference.");
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Branding Settings</h1>
        <Button>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-5">
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Company Logo</Label>
                <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6 h-32">
                  {companyLogo ? (
                    <div className="relative w-full h-full">
                      <img
                        src={companyLogo}
                        alt="Company Logo"
                        className="object-contain w-full h-full"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-0 right-0"
                        onClick={() => setCompanyLogo("")}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drag & drop a file or click to browse
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Color Theme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-md mr-3 cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                    onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
                    className="ml-2"
                  >
                    {showPrimaryPicker ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
                {showPrimaryPicker && (
                  <div className="mt-2">
                    <HexColorPicker
                      color={primaryColor}
                      onChange={setPrimaryColor}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-md mr-3 cursor-pointer"
                    style={{ backgroundColor: accentColor }}
                    onClick={() => setShowAccentPicker(!showAccentPicker)}
                  />
                  <Input
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAccentPicker(!showAccentPicker)}
                    className="ml-2"
                  >
                    {showAccentPicker ? <ChevronUp /> : <ChevronDown />}
                  </Button>
                </div>
                {showAccentPicker && (
                  <div className="mt-2">
                    <HexColorPicker
                      color={accentColor}
                      onChange={setAccentColor}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font">Font Family</Label>
                <Select value={font} onValueChange={setFont}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Invoice Defaults</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="terms">Default Terms & Conditions</Label>
                <Textarea
                  id="terms"
                  value={termsText}
                  onChange={(e) => setTermsText(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footer">Footer Note</Label>
                <Textarea
                  id="footer"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Invoice Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn("font-" + font)}>
                <InvoicePreview 
                  invoiceNumber="INV-SAMPLE"
                  issueDate="2024-04-13"
                  dueDate="2024-04-28"
                  clientName="Sample Client"
                  lineItems={previewLineItems}
                  subtotal={2050}
                  taxRate={10}
                  taxAmount={205}
                  total={2255}
                  notes=""
                  terms={termsText}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BrandingSettings;
