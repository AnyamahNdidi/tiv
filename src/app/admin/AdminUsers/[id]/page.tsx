"use client";
import { useState } from "react";
import {
  ArrowLeft,
  Edit,
  UserX,
  Shield,
  Users,
  Settings,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteAdminUserMutation,
  useGetAdminUserDetailQuery,
  useListRolesQuery,
  useUpdateAdminUserMutation,
} from "@/lib/redux/api/adminUserApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PageProps {
  params: { id: string };
}

// const adminData = {
//   id: 1,
//   first_name: "ifeanyi",
//   last_name: "onovo",
//   email: "ifeanyi@maekandex.com.ng",
//   admin_roles: "Sudo",
//   role_permissions: [
//     {
//       section: "overview",
//       can_view: true,
//       can_edit: false,
//       can_delete: false,
//       can_hide: false,
//       can_create: false,
//     },
//     {
//       section: "authorization",
//       can_view: true,
//       can_edit: false,
//       can_delete: false,
//       can_hide: false,
//       can_create: true,
//     },
//     {
//       section: "user_management",
//       can_view: true,
//       can_edit: true,
//       can_delete: false,
//       can_hide: false,
//       can_create: true,
//     },
//     {
//       section: "inspection",
//       can_view: true,
//       can_edit: true,
//       can_delete: false,
//       can_hide: false,
//       can_create: true,
//     },
//     {
//       section: "verification",
//       can_view: true,
//       can_edit: true,
//       can_delete: false,
//       can_hide: false,
//       can_create: true,
//     },
//     {
//       section: "finance",
//       can_view: true,
//       can_edit: true,
//       can_delete: false,
//       can_hide: false,
//       can_create: true,
//     },
//   ],
// };

const getRoleBadgeColor = (role: string) => {
  switch (role.toLowerCase()) {
    case "sudo":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "super":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "developer":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const formatSectionName = (section: string) => {
  return section
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getPermissionCount = (permissions: any[], type: string) => {
  return permissions?.filter((p) => p[type]).length;
};

const AdminUserDetails = ({ params }: PageProps) => {
  const router = useRouter();
  const { data: adminData, isLoading: isLoadingAdminData } =
    useGetAdminUserDetailQuery(params?.id);
  const { data: roles } = useListRolesQuery({});
  const [updateAdmin] = useUpdateAdminUserMutation();
  const [deleteAdmin] = useDeleteAdminUserMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  console.log("adminData", adminData);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    first_name: adminData?.first_name,
    last_name: adminData?.last_name,
    email: adminData?.email,
    admin_roles: adminData?.admin_roles,
  });

  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<any>(null);
  const [permissionFormData, setPermissionFormData] = useState({
    section: "",
    can_view: false,
    can_edit: false,
    can_delete: false,
    can_hide: false,
    can_create: false,
  });

  const handleEditAdmin = () => {
    setEditFormData({
      first_name: adminData?.first_name,
      last_name: adminData?.last_name,
      email: adminData?.email,
      admin_roles: adminData?.admin_roles,
    });
    setIsEditModalOpen(true);
  };

  const handleDeactivateAdmin = async () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAdmin(adminData.id).unwrap();
      toast.success("Admin deleted successfully!");
      setIsDeleteModalOpen(false);
      router.push("/admin/AdminUsers");
    } catch (error) {
      toast.error("Failed to delete admin");
      console.error("Admin deletion error:", error);
    }
  };

  const handleResetPassword = () => {
    setIsLoading(true);
    console.log("Resetting password for:", adminData.email);
    setTimeout(() => {
      setIsLoading(false);
      alert("Password reset email sent!");
    }, 1000);
  };

  // const handleManagePermissions = () => {
  //   console.log("Managing permissions for admin:", adminData.id);
  //   alert("Permission management modal would open here");
  // };

  // const handleUpdateRole = () => {
  //   console.log("Updating role for admin:", adminData.id);
  //   alert("Role update dialog would open here");
  // };

  const handleEditPermission = (section: string) => {
    const permission = adminData.role_permissions.find(
      (p: any) => p.section === section
    );
    if (permission) {
      setEditingPermission(permission);
      setPermissionFormData({
        section: permission.section,
        can_view: permission.can_view,
        can_edit: permission.can_edit,
        can_delete: permission.can_delete,
        can_hide: permission.can_hide,
        can_create: permission.can_create,
      });
      setIsPermissionModalOpen(true);
    }
  };

  const handleSavePermission = () => {
    console.log("Saving permission data:", permissionFormData);
    // Here you would typically make an API call to update the permission
    setIsPermissionModalOpen(false);
    alert(
      `Permissions for ${formatSectionName(
        permissionFormData.section
      )} updated successfully!`
    );
  };

  const handlePermissionToggle = (field: string, value: boolean) => {
    setPermissionFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveAdmin = async () => {
    try {
      await updateAdmin({
        admin_id: adminData.id,
        ...editFormData,
      }).unwrap();
      toast.success("Admin details updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update admin details");
      console.error("Admin update error:", error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fullName = `${adminData?.first_name} ${adminData?.last_name}`;
  const totalSections = adminData?.role_permissions.length;
  const viewableCount = getPermissionCount(
    adminData?.role_permissions,
    "can_view"
  );
  const editableCount = getPermissionCount(
    adminData?.role_permissions,
    "can_edit"
  );
  if (isLoadingAdminData) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
      </div>
    );
  }

  // Update the back button to use router
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">{fullName}</h1>
              <Badge className={getRoleBadgeColor(adminData.admin_roles)}>
                {adminData.admin_roles}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEditAdmin}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Admin
            </Button>
            <Button variant="destructive" onClick={handleDeactivateAdmin}>
              <UserX className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Sections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalSections}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Viewable Sections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{viewableCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Editable Sections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{editableCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Details */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Full Name</div>
                  <div className="font-medium">{fullName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Email</div>
                  <div className="font-medium">{adminData.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Admin ID</div>
                  <div className="font-medium">#{adminData.id}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Admin Role</div>
                  <Badge className={getRoleBadgeColor(adminData.admin_roles)}>
                    {adminData.admin_roles}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Permissions Count
                  </div>
                  <div className="font-medium">{totalSections} sections</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Active
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Actions */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                <Shield className="w-4 h-4 mr-2" />
                {isLoading ? "Sending..." : "Reset Password"}
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleManagePermissions}
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Permissions
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700"
                onClick={handleUpdateRole}
              >
                <Settings className="w-4 h-4 mr-2" />
                Update Role
              </Button>
            </div>
          </CardContent>
        </Card> */}

        {/* Permissions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="permissions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
                <TabsTrigger value="activity">Activity Log</TabsTrigger>
              </TabsList>
              <TabsContent value="permissions" className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search permissions..."
                    className="max-w-sm"
                  />
                </div>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Section</TableHead>
                        <TableHead className="text-center">View</TableHead>
                        <TableHead className="text-center">Edit</TableHead>
                        <TableHead className="text-center">Create</TableHead>
                        <TableHead className="text-center">Delete</TableHead>
                        <TableHead className="text-center">Hide</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminData.role_permissions.map(
                        (permission: any, index: any) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {formatSectionName(permission.section)}
                            </TableCell>
                            <TableCell className="text-center">
                              {permission.can_view ? (
                                <Eye className="w-4 h-4 text-green-600 mx-auto" />
                              ) : (
                                <EyeOff className="w-4 h-4 text-gray-400 mx-auto" />
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {permission.can_edit ? (
                                <Edit className="w-4 h-4 text-blue-600 mx-auto" />
                              ) : (
                                <Edit className="w-4 h-4 text-gray-400 mx-auto" />
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {permission.can_create ? (
                                <Plus className="w-4 h-4 text-green-600 mx-auto" />
                              ) : (
                                <Plus className="w-4 h-4 text-gray-400 mx-auto" />
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {permission.can_delete ? (
                                <Trash2 className="w-4 h-4 text-red-600 mx-auto" />
                              ) : (
                                <Trash2 className="w-4 h-4 text-gray-400 mx-auto" />
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              {permission.can_hide ? (
                                <EyeOff className="w-4 h-4 text-orange-600 mx-auto" />
                              ) : (
                                <EyeOff className="w-4 h-4 text-gray-400 mx-auto" />
                              )}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleEditPermission(permission.section)
                                }
                              >
                                view
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="activity" className="space-y-4">
                <div className="text-center py-8 text-gray-500">
                  No activity logs found.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Edit Admin Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Admin Details</DialogTitle>
              <DialogDescription>
                Make changes to the admin profile here. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="first_name" className="text-right">
                  First Name
                </Label>
                <Input
                  id="first_name"
                  value={editFormData.first_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("first_name", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="last_name" className="text-right">
                  Last Name
                </Label>
                <Input
                  id="last_name"
                  value={editFormData.last_name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("last_name", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("email", e.target.value)
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Admin Role
                </Label>
                <Select
                  value={editFormData.admin_roles}
                  onValueChange={(value: string) =>
                    handleInputChange("admin_roles", value)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles?.map((role: any) => (
                      <SelectItem key={role.id} value={role.role}>
                        {role.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveAdmin}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Permission Modal */}
        <Dialog
          open={isPermissionModalOpen}
          onOpenChange={setIsPermissionModalOpen}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Permissions</DialogTitle>
              <DialogDescription>
                Manage permissions for the{" "}
                {editingPermission
                  ? formatSectionName(editingPermission.section)
                  : ""}{" "}
                section.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-medium">View Access</div>
                      <div className="text-sm text-gray-500">
                        Can view content in this section
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="can_view"
                      checked={permissionFormData.can_view}
                      onChange={(e) =>
                        handlePermissionToggle("can_view", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Edit className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium">Edit Access</div>
                      <div className="text-sm text-gray-500">
                        Can modify existing content
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="can_edit"
                      checked={permissionFormData.can_edit}
                      onChange={(e) =>
                        handlePermissionToggle("can_edit", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Plus className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-medium">Create Access</div>
                      <div className="text-sm text-gray-500">
                        Can create new content
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="can_create"
                      checked={permissionFormData.can_create}
                      onChange={(e) =>
                        handlePermissionToggle("can_create", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Trash2 className="w-4 h-4 text-red-600" />
                    <div>
                      <div className="font-medium">Delete Access</div>
                      <div className="text-sm text-gray-500">
                        Can delete content permanently
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="can_delete"
                      checked={permissionFormData.can_delete}
                      onChange={(e) =>
                        handlePermissionToggle("can_delete", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <EyeOff className="w-4 h-4 text-orange-600" />
                    <div>
                      <div className="font-medium">Hide Access</div>
                      <div className="text-sm text-gray-500">
                        Can hide content from others
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="can_hide"
                      checked={permissionFormData.can_hide}
                      onChange={(e) =>
                        handlePermissionToggle("can_hide", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Permission Summary
                </div>
                <div className="text-xs text-gray-600">
                  This admin will have{" "}
                  {Object.values(permissionFormData).filter((v) => v === true)
                    .length - 1}{" "}
                  permissions enabled for the{" "}
                  {formatSectionName(permissionFormData.section)} section.
                </div>
              </div>
            </div>
            {/* <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsPermissionModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSavePermission}>Save Permissions</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Admin</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this admin? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Delete Admin
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminUserDetails;
