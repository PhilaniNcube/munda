"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export function SettingsForm() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8 bg-agri-surface-container">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="farm">Farm</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="space-y-6">
        <Card className="elevation-1 border-none">
          <CardHeader>
            <CardTitle className="text-h2 text-agri-on-surface">Profile Information</CardTitle>
            <CardDescription className="text-body-md text-agri-on-surface-variant">
              Update your personal details and how others see you on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-label-caps">First Name</Label>
                <Input id="first-name" placeholder="John" className="bg-agri-surface-container-low" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-label-caps">Last Name</Label>
                <Input id="last-name" placeholder="Doe" className="bg-agri-surface-container-low" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-label-caps">Email Address</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-agri-surface-container-low" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-label-caps">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+27 (0) 12 345 6789" className="bg-agri-surface-container-low" />
            </div>
          </CardContent>
          <CardFooter className="bg-agri-surface-container-low/50 py-4">
            <Button className="bg-agri-primary hover:bg-agri-primary/90 text-white">Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="farm" className="space-y-6">
        <Card className="elevation-1 border-none">
          <CardHeader>
            <CardTitle className="text-h2 text-agri-on-surface">Farm Settings</CardTitle>
            <CardDescription className="text-body-md text-agri-on-surface-variant">
              Manage your farm's primary information and location.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="farm-name" className="text-label-caps">Farm Name</Label>
              <Input id="farm-name" placeholder="Green Valley Estates" className="bg-agri-surface-container-low" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-label-caps">Primary Location</Label>
              <Input id="location" placeholder="Western Cape, South Africa" className="bg-agri-surface-container-low" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farm-type" className="text-label-caps">Primary Farming Type</Label>
              <Input id="farm-type" placeholder="Mixed (Crops & Livestock)" className="bg-agri-surface-container-low" />
            </div>
          </CardContent>
          <CardFooter className="bg-agri-surface-container-low/50 py-4">
            <Button className="bg-agri-primary hover:bg-agri-primary/90 text-white">Save Farm Details</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6">
        <Card className="elevation-1 border-none">
          <CardHeader>
            <CardTitle className="text-h2 text-agri-on-surface">Notification Preferences</CardTitle>
            <CardDescription className="text-body-md text-agri-on-surface-variant">
              Choose how and when you want to be notified about farm activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-agri-on-surface">Email Notifications</p>
                <p className="text-sm text-agri-on-surface-variant">Receive weekly summaries and critical alerts via email.</p>
              </div>
              <div className="flex items-center space-x-2">
                {/* Simplified checkbox for now */}
                <input type="checkbox" defaultChecked className="accent-agri-primary h-5 w-5" />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-agri-on-surface">Push Notifications</p>
                <p className="text-sm text-agri-on-surface-variant">Get instant updates on your mobile device for task deadlines.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="accent-agri-primary h-5 w-5" />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-agri-on-surface">SMS Alerts</p>
                <p className="text-sm text-agri-on-surface-variant">Urgent alerts regarding equipment failure or livestock health.</p>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="accent-agri-primary h-5 w-5" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-agri-surface-container-low/50 py-4">
            <Button className="bg-agri-primary hover:bg-agri-primary/90 text-white">Update Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <Card className="elevation-1 border-none">
          <CardHeader>
            <CardTitle className="text-h2 text-agri-on-surface">Security Settings</CardTitle>
            <CardDescription className="text-body-md text-agri-on-surface-variant">
              Keep your account secure by managing your password and access.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-label-caps">Current Password</Label>
              <Input id="current-password" type="password" className="bg-agri-surface-container-low" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-label-caps">New Password</Label>
              <Input id="new-password" type="password" className="bg-agri-surface-container-low" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-label-caps">Confirm New Password</Label>
              <Input id="confirm-password" type="password" className="bg-agri-surface-container-low" />
            </div>
          </CardContent>
          <CardFooter className="bg-agri-surface-container-low/50 py-4">
            <Button className="bg-agri-primary hover:bg-agri-primary/90 text-white">Change Password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
