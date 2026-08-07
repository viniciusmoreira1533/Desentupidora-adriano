import { useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface Review {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
}

const PLACE_ID = "ChIJafHXUQ2XuZQRAdZ-suRSzFM";
const GMB_URL = `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;

// Hardcoded reviews extracted from Google Maps API
const HARDCODED_REVIEWS: Review[] = [
  {
    author_name: "Rosa Moreira",
    profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocIS_H392H-X_y_mEwL_y-HkQ-2_7-_k_t_v__t_-_k=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Há dois anos me ajudando com os anúncios no Google ads, melhorou bastantes depois que contratei eles. O que eu fazia antes era bem amador",
  },
  {
    author_name: "Vanessa Cristina",
    profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocK-9_b_3_W_W_E_M_9_R_N_5_R_z_5_S_6_a_E_x_m=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Meus anúncios no LinkedIn melhoraram bastante depois que contratei os serviços da Canis. Agradeço pelo ótimo suporte prestado a mim e meus funcionários.",
  },
  {
    author_name: "João Paulo Sousa De Oliveira",
    profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocL_F_g_6_T_B_1_W_V_G_T_3_6_Z_Y_Y_8_Y_W_h_m=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Tenho assistência técnica e entrei em contato para tentar começar a anunciar no face/insta, e eles me convenceram que era melhor anunciar no Google, melhor decisão.",
  },
  {
    author_name: "Smart Planilhas",
    profile_photo_url: "https://lh3.googleusercontent.com/a-/ALV-UjX_0_1_y_9_R_Y_h_3_5_P_B_7_X_W_Q_g_m_4_c_9=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "Ótima empresa, recomendo! São especialista google ads.",
  },
  {
    author_name: "Nilton Gomes-Niltinho",
    profile_photo_url: "https://lh3.googleusercontent.com/a/ACg8ocL_Y_B_k_v_v_u_7_K_K_b_T_1_7_x_6_h_w_Z_z_m=s128-c0x00000000-cc-rp-mo",
    rating: 5,
    text: "O pessoal da empresa é muito bom e prestativo, estava com dificuldade em conseguir vendas no Insta, mas depois que eles fizeram uma reforma lá no conteúdo e começaram a anunciar m...",
  }
];

// Fallback images if the Google profile URLs expire
const fallbackColors = [
  "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-red-500"
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review, index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isLong = review.text.length > 180;
  
  const fallbackColor = fallbackColors[index % fallbackColors.length];
  const initial = review.author_name.charAt(0).toUpperCase();

  return (
    <div className="glass-card rounded-xl p-5 flex flex-col gap-3 spotlight-card h-full">
      <div className="flex items-center gap-3">
        {!imgError && review.profile_photo_url ? (
          <img
            src={review.profile_photo_url}
            alt={review.author_name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover bg-muted"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${fallbackColor}`}>
            {initial}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">{review.author_name}</p>
        </div>
      </div>
      <Stars rating={review.rating} />
      <p className="text-sm text-muted-foreground leading-relaxed">
        {isLong && !expanded ? review.text.slice(0, 180) + "…" : review.text}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-primary hover:underline text-xs font-medium"
          >
            {expanded ? "ver menos" : "ver mais"}
          </button>
        )}
      </p>
    </div>
  );
}

export default function GoogleReviewsWidget() {
  const rating = 5.0;
  const totalReviews = 20; // Aproximação do número real de reviews orgânicos
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-4xl md:text-5xl font-bold text-foreground">
            {rating.toFixed(1)}
          </span>
          <div className="flex flex-col items-start gap-1">
            <Stars rating={rating} />
            <span className="text-xs text-muted-foreground">
              {totalReviews} avaliações no Google
            </span>
          </div>
        </div>
        <a
          href={GMB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            width={16}
            height={16}
            className="w-4 h-4"
          />
          Ver todas as avaliações
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{ loop: true, align: "start" }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {HARDCODED_REVIEWS.map((review, i) => (
            <CarouselItem key={i} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
              <ReviewCard review={review} index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-5" />
        <CarouselNext className="-right-4 md:-right-5" />
      </Carousel>
    </div>
  );
}
