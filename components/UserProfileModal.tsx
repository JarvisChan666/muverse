import { useState } from "react";
import { Modal } from "@/components/modal";
import Input from "@/components/Input";
import { Button } from "@/components/Button";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Handle form submission (e.g., update user profile)
    console.log(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onClose}
      title="User Profile"
      description="Fill in your personal details."
    >
      <div className="flex flex-col gap-y-4">
        <Input
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <Input
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <Button onClick={handleSubmit} className="bg-blue-500">
          Save
        </Button>
      </div>
    </Modal>
  );
}