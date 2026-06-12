import { Incidente, CrearIncidenteDTO, EstadoIncidente } from './types';

const listadoIncidentes: Incidente[] = [];


export function reportarIncidente(datos: CrearIncidenteDTO): Incidente {
    const nuevoIncidente: Incidente = {
        id: "inc_" + Math.random().toString(36).substring(2, 10), 
        ...datos,
        estado: 'abierto',        
        fechaCreacion: new Date()  
    };

    listadoIncidentes.push(nuevoIncidente);
    console.log(`[ÉXITO] Ticket registrado: "${nuevoIncidente.titulo}" asignado automáticamente como ABIERTO.`);
    return nuevoIncidente;
}

export function cambiarEstadoIncidente(idIncidente: string, nuevoEstado: EstadoIncidente): void {
    
    const incidenteEncontrado = listadoIncidentes.find(inc => inc.id === idIncidente);

    if (incidenteEncontrado) {
        incidenteEncontrado.estado = nuevoEstado;
        console.log(`[ÉXITO] El incidente con ID ${idIncidente} cambió su estado a: ${nuevoEstado}.`);
    } else {
        console.log(`[ERROR] No se encontró ningún incidente con el ID: ${idIncidente}.`);
    }
}

/**

 * @param mes 
 * @param anio 
 */
export function obtenerReporteMensual(mes: number, anio: number): Incidente[] {
    // Usamos .filter() para evaluar las fechas de creación de cada registro
    return listadoIncidentes.filter(incidente => {
        const coincidenciaMes = incidente.fechaCreacion.getMonth() === mes;
        const coincidenciaAnio = incidente.fechaCreacion.getFullYear() === anio;
        return coincidenciaMes && coincidenciaAnio;
    });
}

export function obtenerTodosLosIncidentes(): Incidente[] {
    return [...listadoIncidentes];
}