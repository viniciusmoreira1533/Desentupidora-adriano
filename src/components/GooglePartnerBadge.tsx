const PARTNER_PROFILE_URL = "https://www.google.com/partners/agency?id=9240380245";

interface Props {
  size?: "sm" | "md" | "lg";
  withCaption?: boolean;
  className?: string;
}

const SIZES = {
  sm: "h-16 md:h-20",
  md: "h-24 md:h-32",
  lg: "h-28 md:h-40",
};

export default function GooglePartnerBadge({ size = "md", withCaption = false, className = "" }: Props) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <a
        href={PARTNER_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Perfil Google Partner da Canis Marketing"
        className="inline-block rounded-lg transition-transform hover:scale-105"
      >
        <img
          src="https://www.gstatic.com/partners/badge/images/2026/PartnerBadgeClickable.svg"
          alt="Selo Google Partner - Canis Marketing"
          className={`${SIZES[size]} w-auto`}
          loading="lazy"
        />
      </a>
      {withCaption && (
        <p className="text-xs md:text-sm font-medium text-[hsl(130,65%,68%)] uppercase tracking-wider">
          Certificação oficial Google — menos de 3% das agências no Brasil
        </p>
      )}
    </div>
  );
}
