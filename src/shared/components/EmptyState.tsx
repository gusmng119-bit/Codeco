type EmptyStateProps = {
  title?: string;
  message?: string;
  icon?: string;
};

export const EmptyState = ({
  title = "No Data Found",
  message = "There is currently no information available to display.",
  icon = "📭",
}: EmptyStateProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        border: "1px dashed #cbd5e1",
        margin: "20px 0",
        width: "100%",
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "12px" }}>{icon}</div>
      <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "6px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "14px", color: "#64748b", maxWidth: "400px", margin: 0 }}>
        {message}
      </p>
    </div>
  );
};

export default EmptyState;
