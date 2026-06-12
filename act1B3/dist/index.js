"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const gestion_1 = require("./gestion");
// Creamos la interfaz de lectura para la consola de la máquina
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Función auxiliar para hacer preguntas en la terminal usando Promesas
const preguntar = (pregunta) => {
    return new Promise((resolve) => rl.question(pregunta, resolve));
};
/**
 * Menú Principal Interactivo
 */
async function menuPrincipal() {
    console.log("\n=====================================================");
    console.log("   SISTEMA DE CONTROL DE INCIDENTES - LABORATORIO C27 ");
    console.log("=====================================================");
    console.log("1. Reportar un nuevo problema tecnológico");
    console.log("2. Cambiar estado de un incidente (Abierto/En progreso/Resuelto)");
    console.log("3. Ver reporte mensual actual (Tabla)");
    console.log("4. Ver TODOS los incidentes registrados");
    console.log("5. Salir del programa");
    console.log("=====================================================");
    const opcion = await preguntar("Selecciona una opción (1-5): ");
    switch (opcion.trim()) {
        case '1':
            console.log("\n--- REGISTRAR NUEVO INCIDENTE ---");
            const titulo = await preguntar("Título del problema (ej. PC-02 no enciende): ");
            const descripcion = await preguntar("Descripción de la falla: ");
            const reportadoPor = await preguntar("¿Quién lo reporta? (Tu nombre o Maestro): ");
            console.log("Prioridades válidas: baja | media | alta");
            let prioridad = await preguntar("Prioridad: ");
            // Validamos que el usuario no escriba cualquier cosa en la prioridad
            if (prioridad !== 'baja' && prioridad !== 'media' && prioridad !== 'alta') {
                console.log("[ERROR] Prioridad no válida. Se asignará 'baja' por defecto.");
                prioridad = 'baja';
            }
            // Llamamos a tu función de gestión
            (0, gestion_1.reportarIncidente)({ titulo, descripcion, reportadoPor, prioridad });
            break;
        case '2':
            console.log("\n--- CAMBIAR ESTADO DE UN INCIDENTE ---");
            const idBusqueda = await preguntar("Introduce el ID del incidente (ej. inc_xxxx): ");
            console.log("Estados válidas: abierto | en progreso | resuelto");
            const nuevoEstado = await preguntar("Nuevo estado: ");
            if (nuevoEstado !== 'abierto' && nuevoEstado !== 'en progreso' && nuevoEstado !== 'resuelto') {
                console.log("[ERROR] Estado no escrito correctamente.");
            }
            else {
                // Llamamos a tu función de gestión para mutar el estado
                (0, gestion_1.cambiarEstadoIncidente)(idBusqueda, nuevoEstado);
            }
            break;
        case '3':
            const mesActual = new Date().getMonth();
            const anioActual = new Date().getFullYear();
            console.log(`\n--- REPORTE DEL MES ACTUAL (Mes: ${mesActual + 1} / Año: ${anioActual}) ---`);
            const reporte = (0, gestion_1.obtenerReporteMensual)(mesActual, anioActual);
            if (reporte.length === 0) {
                console.log("No hay incidentes reportados en este mes.");
            }
            else {
                console.table(reporte);
            }
            break;
        case '4':
            console.log("\n--- TODOS LOS INCIDENTES EN LA BASE DE DATO MOCK ---");
            const todos = (0, gestion_1.obtenerTodosLosIncidentes)();
            if (todos.length === 0) {
                console.log("La base de datos está vacía.");
            }
            else {
                console.table(todos);
            }
            break;
        case '5':
            console.log("\n¡Gracias por usar el sistema del C27! Saliendo...");
            rl.close();
            return; // Rompe el ciclo y cierra el programa
        default:
            console.log("[ERROR] Opción inválida, intenta de nuevo.");
            break;
    }
    // Volvemos a llamar al menú para que la máquina siga interactuando contigo hasta que elijas salir
    menuPrincipal();
}
// Arrancamos la aplicación por primera vez
menuPrincipal();
//# sourceMappingURL=index.js.map