import { render, screen } from "@testing-library/react-native";
import { MovieCard } from "../MovieCard";
import { Movie } from "@/types/movie";
import { TVSerie } from "@/types/tvSerie";
import "@testing-library/jest-native/extend-expect";

jest.mock("expo-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock("@/constants/images", () => ({
  images: {
    noImage500x750: "https://placeholder.com/500x750",
  },
}));

jest.mock("@/constants/values", () => ({
  values: {
    screenWidth: 375,
  },
}));

describe("MovieCard", () => {
  const mockMovie: Movie = {
    id: 1,
    title: "Test Movie",
    poster_path: "/test-poster.jpg",
    vote_average: 8.5,
    release_date: "2024-01-01",
    adult: false,
    backdrop_path: "/test-backdrop.jpg",
    genre_ids: [1, 2],
    original_language: "en",
    original_title: "Test Movie",
    overview: "Test overview",
    popularity: 100,
    video: false,
    vote_count: 1000,
  };

  const mockTVSerie: TVSerie = {
    id: 2,
    name: "Test TV Show",
    poster_path: "/test-tv-poster.jpg",
    vote_average: 7.5,
    first_air_date: "2024-01-01",
    adult: false,
    genre_ids: [1, 2],
    origin_country: ["US"],
    original_language: "en",
    original_name: "Test TV Show",
    overview: "Test overview",
    popularity: 100,
    vote_count: 1000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders movie card correctly", () => {
    render(<MovieCard {...mockMovie} />);

    expect(screen.getByTestId("movie-poster")).toBeTruthy();
    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2024")).toBeTruthy();
  });

  it("renders TV series card correctly", () => {
    render(<MovieCard {...mockTVSerie} isMovie={false} />);

    expect(screen.getByTestId("movie-poster")).toBeTruthy();
    expect(screen.getByText("Test TV Show")).toBeTruthy();
    expect(screen.getByText("2024")).toBeTruthy();
  });

  it("renders compact movie card correctly", () => {
    render(<MovieCard {...mockMovie} compact={true} />);

    expect(screen.getByTestId("movie-poster")).toBeTruthy();
    expect(screen.getByText("Test Movie")).toBeTruthy();
    expect(screen.getByText("2024")).toBeTruthy();
  });

  it("renders compact TV series card correctly", () => {
    render(<MovieCard {...mockTVSerie} isMovie={false} compact={true} />);

    expect(screen.getByTestId("movie-poster")).toBeTruthy();
    expect(screen.getByText("Test TV Show")).toBeTruthy();
    expect(screen.getByText("2024")).toBeTruthy();
  });

  it("uses fallback image when poster_path is not provided", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: undefined };
    render(<MovieCard {...movieWithoutPoster} />);

    const image = screen.getByTestId("movie-poster");
    expect(image.props.source.uri).toContain("https://placeholder.com/500x750");
  });
});
