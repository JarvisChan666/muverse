import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import Input from "@/components/Input";
import { Button } from "@/components/Button";

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        birthday: "",
        favoriteIdol: "",
        height: "",
        weight: "",
        personality: "",
        appearance: "",
        dietaryRestrictions: "",
    });

    useEffect(() => {
        const savedData = localStorage.getItem("userProfile");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = () => {
        // Handle form submission (e.g., update user profile)
        localStorage.setItem("userProfile", JSON.stringify(formData));
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
                <Input id="birthday" value={formData.birthday} onChange={handleChange} placeholder="Birthday" />
                <Input id="favoriteIdol" value={formData.favoriteIdol} onChange={handleChange} placeholder="Favorite Idol" />
                <Input id="height" value={formData.height} onChange={handleChange} placeholder="Height" />
                <Input id="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" />
                <Input id="personality" value={formData.personality} onChange={handleChange} placeholder="Personality" />
                <Input id="appearance" value={formData.appearance} onChange={handleChange} placeholder="Appearance" />
                <Input id="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} placeholder="Dietary Restrictions" />
                <Button onClick={handleSubmit} className="bg-blue-500">
                    Save
                </Button>
            </div>
        </Modal>
    );
}