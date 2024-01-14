"use client";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";

// Example users data structure
const usersData = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "Bob Smith" },
  // Add more users as needed
];

const roomsData = [
  { id: 1, roomNumber: "101", capacity: 8, bookedSlots: 2, userId: 1 },
  { id: 2, roomNumber: "102", capacity: 6, bookedSlots: 0, userId: null },
  { id: 3, roomNumber: "103", capacity: 14, bookedSlots: 2, userId: 2 },
  { id: 4, roomNumber: "104", capacity: 2, bookedSlots: 1, userId: null },
  { id: 5, roomNumber: "105", capacity: 4, bookedSlots: 3, userId: 3 },
  { id: 6, roomNumber: "106", capacity: 4, bookedSlots: 4, userId: null },
  // Add more rooms as needed
];
const RoomManagementPage = () => {
  const [rooms, setRooms] = useState(roomsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // 'All', 'Full', 'Available'
  const [searchUserId, setSearchUserId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({
    price: "",
    roomName: "",
    capacity: 4,
    size: "",
    bedType: "",
    images: [],
  });
  const handleCreateRoom = () => {
    const newRoom = {
      id: rooms.length + 1,
      roomNumber: formData.roomName,
      capacity: formData.capacity,
      bookedSlots: 0,
      userId: null,
      // Add more properties for other form fields
    };

    setRooms([...rooms, newRoom]);
    setIsModalOpen(false);
    setFormData({
      features: "",
      roomName: "",
      capacity: 4,
      size: "",
      bedType: "",
    });
  };

  const handleStatusChange = (roomId) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id === roomId) {
        return {
          ...room,
          bookedSlots:
            room.bookedSlots === room.capacity ? 0 : room.bookedSlots + 1,
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const handleDeleteRoom = (roomId) => {
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    setRooms(updatedRooms);
  };

  const getUserNameById = (userId) => {
    const user = usersData.find((user) => user.id === userId);
    return user ? user.name : "N/A";
  };

  const handleSearch = () => {
    const filteredRooms = rooms.filter((room) => {
      const matchesStatus =
        statusFilter === "All" || calculateStatus(room) === statusFilter;
      const matchesUserId =
        searchUserId === "" ||
        (room.userId !== null && room.userId.toString().includes(searchUserId));
      return matchesStatus && matchesUserId;
    });
    setSearchResults(filteredRooms);
  };
  const calculateStatus = (room) => {
    if (room.bookedSlots === room.capacity) {
      return "No";
    } else {
      return `${room.bookedSlots} / ${room.capacity}`;
    }
  };

  const calculateAvailability = (room) => {
    console.log({
      slots: room.bookedSlots,
      cap: room.capacity,
      status: +room.bookedSlots === +room.capacity ? "NO" : "YES",
    });
    return +room.bookedSlots === +room.capacity ? "NO" : "YES";
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "roomNumber",
      header: "Room Number",
      cell: ({ row }) => <div>{row.getValue("roomNumber")}</div>,
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Room Number
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{calculateStatus(row.original)}</div>,
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "availability",
      header: "Availability",
      cell: ({ row }) => (
        <div
          className={`${
            calculateAvailability(row.original) === "NO"
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {calculateAvailability(row.original)}
        </div>
      ),
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Availability
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "userId",
      header: "User Name",
      cell: ({ row }) => <div>{getUserNameById(row.original.userId)}</div>,
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="space-x-4">
          <Button onClick={() => handleStatusChange(row.original.id)}>
            Change Status
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteRoom(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Room Management</h1>
      <div className="flex flex-row-reverse container -mb-20">
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2" />
          Create Room
        </Button>
      </div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Room</DialogTitle>
            <DialogDescription>
              Enter room details below and click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomName" className="text-right">
                Room Name
              </Label>
              <Input
                id="roomName"
                type="text"
                value={formData.roomName}
                onChange={(e) =>
                  setFormData({ ...formData, roomName: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacity: Number(e.target.value),
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData((pre) => ({ ...pre, price: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="features" className="text-right">
                Features
              </Label>
              <Input
                id="features"
                type="text"
                value={formData.features}
                onChange={(e) =>
                  setFormData((pre) => ({ ...pre, features: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Size
              </Label>
              <Input
                id="size"
                type="text"
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bedType" className="text-right">
                Bed Type
              </Label>
              <Select
                value={formData.bedType}
                onChange={(value) =>
                  setFormData((pre) => ({
                    ...pre,
                    bedType: value,
                  }))
                }
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select bed type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="double">Double</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="images" className="text-right">
                Images
              </Label>
              <Input
                id="images"
                type="file"
                value={formData.images}
                onChange={(e) =>
                  setFormData({ ...formData, images: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateRoom}>Create Room</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DataTable data={rooms} columns={columns} />
    </div>
  );
};

export default RoomManagementPage;
