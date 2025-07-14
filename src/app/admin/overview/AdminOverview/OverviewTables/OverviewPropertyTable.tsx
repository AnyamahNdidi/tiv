import { PropertyDetailsType } from "../OverviewTypes/OverviewTenantTypes";
import PropertyDetails from "../PropertyDetails";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl";

interface OverviewPropertyTableProps {
  selectedProperty: PropertyDetailsType | null;
  setSelectedProperty: (property: PropertyDetailsType | null) => void;
  filteredProperties: PropertyDetailsType[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (value: number) => void;
}

const OverviewPropertyTable: React.FC<OverviewPropertyTableProps> = ({
  selectedProperty,
  setSelectedProperty,
  filteredProperties,
  currentPage,
  itemsPerPage,
  totalPages,
  setCurrentPage,
  setItemsPerPage,
}) => {
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("Paginated Properties:", selectedProperty);

  const handlePropertyDetails = (property: PropertyDetailsType) => {
    setSelectedProperty(property);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden p-2">
      {!selectedProperty ? (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm">
                  <th className="py-3 px-4 rounded-tl-lg rounded-bl-lg">
                    <input
                      type="checkbox"
                      className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md"
                    />
                  </th>
                  <th className="py-3 px-4">Property Name</th>
                  <th className="py-3 px-4">Property Type</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Occupants</th>
                  <th className="py-3 px-4">Date Added</th>
                  <th className="py-3 px-4 rounded-tr-lg rounded-br-lg"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedProperties.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-gray-500 py-10 text-sm"
                    >
                      No properties found.
                    </td>
                  </tr>
                ) : (
                  paginatedProperties.map((property, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-100 text-sm"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md"
                        />
                      </td>
                      <td className="py-3 px-4">{property.propertyName}</td>
                      <td className="py-3 px-4">{property.propertyType}</td>
                      <td className="py-3 px-4">{property.location}</td>
                      <td className="py-3 px-4">
                        {property.occupantsNumber} members
                      </td>
                      <td className="py-3 px-4">{property.dateAdded}</td>
                      <td
                        className="py-3 px-4 font-medium text-gray-700 cursor-pointer"
                        onClick={() => handlePropertyDetails(property)}
                      >
                        <StatusBadge status="View" />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ✅ Reusable Pagination Component */}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={(value) => {
              setItemsPerPage(value);
              setCurrentPage(1); // reset page when itemsPerPage changes
            }}
          />
        </>
      ) : (
        <PropertyDetails
          property={selectedProperty as any}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};

export default OverviewPropertyTable;
