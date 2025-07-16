import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useListRolesQuery } from "@/lib/redux/api/adminUserApi";
import {
  useListSectionsQuery,
  useAssignPermissionsMutation,
} from "@/lib/redux/api/authorizationApi";
// import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { toast } from "sonner";
type Permission =
  | "can_view"
  | "can_edit"
  | "can_hide"
  | "can_create"
  | "can_delete";
interface PermissionData {
  role_id: number | "";
  section_id: number | "";
  can_view: boolean;
  can_edit: boolean;
  can_hide: boolean;
  can_create: boolean;
  can_delete: boolean;
}
export const PermissionSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: roles, isLoading: rolesLoading } = useListRolesQuery({});
  const { data: sections, isLoading: sectionsLoading } = useListSectionsQuery(
    {}
  );
  console.log("sections", sections);
  console.log("roles", roles);
  const [assignPermissions, { isLoading: isLoadingPermission }] =
    useAssignPermissionsMutation();

  const [permissionData, setPermissionData] = useState<PermissionData>({
    role_id: "",
    section_id: "",
    can_view: false,
    can_edit: false,
    can_hide: false,
    can_create: false,
    can_delete: false,
  });
  const handleAssignPermissions = async () => {
    try {
      if (!permissionData.role_id || !permissionData.section_id) {
        toast.error("Please select both role and section");
        return;
      }

      await assignPermissions({
        ...permissionData,
        role_id: Number(permissionData.role_id),
        section_id: Number(permissionData.section_id),
      }).unwrap();

      toast.success("Permissions assigned successfully");
    } catch (error) {
      toast.error("Failed to assign permissions");
      console.error("Permission assignment error:", error);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Assign Permissions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roleId">Role</Label>
              <Select
                value={permissionData.role_id as any}
                onValueChange={(value) =>
                  setPermissionData({
                    ...permissionData,
                    role_id: value as any,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles?.map((role: any) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sectionId">Section</Label>
              <Select
                value={permissionData.section_id as any}
                onValueChange={(value) =>
                  setPermissionData({
                    ...permissionData,
                    section_id: value as any,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {sections?.map((section: any) => (
                    <SelectItem key={section.id} value={section.id.toString()}>
                      {section.section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Permissions</Label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: "can_view" as Permission, label: "CAN VIEW" },
                { id: "can_edit" as Permission, label: "CAN EDIT" },
                { id: "can_hide" as Permission, label: "CAN HIDE" },
                { id: "can_create" as Permission, label: "CAN CREATE" },
                { id: "can_delete" as Permission, label: "CAN DELETE" },
              ].map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    id={permission.id}
                    checked={permissionData[permission.id]}
                    onChange={(e) =>
                      setPermissionData({
                        ...permissionData,
                        [permission.id]: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <Label htmlFor={permission.id} className="text-sm">
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleAssignPermissions}
            disabled={isLoadingPermission || sectionsLoading || rolesLoading}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoadingPermission ? "Assigning..." : "Assign Permissions"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
