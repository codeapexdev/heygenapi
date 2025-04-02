"use client"
import { makeVideo } from '@/action/VideoAPI'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

interface ScriptInputProps {
    avatar_id: string;
    voice_id: string;
  }
  

function ScriptInput({ avatar_id, voice_id }: ScriptInputProps) {
    const router = useRouter();
    const [script, setScript] = useState<string | null>(null)
    const [title, setTitle] = useState<string | null>(null)
    const [width, setWidth] = useState<number | null>(1280)
    const [height, setHeight] = useState<number | null>(720)
    const callback_url = `${process.env.NEXT_PUBLIC_APP_URL}/api/heygen-webhook`
    

    const makeAPICall = async () => {
        if (title && callback_url && width && height && avatar_id && voice_id && script) {            
            try {
                const data: any = await makeVideo({ title, callback_url, width, height, avatar_id, voice_id, script });
                console.log("data", data)
                if (data?.data?.video_id) {
                    // Redirect to the /video/[video_id] page
                    router.push(`/video/${data.data.video_id}`);
                } else {
                    console.error("Video ID not returned:", data);
                    alert("Video generation did not return a video ID. Please try again.");
                }
            } catch (error) {
                console.error("Error during API call:", error);
                alert("An error occurred while generating the video.");
            }
        } else {
            console.log("Missing fields:", title, callback_url, width, height, avatar_id, voice_id, script);
            alert("Please fill in all the fields.");
        }
    };
    // const makeAPICall = async () => {
    //     if (title && callback_url && width && height && avatar_id && voice_id && script) {
    //         console.log("Malking api", title, callback_url, width, height, avatar_id, voice_id, script)
    //         const data:any = await makeVideo({ title, callback_url, width, height, avatar_id, voice_id, script })
    //         if(data?.data?.video_id){
    //             // Redirect to the /video/video_id
    //         }
    //     }else {
    //         console.log("Malking api", title, callback_url, width, height, avatar_id, voice_id, script)
    //         alert("Please fill in all the fields.")
    //     }
    // }


    return (
        <div className="container mx-auto grid p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-center text-8xl font-semibold text-[#333]">Enter your Script</h1>
            <div className='w-full'>
                <h2 className="text-2xl font-semibold text-[#333] pb-4">Title</h2>
                <input className='w-full border border-gray-300 p-4 rounded-xl outline-none' onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='w-full flex gap-8'>
                <div className='w-full'>
                    <h2 className="text-2xl font-semibold text-[#333] pb-4 w-full">Width</h2>
                    <input className='w-full border border-gray-300 p-4 rounded-xl outline-none' type='number' value={width?.toString()} defaultValue={width?.toString()} onChange={(e) => setWidth(parseInt(e.target.value))} />
                </div>
                <div className='w-full'>
                    <h2 className="text-2xl font-semibold text-[#333] pb-4 w-full">Height</h2>
                    <input className='w-full border border-gray-300 p-4 rounded-xl outline-none' type='number' value={height?.toString()} defaultValue={height?.toString()} onChange={(e) => setHeight(parseInt(e.target.value))} />
                </div>
            </div>
            <div className='w-full'>
                <h2 className="text-2xl font-semibold text-[#333] pb-4">Your Script</h2>
                <textarea className='w-full border border-gray-300 h-[500px] p-4 rounded-2xl outline-none' onChange={(e) => setScript(e.target.value)} />
            </div>
            <button className='mt-10 px-10 py-4 bg-black text-white text-2xl rounded-2xl' onClick={() => {
                makeAPICall()
            }}>Submit</button>
        </div>
    )
}

export default ScriptInput