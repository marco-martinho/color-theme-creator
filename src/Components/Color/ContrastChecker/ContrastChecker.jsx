import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function ContrastChecker({ hex, contrastText }) {
  const { data, isLoading, error } = useSWR(
    `https://webaim.org/resources/contrastchecker/?fcolor=${contrastText.replace("#", "")}&bcolor=${hex.replace("#", "")}&api`,
    fetcher,
  );

  if (isLoading) {
    return <p>Checking contrast...</p>;
  }

  if (error) {
    return <p>Unable to check contrast.</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <p>
      Contrast ratio: {data.ratio} — WCAG AA:{" "}
      {data.AA === "pass" ? "Pass" : "Fail"}
    </p>
  );
}
