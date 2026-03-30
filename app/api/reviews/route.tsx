import { NextResponse } from "next/server";

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const day = 60 * 60 * 24;// 24 horas en segundos
const CACHE_DURATION = day * 5;

interface AuthorAttribution {
  displayName: string;
  photoUri: string;
  uri: string;
}

interface LocalizedText {
  text: string;
  languageCode: string;
}

interface Review {
  authorAttribution: AuthorAttribution;
  rating: number;
  text: LocalizedText;
  relativePublishTimeDescription: string;
  originalText: LocalizedText;
}

export async function GET() {
  try {
    if (!PLACE_ID || !API_KEY) {
      return NextResponse.json(
        {
          error:
            "Faltan variables de entorno GOOGLE_PLACE_ID o GOOGLE_PLACES_API_KEY",
        },
        { status: 500 },
      );
    }

    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;

    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask":
          "reviews,rating,userRatingCount,displayName,googleMapsLinks",
        "Accept-Language": "es",
      },
      next: { revalidate: CACHE_DURATION },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Places API error:", errorData);
      return NextResponse.json(
        { error: "Error al obtener reseñas de Google" },
        { status: response.status },
      );
    }

    const data = await response.json();

    const reviews = (data.reviews || []).map((review: Review) => ({
      author: review.authorAttribution?.displayName || "Usuario de Google",
      photoUrl: review.authorAttribution?.photoUri || null,
      profileUrl: review.authorAttribution?.uri || null,
      rating: review.rating,
      text: review.text?.text || "",
      time: review.relativePublishTimeDescription || "",
      originalLanguage: review.originalText?.languageCode || null,
    }));

    return NextResponse.json({
      placeName: data.displayName?.text || null,
      averageRating: data.rating || null,
      totalReviews: data.userRatingCount || null,
      reviewsUrl: data.googleMapsLinks?.reviewsUri || null,
      reviews,
    });
  } catch (error) {
    console.error("Error en /api/reviews:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
