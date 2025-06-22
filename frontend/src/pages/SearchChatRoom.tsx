import React from "react";
import { MainPageTitle } from "../components/MainPageTitle";
import { FaPaperPlane } from "react-icons/fa6";

export default function SearchChatRoom() {
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <MainPageTitle
        Title="Ruang Chat"
        Subtitle="Lanjutkan percakapan anda disini. Tenang, kode chat setiap orang unik, dan tidak dapat diakses oleh orang lain"
      />

      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-row justify-between border border-zinc-500 p-4 rounded-2xl gap-4 max-w-6xl">
          <input
            name="kodechat"
            placeholder="Masukan kode ruang chat"
            className=""
          />
          <button type="submit" className="cursor-pointer">
            <FaPaperPlane />
          </button>
        </div>
      </form>

      <p className="text-sm mt-4 opacity-25 break-words max-w-md text-center">
        Data percakapan akan terhapus dalam 15 menit. Jika ruang chat tidak
        ditemukan maka sudah dihapus pada sistem atau kode tidak valid{" "}
      </p>
    </>
  );
}
