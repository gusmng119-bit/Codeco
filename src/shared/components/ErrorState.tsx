type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  title = "Failed to Load Data",
  message = "An unexpected error occurred while connecting to the server.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        backgroundColor: "#fef2f2",
        borderRadius: "16px",
        border: "1px solid #fecaca",
        margin: "20px 0",
        width: "100%",
      }}
    >
      <div style={{ fontSize: "44px", marginBottom: "12px" }}>⚠️</div>
      <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#991b1b", marginBottom: "6px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "14px", color: "#b91c1c", maxWidth: "440px", marginBottom: "16px" }}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc2626",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          🔄 Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
