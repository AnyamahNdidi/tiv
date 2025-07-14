"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateRoleMutation } from "@/lib/redux/api/adminUserApi";
import { toast } from "sonner";

interface CreateRoleModalProps {
  onClose: () => void;
}

const CreateRoleModal = ({ onClose }: CreateRoleModalProps) => {
  const [role, setRole] = useState("");
  const [createRole, { isLoading }] = useCreateRoleMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createRole({ role }).unwrap();
      toast.success("Role created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create role");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role Name</Label>
            <Input
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter role name"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#EC5F34] hover:bg-[#D54E2A]"
            >
              {isLoading ? "Creating..." : "Create Role"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoleModal;
