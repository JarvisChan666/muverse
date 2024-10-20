import { useEffect, useState } from "react";
import { Modal } from "@/components/modal";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import Image from "next/image";
import { Tooltip } from "@/components/Tooltip"; // Import the Tooltip

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
    const [formData, setFormData] = useState({
        name: "Jelly Chen",
        email: "jellychen@birthday.com",
        birthday: "2002-11-09",
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, files } = e.target;
        setFormData({
            ...formData,
            [id]: files ? files[0] : value,
        });
    };

    const handleSubmit = () => {
        const formDataCopy = { ...formData, avatar: null };
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
            <div className="flex flex-col gap-y-4 bg-sky-100 p-6 rounded-lg">
                <div className="relative w-24 h-24">
                    <Image
                        src={
                            formData.avatar
                                ? URL.createObjectURL(formData.avatar)
                                : "/image.png"
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full"
                        onError={(event) => {
                            event.currentTarget.src = "/image.png";
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
                <Tooltip text="Enter your full name">
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </Tooltip>
                <Tooltip text="Enter your email address">
                    <Input
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </Tooltip>
                <Tooltip text="Enter your birthday date">
                    <Input
                        id="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        placeholder="Birthday"
                    />
                </Tooltip>
                <Tooltip text="Enter your favorite idol's name">
                    <Input
                        id="favoriteIdol"
                        value={formData.favoriteIdol}
                        onChange={handleChange}
                        placeholder="Favorite Idol"
                    />
                </Tooltip>
                <Tooltip text="Enter your height in cm">
                    <Input
                        id="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="Height"
                    />
                </Tooltip>
                <Tooltip text="Enter your weight in kg">
                    <Input
                        id="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="Weight"
                    />
                </Tooltip>
                <Tooltip text="Describe your personality traits">
                    <Input
                        id="personality"
                        value={formData.personality}
                        onChange={handleChange}
                        placeholder="Personality"
                    />
                </Tooltip>
                <Tooltip text="Rate your appearance level (e.g., S Class)">
                    <Input
                        id="appearanceLevel"
                        value={formData.appearanceLevel}
                        onChange={handleChange}
                        placeholder="Appearance Level"
                    />
                </Tooltip>
                <Tooltip text="Specify any dietary restrictions">
                    <Input
                        id="dietaryRestrictions"
                        value={formData.dietaryRestrictions}
                        onChange={handleChange}
                        placeholder="Dietary Restrictions"
                    />
                </Tooltip>
                <Button onClick={handleSubmit} className="bg-blue-500">
                    Save
                </Button>
            </div>
        </Modal>
    );
}
