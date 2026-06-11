import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { BiopsyReel, REEL_DURATION } from "./biopsy/BiopsyReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BiopsyReel"
        component={BiopsyReel}
        durationInFrames={REEL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
