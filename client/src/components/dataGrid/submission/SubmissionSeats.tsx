import { SubmissionSeatColumns } from "./SubmissionsSeatColumns";
import { useEmployee } from "@/hooks/query";
import { openSignCanvaModal } from "@/utils/modalUtils";
import BaseMantineTable from "@/components/mantine/BaseMantineTable";
import React from "react";

interface SubmissionSeatsProps {
  employeeId: string;
}

const SubmissionSeats: React.FC<SubmissionSeatsProps> = ({ employeeId }) => {
  const {
    data: submission,
    isRefetching: loading,
    refetch,
  } = useEmployee.Submission(employeeId);

  const columns = SubmissionSeatColumns();

  const handleSubmission = (products: any[]) => {
    openSignCanvaModal({
      userFullName: submission?.employee || "",
      employeeFullName: submission?.user || "",
      employeeStartDate: submission?.employeeStartDate || "",
      employeeTitle: submission?.employeeTitle || "",
      companyName: submission?.company || "",
      department: submission?.department || "",
      products: products.map((product) => ({
        category: product.type,
        title: product.tag,
        quantity: product.quantity,
        description: product.description,
      })) as any,
      assignDate: new Date().toDateString(),
      userSign: new Blob(),
      employeeSign: new Blob(),
      checkType: "CHECKIN",
    });
  };

  return (
    <BaseMantineTable
      data={submission?.products}
      columns={columns}
      isLoading={loading}
      refetch={refetch}
      onDetails={(products) => handleSubmission(products)}
    />
  );
};

export default SubmissionSeats;
