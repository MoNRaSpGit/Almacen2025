import { forwardRef } from "react";

const ScanInput = forwardRef(function ScanInput(
  { value, onChange, onSubmit, isLoading },
  ref
) {
  return (
    <form onSubmit={onSubmit} className="mb-3">
      <label className="form-label">
        Escaneá o escribí el código y Enter{" "}
        {isLoading && <small className="ms-2 text-muted">(buscando...)</small>}
      </label>
      <input
        ref={ref}
        autoFocus
        type="text"
        className="form-control"
        placeholder="7791293048000"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </form>
  );
});

export default ScanInput;
