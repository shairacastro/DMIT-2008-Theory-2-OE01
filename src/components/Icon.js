import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiDribbbleFill,
  RiDiscordFill,
  RiTwitterFill,
  RiTwitterXFill,
  RiBlueskyFill,
  RiEmotionLaughLine,
  RiArrowRightUpLine,
} from "react-icons/ri";

const icons = {
  "ri:github-fill": RiGithubFill,
  "ri:linkedin-box-fill": RiLinkedinBoxFill,
  "ri:dribbble-fill": RiDribbbleFill,
  "ri:discord-fill": RiDiscordFill,
  "ri:twitter-fill": RiTwitterFill,
  "ri:twitter-x-fill": RiTwitterXFill,
  "ri:bluesky-fill": RiBlueskyFill,
  "ri:emotion-laugh-line": RiEmotionLaughLine,
  "ri:arrow-right-up-line": RiArrowRightUpLine,
};

export default function Icon({ name, className = "", ...props }) {
  const Component = icons[name];
  if (!Component) {
    console.warn(`Icon not found: ${name}`);
    return null;
  }
  return <Component className={className} {...props} />;
}
