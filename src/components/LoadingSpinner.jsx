function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="loading-state">
      <p>{label}</p>
    </div>
  );
}

export default LoadingSpinner;
