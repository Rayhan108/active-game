import { useState } from "react";
import {
  Table,
  Input,
  Avatar,
  Pagination,
  ConfigProvider,
  Modal,
  theme,
} from "antd";
import {
  EyeOutlined,
  TeamOutlined,
  SearchOutlined,
  ClockCircleOutlined,
  FireOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import avatar from "../../assets/avatar.png";
import { Delete, Plus } from "lucide-react";

// Sample user data
const allUsers = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: "Nm Sujon",
  email: "nsujon872@gmail.com",
  avatar: avatar,
}));

const ITEMS_PER_PAGE = 8;

export function Admin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddAdminModalVisible, setIsAddAdminModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredUsers.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleViewUser = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  const handleDeleteUser = (record) => {
    setSelectedUser(record);
    setIsDeleteModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleAddAdminModalCancel = () => {
    setIsAddAdminModalVisible(false);
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    // Handle the delete action here (e.g., remove from the list)
    console.log("User deleted:", selectedUser);
    setIsDeleteModalVisible(false);
  };

  const columns = [
    {
      title: "SL",
      key: "serial",
      align: "center",
      render: (_, __, index) => (
        <div className="text-center text-white">{index + 1}</div>
      ),
    },
    {
      title: "User name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name, record) => (
        <div className="flex items-center justify-center gap-3">
          <Avatar src={record.avatar} className="bg-blue-600">
            {name.charAt(0)}
          </Avatar>
          <span className="text-white">{name}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (email) => <span className="text-white">{email}</span>,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="p-2 text-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteUser(record);
            }}
          >
            <DeleteOutlined className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  const userStats = [
    {
      icon: <ClockCircleOutlined className="text-2xl" />,
      label: "Screen Time",
      value: "1h 30min",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: <FireOutlined className="text-2xl" />,
      label: "Movement",
      value: "1200 steps",
      color: "from-orange-500 to-yellow-400",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
    {
      icon: <ThunderboltOutlined className="text-2xl" />,
      label: "Rot Score",
      value: "20",
      color: "from-emerald-500 to-teal-400",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      icon: <TrophyOutlined className="text-2xl" />,
      label: "Pot Won",
      value: "1X Winner",
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#10b981",
          colorBgContainer: "#18181b",
          colorBorderSecondary: "#27272a",
          borderRadius: 8,
          colorText: "#ffffff",
        },
        components: {
          Table: {
            headerBg: "#18181b",
            headerColor: "#ffffff",
            headerSplitColor: "#52525b",
            rowHoverBg: "#27272a80",
            colorBgContainer: "#18181b",
            borderColor: "#3f3f46",
            colorText: "#ffffff",
            colorTextHeading: "#ffffff",
          },
          Input: {
            colorBgContainer: "#27272a",
            colorBorder: "#3f3f46",
            colorText: "#ffffff",
            colorTextPlaceholder: "#71717a",
          },
          Modal: {
            contentBg: "transparent",
            headerBg: "transparent",
            titleColor: "#ffffff",
            colorText: "#ffffff",
            colorIcon: "#a1a1aa",
            colorIconHover: "#ffffff",
          },
        },
      }}
    >
      <div className="w-full font-poppins p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-xl font-semibold">Admin</h1>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined className="text-gray-500" />}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-64 rounded-full"
            style={{ borderRadius: "9999px" }}
          />
          <button
            onClick={() => setIsAddAdminModalVisible(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Admin
          </button>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={paginatedUsers}
          rowKey="id"
          pagination={false}
          className="rounded-lg overflow-hidden font-poppins"
        />

        {/* Pagination */}
        {totalItems > ITEMS_PER_PAGE && (
          <div className="mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={ITEMS_PER_PAGE}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>

      {/* Add Admin Modal */}
      <Modal
        open={isAddAdminModalVisible}
        onCancel={handleAddAdminModalCancel}
        footer={null}
        closable={true}
        width={420}
        centered
        className="bg-[#18181b] text-white rounded-lg p-4 shadow-2xl"
      >
        <h1 className="text-2xl font-bold mb-4">Add New Admin</h1>
        <div className="mb-4">
          <label className="block text-sm text-gray-400">Name</label>
          <Input placeholder="Type here..." className="bg-[#27272a]" />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-400">Email</label>
          <Input placeholder="Type here..." className="bg-[#27272a]" />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-400">Password</label>
          <Input.Password className="bg-[#27272a]" />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-400">User Type</label>
          <Input value="Admin" className="bg-[#27272a]" disabled />
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Admin</button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isDeleteModalVisible}
        onCancel={handleDeleteModalCancel}
        footer={[
          <button
            key="cancel"
            onClick={handleDeleteModalCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-3"
          >
            Cancel
          </button>,
          <button
            key="confirm"
            onClick={handleConfirmDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>,
        ]}
        closable={true}
        centered
        className="bg-[#18181b] text-white rounded-lg p-4 shadow-2xl"
      >
        <h2 className="text-xl font-bold">Are you sure you want to delete this admin?</h2>
        
      </Modal>
    </ConfigProvider>
  );
}
