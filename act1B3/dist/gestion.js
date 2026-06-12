"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportarIncidente = reportarIncidente;
exports.cambiarEstadoIncidente = cambiarEstadoIncidente;
exports.obtenerReporteMensual = obtenerReporteMensual;
exports.obtenerTodosLosIncidentes = obtenerTodosLosIncidentes;
// Pilar 4: Colección/Arreglo global en memoria (DB Mock State)
const listadoIncidentes = [];
function reportarIncidente(datos) {
    const nuevoIncidente = {
        // Genera un ID corto y único emulando un backend
        id: "inc_" + Math.random().toString(36).substring(2, 10),
        ...datos,
        estado: 'abierto', // Regla de negocio: automático al aperturar
        fechaCreacion: new Date() // Fecha y hora actual del sistema
    };
    listadoIncidentes.push(nuevoIncidente);
    console.log(`[ÉXITO] Ticket registrado: "${nuevoIncidente.titulo}" asignado automáticamente como ABIERTO.`);
    return nuevoIncidente;
}
/**
 * 2. Función para actualizar el estado del incidente (Narrowing / Verificación)
 */
function cambiarEstadoIncidente(idIncidente, nuevoEstado) {
    const incidenteEncontrado = listadoIncidentes.find(inc => inc.id === idIncidente);
    // Verificación segura (Type Narrowing / Control de nulos)
    if (incidenteEncontrado) {
        incidenteEncontrado.estado = nuevoEstado;
        console.log(`[ÉXITO] El incidente con ID ${idIncidente} cambió su estado a: ${nuevoEstado}.`);
    }
    else {
        console.log(`[ERROR] No se encontró ningún incidente con el ID: ${idIncidente}.`);
    }
}
/**

 * @param mes
 * @param anio
 */
function obtenerReporteMensual(mes, anio) {
    // Usamos .filter() para evaluar las fechas de creación de cada registro
    return listadoIncidentes.filter(incidente => {
        const coincidenciaMes = incidente.fechaCreacion.getMonth() === mes;
        const coincidenciaAnio = incidente.fechaCreacion.getFullYear() === anio;
        return coincidenciaMes && coincidenciaAnio;
    });
}
/**
 * Función auxiliar para recuperar toda la lista actual en memoria
 */
function obtenerTodosLosIncidentes() {
    return [...listadoIncidentes];
}
//# sourceMappingURL=gestion.js.map