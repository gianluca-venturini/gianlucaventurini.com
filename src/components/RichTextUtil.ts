import React from "react";

interface EmbedRenderer {
    code: (code: string) => React.ReactNode,
    video: (src: string, type: 'webm') => React.ReactNode,
}

export function renderEmbedType(rawEmbed: string, renderEmbedType: EmbedRenderer) {
    if(rawEmbed.startsWith('embed_video_webm')) {
        return renderEmbedType.video(rawEmbed.split('\n').splice(1).join('\n'), 'webm');
    }
    return renderEmbedType.code(rawEmbed);
}