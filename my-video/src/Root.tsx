import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { BiopsyReel, REEL_DURATION } from "./biopsy/BiopsyReel";
import { BiopsyInstaReel, INSTA_DURATION } from "./insta/BiopsyInstaReel";
import { BiopsyPremiumReel, PREMIUM_DURATION } from "./premium/BiopsyPremiumReel";
import { RedEyeAwareness, RED_EYE_DURATION } from "./redeye/RedEyeAwareness";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RedEyeAwareness"
        component={RedEyeAwareness}
        durationInFrames={RED_EYE_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BiopsyPremiumReel"
        component={BiopsyPremiumReel}
        durationInFrames={PREMIUM_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BiopsyInstaReel"
        component={BiopsyInstaReel}
        durationInFrames={INSTA_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
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
