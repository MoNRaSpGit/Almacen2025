export default function StatusAlert({ status }) {
  if (!status) return null;
  const cls =
    status.type === "ok"
      ? "alert-success"
      : status.type === "err"
      ? "alert-warning"
      : "alert-info";
  return (
    <div className={`alert mb-3 ${cls}`} role="alert">
      {status.msg}
    </div>
  );
}
