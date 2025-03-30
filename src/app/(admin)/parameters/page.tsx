import ModelsTable from "@/components/parameters/tables/model-tables.component";
import { faFilter, faPlus } from "@fortawesome/pro-light-svg-icons"; // Import Plus icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import Link from "next/link";

export default function Page() {
  return (
    <div className="container-fluid overflow-hidden">
      <div className="flex items-center gap-4">
        <h1>Parameters</h1>
      </div>
      <div className="flex items-center justify-between gap-3 mt-5">
        <Link href="/parameters/models">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
            Add a new model <FontAwesomeIcon icon={faPlus} className="icons" />{" "}
            {/* Replace with FontAwesomeIcon */}
          </button>
        </Link>
        <button className="border border-[#000] rounded-md flex items-center gap-2 py-2 px-3">
          Filters <FontAwesomeIcon icon={faFilter} className="icons" />{" "}
          {/* Replace with FontAwesomeIcon */}
        </button>
      </div>
      <div className="overflow-x-auto mt-5">
        <div className="min-w-[1550px]">
          <ModelsTable />
        </div>
      </div>
    </div>
  );
}