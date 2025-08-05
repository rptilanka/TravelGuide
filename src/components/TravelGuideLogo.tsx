export default function TravelGuideLogo({ className = "w-12 h-12", isScrolled = false }: { className?: string; isScrolled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main Capsule/Oval Background */}
      <ellipse
        cx="50"
        cy="50"
        rx="35"
        ry="45"
        fill="url(#sunsetGradient)"
        stroke={isScrolled ? "#1e3a8a" : "#ffffff"}
        strokeWidth="3"
      />
      
      {/* Secondary inner stroke */}
      <ellipse
        cx="50"
        cy="50"
        rx="31"
        ry="41"
        fill="none"
        stroke={isScrolled ? "#3730a3" : "rgba(255,255,255,0.8)"}
        strokeWidth="2"
      />
      
      {/* Sky/Cloud area */}
      <ellipse
        cx="50"
        cy="35"
        rx="28"
        ry="25"
        fill="url(#skyGradient)"
        clipPath="url(#capsuleClip)"
      />
      
      {/* Mountains */}
      <g clipPath="url(#capsuleClip)">
        {/* Back mountain */}
        <path
          d="M20 70 L35 45 L50 55 L65 40 L80 70 Z"
          fill="#1e40af"
          opacity="0.8"
        />
        {/* Front mountain */}
        <path
          d="M15 70 L30 50 L45 60 L60 45 L75 60 L85 70 Z"
          fill="#1e3a8a"
        />
        {/* Mountain highlights */}
        <path
          d="M30 50 L35 45 L40 55"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          fill="none"
        />
      </g>
      
      {/* Clouds */}
      <g clipPath="url(#capsuleClip)" opacity="0.7">
        <ellipse cx="35" cy="30" rx="8" ry="4" fill="rgba(255,255,255,0.8)" />
        <ellipse cx="65" cy="25" rx="6" ry="3" fill="rgba(255,255,255,0.6)" />
        <ellipse cx="40" cy="35" rx="5" ry="3" fill="rgba(255,255,255,0.5)" />
      </g>
      
      {/* Airplane Silhouette */}
      <g transform="translate(50, 35) rotate(-15)">
        <path
          d="M0 -8 L3 -2 L12 0 L8 2 L3 2 L0 8 L-2 6 L-8 4 L-10 2 L-8 0 L-2 -2 Z"
          fill={isScrolled ? "#1e3a8a" : "#0f172a"}
        />
        {/* Airplane wings */}
        <ellipse
          cx="1"
          cy="0"
          rx="8"
          ry="2"
          fill={isScrolled ? "#1e3a8a" : "#0f172a"}
        />
        {/* Airplane tail */}
        <path
          d="M-8 0 L-12 -3 L-10 0 L-12 3 Z"
          fill={isScrolled ? "#1e3a8a" : "#0f172a"}
        />
      </g>
      
      {/* Orbital Ring */}
      <ellipse
        cx="50"
        cy="50"
        rx="42"
        ry="25"
        fill="none"
        stroke="url(#orbitalGradient)"
        strokeWidth="4"
        strokeDasharray="12,8"
        transform="rotate(-25 50 50)"
      />
      
      {/* Orbital Ring Inner Glow */}
      <ellipse
        cx="50"
        cy="50"
        rx="42"
        ry="25"
        fill="none"
        stroke="rgba(249,115,22,0.3)"
        strokeWidth="6"
        strokeDasharray="12,8"
        transform="rotate(-25 50 50)"
        filter="blur(2px)"
      />
      
      {/* Small orbital dots/planets */}
      <g>
        <circle cx="85" cy="35" r="2" fill="#f97316" opacity="0.8" />
        <circle cx="15" cy="65" r="1.5" fill="#fb923c" opacity="0.6" />
        <circle cx="25" cy="25" r="1" fill="#fdba74" opacity="0.7" />
      </g>
      
      {/* Gradients and Definitions */}
      <defs>
        {/* Sunset/Sunrise Gradient */}
        <linearGradient id="sunsetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="30%" stopColor="#f59e0b" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        
        {/* Sky Gradient */}
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#fdba74" />
        </linearGradient>
        
        {/* Orbital Ring Gradient */}
        <linearGradient id="orbitalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#fdba74" />
        </linearGradient>
        
        {/* Clipping Path for Capsule */}
        <clipPath id="capsuleClip">
          <ellipse cx="50" cy="50" rx="31" ry="41" />
        </clipPath>
        
        {/* Blue Gradient for Scrolled State */}
        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  );
}
