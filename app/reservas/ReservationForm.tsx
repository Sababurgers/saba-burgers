"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isTimeWithinHours, businessHoursLabel } from "@/lib/data/business-hours";
import { createReservation } from "./actions";

const Schema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida"),
  partySize: z.coerce.number().int().min(1).max(10),
  name: z.string().min(2, "Mínimo 2 caracteres").max(80),
  phone: z.string().min(8, "Teléfono muy corto").max(20),
  email: z.string().email("Email inválido"),
  notes: z.string().max(300).optional(),
});

type FormData = z.infer<typeof Schema>;

function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function ReservationForm() {
  const router = useRouter();
  const [timeError, setTimeError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: {
      date: getTodayISO(),
      time: "20:00",
      partySize: 2,
    },
  });

  const partySize = watch("partySize") ?? 2;

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const t = e.target.value;
    setValue("time", t);
    if (t && !isTimeWithinHours(t)) {
      setTimeError("Esa hora está fuera del horario del local.");
    } else {
      setTimeError("");
    }
  }

  const onSubmit = async (data: FormData) => {
    if (!isTimeWithinHours(data.time)) {
      setTimeError("Esa hora está fuera del horario del local.");
      return;
    }
    setLoading(true);
    try {
      const res = await createReservation(data);
      if (res.ok) {
        router.push(
          `/reservas/confirmacion?date=${data.date}&time=${data.time}&people=${data.partySize}&id=${res.reservationId}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-paper border border-carbon-800/15 rounded-lg p-6 md:p-8 flex flex-col gap-7"
    >
      {/* Día + Personas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="res-date" className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            Día
          </label>
          <div className="relative">
            <input
              id="res-date"
              type="date"
              min={getTodayISO()}
              {...register("date")}
              className="w-full bg-paper-2 border border-carbon-800/20 rounded-md pl-3.5 pr-10 py-3 text-sm focus:outline-none focus:border-carbon-800 focus:ring-2 focus:ring-carbon-800/10 transition [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          {errors.date && (
            <span className="text-tomato text-xs">{errors.date.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="res-people" className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            Personas
          </label>
          <div className="flex items-center bg-paper-2 border border-carbon-800/20 rounded-md focus-within:border-carbon-800 focus-within:ring-2 focus-within:ring-carbon-800/10 transition overflow-hidden">
            <button
              type="button"
              onClick={() => setValue("partySize", Math.max(1, partySize - 1))}
              aria-label="Quitar persona"
              className="w-11 h-11 grid place-items-center text-lg text-stone hover:bg-paper-3 hover:text-carbon-800 active:scale-95 transition cursor-pointer"
            >
              −
            </button>
            <input
              id="res-people"
              type="number"
              min={1}
              max={10}
              {...register("partySize")}
              className="flex-1 w-full bg-transparent text-sm font-mono text-center py-3 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setValue("partySize", Math.min(10, partySize + 1))}
              aria-label="Añadir persona"
              className="w-11 h-11 grid place-items-center text-lg text-stone hover:bg-paper-3 hover:text-carbon-800 active:scale-95 transition cursor-pointer"
            >
              +
            </button>
          </div>
          <span className="text-stone text-xs">
            De 1 a 10. Para grupos más grandes, escríbenos por WhatsApp.
          </span>
        </div>
      </div>

      {/* Hora */}
      <div className="flex flex-col gap-2">
        <label htmlFor="res-time" className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
          Hora
        </label>
        <div className="relative w-full md:w-56">
          <input
            id="res-time"
            type="time"
            step={900}
            {...register("time")}
            onChange={handleTimeChange}
            className="w-full bg-paper-2 border border-carbon-800/20 rounded-md pl-3.5 pr-10 py-3 text-sm focus:outline-none focus:border-carbon-800 focus:ring-2 focus:ring-carbon-800/10 transition [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:w-10 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-stone"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <span className="text-stone text-xs">
          Horario del local:{" "}
          <span className="font-mono">{businessHoursLabel()}</span>
        </span>
        {timeError && <span className="text-tomato text-xs">{timeError}</span>}
        {errors.time && <span className="text-tomato text-xs">{errors.time.message}</span>}
      </div>

      <div className="h-px bg-carbon-800/10 -mx-6 md:-mx-8" />

      {/* Nombre + Móvil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Federico García"
            {...register("name")}
            className="w-full bg-paper-2 border border-carbon-800/20 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800 focus:ring-2 focus:ring-carbon-800/10 transition"
          />
          {errors.name && (
            <span className="text-tomato text-xs">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
            Móvil
          </label>
          <input
            type="tel"
            placeholder="+34 6XX XXX XXX"
            {...register("phone")}
            className="w-full bg-paper-2 border border-carbon-800/20 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800 focus:ring-2 focus:ring-carbon-800/10 transition"
          />
          {errors.phone && (
            <span className="text-tomato text-xs">{errors.phone.message}</span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
          Email
        </label>
        <input
          type="email"
          placeholder="hola@correo.com"
          {...register("email")}
          className="w-full bg-paper-2 border border-carbon-800/20 rounded-md px-3.5 py-3 text-sm focus:outline-none focus:border-carbon-800 focus:ring-2 focus:ring-carbon-800/10 transition"
        />
        <span className="text-stone text-xs">
          Te confirmamos por aquí en menos de 1 hora.
        </span>
        {errors.email && (
          <span className="text-tomato text-xs">{errors.email.message}</span>
        )}
      </div>

      {/* Notas */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-stone">
          Notas <span className="text-stone/60 normal-case tracking-normal">(opcional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Cumpleaños, mesa cerca de la ventana, alergias..."
          {...register("notes")}
          className="w-full bg-paper-2 border border-carbon-800/20 rounded-md px-3.5 py-3 text-sm resize-y focus:outline-none focus:border-carbon-800 focus:ring-2 focus:ring-carbon-800/10 transition"
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-tomato hover:bg-tomato-700 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition text-paper font-mono text-xs uppercase tracking-[0.14em] px-6 py-3.5 rounded-full font-semibold cursor-pointer"
        >
          {loading ? "Reservando…" : "Reservar mesa →"}
        </button>
      </div>
    </form>
  );
}
