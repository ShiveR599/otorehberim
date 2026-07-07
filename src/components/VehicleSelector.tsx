import { useMemo, useState, useEffect } from "react";
import { BRANDS } from "@/lib/vehicle-data";
import { useSelectedVehicle } from "@/lib/vehicle-store";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Car, Check, RotateCcw } from "lucide-react";

export function VehicleSelector() {
  const { vehicle, setVehicle } = useSelectedVehicle();
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [engine, setEngine] = useState<string>("");

  useEffect(() => {
    if (vehicle) {
      setBrand(vehicle.brand);
      setModel(vehicle.model);
      setEngine(vehicle.engine);
    }
  }, [vehicle]);

  const models = useMemo(
    () => BRANDS.find((b) => b.name === brand)?.models ?? [],
    [brand],
  );
  const engines = useMemo(
    () => models.find((m) => m.name === model)?.engines ?? [],
    [models, model],
  );

  const canSave = brand && model && engine;

  const save = () => {
    const eng = engines.find((e) => e.label === engine);
    if (!eng) return;
    setVehicle({
      brand, model, engine: eng.label, fuel: eng.fuel,
      aspiration: eng.aspiration, displacement: eng.displacement,
    });
  };

  return (
    <section className="panel-surface p-5">
      <header className="mb-4 flex items-center gap-2">
        <Car className="h-5 w-5 text-primary" />
        <h2 className="text-base font-semibold">Aracınızı Seçin</h2>
      </header>

      {vehicle && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
          <div className="min-w-0">
            <div className="font-medium text-foreground">
              {vehicle.brand} {vehicle.model}
            </div>
            <div className="text-muted-foreground">{vehicle.engine}</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setVehicle(null); setBrand(""); setModel(""); setEngine(""); }}
          >
            <RotateCcw className="mr-1 h-4 w-4" /> Değiştir
          </Button>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-3">
        <Select value={brand} onValueChange={(v) => { setBrand(v); setModel(""); setEngine(""); }}>
          <SelectTrigger><SelectValue placeholder="Marka" /></SelectTrigger>
          <SelectContent>
            {BRANDS.map((b) => <SelectItem key={b.name} value={b.name}>{b.name}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={model} onValueChange={(v) => { setModel(v); setEngine(""); }} disabled={!brand}>
          <SelectTrigger><SelectValue placeholder="Model" /></SelectTrigger>
          <SelectContent>
            {models.map((m) => <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={engine} onValueChange={setEngine} disabled={!model}>
          <SelectTrigger><SelectValue placeholder="Motor / Yakıt" /></SelectTrigger>
          <SelectContent>
            {engines.map((e) => <SelectItem key={e.label} value={e.label}>{e.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4">
        <Button onClick={save} disabled={!canSave} className="w-full sm:w-auto">
          <Check className="mr-2 h-4 w-4" /> Aracımı Kaydet
        </Button>
      </div>
    </section>
  );
}
