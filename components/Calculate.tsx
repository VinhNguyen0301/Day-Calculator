"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export function Calculate() {
  const [mode, setMode] = useState("expiration");
  const [expirationDate, setExpirationDate] = useState("");
  const [daysCount, setDaysCount] = useState("");
  const [calculatedDate, setCalculatedDate] = useState("");

  const handleModeChange = (mode) => {
    setMode(mode);
    setCalculatedDate("");
    setExpirationDate("");
    setDaysCount("");
  };

  const handleExpirationDateChange = (date) => {
    setExpirationDate(date);
    calculateDate(date, daysCount, mode);
  };

  const handleDaysCountChange = (e) => {
    const days = e.target.value;
    setDaysCount(days);
    calculateDate(expirationDate, days, mode);
  };

  const calculateDate = (expirationDate, daysCount, mode) => {
    if (!expirationDate || !daysCount) return;

    const date = new Date(expirationDate);
    const days = parseInt(daysCount, 10);

    if (mode === "expiration") {
      const manufactureDate = new Date(date.getTime() - days * 86400000);
      setCalculatedDate(manufactureDate.toLocaleDateString());
    } else {
      const expiryDate = new Date(date.getTime() + days * 86400000);
      setCalculatedDate(expiryDate.toLocaleDateString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md p-6 space-y-4">
        <CardHeader>
          <CardTitle>App Tính Ngày</CardTitle>
          <CardDescription>
            Dùng để tính ngày hết hạn hoặc ngày sản xuất dựa vào số ngày biết
            trước.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant={mode === "expiration" ? "default" : "outline"}
              onClick={() => handleModeChange("expiration")}
            >
              Chọn ngày hết hạn
            </Button>
            <Button
              variant={mode === "manufacture" ? "default" : "outline"}
              onClick={() => handleModeChange("manufacture")}
            >
              Chọn ngày sản xuất
            </Button>
          </div>
          <div className="grid gap-4 mt-6">
            <div>
              <Label htmlFor="days">Số ngày cần tính toán</Label>
              <Input
                id="days"
                type="number"
                placeholder="Enter days"
                value={daysCount}
                onChange={handleDaysCountChange}
              />
            </div>
            <div>
              <Label htmlFor="expiration">Expiration Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <CalendarDaysIcon className="mr-2 h-4 w-4" />
                    Pick Expiration Date
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(expirationDate)}
                    onSelect={(date) =>
                      handleExpirationDateChange(
                        date.toISOString().slice(0, 10)
                      )
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            {calculatedDate && (
              <div className="grid gap-2 mt-4">
                <Label>
                  {mode === "expiration"
                    ? "Manufacture Date"
                    : "Expiration Date"}
                </Label>
                <div className="text-2xl font-bold">{calculatedDate}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
