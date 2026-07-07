// Türkiye pazarındaki markalar ve model serileri. Yaygın motor/yakıt varyantları.
// Bu dosya salt-veri; yeni marka/model eklemek için sadece diziyi genişletin.

export type FuelType = "Benzin" | "Dizel" | "LPG" | "Hibrit" | "Elektrik";
export type Aspiration = "Atmosferik" | "Turbo";

export interface Engine {
  label: string;
  displacement: number;
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

const bT  = (d: number, l: string): Engine => ({ label: l, displacement: d, fuel: "Benzin",   aspiration: "Turbo" });
const bN  = (d: number, l: string): Engine => ({ label: l, displacement: d, fuel: "Benzin",   aspiration: "Atmosferik" });
const dT  = (d: number, l: string): Engine => ({ label: l, displacement: d, fuel: "Dizel",    aspiration: "Turbo" });
const hy  = (d: number, l: string): Engine => ({ label: l, displacement: d, fuel: "Hibrit",   aspiration: "Atmosferik" });
const ev  = (l: string): Engine =>            ({ label: l, displacement: 0, fuel: "Elektrik", aspiration: "Atmosferik" });
const lpg = (d: number, l: string): Engine => ({ label: l, displacement: d, fuel: "LPG",      aspiration: "Atmosferik" });

export const BRANDS: Brand[] = [
  { name: "Fiat", models: [
    { name: "Egea Sedan", engines: [bN(1.4, "1.4 Fire Benzin"), dT(1.3, "1.3 Multijet Dizel"), dT(1.6, "1.6 Multijet Dizel"), lpg(1.4, "1.4 Fire LPG")] },
    { name: "Egea Cross", engines: [bT(1.0, "1.0 GSE Turbo Benzin"), hy(1.5, "1.5 Hibrit"), dT(1.6, "1.6 Multijet Dizel")] },
    { name: "Egea Hatchback", engines: [bN(1.4, "1.4 Fire Benzin"), dT(1.3, "1.3 Multijet Dizel")] },
    { name: "500", engines: [bN(1.2, "1.2 Benzin"), hy(1.0, "1.0 Mild Hibrit"), ev("Elektrik")] },
    { name: "500X", engines: [bT(1.0, "1.0 GSE Turbo Benzin"), bT(1.3, "1.3 Firefly Turbo")] },
    { name: "Panda", engines: [bN(1.2, "1.2 Benzin"), hy(1.0, "1.0 Mild Hibrit")] },
    { name: "Doblo", engines: [dT(1.6, "1.6 Multijet Dizel"), dT(1.3, "1.3 Multijet Dizel"), bT(1.5, "1.5 Benzin"), ev("Elektrik")] },
    { name: "Fiorino", engines: [dT(1.3, "1.3 Multijet Dizel"), bN(1.4, "1.4 Fire Benzin")] },
  ]},
  { name: "Renault", models: [
    { name: "Clio", engines: [bN(1.0, "1.0 SCe Benzin"), bT(1.0, "1.0 TCe Turbo"), hy(1.6, "1.6 E-Tech Hibrit"), lpg(1.0, "1.0 TCe LPG")] },
    { name: "Symbol", engines: [bN(1.2, "1.2 Benzin"), dT(1.5, "1.5 dCi Dizel")] },
    { name: "Taliant", engines: [bN(1.0, "1.0 SCe Benzin"), bT(1.0, "1.0 TCe Turbo"), lpg(1.0, "1.0 TCe LPG")] },
    { name: "Megane Sedan", engines: [bN(1.6, "1.6 Benzin"), dT(1.5, "1.5 dCi Dizel"), bT(1.3, "1.3 TCe Turbo")] },
    { name: "Megane E-Tech", engines: [ev("Elektrik")] },
    { name: "Captur", engines: [bT(1.3, "1.3 TCe Turbo"), hy(1.6, "1.6 E-Tech Hibrit"), lpg(1.0, "1.0 TCe LPG")] },
    { name: "Kadjar", engines: [bT(1.3, "1.3 TCe Turbo"), dT(1.5, "1.5 dCi Dizel")] },
    { name: "Austral", engines: [hy(1.2, "1.2 E-Tech Hibrit"), bT(1.3, "1.3 TCe Turbo")] },
    { name: "Talisman", engines: [bT(1.6, "1.6 TCe Turbo"), dT(1.7, "1.7 Blue dCi Dizel")] },
  ]},
  { name: "Volkswagen", models: [
    { name: "Polo", engines: [bT(1.0, "1.0 TSI Turbo"), bN(1.0, "1.0 MPI Benzin")] },
    { name: "Golf", engines: [bT(1.0, "1.0 TSI Turbo"), bT(1.5, "1.5 TSI Turbo"), dT(2.0, "2.0 TDI Dizel"), hy(1.4, "1.4 eHybrid")] },
    { name: "Jetta", engines: [bT(1.4, "1.4 TSI Turbo"), dT(2.0, "2.0 TDI Dizel")] },
    { name: "Passat", engines: [bT(1.5, "1.5 TSI Turbo"), dT(2.0, "2.0 TDI Dizel"), hy(1.4, "1.4 eHybrid")] },
    { name: "T-Cross", engines: [bT(1.0, "1.0 TSI Turbo"), bT(1.5, "1.5 TSI Turbo")] },
    { name: "T-Roc", engines: [bT(1.0, "1.0 TSI Turbo"), bT(1.5, "1.5 TSI Turbo"), dT(2.0, "2.0 TDI Dizel")] },
    { name: "Tiguan", engines: [bT(1.5, "1.5 TSI Turbo"), dT(2.0, "2.0 TDI Dizel"), hy(1.4, "1.4 eHybrid")] },
    { name: "Touareg", engines: [dT(3.0, "3.0 V6 TDI Dizel"), bT(3.0, "3.0 V6 TSI Turbo")] },
    { name: "ID.4", engines: [ev("Elektrik")] },
  ]},
  { name: "Toyota", models: [
    { name: "Yaris", engines: [bN(1.5, "1.5 Benzin"), hy(1.5, "1.5 Hibrit")] },
    { name: "Yaris Cross", engines: [hy(1.5, "1.5 Hibrit")] },
    { name: "Corolla Sedan", engines: [bN(1.6, "1.6 Valvematic Benzin"), hy(1.8, "1.8 Hibrit"), bT(1.5, "1.5 Turbo Benzin")] },
    { name: "Corolla Hatchback", engines: [hy(1.8, "1.8 Hibrit"), hy(2.0, "2.0 Hibrit")] },
    { name: "Corolla Cross", engines: [hy(1.8, "1.8 Hibrit"), hy(2.0, "2.0 Hibrit")] },
    { name: "C-HR", engines: [hy(1.8, "1.8 Hibrit"), hy(2.0, "2.0 Hibrit")] },
    { name: "RAV4", engines: [hy(2.5, "2.5 Hibrit"), hy(2.5, "2.5 Plug-in Hibrit")] },
    { name: "Camry", engines: [hy(2.5, "2.5 Hibrit")] },
  ]},
  { name: "Hyundai", models: [
    { name: "i10", engines: [bN(1.0, "1.0 Benzin"), bN(1.2, "1.2 Benzin")] },
    { name: "i20", engines: [bN(1.4, "1.4 Benzin"), bT(1.0, "1.0 T-GDI Turbo"), hy(1.0, "1.0 Mild Hibrit")] },
    { name: "Elantra", engines: [bN(1.6, "1.6 MPI Benzin"), hy(1.6, "1.6 Hibrit")] },
    { name: "Bayon", engines: [bT(1.0, "1.0 T-GDI Turbo"), hy(1.0, "1.0 Mild Hibrit")] },
    { name: "Kona", engines: [bT(1.6, "1.6 T-GDI Turbo"), hy(1.6, "1.6 Hibrit"), ev("Elektrik")] },
    { name: "Tucson", engines: [bT(1.6, "1.6 T-GDI Turbo"), hy(1.6, "1.6 Hibrit"), hy(1.6, "1.6 Plug-in Hibrit"), dT(1.6, "1.6 CRDi Dizel")] },
    { name: "Santa Fe", engines: [hy(1.6, "1.6 Hibrit"), hy(1.6, "1.6 Plug-in Hibrit"), dT(2.2, "2.2 CRDi Dizel")] },
  ]},
  { name: "Ford", models: [
    { name: "Fiesta", engines: [bT(1.0, "1.0 EcoBoost Turbo"), bN(1.1, "1.1 Ti-VCT Benzin")] },
    { name: "Focus", engines: [bT(1.0, "1.0 EcoBoost Turbo"), bT(1.5, "1.5 EcoBoost Turbo"), dT(1.5, "1.5 EcoBlue Dizel")] },
    { name: "Puma", engines: [bT(1.0, "1.0 EcoBoost Turbo"), hy(1.0, "1.0 EcoBoost Mild Hibrit"), ev("Elektrik")] },
    { name: "EcoSport", engines: [bT(1.0, "1.0 EcoBoost Turbo"), dT(1.5, "1.5 TDCi Dizel")] },
    { name: "Kuga", engines: [bT(1.5, "1.5 EcoBoost Turbo"), hy(2.5, "2.5 Hibrit"), hy(2.5, "2.5 Plug-in Hibrit")] },
    { name: "Courier", engines: [dT(1.5, "1.5 EcoBlue Dizel"), bT(1.0, "1.0 EcoBoost Turbo")] },
  ]},
  { name: "Opel", models: [
    { name: "Corsa", engines: [bT(1.2, "1.2 Turbo Benzin"), bN(1.2, "1.2 Benzin"), ev("Elektrik")] },
    { name: "Astra", engines: [bT(1.2, "1.2 Turbo Benzin"), hy(1.6, "1.6 Plug-in Hibrit"), ev("Elektrik")] },
    { name: "Crossland", engines: [bT(1.2, "1.2 Turbo Benzin"), dT(1.5, "1.5 Dizel")] },
    { name: "Mokka", engines: [bT(1.2, "1.2 Turbo Benzin"), ev("Elektrik")] },
    { name: "Grandland", engines: [bT(1.2, "1.2 Turbo Benzin"), hy(1.6, "1.6 Hibrit"), hy(1.6, "1.6 Plug-in Hibrit")] },
  ]},
  { name: "Peugeot", models: [
    { name: "208", engines: [bT(1.2, "1.2 PureTech Turbo"), ev("Elektrik")] },
    { name: "301", engines: [bN(1.2, "1.2 Benzin"), dT(1.5, "1.5 BlueHDi Dizel")] },
    { name: "2008", engines: [bT(1.2, "1.2 PureTech Turbo"), ev("Elektrik")] },
    { name: "308", engines: [bT(1.2, "1.2 PureTech Turbo"), hy(1.6, "1.6 Hibrit"), dT(1.5, "1.5 BlueHDi Dizel")] },
    { name: "3008", engines: [bT(1.2, "1.2 PureTech Turbo"), hy(1.6, "1.6 Plug-in Hibrit"), dT(1.5, "1.5 BlueHDi Dizel")] },
    { name: "5008", engines: [bT(1.2, "1.2 PureTech Turbo"), dT(1.5, "1.5 BlueHDi Dizel")] },
    { name: "Partner", engines: [dT(1.5, "1.5 BlueHDi Dizel"), ev("Elektrik")] },
  ]},
  { name: "Citroën", models: [
    { name: "C3", engines: [bT(1.2, "1.2 PureTech Turbo"), bN(1.2, "1.2 Benzin")] },
    { name: "C-Elysée", engines: [bN(1.2, "1.2 Benzin"), dT(1.5, "1.5 BlueHDi Dizel")] },
    { name: "C4", engines: [bT(1.2, "1.2 PureTech Turbo"), dT(1.5, "1.5 BlueHDi Dizel"), ev("Elektrik")] },
    { name: "C5 Aircross", engines: [bT(1.6, "1.6 Turbo"), hy(1.6, "1.6 Plug-in Hibrit")] },
    { name: "Berlingo", engines: [dT(1.5, "1.5 BlueHDi Dizel"), ev("Elektrik")] },
  ]},
  { name: "Dacia", models: [
    { name: "Sandero", engines: [bN(1.0, "1.0 SCe Benzin"), bT(1.0, "1.0 TCe Turbo"), lpg(1.0, "1.0 ECO-G LPG")] },
    { name: "Logan", engines: [bN(1.0, "1.0 SCe Benzin"), bT(1.0, "1.0 TCe Turbo")] },
    { name: "Duster", engines: [bT(1.3, "1.3 TCe Turbo"), dT(1.5, "1.5 Blue dCi Dizel"), lpg(1.0, "1.0 ECO-G LPG"), hy(1.6, "1.6 Hibrit")] },
    { name: "Jogger", engines: [bT(1.0, "1.0 TCe Turbo"), hy(1.6, "1.6 Hibrit"), lpg(1.0, "1.0 ECO-G LPG")] },
    { name: "Spring", engines: [ev("Elektrik")] },
  ]},
  { name: "Honda", models: [
    { name: "Civic", engines: [bT(1.5, "1.5 VTEC Turbo"), hy(2.0, "2.0 e:HEV Hibrit")] },
    { name: "City", engines: [bN(1.5, "1.5 i-VTEC Benzin"), hy(1.5, "1.5 e:HEV Hibrit")] },
    { name: "HR-V", engines: [hy(1.5, "1.5 e:HEV Hibrit")] },
    { name: "CR-V", engines: [hy(2.0, "2.0 e:HEV Hibrit"), hy(2.0, "2.0 Plug-in Hibrit")] },
  ]},
  { name: "Nissan", models: [
    { name: "Micra", engines: [bN(1.0, "1.0 Benzin"), bT(0.9, "0.9 IG-T Turbo")] },
    { name: "Juke", engines: [bT(1.0, "1.0 DIG-T Turbo"), hy(1.6, "1.6 Hibrit")] },
    { name: "Qashqai", engines: [bT(1.3, "1.3 DIG-T Turbo"), hy(1.5, "1.5 e-Power Hibrit")] },
    { name: "X-Trail", engines: [hy(1.5, "1.5 e-Power Hibrit")] },
  ]},
  { name: "Skoda", models: [
    { name: "Fabia", engines: [bT(1.0, "1.0 TSI Turbo"), bN(1.0, "1.0 MPI Benzin")] },
    { name: "Scala", engines: [bT(1.0, "1.0 TSI Turbo"), bT(1.5, "1.5 TSI Turbo")] },
    { name: "Octavia", engines: [bT(1.5, "1.5 TSI Turbo"), dT(2.0, "2.0 TDI Dizel"), hy(1.4, "1.4 iV Plug-in Hibrit")] },
    { name: "Superb", engines: [bT(1.5, "1.5 TSI Turbo"), bT(2.0, "2.0 TSI Turbo"), dT(2.0, "2.0 TDI Dizel"), hy(1.4, "1.4 iV Plug-in Hibrit")] },
    { name: "Kamiq", engines: [bT(1.0, "1.0 TSI Turbo"), bT(1.5, "1.5 TSI Turbo")] },
    { name: "Karoq", engines: [bT(1.5, "1.5 TSI Turbo"), dT(2.0, "2.0 TDI Dizel")] },
    { name: "Kodiaq", engines: [bT(1.5, "1.5 TSI Turbo"), bT(2.0, "2.0 TSI Turbo"), dT(2.0, "2.0 TDI Dizel")] },
    { name: "Enyaq", engines: [ev("Elektrik")] },
  ]},
  { name: "Kia", models: [
    { name: "Picanto", engines: [bN(1.0, "1.0 Benzin"), bN(1.2, "1.2 Benzin")] },
    { name: "Rio", engines: [bN(1.4, "1.4 Benzin"), bT(1.0, "1.0 T-GDI Turbo")] },
    { name: "Stonic", engines: [bT(1.0, "1.0 T-GDI Turbo"), hy(1.0, "1.0 Mild Hibrit")] },
    { name: "Ceed", engines: [bT(1.0, "1.0 T-GDI Turbo"), bT(1.4, "1.4 T-GDI Turbo"), hy(1.6, "1.6 Plug-in Hibrit")] },
    { name: "Sportage", engines: [bT(1.6, "1.6 T-GDI Turbo"), hy(1.6, "1.6 Hibrit"), hy(1.6, "1.6 Plug-in Hibrit"), dT(1.6, "1.6 CRDi Dizel")] },
    { name: "Sorento", engines: [hy(1.6, "1.6 Hibrit"), hy(1.6, "1.6 Plug-in Hibrit"), dT(2.2, "2.2 CRDi Dizel")] },
  ]},
  { name: "Seat", models: [
    { name: "Ibiza", engines: [bT(1.0, "1.0 TSI Turbo"), bN(1.0, "1.0 MPI Benzin")] },
    { name: "Leon", engines: [bT(1.0, "1.0 TSI Turbo"), bT(1.5, "1.5 TSI Turbo"), dT(2.0, "2.0 TDI Dizel"), hy(1.4, "1.4 eHybrid")] },
    { name: "Arona", engines: [bT(1.0, "1.0 TSI Turbo"), bT(1.5, "1.5 TSI Turbo")] },
    { name: "Ateca", engines: [bT(1.5, "1.5 TSI Turbo"), dT(2.0, "2.0 TDI Dizel")] },
    { name: "Tarraco", engines: [bT(1.5, "1.5 TSI Turbo"), dT(2.0, "2.0 TDI Dizel")] },
  ]},
  { name: "BMW", models: [
    { name: "1 Serisi", engines: [bT(1.5, "1.5 Turbo Benzin"), bT(2.0, "2.0 Turbo Benzin"), dT(2.0, "2.0d Dizel")] },
    { name: "2 Serisi", engines: [bT(2.0, "2.0 Turbo Benzin"), dT(2.0, "2.0d Dizel")] },
    { name: "3 Serisi", engines: [bT(2.0, "2.0 Turbo Benzin"), dT(2.0, "2.0d Dizel"), hy(2.0, "2.0 Plug-in Hibrit")] },
    { name: "5 Serisi", engines: [bT(2.0, "2.0 Turbo Benzin"), dT(2.0, "2.0d Dizel"), hy(2.0, "2.0 Plug-in Hibrit")] },
    { name: "X1", engines: [bT(1.5, "1.5 Turbo Benzin"), dT(2.0, "2.0d Dizel"), ev("Elektrik")] },
    { name: "X3", engines: [bT(2.0, "2.0 Turbo Benzin"), dT(2.0, "2.0d Dizel"), hy(2.0, "2.0 Plug-in Hibrit")] },
    { name: "X5", engines: [dT(3.0, "3.0d Dizel"), hy(3.0, "3.0 Plug-in Hibrit")] },
    { name: "i4", engines: [ev("Elektrik")] },
  ]},
  { name: "Mercedes-Benz", models: [
    { name: "A-Serisi", engines: [bT(1.3, "1.3 Turbo Benzin"), dT(2.0, "2.0d Dizel"), hy(1.3, "1.3 Plug-in Hibrit")] },
    { name: "B-Serisi", engines: [bT(1.3, "1.3 Turbo Benzin"), dT(2.0, "2.0d Dizel")] },
    { name: "C-Serisi", engines: [bT(1.5, "1.5 Turbo Benzin"), bT(2.0, "2.0 Turbo Benzin"), dT(2.0, "2.0d Dizel"), hy(2.0, "2.0 Plug-in Hibrit")] },
    { name: "E-Serisi", engines: [bT(2.0, "2.0 Turbo Benzin"), dT(2.0, "2.0d Dizel"), hy(2.0, "2.0 Plug-in Hibrit")] },
    { name: "GLA", engines: [bT(1.3, "1.3 Turbo Benzin"), dT(2.0, "2.0d Dizel")] },
    { name: "GLC", engines: [bT(2.0, "2.0 Turbo Benzin"), dT(2.0, "2.0d Dizel"), hy(2.0, "2.0 Plug-in Hibrit")] },
    { name: "EQA", engines: [ev("Elektrik")] },
    { name: "EQE", engines: [ev("Elektrik")] },
  ]},
  { name: "Audi", models: [
    { name: "A3", engines: [bT(1.0, "1.0 TFSI Turbo"), bT(1.5, "1.5 TFSI Turbo"), dT(2.0, "2.0 TDI Dizel"), hy(1.4, "1.4 TFSI e Plug-in Hibrit")] },
    { name: "A4", engines: [bT(2.0, "2.0 TFSI Turbo"), dT(2.0, "2.0 TDI Dizel")] },
    { name: "A6", engines: [bT(2.0, "2.0 TFSI Turbo"), dT(2.0, "2.0 TDI Dizel"), hy(2.0, "2.0 TFSI e Plug-in Hibrit")] },
    { name: "Q2", engines: [bT(1.0, "1.0 TFSI Turbo"), bT(1.5, "1.5 TFSI Turbo")] },
    { name: "Q3", engines: [bT(1.5, "1.5 TFSI Turbo"), dT(2.0, "2.0 TDI Dizel"), hy(1.4, "1.4 TFSI e Plug-in Hibrit")] },
    { name: "Q5", engines: [bT(2.0, "2.0 TFSI Turbo"), dT(2.0, "2.0 TDI Dizel")] },
    { name: "Q4 e-tron", engines: [ev("Elektrik")] },
  ]},
  { name: "Mazda", models: [
    { name: "Mazda 2", engines: [bN(1.5, "1.5 Skyactiv-G Benzin")] },
    { name: "Mazda 3", engines: [bN(2.0, "2.0 Skyactiv-G Benzin"), hy(2.0, "2.0 M-Hybrid")] },
    { name: "Mazda 6", engines: [bN(2.0, "2.0 Skyactiv-G Benzin"), bN(2.5, "2.5 Skyactiv-G Benzin")] },
    { name: "CX-3", engines: [bN(2.0, "2.0 Skyactiv-G Benzin")] },
    { name: "CX-5", engines: [bN(2.0, "2.0 Skyactiv-G Benzin"), dT(2.2, "2.2 Skyactiv-D Dizel")] },
    { name: "CX-60", engines: [dT(3.3, "3.3 Skyactiv-D Dizel"), hy(2.5, "2.5 Plug-in Hibrit")] },
  ]},
  { name: "Mitsubishi", models: [
    { name: "ASX", engines: [bN(1.6, "1.6 Benzin"), hy(1.6, "1.6 Hibrit")] },
    { name: "Eclipse Cross", engines: [bT(1.5, "1.5 Turbo Benzin"), hy(2.4, "2.4 Plug-in Hibrit")] },
    { name: "Outlander", engines: [hy(2.4, "2.4 Plug-in Hibrit")] },
    { name: "L200", engines: [dT(2.4, "2.4 DI-D Dizel")] },
  ]},
  { name: "Suzuki", models: [
    { name: "Swift", engines: [bN(1.2, "1.2 Benzin"), hy(1.2, "1.2 Hibrit")] },
    { name: "Vitara", engines: [bT(1.4, "1.4 Boosterjet Turbo"), hy(1.5, "1.5 Hibrit")] },
    { name: "S-Cross", engines: [bT(1.4, "1.4 Boosterjet Turbo"), hy(1.5, "1.5 Hibrit")] },
    { name: "Jimny", engines: [bN(1.5, "1.5 Benzin")] },
  ]},
  { name: "Volvo", models: [
    { name: "XC40", engines: [bT(1.5, "1.5 T Benzin"), hy(1.5, "1.5 Hibrit"), ev("Elektrik")] },
    { name: "XC60", engines: [bT(2.0, "2.0 T Benzin"), hy(2.0, "2.0 Plug-in Hibrit")] },
    { name: "XC90", engines: [hy(2.0, "2.0 Plug-in Hibrit")] },
    { name: "EX30", engines: [ev("Elektrik")] },
  ]},
  { name: "MG", models: [
    { name: "MG3", engines: [bN(1.5, "1.5 Benzin"), hy(1.5, "1.5 Hibrit")] },
    { name: "ZS", engines: [bN(1.5, "1.5 Benzin"), hy(1.5, "1.5 Hibrit"), ev("Elektrik")] },
    { name: "HS", engines: [bT(1.5, "1.5 Turbo Benzin"), hy(1.5, "1.5 Plug-in Hibrit")] },
    { name: "MG4", engines: [ev("Elektrik")] },
    { name: "MG5", engines: [ev("Elektrik")] },
  ]},
  { name: "Chery", models: [
    { name: "Tiggo 7 Pro", engines: [bT(1.6, "1.6 TGDI Turbo"), hy(1.5, "1.5 Plug-in Hibrit")] },
    { name: "Tiggo 8 Pro", engines: [bT(1.6, "1.6 TGDI Turbo"), hy(1.5, "1.5 Plug-in Hibrit")] },
    { name: "Omoda 5", engines: [bT(1.6, "1.6 TGDI Turbo"), ev("Elektrik")] },
  ]},
  { name: "BYD", models: [
    { name: "Atto 3", engines: [ev("Elektrik")] },
    { name: "Seal", engines: [ev("Elektrik")] },
    { name: "Dolphin", engines: [ev("Elektrik")] },
    { name: "Song Plus", engines: [ev("Elektrik"), hy(1.5, "1.5 DM-i Plug-in Hibrit")] },
  ]},
  { name: "TOGG", models: [
    { name: "T10X", engines: [ev("Elektrik")] },
    { name: "T10F", engines: [ev("Elektrik")] },
  ]},
  { name: "Tesla", models: [
    { name: "Model 3", engines: [ev("Elektrik")] },
    { name: "Model Y", engines: [ev("Elektrik")] },
    { name: "Model S", engines: [ev("Elektrik")] },
    { name: "Model X", engines: [ev("Elektrik")] },
  ]},
  { name: "Jeep", models: [
    { name: "Renegade", engines: [bT(1.0, "1.0 Turbo Benzin"), hy(1.5, "1.5 Hibrit"), hy(1.3, "1.3 Plug-in Hibrit")] },
    { name: "Compass", engines: [bT(1.3, "1.3 Turbo Benzin"), hy(1.5, "1.5 Hibrit"), hy(1.3, "1.3 Plug-in Hibrit")] },
    { name: "Wrangler", engines: [bT(2.0, "2.0 Turbo Benzin"), hy(2.0, "2.0 4xe Plug-in Hibrit")] },
    { name: "Avenger", engines: [ev("Elektrik"), hy(1.2, "1.2 Hibrit")] },
  ]},
  { name: "Alfa Romeo", models: [
    { name: "Giulia", engines: [bT(2.0, "2.0 Turbo Benzin"), dT(2.2, "2.2 Dizel")] },
    { name: "Stelvio", engines: [bT(2.0, "2.0 Turbo Benzin"), dT(2.2, "2.2 Dizel")] },
    { name: "Tonale", engines: [hy(1.5, "1.5 Hibrit"), hy(1.3, "1.3 Plug-in Hibrit")] },
  ]},
  { name: "Isuzu", models: [
    { name: "D-Max", engines: [dT(1.9, "1.9 Dizel"), dT(3.0, "3.0 Dizel")] },
  ]},
  { name: "SsangYong / KGM", models: [
    { name: "Tivoli", engines: [bT(1.5, "1.5 Turbo Benzin")] },
    { name: "Korando", engines: [bT(1.5, "1.5 Turbo Benzin"), dT(1.6, "1.6 Dizel")] },
    { name: "Torres", engines: [bT(1.5, "1.5 Turbo Benzin"), ev("Elektrik")] },
  ]},
];
