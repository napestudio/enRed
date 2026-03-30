import ReviewsCarousel, { type Review } from "./ReviewsCarousel";

const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const CACHE_DURATION = 60 * 60 * 24 * 5;

export default async function ReviewsComponent() {
  if (!PLACE_ID || !API_KEY) return null;

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${PLACE_ID}`,
    {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask":
          "reviews,rating,userRatingCount,displayName,googleMapsLinks",
        "Accept-Language": "es",
      },
      next: { revalidate: CACHE_DURATION },
    },
  );

  if (!response.ok) return null;

  const data = await response.json();

  interface GoogleReview {
    authorAttribution?: {
      displayName?: string;
      photoUri?: string;
      uri?: string;
    };
    rating: number;
    text?: { text?: string };
    relativePublishTimeDescription?: string;
  }

  const reviews: Review[] = (data.reviews ?? []).map((r: GoogleReview) => ({
    author: r.authorAttribution?.displayName ?? "Usuario de Google",
    photoUrl: r.authorAttribution?.photoUri ?? null,
    profileUrl: r.authorAttribution?.uri ?? null,
    rating: r.rating,
    text: r.text?.text ?? "",
    time: r.relativePublishTimeDescription ?? "",
  }));

  if (!reviews.length) return null;

  return (
    <>
      <ReviewsCarousel
        reviews={reviews}
        reviewsUrl={data.googleMapsLinks?.reviewsUri ?? ""}
      />
    </>
  );
}
