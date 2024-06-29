export interface Tour {
    id?: number; // Opcional ya que un nuevo tour no tendrá ID hasta que sea creado
    title: string;
    description: string;
    location: string;
    date: string; // Usar string para simplificar el manejo de fechas
    price: number;
    city: string; // Añadir campo city
    name: string; // Añadir campo name
  }
  