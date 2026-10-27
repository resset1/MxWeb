import type { FormFieldProps } from "./types";

/**
 * Campo de texto reutilizable.
 * Cumple con el diseño del mockup: fondo gris suave, bordes redondeados y asterisco rojo para obligatorios.
 */
export default function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: FormFieldProps) {
  const isDate = type === "date";

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs sm:text-sm font-semibold text-neutral-200">
        {label} {required && <span className="text-red-500 font-bold">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        onClick={(e) => {
          if (isDate) {
            e.currentTarget.showPicker?.();
          }
        }}
        className={`w-full bg-[#131313] text-neutral-200 placeholder:italic placeholder:text-neutral-500 text-base sm:text-sm px-4 py-3 sm:py-3.5 rounded-2xl border-2 sm:border-3 border-neutral-600 focus:border-orange-500 focus:outline-none transition-all ${
          isDate
            ? "[color-scheme:dark] cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
            : ""
        }`}
      />
    </div>
  );
}
