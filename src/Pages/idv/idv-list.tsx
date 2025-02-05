import { useTable } from "@refinedev/antd";
import { Table, Tag } from "antd";

const IDVList = () => {
  const { tableProps } = useTable<IIDV>({
    resource: "idvs",
    filters: {
      permanent: [{ field: "onboardingId", operator: "eq", value: "" }],
    },
  });

  return (
    <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="type" title="Type" />
      <Table.Column
        dataIndex="status"
        title="Status"
        render={(value) => <Tag color={idvStatusColors[value]}>{value}</Tag>}
      />
      <Table.Column dataIndex="createdAt" title="Created" />
      <Table.Column dataIndex="method" title="Method" />
    </Table>
  );
};
