import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { BiopsyReel, REEL_DURATION } from "./biopsy/BiopsyReel";
import { BiopsyInstaReel, INSTA_DURATION } from "./insta/BiopsyInstaReel";
import { BiopsyPremiumReel, PREMIUM_DURATION } from "./premium/BiopsyPremiumReel";
import { RedEyeAwareness, RED_EYE_DURATION } from "./redeye/RedEyeAwareness";
import { RedEyeCauses, RED_EYE_CAUSES_DURATION } from "./redeye/RedEyeCauses";
import { EyeSymptoms, EYE_SYMPTOMS_DURATION } from "./eyesymptoms/EyeSymptoms";
import { PlaceholderEye } from "./eyesymptoms/PlaceholderEye";
import { DryEyeSymptoms, DRY_EYE_DURATION } from "./dryeye/DryEyeSymptoms";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DryEyeSymptoms"
        component={DryEyeSymptoms}
        durationInFrames={DRY_EYE_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="PlaceholderEye"
        component={PlaceholderEye}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="EyeSymptoms"
        component={EyeSymptoms}
        durationInFrames={EYE_SYMPTOMS_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="RedEyeCauses"
        component={RedEyeCauses}
        durationInFrames={RED_EYE_CAUSES_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
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
