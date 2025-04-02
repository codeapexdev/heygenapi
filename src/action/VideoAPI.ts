"use server"

interface MakeVideoParams {
    title: string;
    callback_url: string;
    width: number;
    height: number;
    avatar_id: string;
    voice_id: string;
    script: string;
}

export const fetchVideoUrl = async (videoId: string) => {
    const response = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
        headers: {
            'X-Api-Key': process.env.HEYGEN_API_KEY as string,
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        console.error('Failed to fetch video status:', response.statusText);
        return null;
    }

    const result = await response.json();
    console.log('Full API response:', result); // Log the full response for debugging

    if (result && result.data) {
        const { status } = result.data;

        // Try both possible property names for the URL
        const videoUrl = result.data.video_url || result.data.url || null;
        console.log(status)
        if (status === 'completed' && videoUrl) {
            return {
                url: videoUrl,
                status: status
            };
        } else if (status === 'processing' || status === 'pending') {
            console.log('Video is still being processed. Please try again later.');
            return {
                url: null,
                status: `Video is still being processed. Please try again later, Status:', ${status}`
            };
        } else if (status === 'failed') {
            console.error('Video generation failed.');
            return {
                url: null,
                status: `Video generation failed:', ${status}`
            };
        } else {
            console.error('Video is not ready. Current status:', status);
            return {
                url: null,
                status: `Video is not ready. Current status:', ${status}`
            };
        }
    } else {
        console.error('Unexpected response structure:', result);
    }

    return null;
};

export const makeVideo = async ({
    title,
    callback_url,
    width,
    height,
    avatar_id,
    voice_id,
    script
}: MakeVideoParams) => {
    try {
        const res = await fetch("https://api.heygen.com/v2/video/generate", {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "x-api-key": process.env.HEYGEN_API_KEY as string
            },
            body: JSON.stringify({
                caption: false,
                title,
                callback_id: `cb_${Date.now()}`, // use dynamic or meaningful ID
                dimension: {
                    width,
                    height
                },
                video_inputs: [
                    {
                        character: {
                            type: "avatar",
                            avatar_id,
                            scale: 1,
                            avatar_style: "normal",
                            offset: { x: 0, y: 0 },
                            talking_style: "stable",
                            expression: "default"
                        },
                        voice: {
                            type: "text",
                            voice_id,
                            input_text: script,
                            speed: 1,
                            emotion: "Excited"
                            // Removed "pitch" and "locale"
                        },
                        background: {
                            type: "color",
                            value: "#f4f4f4"
                        }
                    }
                ],
                folder_id: "default", // replace if you use actual folders
                callback_url
            })
        });

        const data = await res.json();
        console.log("🎥 Heygen response:", data);
        return data;
    } catch (error) {
        console.error("❌ Error generating video:", error);
        throw error;
    }
};
