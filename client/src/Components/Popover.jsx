import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
import axios from "axios";

const Popover = ({ name, setRedirect }) => {
  const [newName, setNewName] = useState(name);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);

  const saveChanges = async () => {
    if (newPassword !== confirmedPassword) {
      toast.error("New Password and Confirm Password didn't match");
    } else {
      await axios.put("/user", { newName, newPassword });
      toast.success("Profile Updated Successfully!");
      await axios.post("/user/logout");
      setRedirect("/login");
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-gray-400 font-medium text-[17px] rounded-3xl px-5 py-2 flex gap-2 items-center justify-center hover:scale-105 transition-all sm:px-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          Edit profile
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white py-[25px] px-[15px]
      shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none flex flex-col items-center gap-2"
        >
          <Dialog.Title className="text-center text-[21px] font-bold text-pink mb-12 mt-4">
            Edit profile
          </Dialog.Title>
          <fieldset className="mb-[15px] flex items-center gap-2 w-full xs:gap-4">
            <label className="text-center text-[15px] w-[110px] font-semibold">
              Name
            </label>
            <input
              className="w-full inline-flex h-[35px] flex-1 items-center justify-center rounded-[10px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-pink"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-2 w-full xs:gap-4">
            <label className="text-center text-[15px] w-[110px] font-semibold">
              New Password
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[10px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px]  outline-pink"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-2 w-full xs:gap-4">
            <label className="text-center text-[15px] w-[110px] font-semibold">
              Confirm Password
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[10px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px]  outline-pink"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </fieldset>
          <div className="mt-[20px] flex justify-end bg-pink w-[150px] rounded-3xl px-1 py-0.5 hover:scale-105 transition-all">
            <Dialog.Close asChild>
              <button
                className="text-white inline-flex h-[35px] items-center justify-center rounded-[4px] 
                px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none text-[17px]
                "
                onClick={saveChanges}
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[30px] w-[30px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
export default Popover;
