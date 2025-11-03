"use client";

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import inter from "@/lib/font/Inter";

export default function PartnerOnboarding() {
  const [accepted, setAccepted] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const BASEURL = process.env.NEXT_PUBLIC_API_URL

  // Example project list (replace this with dynamic data if needed)
  const projectOptions = [
    "Sunshine Residency",
    "Green Valley Apartments",
    "Elite Towers",
    "Skyline Enclave",
    "Palm Vista Villas",
  ];

  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    profession: "",
    budgetRange: "",
    projectName: "",
    notes: "",
    referralName: "",
  });

  const handleAccept = () => setAccepted(true);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProjectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      projectName: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASEURL}/api/refer/referInDB`, formData);
      alert("✅ Customer Lead Added Successfully!");
      setFormData({
        customerName: "",
        contactNumber: "",
        profession: "",
        budgetRange: "",
        projectName: "",
        notes: "",
        referralName: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error adding customer lead!" , err);
    }
  };

  if (!accepted) {
    return (
      <motion.div
        className="flex justify-center  items-start mt-10 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className={`${inter.className} w-full max-w-md shadow-lg border`}>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Terms and Condition 
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm text-center">
              Welcome to our <strong>Refer Partner Program</strong>!  
              Please read and accept our Terms & Conditions before continuing.
            </p>

            <ScrollArea className="h-40 border rounded-md p-3 text-sm text-gray-700">
              <p>
                1️⃣ You agree to refer genuine leads only. <br />
                2️⃣ You must ensure the lead’s consent before submission. <br />
                3️⃣ The company reserves the right to verify and approve leads. <br />
                4️⃣ By proceeding, you consent to our privacy and data policies.
              </p>
            </ScrollArea>

            <Button onClick={handleAccept} className="w-full">
              Accept & Continue
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${inter.className} flex justify-center items-start mt-2 min-h-screen `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Add Customer Lead
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
              <Label htmlFor="projectName" className="mb-2">Project Name</Label>
              <Select onValueChange={handleProjectChange} value={formData.projectName}>
                <SelectTrigger id="projectName">
                  <SelectValue placeholder="Select a Project" />
                </SelectTrigger>
                <SelectContent>
                  {projectOptions.map((project, idx) => (
                    <SelectItem key={idx} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="customerName" className="mb-2">Customer Name</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="contactNumber" className="mb-2">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="profession" className="mb-2">Profession</Label>
              <Input
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="budgetRange" className="mb-2">Budget Range / Property Interest</Label>
              <Input
                id="budgetRange"
                name="budgetRange"
                value={formData.budgetRange}
                onChange={handleChange}
              />
            </div>

            {/* Project Name Select */}
       

            <div>
              <Label htmlFor="notes" className="mb-2">Notes / Extra Info</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="showReferral"
                checked={showReferral}
                onCheckedChange={setShowReferral}
              />
              <Label htmlFor="showReferral">Show Referral Person Name</Label>
            </div>

            {showReferral && (
              <div>
                <Label htmlFor="referralName" className="mb-2">Referral Person Name</Label>
                <Input
                  id="referralName"
                  name="referralName"
                  value={formData.referralName}
                  onChange={handleChange}
                />
              </div>
            )}

            <Button type="submit" className="w-full">
              Submit Lead
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
