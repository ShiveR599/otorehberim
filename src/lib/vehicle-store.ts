import { useEffect, useState } from "react";

export interface SelectedVehicle {
  brand: string;
  model: string;
  engine: string;
  fuel: string;
  aspiration: string;
  displacement: number;
}

const KEY = "or_selected_vehicle";

function read(): SelectedVehicle | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SelectedVehicle) : null;
  } catch {
    return null;
  }
}

export function useSelectedVehicle() {
  const [vehicle, setVehicleState] = useState<SelectedVehicle | null>(null);

  useEffect(() => {
    setVehicleState(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setVehicleState(read());
    };
    window.addEventListener("storage", onStorage);
    const onCustom = () => setVehicleState(read());
    window.addEventListener("or:vehicle-changed", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("or:vehicle-changed", onCustom);
    };
  }, []);

  const setVehicle = (v: SelectedVehicle | null) => {
    if (typeof window !== "undefined") {
      if (v) window.localStorage.setItem(KEY, JSON.stringify(v));
      else window.localStorage.removeItem(KEY);
      window.dispatchEvent(new Event("or:vehicle-changed"));
    }
    setVehicleState(v);
  };

  return { vehicle, setVehicle };
}
