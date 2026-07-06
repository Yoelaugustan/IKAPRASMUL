import {
  InstagramIcon,
  LinkedinIcon,
  SpotifyIcon,
  YoutubeIcon,
} from "@/components/icons";

// Shared across the footer and the About page's contact section so both
// always point at the same accounts.
export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ikaprasmul/", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com/alumniprasmul?igsh=N3ZnNGx0dzRtMG9y", Icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com/@ikapramaprasetiyamulya?si=LQSjDLmGWhg76Uo1", Icon: YoutubeIcon },
  { label: "Spotify", href: "https://open.spotify.com/show/2TV53T3kSDvVNH6WcnMsTx?si=7Bl65LKeQHiyXeiSsQGauA", Icon: SpotifyIcon },
];
