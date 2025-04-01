"use client"
import { useState } from "react";
import AvatarSelection from "./AvatarSelection";
import ScriptInput from "./ScriptInput";

export default function ClientComponent() {

    const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null)
    const [selectedAvatarVoiceId, setSelectedAvatarVoiceId] = useState<string | null>(null)

    console.log(selectedAvatarId)
    console.log(selectedAvatarVoiceId)

    return (
        <div>
            {
                selectedAvatarId && selectedAvatarVoiceId ?
                    <ScriptInput avatar_id={selectedAvatarId} voice_id={selectedAvatarVoiceId} />
                    :
                    <AvatarSelection setSelectedAvatarVoiceId={setSelectedAvatarVoiceId} setSelectedAvatarId={setSelectedAvatarId}

                    />
            }

        </div>
    );
}
