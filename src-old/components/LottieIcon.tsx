import * as React from 'react';
import Lottie, { LottieRef } from "lottie-react";

interface LottieIconProps {
    height: number;
    width: number;
    animationData: object;
    onClick: () => void;
}

export const LottieIcon: React.FC<LottieIconProps> = ({ height, width, onClick, animationData }) => {
    const lottieRef: LottieRef = React.useRef();

    React.useEffect(() => {
        lottieRef.current.setSpeed(2);
    });

    return (
        <div
            onClick={onClick}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() =>
                lottieRef.current.playSegments(
                    [
                        [0, 30],
                        [30, 150]
                    ],
                    false
                )
            }
            onMouseLeave={() => lottieRef.current.playSegments([150, 180], false)}
        >
            <Lottie
                style={{ width, height }}
                animationData={animationData}
                lottieRef={lottieRef}
                loop={false}
                autoplay={false}
                onEnterFrame={(p: any) => {
                    if (p.currentTime === 119) {
                        setImmediate(() => {
                            lottieRef.current.playSegments([30, 150], true);
                        });
                    }
                }}
            />
        </div>
    );
}
