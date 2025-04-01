"use server"


export const fetchVideoUrl = async (videoId: string): Promise<any | null> => {
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

export const makeVideo = async ({ title, callback_url, width, height, avatar_id, voice_id, script }: any) => {
    const response = await fetch("https://api.heygen.com/v2/video/generate", {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "x-api-key": `${process.env.HEYGEN_API_KEY}`
        },
        body: JSON.stringify({
            caption: false,
            title: title,
            callback_id: "string",
            dimension: {
                // width: 1280,
                // height: 720
                width: width,
                height: height
            },
            video_inputs: [
                {
                    character: {
                        type: "avatar",
                        avatar_id: avatar_id,
                        // talking_photo_id: "string",
                        scale: 1,
                        avatar_style: "normal",
                        offset: {
                            x: 0,
                            y: 0
                        },
                        // matting: "string",
                        // circle_background_color: "string",
                        // talking_photo_style: "string",
                        talking_style: "stable",
                        expression: "default",
                        // super_resolution: "string"
                    },
                    voice: {
                        type: "text",
                        voice_id: voice_id,
                        input_text: script,
                        speed: 1,
                        pitch: 0,
                        emotion: "Excited",
                        locale: "string"
                    },
                    background: {
                        type: "color",
                        value: "#f4f4f4",
                        // "": "string"  // Not valid in JSON; consider removing or naming it properly
                    }
                }
            ],
            folder_id: "string",
            callback_url: callback_url
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));

    console.log(response)
    return(response)

}