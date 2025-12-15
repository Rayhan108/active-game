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
} from "@ant-design/icons";

import avatar from "../../assets/avatar.png";

// Sample user data
const allUsers = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: "Nm Sujon",
  email: "nsujon872@gmail.com",
  avatar: avatar,
}));

const ITEMS_PER_PAGE = 8;

export function AllUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
            className="p-2 text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleViewUser(record);
            }}
          >
            <EyeOutlined className="text-lg" />
          </button>
          <button
            type="button"
            className="p-2 text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <TeamOutlined className="text-lg" />
          </button>
        </div>
      ),
    },
  ];

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  // Stats data for the modal
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
      <div className="w-full font-poppins p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-xl font-semibold">All User</h1>
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

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        closable={true}
        width={420}
        centered
        className="bg-[#18181b] text-white rounded-lg p-4 shadow-2xl"
      >
        {selectedUser && (
          <div className="relative">
            {/* Avatar Section */}
            <div className="flex flex-col items-center -mt-8 relative z-10">
              <div className="p-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500">
                <Avatar
                  src={selectedUser.avatar}
                  size={100}
                  className="border-4 border-[#18181b]"
                >
                  <span className="text-3xl">
                    {selectedUser.name.charAt(0)}
                  </span>
                </Avatar>
              </div>

              {/* User Name & Email */}
              <h2 className="text-2xl font-bold text-white mt-4">
                {selectedUser.name}
              </h2>
              <p className="text-gray-400 text-sm mt-1">{selectedUser.email}</p>

              {/* Status Badge */}
              <div className="mt-3 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                <span className="text-emerald-400 text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  Active User
                </span>
              </div>
            </div>

            {/* Stats Section */}
            <div className="px-6 pb-6 mt-6">
              <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">
                User Statistics
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {userStats.map((stat, index) => (
                  <div
                    key={index}
                    className={`${stat.bgColor} rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all hover:scale-105 cursor-default`}
                  >
                    <div className={`${stat.iconColor} mb-2`}>{stat.icon}</div>
                    <p className="text-gray-400 text-xs">{stat.label}</p>
                    <p className="text-white font-semibold text-lg mt-1">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
}
