'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchVideoUrl } from '@/action/VideoAPI';



export default function VideoPage() {
    const { video_id } = useParams<{ video_id: string }>();
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>("Loading video...");

    useEffect(() => {
        const loadVideoUrl = async () => {
            const resp:any = await fetchVideoUrl(video_id);
            if(resp){
                setVideoUrl(resp.url);
                setStatus(resp.status)
                console.log(resp.url)
            }
        };
        loadVideoUrl();
    }, [video_id]);

    if (!videoUrl) {
        return <p>{status}</p>;
    }

    return (
        <div>
            <h1>Video Player</h1>
            <video width="640" height="360" controls preload="none">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
