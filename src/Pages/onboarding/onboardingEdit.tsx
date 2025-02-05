// import {
//   useTable,
//   useMany,
//   List,
//   DateField,
//   TagField,
//   TextField,
//   useSelect,
//   FilterDropdown,
//   Edit,
// } from "@refinedev/antd";
// import { HttpError, useForm, useGetToPath } from "@refinedev/core";
// import { Input, Select, Table, Form, Space, InputNumber } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { IOnboarding } from "./onboarding-list";

// const hasCompletedIDV = (onboardingId: string) => {
//   const idvs = idvData.filter(
//     (idv) => idv.onboardingId === onboardingId && idv.status === "completed"
//   );
//   return idvs.length > 0;
// };

// const OnboardingEdit = () => {
//   const { formProps, saveButtonProps, queryResult } = useForm<IOnboarding>();

//   const currentStatus = queryResult?.data?.data?.status;

//   return (
//     <Edit saveButtonProps={saveButtonProps}>
//       <Form {...formProps} layout="vertical">
//         <Form.Item label="Email" name="email">
//           <Input disabled />
//         </Form.Item>

//         <Form.Item
//           label="Status"
//           name="status"
//           rules={[
//             ({ getFieldValue }) => ({
//               validator(_, value) {
//                 if (currentStatus === "COMPLETED" && value !== "COMPLETED") {
//                   return Promise.reject("Cannot change from COMPLETED status");
//                 }
//                 if (
//                   value === "COMPLETED" &&
//                   !hasCompletedIDV(getFieldValue("id"))
//                 ) {
//                   return Promise.reject("Requires at least one completed IDV");
//                 }
//                 return Promise.resolve();
//               },
//             }),
//           ]}
//         >
//           <Select
//             disabled={
//               !["MANUAL_IDV_REQUESTED", "REJECTED"].includes(currentStatus)
//             }
//             options={statusOptions}
//           />
//         </Form.Item>

//         {/* Add other form fields */}
//       </Form>
//     </Edit>
//   );
// };
