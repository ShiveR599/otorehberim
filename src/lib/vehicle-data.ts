// Türkiye pazarındaki popüler markalar, modeller ve yaygın motor seçenekleri.
// Not: Sadece rehber amaçlı, tüm varyantları kapsamaz.

export type FuelType = "Benzin" | "Dizel" | "LPG" | "Hibrit" | "Elektrik";
export type Aspiration = "Atmosferik" | "Turbo";

export interface Engine {
  label: string;      // örn. "1.3 Multijet Dizel"
  displacement: number; // 1.3
  fuel: FuelType;
  aspiration: Aspiration;
}

export interface Model {
  name: string;
  engines: Engine[];
}

export interface Brand {
  name: string;
  models: Model[];
}

const dieselTurbo = (d: number, l: string): Engine => ({ label: l, displacement: d, fuel: "Dizel", aspiration: "Turbo" });
const benzinN  = (d: number, l: string): Engine => ({ label: l, displacement: d, fuel: "Benzin", aspiration: "Atmosferik" });
const benzinT  = (d: number, l: string): Engine => ({ label: l, displacement: d, fuel: "Benzin", aspiration: "Turbo" });
const hybrid   = (d: number, l: string): Engine => ({ label: l, displacement: d, fuel: "Hibrit", aspiration: "Atmosferik" });
const elektrik = (l: string): Engine => ({ label: l, displacement: 0, fuel: "Elektrik", aspiration: "Atmosferik" });

const commonSmallBenzin: Engine[] = [benzinN(1.0, "1.0 Benzin"), benzinT(1.0, "1.0 TSI Turbo Benzin"), benzinN(1.2, "1.2 Benzin"), benzinN(1.4, "1.4 Benzin")];

export const BRANDS: Brand[] = [
  { name: "Fiat", models: [
    { name: "Egea Sedan", engines: [benzinN(1.4, "1.4 Fire Benzin"), dieselTurbo(1.3, "1.3 Multijet Dizel"), dieselTurbo(1.6, "1.6 Multijet Dizel")] },
    { name: "Egea Cross", engines: [benzinT(1.0, "1.0 GSE Turbo Benzin"), hybrid(1.5, "1.5 Hibrit")] },
    { name: "Egea Hatchback", engines: [benzinN(1.4, "1.4 Fire Benzin"), dieselTurbo(1.3, "1.3 Multijet Dizel")] },
    { name: "Doblo", engines: [dieselTurbo(1.6, "1.6 Multijet Dizel"), dieselTurbo(1.3, "1.3 Multijet Dizel")] },
    { name: "500", engines: [benzinN(1.2, "1.2 Benzin"), hybrid(1.0, "1.0 Mild Hibrit")] },
  ]},
  { name: "Renault", models: [
    { name: "Clio", engines: [benzinN(1.0, "1.0 SCe Benzin"), benzinT(1.0, "1.0 TCe Turbo"), hybrid(1.6, "1.6 E-Tech Hibrit")] },
    { name: "Megane Sedan", engines: [benzinN(1.6, "1.6 Benzin"), dieselTurbo(1.5, "1.5 dCi Dizel")] },
    { name: "Symbol", engines: [benzinN(1.2, "1.2 Benzin"), dieselTurbo(1.5, "1.5 dCi Dizel")] },
    { name: "Taliant", engines: [benzinN(1.0, "1.0 SCe Benzin"), benzinT(1.0, "1.0 TCe Turbo")] },
    { name: "Captur", engines: [benzinT(1.3, "1.3 TCe Turbo"), hybrid(1.6, "1.6 E-Tech Hibrit")] },
    { name: "Kadjar", engines: [benzinT(1.3, "1.3 TCe Turbo"), dieselTurbo(1.5, "1.5 dCi Dizel")] },
  ]},
  { name: "Volkswagen", models: [
    { name: "Polo", engines: [benzinT(1.0, "1.0 TSI Turbo"), benzinN(1.0, "1.0 MPI Benzin")] },
    { name: "Golf", engines: [benzinT(1.0, "1.0 TSI Turbo"), benzinT(1.5, "1.5 TSI Turbo"), dieselTurbo(2.0, "2.0 TDI Dizel")] },
    { name: "Passat", engines: [benzinT(1.5, "1.5 TSI Turbo"), dieselTurbo(2.0, "2.0 TDI Dizel")] },
    { name: "T-Roc", engines: [benzinT(1.0, "1.0 TSI Turbo"), benzinT(1.5, "1.5 TSI Turbo")] },
    { name: "Tiguan", engines: [benzinT(1.5, "1.5 TSI Turbo"), dieselTurbo(2.0, "2.0 TDI Dizel")] },
  ]},
  { name: "Toyota", models: [
    { name: "Corolla Sedan", engines: [benzinN(1.6, "1.6 Valvematic Benzin"), hybrid(1.8, "1.8 Hibrit")] },
    { name: "Corolla HB", engines: [hybrid(1.8, "1.8 Hibrit"), benzinT(1.2, "1.2 Turbo")] },
    { name: "Yaris", engines: [benzinN(1.5, "1.5 Benzin"), hybrid(1.5, "1.5 Hibrit")] },
    { name: "C-HR", engines: [hybrid(1.8, "1.8 Hibrit"), hybrid(2.0, "2.0 Hibrit")] },
    { name: "RAV4", engines: [hybrid(2.5, "2.5 Hibrit")] },
  ]},
  { name: "Hyundai", models: [
    { name: "i10", engines: [benzinN(1.0, "1.0 Benzin"), benzinN(1.2, "1.2 Benzin")] },
    { name: "i20", engines: [benzinN(1.4, "1.4 Benzin"), benzinT(1.0, "1.0 T-GDI Turbo")] },
    { name: "Elantra", engines: [benzinN(1.6, "1.6 MPI Benzin")] },
    { name: "Bayon", engines: [benzinT(1.0, "1.0 T-GDI Turbo")] },
    { name: "Tucson", engines: [benzinT(1.6, "1.6 T-GDI Turbo"), hybrid(1.6, "1.6 Hibrit"), dieselTurbo(1.6, "1.6 CRDi Dizel")] },
    { name: "Kona", engines: [benzinT(1.6, "1.6 T-GDI Turbo"), elektrik("Elektrik")] },
  ]},
  { name: "Ford", models: [
    { name: "Fiesta", engines: [benzinT(1.0, "1.0 EcoBoost Turbo"), benzinN(1.1, "1.1 Ti-VCT Benzin")] },
    { name: "Focus", engines: [benzinT(1.0, "1.0 EcoBoost Turbo"), benzinT(1.5, "1.5 EcoBoost Turbo"), dieselTurbo(1.5, "1.5 EcoBlue Dizel")] },
    { name: "Puma", engines: [benzinT(1.0, "1.0 EcoBoost Turbo")] },
    { name: "Kuga", engines: [benzinT(1.5, "1.5 EcoBoost Turbo"), hybrid(2.5, "2.5 Hibrit")] },
    { name: "Courier", engines: [dieselTurbo(1.5, "1.5 EcoBlue Dizel")] },
    { name: "Transit Custom", engines: [dieselTurbo(2.0, "2.0 EcoBlue Dizel")] },
  ]},
  { name: "Opel", models: [
    { name: "Corsa", engines: [benzinT(1.2, "1.2 Turbo Benzin"), benzinN(1.2, "1.2 Benzin")] },
    { name: "Astra", engines: [benzinT(1.2, "1.2 Turbo Benzin"), hybrid(1.6, "1.6 Plug-in Hibrit")] },
    { name: "Mokka", engines: [benzinT(1.2, "1.2 Turbo Benzin")] },
    { name: "Grandland", engines: [benzinT(1.2, "1.2 Turbo Benzin"), hybrid(1.6, "1.6 Hibrit")] },
  ]},
  { name: "Peugeot", models: [
    { name: "208", engines: [benzinT(1.2, "1.2 PureTech Turbo"), elektrik("Elektrik")] },
    { name: "301", engines: [benzinN(1.2, "1.2 Benzin"), dieselTurbo(1.5, "1.5 BlueHDi Dizel")] },
    { name: "308", engines: [benzinT(1.2, "1.2 PureTech Turbo"), hybrid(1.6, "1.6 Hibrit")] },
    { name: "2008", engines: [benzinT(1.2, "1.2 PureTech Turbo")] },
    { name: "3008", engines: [benzinT(1.2, "1.2 PureTech Turbo"), hybrid(1.6, "1.6 Plug-in Hibrit")] },
  ]},
  { name: "Citroën", models: [
    { name: "C3", engines: [benzinT(1.2, "1.2 PureTech Turbo"), benzinN(1.2, "1.2 Benzin")] },
    { name: "C-Elysée", engines: [benzinN(1.2, "1.2 Benzin"), dieselTurbo(1.5, "1.5 BlueHDi Dizel")] },
    { name: "C4", engines: [benzinT(1.2, "1.2 PureTech Turbo")] },
    { name: "C5 Aircross", engines: [benzinT(1.6, "1.6 Turbo"), hybrid(1.6, "1.6 Plug-in Hibrit")] },
  ]},
  { name: "Dacia", models: [
    { name: "Sandero", engines: [benzinN(1.0, "1.0 SCe Benzin"), benzinT(1.0, "1.0 TCe Turbo")] },
    { name: "Duster", engines: [benzinT(1.3, "1.3 TCe Turbo"), dieselTurbo(1.5, "1.5 Blue dCi Dizel")] },
    { name: "Logan", engines: [benzinN(1.0, "1.0 SCe Benzin"), benzinT(1.0, "1.0 TCe Turbo")] },
    { name: "Jogger", engines: [benzinT(1.0, "1.0 TCe Turbo"), hybrid(1.6, "1.6 Hibrit")] },
  ]},
  { name: "Honda", models: [
    { name: "Civic", engines: [benzinT(1.5, "1.5 VTEC Turbo"), hybrid(2.0, "2.0 e:HEV Hibrit")] },
    { name: "HR-V", engines: [hybrid(1.5, "1.5 e:HEV Hibrit")] },
    { name: "CR-V", engines: [hybrid(2.0, "2.0 e:HEV Hibrit")] },
  ]},
  { name: "Nissan", models: [
    { name: "Micra", engines: [benzinN(1.0, "1.0 Benzin"), benzinT(0.9, "0.9 IG-T Turbo")] },
    { name: "Juke", engines: [benzinT(1.0, "1.0 DIG-T Turbo"), hybrid(1.6, "1.6 Hibrit")] },
    { name: "Qashqai", engines: [benzinT(1.3, "1.3 DIG-T Turbo"), hybrid(1.5, "1.5 e-Power Hibrit")] },
    { name: "X-Trail", engines: [hybrid(1.5, "1.5 e-Power Hibrit")] },
  ]},
  { name: "Skoda", models: [
    { name: "Fabia", engines: [benzinT(1.0, "1.0 TSI Turbo"), benzinN(1.0, "1.0 MPI Benzin")] },
    { name: "Scala", engines: [benzinT(1.0, "1.0 TSI Turbo"), benzinT(1.5, "1.5 TSI Turbo")] },
    { name: "Octavia", engines: [benzinT(1.5, "1.5 TSI Turbo"), dieselTurbo(2.0, "2.0 TDI Dizel")] },
    { name: "Kamiq", engines: [benzinT(1.0, "1.0 TSI Turbo"), benzinT(1.5, "1.5 TSI Turbo")] },
    { name: "Karoq", engines: [benzinT(1.5, "1.5 TSI Turbo"), dieselTurbo(2.0, "2.0 TDI Dizel")] },
  ]},
  { name: "Kia", models: [
    { name: "Picanto", engines: [benzinN(1.0, "1.0 Benzin"), benzinN(1.2, "1.2 Benzin")] },
    { name: "Rio", engines: [benzinN(1.4, "1.4 Benzin")] },
    { name: "Ceed", engines: [benzinT(1.0, "1.0 T-GDI Turbo"), benzinT(1.4, "1.4 T-GDI Turbo")] },
    { name: "Sportage", engines: [benzinT(1.6, "1.6 T-GDI Turbo"), hybrid(1.6, "1.6 Hibrit")] },
  ]},
  { name: "Seat", models: [
    { name: "Ibiza", engines: [...commonSmallBenzin] },
    { name: "Leon", engines: [benzinT(1.0, "1.0 TSI Turbo"), benzinT(1.5, "1.5 TSI Turbo"), dieselTurbo(2.0, "2.0 TDI Dizel")] },
    { name: "Arona", engines: [benzinT(1.0, "1.0 TSI Turbo")] },
    { name: "Ateca", engines: [benzinT(1.5, "1.5 TSI Turbo"), dieselTurbo(2.0, "2.0 TDI Dizel")] },
  ]},
  { name: "BMW", models: [
    { name: "1 Serisi", engines: [benzinT(1.5, "1.5 Turbo Benzin"), dieselTurbo(2.0, "2.0d Dizel")] },
    { name: "3 Serisi", engines: [benzinT(2.0, "2.0 Turbo Benzin"), dieselTurbo(2.0, "2.0d Dizel"), hybrid(2.0, "2.0 Plug-in Hibrit")] },
    { name: "5 Serisi", engines: [benzinT(2.0, "2.0 Turbo Benzin"), dieselTurbo(2.0, "2.0d Dizel")] },
    { name: "X1", engines: [benzinT(1.5, "1.5 Turbo Benzin"), dieselTurbo(2.0, "2.0d Dizel")] },
    { name: "X3", engines: [benzinT(2.0, "2.0 Turbo Benzin"), dieselTurbo(2.0, "2.0d Dizel")] },
  ]},
  { name: "Mercedes-Benz", models: [
    { name: "A-Serisi", engines: [benzinT(1.3, "1.3 Turbo Benzin"), dieselTurbo(2.0, "2.0d Dizel")] },
    { name: "C-Serisi", engines: [benzinT(1.5, "1.5 Turbo Benzin"), dieselTurbo(2.0, "2.0d Dizel"), hybrid(2.0, "2.0 Plug-in Hibrit")] },
    { name: "E-Serisi", engines: [benzinT(2.0, "2.0 Turbo Benzin"), dieselTurbo(2.0, "2.0d Dizel")] },
    { name: "GLA", engines: [benzinT(1.3, "1.3 Turbo Benzin"), dieselTurbo(2.0, "2.0d Dizel")] },
    { name: "GLC", engines: [benzinT(2.0, "2.0 Turbo Benzin"), dieselTurbo(2.0, "2.0d Dizel")] },
  ]},
  { name: "Audi", models: [
    { name: "A3", engines: [benzinT(1.0, "1.0 TFSI Turbo"), benzinT(1.5, "1.5 TFSI Turbo"), dieselTurbo(2.0, "2.0 TDI Dizel")] },
    { name: "A4", engines: [benzinT(2.0, "2.0 TFSI Turbo"), dieselTurbo(2.0, "2.0 TDI Dizel")] },
    { name: "Q2", engines: [benzinT(1.0, "1.0 TFSI Turbo"), benzinT(1.5, "1.5 TFSI Turbo")] },
    { name: "Q3", engines: [benzinT(1.5, "1.5 TFSI Turbo"), dieselTurbo(2.0, "2.0 TDI Dizel")] },
  ]},
  { name: "Volvo", models: [
    { name: "XC40", engines: [benzinT(1.5, "1.5 T Benzin"), hybrid(1.5, "1.5 Hibrit")] },
    { name: "XC60", engines: [benzinT(2.0, "2.0 T Benzin"), hybrid(2.0, "2.0 Plug-in Hibrit")] },
  ]},
  { name: "Mazda", models: [
    { name: "Mazda 2", engines: [benzinN(1.5, "1.5 Skyactiv Benzin")] },
    { name: "CX-3", engines: [benzinN(2.0, "2.0 Skyactiv Benzin")] },
    { name: "CX-5", engines: [benzinN(2.0, "2.0 Skyactiv Benzin"), dieselTurbo(2.2, "2.2 Skyactiv-D Dizel")] },
  ]},
  { name: "Mitsubishi", models: [
    { name: "ASX", engines: [benzinN(1.6, "1.6 Benzin")] },
    { name: "L200", engines: [dieselTurbo(2.4, "2.4 DI-D Dizel")] },
    { name: "Eclipse Cross", engines: [benzinT(1.5, "1.5 Turbo Benzin")] },
  ]},
  { name: "Suzuki", models: [
    { name: "Swift", engines: [benzinN(1.2, "1.2 Benzin"), hybrid(1.2, "1.2 Hibrit")] },
    { name: "Vitara", engines: [benzinT(1.4, "1.4 Boosterjet Turbo"), hybrid(1.5, "1.5 Hibrit")] },
    { name: "S-Cross", engines: [benzinT(1.4, "1.4 Boosterjet Turbo"), hybrid(1.5, "1.5 Hibrit")] },
  ]},
  { name: "MG", models: [
    { name: "MG3", engines: [benzinN(1.5, "1.5 Benzin"), hybrid(1.5, "1.5 Hibrit")] },
    { name: "ZS", engines: [benzinN(1.5, "1.5 Benzin"), hybrid(1.5, "1.5 Hibrit")] },
    { name: "HS", engines: [benzinT(1.5, "1.5 Turbo Benzin")] },
    { name: "4", engines: [elektrik("Elektrik")] },
  ]},
  { name: "Chery", models: [
    { name: "Tiggo 7 Pro", engines: [benzinT(1.6, "1.6 TGDI Turbo")] },
    { name: "Tiggo 8 Pro", engines: [benzinT(1.6, "1.6 TGDI Turbo")] },
    { name: "Omoda 5", engines: [benzinT(1.6, "1.6 TGDI Turbo")] },
  ]},
  { name: "BYD", models: [
    { name: "Atto 3", engines: [elektrik("Elektrik")] },
    { name: "Seal", engines: [elektrik("Elektrik")] },
    { name: "Dolphin", engines: [elektrik("Elektrik")] },
  ]},
  { name: "TOGG", models: [
    { name: "T10X", engines: [elektrik("Elektrik")] },
  ]},
  { name: "Tesla", models: [
    { name: "Model 3", engines: [elektrik("Elektrik")] },
    { name: "Model Y", engines: [elektrik("Elektrik")] },
  ]},
  { name: "Jeep", models: [
    { name: "Renegade", engines: [benzinT(1.0, "1.0 Turbo Benzin"), hybrid(1.5, "1.5 Hibrit")] },
    { name: "Compass", engines: [benzinT(1.3, "1.3 Turbo Benzin"), hybrid(1.5, "1.5 Hibrit")] },
  ]},
  { name: "Alfa Romeo", models: [
    { name: "Giulia", engines: [benzinT(2.0, "2.0 Turbo Benzin"), dieselTurbo(2.2, "2.2 Dizel")] },
    { name: "Stelvio", engines: [benzinT(2.0, "2.0 Turbo Benzin"), dieselTurbo(2.2, "2.2 Dizel")] },
    { name: "Tonale", engines: [hybrid(1.5, "1.5 Hibrit"), hybrid(1.3, "1.3 Plug-in Hibrit")] },
  ]},
  { name: "Isuzu", models: [
    { name: "D-Max", engines: [dieselTurbo(1.9, "1.9 Dizel"), dieselTurbo(3.0, "3.0 Dizel")] },
  ]},
  { name: "SsangYong", models: [
    { name: "Tivoli", engines: [benzinT(1.5, "1.5 Turbo Benzin")] },
    { name: "Korando", engines: [benzinT(1.5, "1.5 Turbo Benzin"), dieselTurbo(1.6, "1.6 Dizel")] },
  ]},
];
