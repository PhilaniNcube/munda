"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  BookOpen, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

const FAQS = [
  {
    question: "How do I add a new farm location?",
    answer: "You can add new locations in the Settings > Farm tab. Click on 'Add Location' and follow the prompts."
  },
  {
    question: "Can I export my financial reports?",
    answer: "Yes, navigate to the Financial Ledger and use the 'Export' button at the top right of the transaction table."
  },
  {
    question: "How is my data secured?",
    answer: "We use industry-standard encryption for all data at rest and in transit. Your data is stored securely and never shared with third parties."
  },
  {
    question: "What happens if I lose my password?",
    answer: "You can reset your password from the sign-in page by clicking 'Forgot Password'. A reset link will be sent to your registered email."
  }
];

export function SupportContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Contact & Resources */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="elevation-1 border-none overflow-hidden">
          <div className="bg-agri-primary p-6 text-white">
            <h3 className="text-xl font-bold mb-1">Contact Us</h3>
            <p className="text-sm opacity-90">Our support team is here to help you 24/7.</p>
          </div>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-agri-surface-container p-2 rounded-md">
                <Mail className="h-5 w-5 text-agri-primary" />
              </div>
              <div>
                <p className="font-semibold text-agri-on-surface">Email Support</p>
                <p className="text-sm text-agri-on-surface-variant">support@munda.co.za</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-agri-surface-container p-2 rounded-md">
                <Phone className="h-5 w-5 text-agri-primary" />
              </div>
              <div>
                <p className="font-semibold text-agri-on-surface">Phone Support</p>
                <p className="text-sm text-agri-on-surface-variant">+27 (0) 12 345 6789</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-agri-surface-container p-2 rounded-md">
                <MessageSquare className="h-5 w-5 text-agri-primary" />
              </div>
              <div>
                <p className="font-semibold text-agri-on-surface">Live Chat</p>
                <p className="text-sm text-agri-on-surface-variant">Available Mon-Fri, 9am-5pm</p>
              </div>
            </div>
            <Button className="w-full mt-4 bg-agri-primary hover:bg-agri-primary/90 text-white">
              Start a Conversation
            </Button>
          </CardContent>
        </Card>

        <Card className="elevation-1 border-none">
          <CardHeader>
            <CardTitle className="text-h3 text-agri-on-surface">Quick Resources</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-agri-outline-variant">
              <a href="#" className="flex items-center justify-between p-4 hover:bg-agri-surface-container-low transition-colors">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-agri-secondary" />
                  <span className="text-sm font-medium">User Guide</span>
                </div>
                <ExternalLink className="h-4 w-4 text-agri-on-surface-variant" />
              </a>
              <a href="#" className="flex items-center justify-between p-4 hover:bg-agri-surface-container-low transition-colors">
                <div className="flex items-center space-x-3">
                  <ExternalLink className="h-5 w-5 text-agri-secondary" />
                  <span className="text-sm font-medium">Video Tutorials</span>
                </div>
                <ExternalLink className="h-4 w-4 text-agri-on-surface-variant" />
              </a>
              <a href="#" className="flex items-center justify-between p-4 hover:bg-agri-surface-container-low transition-colors">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-agri-secondary" />
                  <span className="text-sm font-medium">Community Forum</span>
                </div>
                <ExternalLink className="h-4 w-4 text-agri-on-surface-variant" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: FAQ & Ticket Submission */}
      <div className="lg:col-span-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-h2 text-agri-on-surface">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <Card key={index} className="elevation-1 border-none">
                <CardHeader className="p-4 cursor-pointer hover:bg-agri-surface-container-low transition-colors flex flex-row items-center justify-between">
                  <h4 className="font-semibold text-agri-on-surface">{faq.question}</h4>
                  <ChevronRight className="h-4 w-4 text-agri-on-surface-variant" />
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-sm text-agri-on-surface-variant">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="elevation-1 border-none">
          <CardHeader>
            <CardTitle className="text-h2 text-agri-on-surface">Submit a Support Ticket</CardTitle>
            <CardDescription className="text-body-md text-agri-on-surface-variant">
              Can't find what you're looking for? Send us a detailed message and we'll get back to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-label-caps">Subject</Label>
                <Input id="subject" placeholder="What do you need help with?" className="bg-agri-surface-container-low" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-label-caps">Category</Label>
                <select id="category" className="w-full h-10 px-3 py-2 text-sm bg-agri-surface-container-low border border-agri-outline-variant rounded-md outline-none focus:ring-1 focus:ring-agri-primary">
                  <option>General Inquiry</option>
                  <option>Technical Issue</option>
                  <option>Billing Question</option>
                  <option>Feature Request</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-label-caps">Message</Label>
              <textarea 
                id="message" 
                rows={5} 
                className="w-full p-3 text-sm bg-agri-surface-container-low border border-agri-outline-variant rounded-md outline-none focus:ring-1 focus:ring-agri-primary"
                placeholder="Please describe your issue in detail..."
              />
            </div>
          </CardContent>
          <CardHeader className="pt-0">
            <Button className="bg-agri-primary hover:bg-agri-primary/90 text-white">
              Submit Ticket
            </Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
