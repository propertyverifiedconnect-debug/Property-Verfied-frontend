"use client";

import React, { JSX,useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Building2, ChevronRight, Home, Layers, Map, Square, Hotel, ArrowLeft } from "lucide-react";
import Nav from "@/components/layout/nav";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Page(): JSX.Element {

  const [selectedType, setSelectedType] = useState<string>("House/Villa");
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>("");
  const [constructionStatus, setConstructionStatus] = useState<string>("");

  const propertyIcons: JSX.Element[] = [
    <Building2 key="building" />,
    <Home key="home" />,
    <Hotel key="hotel" />,
    <Map key="map" />,
    <Layers key="layers" />,
    <Square key="square" />,
  ];

  return (
    <>
      <Nav />
      <div className="w-full min-h-screen max-w-2xl mx-auto bg-[#CDE4F9] rounded-2xl shadow-md p-4 space-y-4">
        <div className="flex flex-wrap gap-1 mt-10">
          <div className="flex items-center gap-2 justify-between">
            <Link href={"/dashboard/user"}>
              <Button variant="outline" className="mb-2 ml-2 rounded-full">
                <ArrowLeft />
              </Button>
            </Link>
            <h1 className={`${inter.className} text-xl font-bold text-gray-600 flex items-center justify-center`}>
              Property Filter <ChevronRight />
            </h1>
          </div>

          <div>
            <Input placeholder="Add Location" className="flex-1 w-80 bg-white" />
          </div>

          <Select>
            <SelectTrigger className="w-32 bg-white">
              <SelectValue placeholder="No Min" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1000000">10 Lakh</SelectItem>
              <SelectItem value="5000000">50 Lakh</SelectItem>
              <SelectItem value="10000000">1 Cr</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-32 bg-white">
              <SelectValue placeholder="No Max" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10000000">1 Cr</SelectItem>
              <SelectItem value="20000000">2 Cr</SelectItem>
              <SelectItem value="50000000">5 Cr</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="flex flex-wrap gap-2 p-2">
            {[
              "Flat/Apartment",
              "House/Villa",
              "Serviced Apartment",
              "Plot/Land",
              "Builder Floor",
              "1 RK/Studio Apartment",
            ].map((type: string, ind: number) => (
              <div key={type} className="flex flex-col">
                <Badge
                  variant={selectedType === type ? "default" : "outline"}
                  className="cursor-pointer text-sm py-1"
                  onClick={() => setSelectedType(type)}
                >
                  {propertyIcons[ind]}
                  {type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="bg-white p-4 rounded-2xl border-2 mb-3">
          <h3 className="font-semibold mb-2 text-sm">No. of Bedrooms</h3>
          <div className={`${inter.className} flex flex-wrap gap-2`}>
            {["1 RK/1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"].map((b: string) => (
              <Badge
                key={b}
                variant={selectedBedrooms === b ? "default" : "outline"}
                className="cursor-pointer text-sm py-1"
                onClick={() => setSelectedBedrooms(b)}
              >
                {b}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-white p-3 rounded-2xl border-2">
          <h3 className="font-semibold mb-2 text-sm">Construction Status</h3>
          <div className={`${inter.className} flex flex-wrap gap-2`}>
            {["Ready to move", "New Launch", "Under Construction"].map((s: string) => (
              <Badge
                key={s}
                variant={constructionStatus === s ? "default" : "outline"}
                className="cursor-pointer text-sm py-1"
                onClick={() => setConstructionStatus(s)}
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-3">
          <div className="flex gap-3 items-center justify-between w-full">
            <div className="flex gap-2">
              <Button variant="outline">Clear</Button>
            </div>
            <Link href={"/dashboard/user/find-property/property-list"}>
              <Button className="bg-blue-600 text-white">Apply Property Filter</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
