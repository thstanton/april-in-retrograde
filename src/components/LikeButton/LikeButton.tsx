"use client";
import { FaHeart } from "react-icons/fa";
import { userSave, userUnsave } from "./actions";

interface LikeButtonProps {
  saved: boolean;
  userId?: string;
  linkItemId: string;
}

export default function LikeButton({
  saved, userId, linkItemId
}: LikeButtonProps) {

  async function handleSave() {
    if (!saved && userId) {
      await userSave(userId, linkItemId)
    } else if (saved && userId) {
      await userUnsave(userId, linkItemId)
    }
  }

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-blue-900 bg-amber-50 text-lg text-blue-900" onClick={handleSave}>
      {saved && <FaHeart />}
    </div>
  );
}
