
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, Save, Upload } from "lucide-react";

const AdminSettings = () => {
  const [signupsEnabled, setSignupsEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure global application settings and defaults.
        </p>
      </div>
      
      <Tabs defaultValue="branding">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="tax">Tax Defaults</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="branding" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Default Branding</CardTitle>
              <CardDescription>
                Configure default branding options for new users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultLogo">Default Logo</Label>
                <div className="flex items-center gap-2">
                  <div className="h-16 w-16 rounded border bg-muted flex items-center justify-center">
                    Logo
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" /> 
                    Upload
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex gap-2">
                  <Input type="color" id="primaryColor" className="w-16 h-10" defaultValue="#6E59A5" />
                  <Input defaultValue="#6E59A5" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input type="color" id="secondaryColor" className="w-16 h-10" defaultValue="#9b87f5" />
                  <Input defaultValue="#9b87f5" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultFont">Default Font</Label>
                <select className="w-full p-2 border rounded-md bg-background">
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>Open Sans</option>
                  <option>Lato</option>
                  <option>Montserrat</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Branding Defaults
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Rate Defaults</CardTitle>
              <CardDescription>
                Configure default tax rates for new users.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                <Input id="defaultTaxRate" type="number" min="0" step="0.01" defaultValue="7.5" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taxName">Tax Label</Label>
                <Input id="taxName" defaultValue="Sales Tax" />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="taxEnabled" defaultChecked />
                <Label htmlFor="taxEnabled">Enable tax calculation by default for new users</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Tax Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Customize system email templates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailTemplate">Invoice Email Template</Label>
                <Textarea 
                  id="emailTemplate" 
                  className="min-h-[200px]" 
                  defaultValue={`Dear {{client_name}},

Please find attached invoice {{invoice_number}} for {{amount}}.

Due date: {{due_date}}

Thank you for your business.

Regards,
{{user_name}}
{{company_name}}`} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reminderTemplate">Payment Reminder Template</Label>
                <Textarea 
                  id="reminderTemplate" 
                  className="min-h-[200px]" 
                  defaultValue={`Dear {{client_name}},

This is a friendly reminder that invoice {{invoice_number}} for {{amount}} is due on {{due_date}}.

Please let us know if you have any questions.

Regards,
{{user_name}}
{{company_name}}`} 
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Email Templates
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure global system settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="enableSignups" 
                  checked={signupsEnabled}
                  onCheckedChange={setSignupsEnabled}
                />
                <Label htmlFor="enableSignups">
                  Enable new user registrations
                </Label>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Database Backup
                </Button>
              </div>
              
              <div className="pt-2">
                <Button variant="destructive" className="w-full">
                  Clear All Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
