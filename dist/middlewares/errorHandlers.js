"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, error) => {
    console.debug('ERROR: ', error.name);
    if (error.name === 'CastError') {
        res.status(400).json({ error: 'Datos no encontrados' }).end();
    }
};
//# sourceMappingURL=errorHandlers.js.map