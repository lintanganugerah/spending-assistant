import { BubbleChatAI } from "components/Chat/BubbleChatAI";
import { ReasoningBox } from "components/Chat/ReasoningBox";
import { BubbleChatUser } from "components/Chat/BubbleChatUser";
import { useState } from "react";
import { ChatBox } from "components/Chat/ChatBox";
import Navbar from "components/Navbar";

export default function ChatRoom() {
  const [queryChat, setQueryChat] = useState("");

  const onChange = (value: string) => {
    setQueryChat(value);
  };

  const onSubmit = () => {
    //
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen overflow-y-auto p-4 px-8 xl:px-32">
        <div className="flex-1 space-y-4 mt-4">
          <BubbleChatUser
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit
        amet facilisis enim, tincidunt scelerisque nibh. Vivamus tristique ex ac
        lorem varius, ut semper lacus aliquet. Nullam euismod dui a augue
        dignissim, vitae dignissim dui laoreet. Fusce lacinia massa libero, quis
        commodo mauris dapibus non. Nulla massa ante, mollis at massa a, euismod
        vestibulum risus. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas. Aliquam et mole"
          />

          <ReasoningBox
            header="Reasoning"
            timeElapsed={10}
            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit
        amet facilisis enim, tincidunt scelerisque nibh. Vivamus tristique ex ac
        lorem varius, ut semper lacus aliquet. Nullam euismod dui a augue
        dignissim, vitae dignissim dui laoreet. Fusce lacinia massa libero, quis
        commodo mauris dapibus non. Nulla massa ante, mollis at massa a, euismod
        vestibulum risus. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas. Aliquam et mole"
          />

          <BubbleChatAI
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit
        amet facilisis enim, tincidunt scelerisque nibh. Vivamus tristique ex ac
        lorem varius, ut semper lacus aliquet. Nullam euismod dui a augue
        dignissim, vitae dignissim dui laoreet. Fusce lacinia massa libero, quis
        commodo mauris dapibus non. Nulla massa ante, mollis at massa a, euismod
        vestibulum risus. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas. Aliquam et mole"
          />
        </div>
      </div>

      <div className="sticky w-full bottom-0 pb-4 px-8 xl:px-32">
        <ChatBox
          value={queryChat}
          onChange={onChange}
          onSubmit={onSubmit}
          MaxRows={2}
          TextInformationBottom="Data akan terhapus dalam 15 menit"
        />
      </div>
    </>
  );
}
