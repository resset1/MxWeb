// Definición de tipos e interfaces para el modal de Registro de Podio

export interface PodiumFormData {
  raceTitle: string;
  pilotName: string;
  documentNumber: string;
  email: string;
  phone: string;
  bikeNumber: string;
  vinBike: string;
  bikeBrand: string;
  bikeModel: string;
  bikeYear: string;
  cilindrada?: string; // Columna de tbVehiculos
  sport: string;
  category: string;
  position: string;
  event: string;
  eventDate: string; // Tipo string ("YYYY-MM-DD") para coincidir con el input HTML
  photoUrl: string | null;
}

export interface RegisterPodiumModalProps {
  isOpen: boolean;
  raceTitle: string;
  onClose: () => void;
  onSubmitSuccess?: (data: PodiumFormData) => void;
}

export interface PhotoUploaderProps {
  photoUrl: string | null;
  onPhotoSelected: (url: string | null) => void;
}

export interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}
