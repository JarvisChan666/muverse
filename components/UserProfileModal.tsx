import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import Image from "next/image";

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
    const [formData, setFormData] = useState({
        name: "Jelly Chen",
        email: "jellychen@birthday.com",
        birthday: "2022-11-09",
        favoriteIdol: "Krystal Jung",
        height: "167 cm",
        weight: "45 kg",
        personality: "Outgoing, Warm-hearted",
        appearanceLevel: "S Class",
        dietaryRestrictions: "Cilantro and green onions",
        avatar: null
    });

    useEffect(() => {
        const savedData = localStorage.getItem("userProfile");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.id]: e.target.value,
    //     });
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, files } = e.target;
        setFormData({
            ...formData,
            [id]: files ? files[0] : value,
        });
    };

    // const handleSubmit = () => {
    //     // Handle form submission (e.g., update user profile)
    //     localStorage.setItem("userProfile", JSON.stringify(formData));
    //     console.log(formData);
    //     onClose();
    // };
    const handleSubmit = () => {
        const formDataCopy = { ...formData, avatar: null }; // Don't store file in localStorage
        localStorage.setItem("userProfile", JSON.stringify(formDataCopy));
        console.log(formData);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onChange={onClose}
            title="Jelly's Profile"
            description="Jelly, here is your profile!"
        >
            <div className="flex flex-col gap-y-4">
                <div className="relative w-24 h-24">
                    <Image
                        src={
                            formData.avatar
                                ? URL.createObjectURL(formData.avatar)
                                : "/image.jpg"
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full"
                        onError={(event) => {
                            event.currentTarget.src = "/default-avatar.jpg";
                        }}
                    />
                    <Input
                        id="avatar"
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleChange}
                        accept="image/*"
                    />
                </div>
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
                <Input id="appearanceLevel" value={formData.appearanceLevel} onChange={handleChange} placeholder="appearanceLevel" />
                <Input id="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleChange} placeholder="Dietary Restrictions" />
                <Button onClick={handleSubmit} className="bg-blue-500">
                    Save
                </Button>
            </div>
        </Modal>
    );
}