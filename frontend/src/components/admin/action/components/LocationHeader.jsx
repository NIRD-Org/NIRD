function LocationHeader({
  state_name,
  dist_name,
  block_name,
  gp_name,
  theme_name,
}) {
  return (
    <div>
      <div className="p-6">
        <div className=" mt-4">
          <div className="flex flex-wrap justify-around">
            {[
              { label: "State:", value: state_name },
              { label: "District:", value: dist_name },
              { label: "Block:", value: block_name },
              { label: "GP:", value: gp_name },
            ].map(({ label, value }) => (
              <h3 key={label}>
                <strong className="text-primary">{label}</strong> {value}
              </h3>
            ))}
          </div>
          <div className="text-center mt-16">
            <h3>
              <strong>Theme:</strong> {theme_name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationHeader;
