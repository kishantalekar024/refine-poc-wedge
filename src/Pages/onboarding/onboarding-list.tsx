import { useTable, List, TagField } from "@refinedev/antd";
import { Input, Select, Table, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const statusColors: { [key: string]: string } = {
  IN_PROGRESS: "blue",
  MANUAL_IDV_REQUESTED: "orange",
  FAILED: "red",
  REJECTED: "volcano",
  COMPLETED: "green",
};

export const OnboardingList = () => {
  const { tableProps, searchFormProps } = useTable<IOnboarding>({
    sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    filters: {
      permanent: [
        { field: "email", operator: "contains", value: "" },
        { field: "status", operator: "eq", value: "" },
        { field: "failureReason", operator: "eq", value: "" },
        { field: "createdAt", operator: "gte", value: "" },
        { field: "createdAt", operator: "lte", value: "" },
      ],
    },
  });

  return (
    <List>
      <Filter {...searchFormProps} />
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => (
            <TagField value={value} color={statusColors[value]} />
          )}
        />
        <Table.Column dataIndex="failureReason" title="Failure Reason" />
        {/* Add other columns as needed */}
      </Table>
    </List>
  );
};

const Filter = (props: any) => (
  <Form {...props} layout="vertical">
    <Form.Item name="email" label="Search Email">
      <Input prefix={<SearchOutlined />} />
    </Form.Item>
    <Form.Item name="status" label="Status">
      <Select
        options={[
          { value: "IN_PROGRESS", label: "In Progress" },
          { value: "MANUAL_IDV_REQUESTED", label: "Manual IDV Requested" },
          { value: "FAILED", label: "Failed" },
          { value: "REJECTED", label: "Rejected" },
          { value: "COMPLETED", label: "Completed" },
        ]}
      />
    </Form.Item>
    {/* Add other filters */}
  </Form>
);

export interface IOnboarding {
  id: string;
  email: string;
  status:
    | "IN_PROGRESS"
    | "MANUAL_IDV_REQUESTED"
    | "FAILED"
    | "REJECTED"
    | "COMPLETED";
  ird_number: string;
  intended_transaction_count: number;
  intended_transaction_amount: number;
  phone_number: string;
  failureReason?: string;
  manualNotes: string;
  isManualOverridden: boolean;
  overriddenBy?: string;
  overriddenTimestamp?: string;
}

export interface IIDV {
  id: string;
  onboardingId: string;
  type: "document_verification" | "biometric" | "address_check";
  status: "pending" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  method: "automatic" | "manual";
}
