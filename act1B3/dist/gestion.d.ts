import { Incidente, CrearIncidenteDTO, EstadoIncidente } from './types';
export declare function reportarIncidente(datos: CrearIncidenteDTO): Incidente;
/**
 * 2. Función para actualizar el estado del incidente (Narrowing / Verificación)
 */
export declare function cambiarEstadoIncidente(idIncidente: string, nuevoEstado: EstadoIncidente): void;
/**

 * @param mes
 * @param anio
 */
export declare function obtenerReporteMensual(mes: number, anio: number): Incidente[];
/**
 * Función auxiliar para recuperar toda la lista actual en memoria
 */
export declare function obtenerTodosLosIncidentes(): Incidente[];
//# sourceMappingURL=gestion.d.ts.map