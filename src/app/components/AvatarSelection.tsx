"use client"
import React from 'react'
import Image from "next/image";

function AvatarSelection({
    setSelectedAvatarVoiceId,
    setSelectedAvatarId,
    }: any) {

    const dataAvatars = [
        {
            url: "https://dynamic.heygen.ai/tr:h-720,c-at_max/avatar/v3/2114731c94764e489ccbb735d0ea454b_38970/preview_target.webp",
            name: "Gala",
            looks: 18,
            avatar_id: "Gala_sitting_casualsofawithipad_front",
            voice_id: "35b75145af9041b298c720f23375f578"
        },
        {
            url: "https://dynamic.heygen.ai/tr:h-720,c-at_max/avatar/v3/e45585843830421496f598bf27e00dee_37140/preview_target.webp",
            name: "Conrad",
            looks: 4,
            avatar_id: "Conrad_sitting_sofa_front",
            voice_id: "5403a745860347beb7d342e07eef33fb"
        },
        {
            url: "https://dynamic.heygen.ai/tr:h-720,c-at_max/avatar/v3/3019184debd34a2e8206c441cad2289d_36670/preview_target.webp",
            name: "Jocelyn",
            looks: 8,
            avatar_id: "Jocelyn_sitting_sofa_front",
            voice_id: "7194df66c861492fb6cc379e99905e22"
        },
    ]
    return (
        <div className="container mx-auto grid p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-center text-8xl font-semibold text-[#333]">Select your Avatar</h1>
            <div className="flex gap-10">

                {dataAvatars.map((data) => {
                    return (
                        <a className="rounded-2xl shadow-md bg-white flex flex-col items-center overflow-hidden"
                            onClick={() => {
                                setSelectedAvatarId(data.avatar_id)
                                setSelectedAvatarVoiceId(data.voice_id)
                            }}
                        >
                            <div className="mb-4 min-h-[600px] max-w-[500px] max-h-[500px] w-full h-full">
                                <Image
                                    alt="avatar-1"
                                    className="object-cover h-full"
                                    src={data.url}
                                    width={600}
                                    height={1000}
                                />
                            </div>
                            <h2 className="text-lg font-medium">{data.name}</h2>
                            <p className="text-sm text-gray-500">{data.looks} look{data.looks > 0 ? "s" : ""}</p>
                        </a>
                    )
                })}

                {/* <a className="rounded-2xl shadow-md bg-white flex flex-col items-center overflow-hidden"
                    onClick={() => console.log("Clicked")}
                >
                    <div className="mb-4 max-w-[500px] max-h-[500px] w-full h-full">
                        <Image
                            alt="avatar-2"
                            className="object-cover h-full"
                            width={1000}
                            height={1000}
                            src={"https://dynamic.heygen.ai/tr:h-720,c-at_max/avatar/v3/2114731c94764e489ccbb735d0ea454b_38970/preview_target.webp"}

                        />
                    </div>
                    <h2 className="text-lg font-medium">Gala</h2>
                    <p className="text-sm text-gray-500">1 look</p>
                </a> */}
                {/* <a className="rounded-2xl shadow-md bg-white flex flex-col items-center overflow-hidden"
                    onClick={() => console.log("Clicked")}
                >
                    <div className="mb-4 max-w-[500px] max-h-[500px] w-full h-full">
                        <Image
                            alt="avatar-2"
                            className="object-cover h-full"
                            width={1000}
                            height={1000}
                            src={"https://dynamic.heygen.ai/tr:h-720,c-at_max/avatar/v3/2114731c94764e489ccbb735d0ea454b_38970/preview_target.webp"}

                        />
                    </div>
                    <h2 className="text-lg font-medium">Gala</h2>
                    <p className="text-sm text-gray-500">1 look</p>
                </a>
                <a className="rounded-2xl shadow-md bg-white flex flex-col items-center overflow-hidden"
                    onClick={() => console.log("Clicked")}
                >
                    <div className="mb-4 max-w-[500px] max-h-[500px] w-full h-full">
                        <Image
                            alt="avatar-3"
                            className="object-cover h-full"
                            width={1000}
                            height={1000}
                            src={"https://dynamic.heygen.ai/tr:h-720,c-at_max/avatar/v3/e45585843830421496f598bf27e00dee_37140/preview_target.webp"}

                        />
                    </div>
                    <h2 className="text-lg font-medium">Conrad</h2>
                    <p className="text-sm text-gray-500">1 look</p>
                </a> */}
            </div>
        </div>
    );
}

export default AvatarSelection