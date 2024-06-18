const StaticMap = ({ placeName }) => {
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
  const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
  const params = new URLSearchParams({
    center: placeName,
    zoom: "14",
    size: "600x300",
    key: apiKey,
  });

  const mapUrl = `${baseUrl}?${params.toString()}`;

  return (
    <div>
      <h2>{placeName}</h2>
      <img src={mapUrl} alt={`${placeName} Map`} />
    </div>
  );
};

export default StaticMap;
