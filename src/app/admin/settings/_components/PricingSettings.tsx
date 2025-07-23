import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  useUpdateServiceChargeMutation,
  useUpdateBonusChargeMutation,
  useUpdateInspectionChargeMutation,
} from "@/lib/redux/api/financeApi";

const PricingSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [pricingData, setPricingData] = useState<any>({
    serviceCharge: {
      amount: 0,
    },
    bonusCharge: {
      amount: 0,
    },
    inspectionCharge: {
      amount: 0,
    },
  });

  // RTK Query mutation hooks
  const [updateServiceCharge] = useUpdateServiceChargeMutation();
  const [updateBonusCharge] = useUpdateBonusChargeMutation();
  const [updateInspectionCharge] = useUpdateInspectionChargeMutation();

  const handleUpdatePricing = async () => {
    setIsLoading(true);

    try {
      const apiCalls = [];
      const updatedCharges = [];

      // Check which fields have values and prepare API calls
      if (
        pricingData.serviceCharge.amount &&
        parseFloat(pricingData.serviceCharge.amount) > 0
      ) {
        apiCalls.push(
          updateServiceCharge({
            amount: parseFloat(pricingData.serviceCharge.amount),
          }).unwrap()
        );
        updatedCharges.push("Service Charge");
      }

      if (
        pricingData.bonusCharge.amount &&
        parseFloat(pricingData.bonusCharge.amount) > 0
      ) {
        apiCalls.push(
          updateBonusCharge({
            amount: parseFloat(pricingData.bonusCharge.amount),
          }).unwrap()
        );
        updatedCharges.push("Bonus Charge");
      }

      if (
        pricingData.inspectionCharge.amount &&
        parseFloat(pricingData.inspectionCharge.amount) > 0
      ) {
        apiCalls.push(
          updateInspectionCharge({
            amount: parseFloat(pricingData.inspectionCharge.amount),
          }).unwrap()
        );
        updatedCharges.push("Inspection Charge");
      }

      // Execute all API calls simultaneously
      if (apiCalls.length > 0) {
        await Promise.all(apiCalls);

        const message =
          updatedCharges.length === 1
            ? `${updatedCharges[0]} updated successfully!`
            : `${updatedCharges.join(", ")} updated successfully!`;

        toast.success("Pricing Updated", {
          description: message,
        });

        console.log("All pricing updates completed successfully");
        console.log("Updated pricing:", pricingData);
      } else {
        toast.warning("No Changes", {
          description: "Please enter at least one valid amount to update",
        });
      }
    } catch (error) {
      console.error("Error updating pricing:", error);
      toast.error("Update Failed", {
        description: "Failed to update pricing. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Update Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceAmount">Service Charge Amount</Label>
              <Input
                id="serviceAmount"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                value={pricingData.serviceCharge.amount}
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    serviceCharge: {
                      ...pricingData.serviceCharge,
                      amount: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bonusAmount">Bonus Charge Amount</Label>
              <Input
                id="bonusAmount"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                value={pricingData.bonusCharge.amount}
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    bonusCharge: {
                      ...pricingData.bonusCharge,
                      amount: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inspectionAmount">Inspection Charge Amount</Label>
              <Input
                id="inspectionAmount"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
                value={pricingData.inspectionCharge.amount}
                onChange={(e) =>
                  setPricingData({
                    ...pricingData,
                    inspectionCharge: {
                      ...pricingData.inspectionCharge,
                      amount: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
          <Button
            onClick={handleUpdatePricing}
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Updating..." : "Update Pricing"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingSettings;
